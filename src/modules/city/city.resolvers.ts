import { InternalServerErrorException } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { City } from './interfaces/city.interface';
import { CityService } from './city.service';

@Resolver('Cities')
export class CityResolvers {
  constructor(private readonly cityService: CityService) {}

  @Query('cities')
  public async getCityList(): Promise<City[]> {
    try {
      return await this.cityService.getAll();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Query('city')
  public async getCity(obj, args, ctx, info): Promise<City> {
    try {
      return await this.cityService.get(args);
    } catch (err) {
      if (!err.status) {
        throw new InternalServerErrorException();
      }

      throw err;
    }
  }
}
