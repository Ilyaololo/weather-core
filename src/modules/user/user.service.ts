import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as Joi from 'joi';
import { createHash } from 'utils';
import { JoiService } from 'providers';

import { JwtPayload } from 'modules/auth';

import { selUsers } from './selectors/user.selectors';
import { UserEntity } from './entity/user.entity';

import { User, UserPayload } from './interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly joiService: JoiService,
  ) {
  }

  public async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return selUsers(users);
  }

  public async findById(args: { id: string }): Promise<UserEntity> {
    await this.joiService.validate(args, Joi.object({
      id: Joi.number().required(),
    }));

    const user = await this.userRepository.findOne({
      codeId: args.id,
    });

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }

  public async findByLogin(payload: JwtPayload): Promise<UserEntity> {
    await this.joiService.validate(payload, Joi.object({
      login: Joi.string().max(128).required(),
    }));

    const user = await this.userRepository.findOne({
      login: payload.login,
    });

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }

  public async findByLoginAndPassword(args: UserPayload): Promise<UserEntity> {
    await this.joiService.validate(args, Joi.object({
      login: Joi.string().max(128).required(),
      password: Joi.string().max(128).required(),
    }));

    const entity = await this.findByLogin(args);
    const user = await this.userRepository.findOne({
      login: args.login,
      passwordHash: createHash(args.password, entity.salt),
    });

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }
}
