import { WeatherData, Location } from '@/app/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  console.error('OpenWeather API key not found. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables.');
}

export interface WeatherAPIResponse {
  coord: { lon: number; lat: number };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: { all: number };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  dt: number;
}

export interface ForecastAPIResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: { all: number };
    wind: {
      speed: number;
      deg: number;
    };
    visibility: number;
    pop: number;
  }>;
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface AirQualityAPIResponse {
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  }>;
}

export interface GeocodingAPIResponse {
  name: string;
  local_names?: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export class WeatherService {
  private static async fetchWithError(url: string) {
    if (!API_KEY) {
      throw new Error('API key not configured');
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    return response.json();
  }

  static async getCurrentWeather(lat: number, lon: number): Promise<WeatherAPIResponse> {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    return this.fetchWithError(url);
  }

  static async getForecast(lat: number, lon: number): Promise<ForecastAPIResponse> {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    return this.fetchWithError(url);
  }

  static async getAirQuality(lat: number, lon: number): Promise<AirQualityAPIResponse> {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    return this.fetchWithError(url);
  }

  static async searchLocations(query: string): Promise<GeocodingAPIResponse[]> {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;
    return this.fetchWithError(url);
  }

  static mapWeatherIcon(condition: string): string {
    const iconMap: { [key: string]: string } = {
      'Clear': 'Sunny',
      'Clouds': 'Partly Cloudy',
      'Rain': 'Rainy',
      'Drizzle': 'Rainy',
      'Thunderstorm': 'Rainy',
      'Snow': 'Cloudy',
      'Mist': 'Cloudy',
      'Fog': 'Cloudy',
      'Haze': 'Cloudy',
    };
    return iconMap[condition] || 'Sunny';
  }

  static getUVIndexStatus(uvIndex: number): string {
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    if (uvIndex <= 10) return 'Very High';
    return 'Extreme';
  }

  static getAirQualityStatus(aqi: number): string {
    switch (aqi) {
      case 1: return 'Good';
      case 2: return 'Fair';
      case 3: return 'Moderate';
      case 4: return 'Poor';
      case 5: return 'Very Poor';
      default: return 'Unknown';
    }
  }

  static formatTime(timestamp: number, timezone: number): string {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  static formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
}
