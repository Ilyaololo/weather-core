import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';

import { City } from './interfaces/city.interface';
import { CityService } from './city.service';

@Resolver('Cities')
export class CityResolvers {
  constructor(private readonly cityService: CityService) {
  }

  @Query('cities')
  public async findAll(@Args('q') q: string): Promise<City[]> {
    return await this.cityService.findAll(q);
  }

  @Query('city')
  public async findOneById(@Args('id') id: string): Promise<City> {
    return await this.cityService.findOneById(id);
  }
}
