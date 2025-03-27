"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/app/types/weather";
import { Cloud, Droplets, Wind } from "lucide-react";

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{data.location}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-6xl font-bold">{data.temperature}°C</p>
              <p className="text-muted-foreground">{data.condition}</p>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span>{data.humidity}% Humidity</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <span>{data.windSpeed} km/h Wind</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-blue-500" />
                <span>{data.precipitation}% Precipitation</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}