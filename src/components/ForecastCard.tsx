
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Moon, CloudSnow } from "lucide-react";

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

interface ForecastCardProps {
  forecastItem: ForecastItem;
}

const ForecastCard = ({ forecastItem }: ForecastCardProps) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-8 h-8" />;
      case "clouds":
        return <Cloud className="w-8 h-8" />;
      case "rain":
      case "drizzle":
        return <CloudRain className="w-8 h-8" />;
      case "snow":
        return <CloudSnow className="w-8 h-8" />;
      default:
        return <Cloud className="w-8 h-8" />;
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-IN", { 
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardContent className="p-4 text-center">
        <p className="text-sm text-white/80 mb-2">
          {formatDate(forecastItem.dt)}
        </p>
        <div className="flex justify-center mb-3 text-white/90">
          {getWeatherIcon(forecastItem.weather[0].main)}
        </div>
        <p className="text-2xl font-bold mb-1">
          {Math.round(forecastItem.main.temp)}°C
        </p>
        <p className="text-xs text-white/70 capitalize">
          {forecastItem.weather[0].description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
