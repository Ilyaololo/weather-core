export interface Condition {
  code: number;
  icon: string;
  text: string;
}

export interface Current {
  cloud: number;
  condition: Condition;
  feelslikeC: number;
  feelslikeF: number;
  humidity: number;
  isDay: number;
  lastUpdated: number;
  precipIn: number;
  precipMm: number;
  pressureIn: number;
  pressureMb: number;
  tempC: number;
  tempF: number;
  visKm: number;
  visMiles: number;
  windDegree: number;
  windDir: string;
  windKph: number;
  windMph: number;
}

export interface Location {
  country: string;
  lat: number;
  localtime: number;
  lon: number;
  name: string;
  region: string;
  timezone: string;
}

export interface Weather {
  current: Current;
  location: Location;
}
