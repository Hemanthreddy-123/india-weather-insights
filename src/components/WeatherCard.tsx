
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Moon, CloudSnow, Wind, Thermometer } from "lucide-react";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard = ({ weatherData }: WeatherCardProps) => {
  const getWeatherIcon = (condition: string) => {
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;
    
    switch (condition.toLowerCase()) {
      case "clear":
        return isNight ? <Moon className="w-16 h-16" /> : <Sun className="w-16 h-16" />;
      case "clouds":
        return <Cloud className="w-16 h-16" />;
      case "rain":
      case "drizzle":
        return <CloudRain className="w-16 h-16" />;
      case "snow":
        return <CloudSnow className="w-16 h-16" />;
      default:
        return <Cloud className="w-16 h-16" />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 35) return "text-red-400";
    if (temp > 25) return "text-orange-400";
    if (temp > 15) return "text-yellow-400";
    return "text-blue-400";
  };

  const getWeatherAdvice = (condition: string, temp: number) => {
    if (condition.toLowerCase().includes("rain")) {
      return "🌧️ Carry an umbrella! Perfect weather for hot chai.";
    }
    if (temp > 35) {
      return "🌡️ Very hot! Stay hydrated and avoid direct sunlight.";
    }
    if (temp > 30) {
      return "☀️ Hot weather! Use sunscreen and stay cool.";
    }
    if (temp < 15) {
      return "🧥 Cool weather! Perfect for outdoor activities.";
    }
    return "🌤️ Pleasant weather! Enjoy your day!";
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p className="text-white/80 capitalize text-lg">
            {weatherData.weather[0].description}
          </p>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="flex justify-center mb-4 text-white/90">
              {getWeatherIcon(weatherData.weather[0].main)}
            </div>
            <div className={`text-6xl font-bold mb-2 ${getTemperatureColor(weatherData.main.temp)}`}>
              {Math.round(weatherData.main.temp)}°C
            </div>
            <p className="text-white/80">
              Feels like {Math.round(weatherData.main.feels_like)}°C
            </p>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <p className="text-center text-sm">
            {getWeatherAdvice(weatherData.weather[0].main, weatherData.main.temp)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-center bg-white/10 rounded-lg p-3">
            <Wind className="w-5 h-5 mr-2" />
            <div>
              <p className="text-white/80">Wind</p>
              <p className="font-semibold">{weatherData.wind.speed} m/s</p>
            </div>
          </div>
          <div className="flex items-center justify-center bg-white/10 rounded-lg p-3">
            <Thermometer className="w-5 h-5 mr-2" />
            <div>
              <p className="text-white/80">Humidity</p>
              <p className="font-semibold">{weatherData.main.humidity}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
