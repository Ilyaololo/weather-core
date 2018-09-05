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

  public async findAll(q: string): Promise<User[]> {
    const users = await this.userRepository.find();

    return selUsers(users);
  }

  public async findOneById(id: string): Promise<UserEntity> {
    await this.joiService.validate(id, Joi.number().required());

    const user = await this.userRepository.findOne({
      codeId: id,
    });

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }

  public async findOneByLogin(payload: JwtPayload): Promise<UserEntity> {
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

  public async findOneByLoginAndPassword(args: UserPayload): Promise<UserEntity> {
    await this.joiService.validate(args, Joi.object({
      login: Joi.string().max(128).required(),
      password: Joi.string().max(128).required(),
    }));

    const entity = await this.findOneByLogin(args);
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
