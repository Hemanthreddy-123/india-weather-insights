
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import WeatherDetails from "@/components/WeatherDetails";
import PopularCities from "@/components/PopularCities";
import { toast } from "sonner";
import { Cloud, CloudRain, Sun, Moon, CloudSnow } from "lucide-react";

const API_KEY = "demo_key"; // Users will need to replace this with their actual API key

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

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
}

const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Weather data not found");
  }
  return response.json();
};

const fetchForecast = async (city: string): Promise<ForecastData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Forecast data not found");
  }
  return response.json();
};

const Index = () => {
  const [city, setCity] = useState("Mumbai");
  const [searchCity, setSearchCity] = useState("");

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
  });

  const { data: forecastData, isLoading: forecastLoading } = useQuery({
    queryKey: ['forecast', city],
    queryFn: () => fetchForecast(city),
    enabled: !!city,
  });

  const handleSearch = () => {
    if (searchCity.trim()) {
      setCity(searchCity.trim());
      setSearchCity("");
    }
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
  };

  useEffect(() => {
    if (weatherError) {
      toast.error("City not found. Please check the spelling and try again.");
    }
  }, [weatherError]);

  const getBackgroundGradient = () => {
    if (!weatherData) return "from-blue-400 to-blue-600";
    
    const condition = weatherData.weather[0].main.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return "from-gray-600 to-gray-800";
    }
    if (condition.includes("cloud")) {
      return isNight ? "from-indigo-800 to-purple-900" : "from-gray-400 to-gray-600";
    }
    if (condition.includes("clear")) {
      return isNight ? "from-indigo-900 to-purple-800" : "from-orange-400 to-yellow-500";
    }
    if (condition.includes("snow")) {
      return "from-blue-200 to-blue-400";
    }
    return "from-blue-400 to-blue-600";
  };

  if (API_KEY === "demo_key") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-orange-600">
              🌤️ Weather App Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600">
              To use this weather app, you need to get a free API key from OpenWeatherMap.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold">Steps to get your API key:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Visit <a href="https://openweathermap.org/api" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">OpenWeatherMap API</a></li>
                <li>Sign up for a free account</li>
                <li>Get your API key</li>
                <li>Replace "demo_key" in the code with your actual API key</li>
              </ol>
            </div>
            <p className="text-xs text-gray-500 text-center">
              The API key is free and allows 1000 calls per day
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            🌤️ Weather India
          </h1>
          <p className="text-white/80 text-lg">
            Live Weather Updates for Indian Cities
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <div className="flex gap-4 mb-4">
              <Input
                type="text"
                placeholder="Enter city name (e.g., Mumbai, Delhi, Bangalore)"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
              <Button 
                onClick={handleSearch}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Search
              </Button>
            </div>
            
            <PopularCities onCitySelect={handleCitySelect} />
          </CardContent>
        </Card>

        {/* Weather Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Weather Card */}
          <div className="lg:col-span-2">
            {weatherLoading ? (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-8 text-center">
                  <div className="animate-pulse text-white">
                    Loading weather data...
                  </div>
                </CardContent>
              </Card>
            ) : weatherData ? (
              <WeatherCard weatherData={weatherData} />
            ) : null}
          </div>

          {/* Weather Details */}
          <div>
            {weatherData && (
              <WeatherDetails weatherData={weatherData} />
            )}
          </div>
        </div>

        {/* 5-Day Forecast */}
        {forecastData && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              5-Day Forecast
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecastData.list
                .filter((_, index) => index % 8 === 0)
                .slice(0, 5)
                .map((item, index) => (
                  <ForecastCard key={index} forecastItem={item} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
