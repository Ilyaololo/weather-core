import { Args, Query, Parent, Resolver, ResolveProperty } from '@nestjs/graphql';

import { Weather } from './interfaces/weather.interfaces';
import { WeatherService } from './weather.service';

@Resolver('Weather')
export class WeatherResolvers {
  constructor(private readonly weatherService: WeatherService) {
  }

  @ResolveProperty('feelslike')
  private async getFeelslike(@Parent() weather, @Args('unit') unit: string): Promise<number> {
    switch (unit) {
      case 'C': {
        return weather.feelslikeC;
      }

      case 'F': {
        return weather.feelslikeF;
      }

      default: {
        return null;
      }
    }
  }

  @ResolveProperty('precip')
  private async getPrecip(@Parent() weather, @Args('unit') unit: string): Promise<number> {
    switch (unit) {
      case 'Mm': {
        return weather.precipMm;
      }

      case 'In': {
        return weather.precipIn;
      }

      default: {
        return null;
      }
    }
  }

  @ResolveProperty('pressure')
  private async getPressure(@Parent() weather, @Args('unit') unit: string): Promise<number> {
    switch (unit) {
      case 'Mb': {
        return weather.pressureMb;
      }

      case 'In': {
        return weather.pressureIn;
      }

      default: {
        return null;
      }
    }
  }

  @ResolveProperty('temp')
  private async getTemp(@Parent() weather, @Args('unit') unit: string): Promise<number> {
    switch (unit) {
      case 'C': {
        return weather.tempC;
      }

      case 'F': {
        return weather.tempF;
      }

      default: {
        return null;
      }
    }
  }

  @ResolveProperty('vis')
  private async getVis(@Parent() weather, @Args('unit') unit: string): Promise<number> {
    switch (unit) {
      case 'Km': {
        return weather.visKm;
      }

      case 'Miles': {
        return weather.visMiles;
      }

      default: {
        return null;
      }
    }
  }

  @ResolveProperty('wind')
  private async getWind(@Parent() weather, @Args('unit') unit: string): Promise<number> {
    switch (unit) {
      case 'Kph': {
        return weather.windKph;
      }

      case 'Mph': {
        return weather.windMph;
      }

      default: {
        return null;
      }
    }
  }

  @Query('weather')
  public async getWeatherByCityId(@Args('id') id: string): Promise<Weather> {
    return await this.weatherService.getWeatherByCityId(id);
  }
}
