import * as uuid from 'uuid/v1';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { RoleEntity as Role } from 'modules/role';

export class InsertRole1536685243167 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    const role =  new Role();

    role.sid = uuid();
    role.name = 'Администратор';

    await queryRunner.connection.getRepository<Role>(Role).save(role);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.clearTable('public.role');
  }
}
