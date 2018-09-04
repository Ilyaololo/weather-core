import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as Joi from 'joi';
import { JoiService } from 'providers';

import { City } from './interfaces/city.interface';
import { CityEntity } from './entity/city.entity';
import { selCities } from './selectors/city.selectors';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly joiService: JoiService,
  ) {
  }

  public async get(args: { id: string }): Promise<City> {
    await this.joiService.validate(args, Joi.object({
      id: Joi.string().required(),
    }));

    const city = await this.cityRepository.findOne({
      codeId: args.id,
    });

    if (!city) {
      throw new NotFoundException();
    }

    return {
      id: city.codeId,
      name: city.name,
      coord: {
        lat: city.lat,
        lon: city.lon,
      },
    };
  }

  public async getAll(): Promise<City[]> {
    const cities = await this.cityRepository.find();

    return selCities(cities);
  }
}
