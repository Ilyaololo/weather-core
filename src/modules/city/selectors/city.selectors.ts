import * as _memoize from 'lodash/memoize';

import { City, CityEntity } from '../';

export const selCities: (list: CityEntity[]) => City[] = _memoize(
  (list: CityEntity[]) => list.map<City>((city) => ({
    id: city.codeId,
    name: city.name,
    coord: {
      lat: city.lat,
      lon: city.lon,
    },
  })),
);
