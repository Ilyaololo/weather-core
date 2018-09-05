import { Query, Mutation, Resolver } from '@nestjs/graphql';

import { City } from './interfaces/city.interface';
import { CityService } from './city.service';

@Resolver('Cities')
export class CityResolvers {
  constructor(private readonly cityService: CityService) {}

  @Query('cities')
  public async getCityList(): Promise<City[]> {
    return await this.cityService.getAll();
  }

  @Query('city')
  public async getCity(obj, args, ctx, info): Promise<City> {
    return await this.cityService.get(args);
  }
}
