import { Query, Resolver } from '@nestjs/graphql';

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
  public async login(obj, args, ctx, info): Promise<JwtToken> {
    await this.userService.findByLoginAndPassword(args);
    return await this.authService.createToken(args);
  }
}
