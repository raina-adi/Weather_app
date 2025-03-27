import { WeatherData, Location } from '../types/weather';

export const locations: Location[] = [
  { id: '1', name: 'New York', country: 'USA' },
  { id: '2', name: 'London', country: 'UK' },
  { id: '3', name: 'Tokyo', country: 'Japan' },
  { id: '4', name: 'Paris', country: 'France' },
  { id: '5', name: 'Sydney', country: 'Australia' },
];

export const mockWeatherData: Record<string, WeatherData> = {
  '1': {
    location: 'New York',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    precipitation: 20,
    airQuality: {
      index: 42,
      status: 'Good',
    },
    forecast: [
      { day: 'Mon', temperature: { min: 18, max: 24 }, condition: 'Sunny', precipitation: 0 },
      { day: 'Tue', temperature: { min: 17, max: 23 }, condition: 'Cloudy', precipitation: 30 },
      { day: 'Wed', temperature: { min: 16, max: 22 }, condition: 'Rain', precipitation: 60 },
      { day: 'Thu', temperature: { min: 15, max: 21 }, condition: 'Partly Cloudy', precipitation: 20 },
      { day: 'Fri', temperature: { min: 17, max: 23 }, condition: 'Sunny', precipitation: 0 },
    ],
  },
  '2': {
    location: 'London',
    temperature: 18,
    condition: 'Rainy',
    humidity: 75,
    windSpeed: 15,
    precipitation: 80,
    airQuality: {
      index: 38,
      status: 'Good',
    },
    forecast: [
      { day: 'Mon', temperature: { min: 15, max: 20 }, condition: 'Rain', precipitation: 70 },
      { day: 'Tue', temperature: { min: 14, max: 19 }, condition: 'Cloudy', precipitation: 40 },
      { day: 'Wed', temperature: { min: 13, max: 18 }, condition: 'Rain', precipitation: 80 },
      { day: 'Thu', temperature: { min: 14, max: 19 }, condition: 'Cloudy', precipitation: 30 },
      { day: 'Fri', temperature: { min: 15, max: 20 }, condition: 'Partly Cloudy', precipitation: 20 },
    ],
  },
};