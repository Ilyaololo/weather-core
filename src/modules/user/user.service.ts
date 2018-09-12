import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import * as Joi from 'joi';

import { Connection, createHash } from 'utils';
import { JoiService } from 'providers';
import { JwtPayload } from 'modules/auth';

import { selUsers } from './selectors/user.selectors';
import { UserEntity } from './entity/user.entity';
import { UserModel } from './models/user.model';

import { User, UserPayload } from './interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly joiService: JoiService,
  ) {
  }

  public async findAll(q: string, options: FindManyOptions = {}): Promise<Connection<User>> {
    if (q) {
      console.log('q', q);
    }

    options.relations = ['city', 'role'];

    const total = await this.userRepository.count({
      where: options.where,
    });

    const users = await this.userRepository.find(options);

    return new Connection<User>(selUsers(users), total, options);
  }

  public async findOneById(id: string): Promise<User> {
    await this.joiService
      .validate(id, Joi.number().required())
      .toPromise();

    const user = await this.userRepository.findOne({
      sid: id,
    });

    if (!user) {
      throw new BadRequestException();
    }

    return new UserModel(user);
  }

  public async findOneByLogin(payload: JwtPayload): Promise<UserEntity> {
    await this.joiService
      .validate(payload, Joi.object({
        login: Joi.string().max(128).required(),
      }))
      .toPromise();

    const user = await this.userRepository.findOne({
      login: payload.login,
    });

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }

  public async findOneByLoginAndPassword(args: UserPayload): Promise<UserEntity> {
    await this.joiService
      .validate(args, Joi.object({
        login: Joi.string().max(128).required(),
        password: Joi.string().max(128).required(),
      }))
      .toPromise();

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
