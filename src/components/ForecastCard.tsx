
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Moon, CloudSnow, Zap } from "lucide-react";

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
        return <Sun className="w-10 h-10" />;
      case "clouds":
        return <Cloud className="w-10 h-10" />;
      case "rain":
      case "drizzle":
        return <CloudRain className="w-10 h-10" />;
      case "snow":
        return <CloudSnow className="w-10 h-10" />;
      case "thunderstorm":
        return <Zap className="w-10 h-10" />;
      default:
        return <Cloud className="w-10 h-10" />;
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

  const getTemperatureColor = (temp: number) => {
    if (temp > 35) return "text-red-400";
    if (temp > 30) return "text-orange-400";
    if (temp > 25) return "text-yellow-400";
    if (temp > 15) return "text-green-400";
    return "text-blue-400";
  };

  return (
    <Card className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg border border-white/20 text-white hover:from-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
      <CardContent className="p-5 text-center">
        <p className="text-sm text-white/90 mb-3 font-medium">
          {formatDate(forecastItem.dt)}
        </p>
        
        <div className="flex justify-center mb-4 text-white/90">
          {getWeatherIcon(forecastItem.weather[0].main)}
        </div>
        
        <p className={`text-3xl font-bold mb-2 ${getTemperatureColor(forecastItem.main.temp)}`}>
          {Math.round(forecastItem.main.temp)}°C
        </p>
        
        <p className="text-xs text-white/80 capitalize leading-relaxed">
          {forecastItem.weather[0].description}
        </p>
        
        <div className="mt-3 px-2 py-1 bg-white/10 rounded-lg">
          <p className="text-xs text-white/70">
            {forecastItem.weather[0].main}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
