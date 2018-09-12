import * as uuid from 'uuid/v1';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { CityEntity as City } from 'modules/city';
import { RoleEntity as Role } from 'modules/role';
import { UserEntity as User } from 'modules/user';

import { createHash, createSalt } from 'utils';

export class InsertUser1536685269281 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepository = queryRunner.connection.getRepository(User);

    const users = await Promise.all([
      (async () => {
        const user = new User();

        user.sid = uuid();
        user.login = 'admin@example.com';
        user.lastName = 'Админский';
        user.firstName = 'Админ';
        user.middleName = 'Админович';
        user.salt = createSalt();
        user.passwordHash = createHash('123123', user.salt);
        user.role = await queryRunner.connection.getRepository(Role).findOneOrFail({ name: 'Администратор' });
        user.city = await queryRunner.connection.getRepository(City).findOneOrFail({ name: 'Barnaul' });

        return user;
      })(),
    ]);

    await userRepository.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.clearTable('public.user');
  }
}
