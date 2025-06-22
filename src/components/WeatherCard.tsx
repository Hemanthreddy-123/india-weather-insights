
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Moon, CloudSnow, Wind, Thermometer, Droplets, Gauge } from "lucide-react";

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
        return isNight ? <Moon className="w-20 h-20" /> : <Sun className="w-20 h-20" />;
      case "clouds":
        return <Cloud className="w-20 h-20" />;
      case "rain":
      case "drizzle":
        return <CloudRain className="w-20 h-20" />;
      case "snow":
        return <CloudSnow className="w-20 h-20" />;
      default:
        return <Cloud className="w-20 h-20" />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 35) return "text-red-400";
    if (temp > 30) return "text-orange-400";
    if (temp > 25) return "text-yellow-400";
    if (temp > 15) return "text-green-400";
    return "text-blue-400";
  };

  const getWeatherAdvice = (condition: string, temp: number) => {
    if (condition.toLowerCase().includes("rain")) {
      return "🌧️ Carry an umbrella! Perfect weather for hot chai and pakoras.";
    }
    if (temp > 35) {
      return "🌡️ Very hot! Stay hydrated, use sunscreen, and avoid direct sunlight.";
    }
    if (temp > 30) {
      return "☀️ Hot weather! Drink plenty of water and stay in shade when possible.";
    }
    if (temp < 15) {
      return "🧥 Cool weather! Perfect for outdoor activities and sightseeing.";
    }
    return "🌤️ Pleasant weather! Great day to explore and enjoy outdoor activities!";
  };

  const getAirQualityText = (pressure: number) => {
    if (pressure > 1020) return "Excellent";
    if (pressure > 1015) return "Good";
    if (pressure > 1010) return "Moderate";
    return "Poor";
  };

  return (
    <Card className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg border border-white/20 text-white shadow-2xl">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p className="text-white/90 capitalize text-xl font-medium">
            {weatherData.weather[0].description}
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-6 text-white/90">
              {getWeatherIcon(weatherData.weather[0].main)}
            </div>
            <div className={`text-7xl font-bold mb-3 ${getTemperatureColor(weatherData.main.temp)}`}>
              {Math.round(weatherData.main.temp)}°C
            </div>
            <p className="text-white/80 text-lg">
              Feels like {Math.round(weatherData.main.feels_like)}°C
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-4 mb-6 border border-white/10">
          <p className="text-center text-sm leading-relaxed">
            {getWeatherAdvice(weatherData.weather[0].main, weatherData.main.temp)}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="flex flex-col items-center bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-all duration-200">
            <Wind className="w-6 h-6 mb-2 text-blue-300" />
            <p className="text-white/80 text-xs">Wind Speed</p>
            <p className="font-bold text-lg">{weatherData.wind.speed.toFixed(1)} m/s</p>
          </div>
          
          <div className="flex flex-col items-center bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-all duration-200">
            <Droplets className="w-6 h-6 mb-2 text-cyan-300" />
            <p className="text-white/80 text-xs">Humidity</p>
            <p className="font-bold text-lg">{weatherData.main.humidity}%</p>
          </div>
          
          <div className="flex flex-col items-center bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-all duration-200">
            <Gauge className="w-6 h-6 mb-2 text-green-300" />
            <p className="text-white/80 text-xs">Pressure</p>
            <p className="font-bold text-lg">{weatherData.main.pressure} hPa</p>
          </div>
          
          <div className="flex flex-col items-center bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-all duration-200">
            <Thermometer className="w-6 h-6 mb-2 text-red-300" />
            <p className="text-white/80 text-xs">Air Quality</p>
            <p className="font-bold text-lg">{getAirQualityText(weatherData.main.pressure)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
