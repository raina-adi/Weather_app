"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AirQualityCardProps {
  index: number;
  status: string;
}

export function AirQualityCard({ index, status }: AirQualityCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Air Quality</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={index} className="h-2" />
          <div className="flex justify-between">
            <p className="text-2xl font-bold">{index}</p>
            <p className="text-lg text-muted-foreground">{status}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}