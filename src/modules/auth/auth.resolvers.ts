import { Args, Query, Resolver } from '@nestjs/graphql';

import { UserService } from 'modules/user';

import { AuthService } from './auth.serivce';
import { JwtToken } from './interfaces/auth.interfaces';

@Resolver('Auth')
export class AuthResolvers {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  @Query('login')
  public async login(@Args('login') login: string, @Args('password') password: string): Promise<JwtToken> {
    await this.userService.findOneByLoginAndPassword({
      login,
      password,
    });

    return await this.authService.createToken({
      login,
    });
  }
}
