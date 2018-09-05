import * as uuid from 'uuid/v1';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertCity1535452388653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        INSERT INTO public.city (code_id, name, region, country, timezone, lat, lon)
        VALUES ('${uuid()}', 'Barnaul', 'Altaisky krai', 'Russia', 'Asia/Barnaul', 53.36, 83.75)
      `);

      await queryRunner.query(`
        INSERT INTO public.city (code_id, name, region, country, timezone, lat, lon)
        VALUES ('${uuid()}', 'Novosibirsk', 'Novosibirsk', 'Russia', 'Asia/Novosibirsk', 55.04, 82.93)
      `);

      await queryRunner.query(`
        INSERT INTO public.city (code_id, name, region, country, timezone, lat, lon)
        VALUES ('${uuid()}', 'Moscow', 'Moscow City', 'Russia', 'Europe/Moscow', 55.75, 37.62)
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.clearTable('city');
    }
}
