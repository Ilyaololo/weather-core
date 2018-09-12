import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';

import { RoleService } from './role.service';

@Resolver('Role')
export class RoleResolvers {
  constructor(private readonly roleService: RoleService) {
  }
}
