
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Thermometer, Cloud, Sun } from "lucide-react";

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

interface WeatherDetailsProps {
  weatherData: WeatherData;
}

const WeatherDetails = ({ weatherData }: WeatherDetailsProps) => {
  const getAirQualityStatus = (humidity: number) => {
    if (humidity > 70) return { status: "High Humidity", color: "text-orange-400", advice: "May feel sticky" };
    if (humidity > 40) return { status: "Comfortable", color: "text-green-400", advice: "Perfect conditions" };
    return { status: "Low Humidity", color: "text-yellow-400", advice: "Stay hydrated" };
  };

  const getWindStatus = (speed: number) => {
    if (speed > 10) return { status: "Windy", color: "text-blue-400" };
    if (speed > 5) return { status: "Breezy", color: "text-green-400" };
    return { status: "Calm", color: "text-gray-400" };
  };

  const getPressureStatus = (pressure: number) => {
    if (pressure > 1020) return { status: "High Pressure", color: "text-green-400" };
    if (pressure > 1000) return { status: "Normal", color: "text-blue-400" };
    return { status: "Low Pressure", color: "text-orange-400" };
  };

  const humidityStatus = getAirQualityStatus(weatherData.main.humidity);
  const windStatus = getWindStatus(weatherData.wind.speed);
  const pressureStatus = getPressureStatus(weatherData.main.pressure);

  return (
    <div className="space-y-4">
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-lg">Weather Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Thermometer className="w-5 h-5 mr-2 text-red-400" />
              <span>Humidity</span>
            </div>
            <div className="text-right">
              <p className="font-bold">{weatherData.main.humidity}%</p>
              <p className={`text-xs ${humidityStatus.color}`}>
                {humidityStatus.status}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wind className="w-5 h-5 mr-2 text-blue-400" />
              <span>Wind Speed</span>
            </div>
            <div className="text-right">
              <p className="font-bold">{weatherData.wind.speed} m/s</p>
              <p className={`text-xs ${windStatus.color}`}>
                {windStatus.status}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Cloud className="w-5 h-5 mr-2 text-gray-400" />
              <span>Pressure</span>
            </div>
            <div className="text-right">
              <p className="font-bold">{weatherData.main.pressure} hPa</p>
              <p className={`text-xs ${pressureStatus.color}`}>
                {pressureStatus.status}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-lg">Health Advisory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="flex items-center">
              <span className="mr-2">💧</span>
              {humidityStatus.advice}
            </p>
            {weatherData.main.temp > 30 && (
              <p className="flex items-center">
                <span className="mr-2">☀️</span>
                Use sunscreen SPF 30+
              </p>
            )}
            {weatherData.weather[0].main.toLowerCase().includes("rain") && (
              <p className="flex items-center">
                <span className="mr-2">🌧️</span>
                Monsoon season - drive carefully
              </p>
            )}
            <p className="flex items-center">
              <span className="mr-2">🌡️</span>
              Drink plenty of water
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDetails;
