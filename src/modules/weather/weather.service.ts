import { Injectable, HttpService } from '@nestjs/common';

import { map } from 'rxjs/operators';

import * as Joi from 'joi';
import { JoiService } from 'providers';

import { CityService } from 'modules/city';

@Injectable()
export class WeatherService {
  constructor(
    private readonly cityService: CityService,
    private readonly httpService: HttpService,
    private readonly joiService: JoiService,
  ) {
  }

  public async getWeatherByCityId(id: string): Promise<any> {
    await this.joiService
      .validate(id, Joi.string().guid({ version: 'uuidv1' }).required())
      .toPromise();

    const city = await this.cityService.findOneById(id);

    return await this.httpService
      .get('https://api.apixu.com/v1/current.json', {
        params: {
          q: city.name,
          key: '12e2734c1bd9436cb3d102055183108',
        },
      })
      .pipe(
        map(({ data }) => ({
          cloud: data.current.cloud,
          condition: {
            code: data.current.condition.code,
            icon: data.current.condition.icon,
            text: data.current.condition.text,
          },
          feelslikeC: data.current.feelslike_c,
          feelslikeF: data.current.feelslike_f,
          humidity: data.current.humidity,
          isDay: data.current.is_day,
          lastUpdated: data.current.last_updated_epoch,
          precipIn: data.current.precip_in,
          precipMm: data.current.precip_mm,
          pressureIn: data.current.pressure_in,
          pressureMb: data.current.pressure_mb,
          tempC: data.current.temp_c,
          tempF: data.current.temp_f,
          visKm: data.current.vis_km,
          visMiles: data.current.vis_miles,
          windDegree: data.current.wind_degree,
          windDir: data.current.wind_dir,
          windKph: data.current.wind_kph,
          windMph: data.current.wind_mph,
        })),
      )
      .toPromise();
  }
}
