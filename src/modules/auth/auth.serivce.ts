import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as Joi from 'joi';
import { JoiService } from 'providers';

import { UserService, UserEntity } from 'modules/user';

import { JwtToken, JwtPayload } from './interfaces/auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly joiService: JoiService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
  }

  public async createToken(args: JwtPayload): Promise<JwtToken> {
    await this.joiService.validate(args, Joi.object({
      login: Joi.string().max(128).required(),
    }));

    return {
      token: this.jwtService.sign(args),
    };
  }

  public async validateUser(payload: JwtPayload): Promise<UserEntity> {
    return await this.userService.findByLogin(payload);
  }
}
