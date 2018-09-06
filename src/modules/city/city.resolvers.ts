import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';

import { Connection, Pagination } from 'utils';

import { City } from './interfaces/city.interface';
import { CityService } from './city.service';

@Resolver('Cities')
export class CityResolvers {
  constructor(private readonly cityService: CityService) {
  }

  @Query('citiesConnection')
  public async findAll(@Args('q') q: string, @Args('pagination') pagination: Pagination): Promise<Connection<City>> {
    return await this.cityService.findAll(q, pagination);
  }

  @Query('city')
  public async findOneById(@Args('id') id: string): Promise<City> {
    return await this.cityService.findOneById(id);
  }
}
