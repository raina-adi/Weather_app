export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  forecast: ForecastDay[];
  airQuality: {
    index: number;
    status: string;
  };
}

export interface ForecastDay {
  day: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  precipitation: number;
}

export interface Location {
  id: string;
  name: string;
  country: string;
}