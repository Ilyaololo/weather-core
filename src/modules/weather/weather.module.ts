import { Module } from '@nestjs/common';

import { CityModule } from 'modules/city';

import { WeatherResolvers } from './weather.resolvers';
import { WeatherService } from './weather.service';

@Module({
  imports: [CityModule],
  providers: [WeatherService, WeatherResolvers],
  exports: [WeatherService],
})
export class WeatherModule {
}
