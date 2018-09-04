export interface Coord {
  lat: number;
  lon: number;
}

export interface City {
  id: string;
  name: string;
  coord: Coord;
}
