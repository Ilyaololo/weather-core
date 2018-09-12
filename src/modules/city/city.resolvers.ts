import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { FindManyOptions } from 'typeorm';

import { Connection } from 'utils';
import { Cursor } from 'decorators';

import { City } from './interfaces/city.interface';
import { CityService } from './city.service';

@Resolver('City')
export class CityResolvers {
  constructor(private readonly cityService: CityService) {
  }

  @Query('citiesConnection')
  public async findAll(@Args('q') q: string, @Cursor() options: FindManyOptions): Promise<Connection<City>> {
    return await this.cityService.findAll(q, options);
  }

  @Query('city')
  public async findOneById(@Args('id') id: string): Promise<City> {
    return await this.cityService.findOneById(id);
  }
}
