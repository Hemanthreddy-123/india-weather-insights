
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
        return <Sun className="w-10 h-10 text-yellow-300" />;
      case "clouds":
        return <Cloud className="w-10 h-10 text-gray-300" />;
      case "rain":
      case "drizzle":
        return <CloudRain className="w-10 h-10 text-blue-400" />;
      case "snow":
        return <CloudSnow className="w-10 h-10 text-white" />;
      case "thunderstorm":
        return <Zap className="w-10 h-10 text-yellow-400" />;
      default:
        return <Cloud className="w-10 h-10 text-gray-300" />;
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
    if (temp > 35) return "text-red-300";
    if (temp > 30) return "text-orange-300";
    if (temp > 25) return "text-yellow-300";
    if (temp > 15) return "text-green-300";
    return "text-blue-300";
  };

  return (
    <Card className="bg-gradient-to-br from-blue-900/60 to-purple-900/60 backdrop-blur-lg border border-blue-400/20 text-white hover:from-blue-800/70 hover:to-purple-800/70 transition-all duration-300 hover:scale-105 shadow-lg">
      <CardContent className="p-5 text-center">
        <p className="text-sm text-blue-200 mb-3 font-medium">
          {formatDate(forecastItem.dt)}
        </p>
        
        <div className="flex justify-center mb-4">
          {getWeatherIcon(forecastItem.weather[0].main)}
        </div>
        
        <p className={`text-3xl font-bold mb-2 ${getTemperatureColor(forecastItem.main.temp)} drop-shadow-lg`}>
          {Math.round(forecastItem.main.temp)}°C
        </p>
        
        <p className="text-xs text-blue-200 capitalize leading-relaxed mb-2">
          {forecastItem.weather[0].description}
        </p>
        
        <div className="mt-3 px-2 py-1 bg-blue-800/30 rounded-lg border border-blue-400/20">
          <p className="text-xs text-blue-200 font-medium">
            {forecastItem.weather[0].main}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
