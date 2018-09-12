import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, FindManyOptions } from 'typeorm';

import * as Joi from 'joi';
import { JoiService } from 'providers';

import { Connection } from 'utils';

import { City } from './interfaces/city.interface';
import { CityEntity } from './entity/city.entity';
import { CityModel } from './models/city.model';
import { selCity } from './selectors/city.selectors';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>,
    private readonly joiService: JoiService,
  ) {
  }

  public async findAll(q: string, options: FindManyOptions): Promise<Connection<City>> {
    if (q) {
      console.log('q', q);
    }

    const total = await this.cityRepository.count({
      where: options.where,
    });

    const cities = await this.cityRepository.find(options);

    return new Connection<City>(selCity(cities), total, options);
  }

  public async findOneById(id: string): Promise<City> {
    await this.joiService
      .validate(id, Joi.string().guid({ version: 'uuidv1' }).required())
      .toPromise();

    const city = await this.cityRepository.findOne({
      sid: id,
    });

    if (!city) {
      throw new NotFoundException();
    }

    return new CityModel(city);
  }
}
