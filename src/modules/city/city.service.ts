import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, FindManyOptions } from 'typeorm';

import * as Joi from 'joi';
import { JoiService } from 'providers';

import { Connection, Pagination } from 'utils';

import { City } from './interfaces/city.interface';
import { CityEntity } from './entity/city.entity';
import { selCities } from './selectors/city.selectors';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>,
    private readonly joiService: JoiService,
  ) {
  }

  public async findAll(q: string, pagination: Pagination): Promise<Connection<City>> {
    const options: FindManyOptions = {};

    if (q) {
      console.log('q', q);
    }

    if (pagination) {
      if (pagination.last > 0) {
        options.take = pagination.last;
        options.order = {
          id: 'DESC',
        };

        if (pagination.before) {
          const id = Connection.atob(pagination.before);
          // todo check id is uuid

          options.where = {
            codeId: LessThan(id),
          };
        }
      } else if (pagination.first > 0) {
        options.take = pagination.first;
        options.order = {
          id: 'ASC',
        };

        if (pagination.after) {
          const id = Connection.atob(pagination.after);
          // todo check id is uuid

          options.where = {
            codeId: MoreThan(id),
          };
        }
      }
    }

    const total = await this.cityRepository.count({
      where: options.where,
    });
    const cities = await this.cityRepository.find(options);

    return new Connection<City>(selCities(cities), total, pagination);
  }

  public async findOneById(id: string): Promise<City> {
    await this.joiService.validate(id, Joi.string().required());

    const city = await this.cityRepository.findOne({
      codeId: id,
    });

    if (!city) {
      throw new NotFoundException();
    }

    return {
      id: city.codeId,
      name: city.name,
      region: city.region,
      country: city.country,
      timezone: city.timezone,
      coord: {
        lat: city.lat,
        lon: city.lon,
      },
    } as City;
  }
}
