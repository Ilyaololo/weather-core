export interface Condition {
  code: number;
  icon: string;
  text: string;
}

export interface Weather {
  cloud: number;
  condition: Condition;
  feelslike: number;
  humidity: number;
  isDay: number;
  lastUpdated: number;
  precip: number;
  pressure: number;
  temp: number;
  vis: number;
  windDegree: number;
  windDir: string;
  wind: number;
}
