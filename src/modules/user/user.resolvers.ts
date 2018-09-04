import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { AuthGuard } from 'guards';

import { User } from './interfaces/user.interfaces';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {

  constructor(private readonly userService: UserService) {}

  @Query('users')
  @UseGuards(AuthGuard('jwt'))
  public async getUsersList(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Query('user')
  @UseGuards(AuthGuard('jwt'))
  public async getUser(obj, args, ctx, info): Promise<any> {
    try {
      return this.userService.findById(args);
    } catch (err) {
      if (!err.status) {
        throw new InternalServerErrorException();
      }

      throw err;
    }
  }
}
