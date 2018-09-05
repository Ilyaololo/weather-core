export interface Coord {
  lat: number;
  lon: number;
}

export interface City {
  id: string;
  name: string;
  region: string;
  country: string;
  timezone: string;
  coord: Coord;
}
