import { Query, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from 'guards';

import { User } from './interfaces/user.interfaces';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {
  }

  @Query('users')
  @UseGuards(AuthGuard('jwt'))
  public async getUsersList(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query('user')
  @UseGuards(AuthGuard('jwt'))
  public async getUser(obj, args, ctx, info): Promise<any> {
    return this.userService.findById(args);
  }
}
