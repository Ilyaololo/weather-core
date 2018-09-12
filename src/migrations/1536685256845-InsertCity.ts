import * as uuid from 'uuid/v1';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { CityEntity as City } from 'modules/city';

export class InsertCity1536685256845 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    const cityRepository = queryRunner.connection.getRepository(City);

    const cities = await Promise.all([
      (async () => {
        const city = new City();

        city.sid = uuid();
        city.name = 'Barnaul';
        city.region = 'Altaisky krai';
        city.country = 'Russia';
        city.timezone = 'Asia/Barnaul';
        city.lat = 53.36;
        city.lon = 83.75;

        return city;
      })(),

      (async () => {
        const city = new City();

        city.sid = uuid();
        city.name = 'Biysk';
        city.region = 'Altaisky krai';
        city.country = 'Russia';
        city.timezone = 'Asia/Barnaul';
        city.lat = 52.57;
        city.lon = 85.25;

        return city;
      })(),

      (async () => {
        const city = new City();

        city.sid = uuid();
        city.name = 'Aleysk';
        city.region = 'Altaisky krai';
        city.country = 'Russia';
        city.timezone = 'Asia/Barnaul';
        city.lat = 52.49;
        city.lon = 82.78;

        return city;
      })(),

      (async () => {
        const city = new City();

        city.sid = uuid();
        city.name = 'Novosibirsk';
        city.region = 'Novosibirsk';
        city.country = 'Russia';
        city.timezone = 'Asia/Novosibirsk';
        city.lat = 55.04;
        city.lon = 82.93;

        return city;
      })(),

      (async () => {
        const city = new City();

        city.sid = uuid();
        city.name = 'Berdsk';
        city.region = 'Novosibirsk';
        city.country = 'Russia';
        city.timezone = 'Asia/Novosibirsk';
        city.lat = 54.78;
        city.lon = 83.03;

        return city;
      })(),

      (async () => {
        const city = new City();

        city.sid = uuid();
        city.name = 'Moscow';
        city.region = 'Moscow City';
        city.country = 'Russia';
        city.timezone = 'Europe/Moscow';
        city.lat = 55.75;
        city.lon = 37.62;

        return city;
      })(),

      (async () => {
        const city = new City();

        city.sid = uuid();
        city.name = 'Kemerovo';
        city.region = 'Kemerovo';
        city.country = 'Russia';
        city.timezone = 'Asia/Novokuznetsk';
        city.lat = 55.33;
        city.lon = 86.08;

        return city;
      })(),
    ]);

    await cityRepository.save(cities);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.clearTable('public.city');
  }
}
