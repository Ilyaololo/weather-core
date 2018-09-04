import * as uuid from 'uuid/v1';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertCity1535452388653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        INSERT INTO public.city (name, code_id, lat, lon)
        VALUES ('Barnaul', '${uuid()}', 53.36, 83.75)
      `);

      await queryRunner.query(`
        INSERT INTO public.city (name, code_id, lat, lon)
        VALUES ('Novosibirsk', '${uuid()}', 55.04, 82.93)
      `);

      await queryRunner.query(`
        INSERT INTO public.city (name, code_id, lat, lon)
        VALUES ('Moscow', '${uuid()}', 55.75, 37.62)
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.clearTable('city');
    }
}
