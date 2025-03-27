"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForecastDay } from "@/app/types/weather";

interface ForecastCardProps {
  forecast: ForecastDay[];
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          {forecast.map((day) => (
            <div key={day.day} className="text-center">
              <p className="font-medium">{day.day}</p>
              <p className="text-2xl font-bold">{day.temperature.max}°</p>
              <p className="text-sm text-muted-foreground">{day.temperature.min}°</p>
              <p className="text-sm">{day.condition}</p>
              <p className="text-sm text-blue-500">{day.precipitation}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}