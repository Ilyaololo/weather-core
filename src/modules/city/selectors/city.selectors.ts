import * as _memoize from 'lodash/memoize';

import { City, CityEntity, CityModel } from '../';

export const selCity: (list: CityEntity[]) => City[] = _memoize(
  (list: CityEntity[]) => list.map<City>((city) => new CityModel(city)),
);
