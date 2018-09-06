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
        VALUES ('${uuid()}', 'Biysk', 'Altaisky krai', 'Russia', 'Asia/Barnaul', 52.57, 85.25)
      `);

      await queryRunner.query(`
        INSERT INTO public.city (code_id, name, region, country, timezone, lat, lon)
        VALUES ('${uuid()}', 'Aleysk', 'Altaisky krai', 'Russia', 'Asia/Barnaul', 52.49, 82.78)
      `);

      await queryRunner.query(`
        INSERT INTO public.city (code_id, name, region, country, timezone, lat, lon)
        VALUES ('${uuid()}', 'Novosibirsk', 'Novosibirsk', 'Russia', 'Asia/Novosibirsk', 55.04, 82.93)
      `);

      await queryRunner.query(`
        INSERT INTO public.city (code_id, name, region, country, timezone, lat, lon)
        VALUES ('${uuid()}', 'Berdsk', 'Novosibirsk', 'Russia', 'Asia/Novosibirsk', 54.78, 83.03)
      `);

      await queryRunner.query(`
        INSERT INTO public.city (code_id, name, region, country, timezone, lat, lon)
        VALUES ('${uuid()}', 'Moscow', 'Moscow City', 'Russia', 'Europe/Moscow', 55.75, 37.62)
      `);

      await queryRunner.query(`
        INSERT INTO public.city (code_id, name, region, country, timezone, lat, lon)
        VALUES ('${uuid()}', 'Kemerovo', 'Kemerovo', 'Russia', 'Kemerovo', 55.33, 86.08)
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.clearTable('city');
    }
}
