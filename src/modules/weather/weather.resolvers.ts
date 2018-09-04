import { Query, Resolver } from '@nestjs/graphql';

import { Weather } from './interfaces/weather.interfaces';
import { WeatherService } from './weather.service';

@Resolver('Weather')
export class WeatherResolvers {
  constructor(private readonly weatherService: WeatherService) {
  }

  @Query('weather')
  public async getWeatherByCity(obj, args, ctx, info): Promise<Weather> {
    return await this.weatherService.getWeather(args);
  }
}
