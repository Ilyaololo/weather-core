import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
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
  public async findAll(@Args('q') q: string): Promise<User[]> {
    return await this.userService.findAll(q);
  }

  @Query('user')
  @UseGuards(AuthGuard('jwt'))
  public async findOneById(@Args('id') id: string): Promise<any> {
    return this.userService.findOneById(id);
  }
}
