import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';

import { AuthGuard } from 'guards';
import { Connection } from 'utils';
import { Cursor } from 'decorators';

import { User } from './interfaces/user.interfaces';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {
  }

  @Query('usersConnection')
  @UseGuards(AuthGuard('jwt'))
  public async findAll(@Args('q') q: string, @Cursor() options: FindManyOptions): Promise<Connection<User>> {
    return await this.userService.findAll(q, options);
  }

  @Query('user')
  @UseGuards(AuthGuard('jwt'))
  public async findOneById(@Args('id') id: string): Promise<User> {
    return this.userService.findOneById(id);
  }
}
