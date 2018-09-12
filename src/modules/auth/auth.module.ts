import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { JWT } from 'configs';

import { UserModule } from 'modules/user';

import { AuthResolvers } from './auth.resolvers';
import { AuthService } from './auth.serivce';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register(JWT),
  ],
  providers: [AuthService, AuthResolvers, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
}
