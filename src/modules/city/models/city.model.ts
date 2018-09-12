import { City, Coord } from 'modules/city';

export class CoordModel implements Coord {
  public lat: number;
  public lon: number;

  constructor(params: any) {
    this.lat = params.lat;
    this.lon = params.lon;
  }
}

export class CityModel implements City {
  public id: string;
  public name: string;
  public region: string;
  public country: string;
  public timezone: string;
  public coord: Coord;

  constructor(params: any) {
    this.country = params.country;
    this.id = params.sid;
    this.name = params.name;
    this.region = params.region;
    this.timezone = params.timezone;
    this.coord = new CoordModel({
      lat: params.lat,
      lon: params.lon,
    });
  }
}
