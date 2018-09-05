import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CityEntity } from './entity/city.entity';
import { CityResolvers } from './city.resolvers';
import { CityService } from './city.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ CityEntity ]) ],
  providers: [ CityService, CityResolvers ],
  exports: [ CityService ],
})
export class CityModule {
}
