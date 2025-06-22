
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import WeatherDetails from "@/components/WeatherDetails";
import PopularCities from "@/components/PopularCities";
import LiveClock from "@/components/LiveClock";
import WeatherFeatures from "@/components/WeatherFeatures";
import { toast } from "sonner";
import { weatherData } from "@/data/weatherData";
import { generateMockForecast } from "@/utils/weatherUtils";

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

const Index = () => {
  const [city, setCity] = useState("Mumbai");
  const [searchCity, setSearchCity] = useState("");
  const [currentWeatherData, setCurrentWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = (cityName: string) => {
    setLoading(true);
    
    setTimeout(() => {
      const normalizedCity = cityName.toLowerCase();
      const data = weatherData[normalizedCity];
      
      if (data) {
        setCurrentWeatherData(data);
        setForecastData(generateMockForecast(data.main.temp));
        toast.success(`Weather data loaded for ${cityName}`);
      } else {
        toast.error("City not found. Try one of the available cities.");
        setCurrentWeatherData(null);
        setForecastData(null);
      }
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleSearch = () => {
    if (searchCity.trim()) {
      setCity(searchCity.trim());
      setSearchCity("");
    }
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
  };

  const getBackgroundGradient = () => {
    if (!currentWeatherData) return "from-slate-900 via-blue-900 to-indigo-900";
    
    const condition = currentWeatherData.weather[0].main.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return "from-slate-800 via-gray-800 to-blue-900";
    }
    if (condition.includes("cloud")) {
      return isNight ? "from-indigo-900 via-purple-900 to-slate-900" : "from-slate-600 via-blue-700 to-indigo-800";
    }
    if (condition.includes("clear")) {
      return isNight ? "from-indigo-900 via-purple-800 to-slate-900" : "from-blue-600 via-indigo-700 to-purple-800";
    }
    return "from-slate-900 via-blue-900 to-indigo-900";
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Live Clock */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            🌤️ Weather India Pro
          </h1>
          <p className="text-white/80 text-lg mb-4">
            Complete Weather Solution for Indian Cities
          </p>
          <LiveClock />
        </div>

        {/* Search Section */}
        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex gap-4 mb-4">
              <Input
                type="text"
                placeholder="Search any Indian city or district..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
              />
              <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              >
                Search
              </Button>
            </div>
            
            <PopularCities onCitySelect={handleCitySelect} />
          </CardContent>
        </Card>

        {/* Weather Features */}
        <WeatherFeatures />

        {/* Weather Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Weather Card */}
          <div className="lg:col-span-2">
            {loading ? (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="animate-pulse text-white">
                    Loading weather data...
                  </div>
                </CardContent>
              </Card>
            ) : currentWeatherData ? (
              <WeatherCard weatherData={currentWeatherData} />
            ) : null}
          </div>

          {/* Weather Details */}
          <div>
            {currentWeatherData && (
              <WeatherDetails weatherData={currentWeatherData} />
            )}
          </div>
        </div>

        {/* 5-Day Forecast */}
        {forecastData && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              5-Day Weather Forecast
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecastData.list.map((item, index) => (
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
