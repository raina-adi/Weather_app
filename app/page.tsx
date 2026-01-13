import { locations } from "./data/mockWeather";
import { WeatherDashboard } from "@/components/weather-dashboard.jsx";

export default function Home() {
  return <WeatherDashboard initialLocation={locations[0].id} />;
}