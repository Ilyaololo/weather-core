import * as uuid from 'uuid/v1';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { createHash, createSalt } from '../utils';

export class InsertUser1535176268724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      const salt = createSalt();
      const hash = createHash('123123', salt);

      await queryRunner.query(`
        INSERT INTO public.user (code_id, login, password_hash, salt, last_name, first_name, middle_name, created_at, updated_at)
        VALUES ('${uuid()}', 'admin@example.com', '${hash}', '${salt}', 'Админский', 'Админ', 'Админович', 'now()', 'now()')
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.clearTable('user');
    }
}
