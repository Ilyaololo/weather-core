import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from './entity/role.entity';
import { RoleResolvers } from './role.resolvers';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService, RoleResolvers],
  exports: [RoleService],
})
export class RoleModule {
}
