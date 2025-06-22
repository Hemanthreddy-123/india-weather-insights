
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import WeatherDetails from "@/components/WeatherDetails";
import PopularCities from "@/components/PopularCities";
import { toast } from "sonner";

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

// Mock weather data for Indian cities
const mockWeatherData: { [key: string]: WeatherData } = {
  "mumbai": {
    main: { temp: 32, feels_like: 36, humidity: 78, pressure: 1012 },
    weather: [{ main: "Clouds", description: "partly cloudy", icon: "02d" }],
    wind: { speed: 3.5 },
    name: "Mumbai",
    sys: { country: "IN" }
  },
  "delhi": {
    main: { temp: 28, feels_like: 31, humidity: 65, pressure: 1015 },
    weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
    wind: { speed: 2.8 },
    name: "Delhi",
    sys: { country: "IN" }
  },
  "bangalore": {
    main: { temp: 25, feels_like: 27, humidity: 72, pressure: 1018 },
    weather: [{ main: "Rain", description: "light rain", icon: "10d" }],
    wind: { speed: 4.2 },
    name: "Bangalore",
    sys: { country: "IN" }
  },
  "chennai": {
    main: { temp: 34, feels_like: 38, humidity: 82, pressure: 1010 },
    weather: [{ main: "Clouds", description: "overcast clouds", icon: "04d" }],
    wind: { speed: 5.1 },
    name: "Chennai",
    sys: { country: "IN" }
  },
  "kolkata": {
    main: { temp: 30, feels_like: 34, humidity: 75, pressure: 1013 },
    weather: [{ main: "Rain", description: "moderate rain", icon: "10d" }],
    wind: { speed: 3.8 },
    name: "Kolkata",
    sys: { country: "IN" }
  },
  "hyderabad": {
    main: { temp: 29, feels_like: 32, humidity: 68, pressure: 1016 },
    weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
    wind: { speed: 2.5 },
    name: "Hyderabad",
    sys: { country: "IN" }
  },
  "pune": {
    main: { temp: 26, feels_like: 28, humidity: 70, pressure: 1017 },
    weather: [{ main: "Clouds", description: "few clouds", icon: "02d" }],
    wind: { speed: 3.2 },
    name: "Pune",
    sys: { country: "IN" }
  },
  "ahmedabad": {
    main: { temp: 35, feels_like: 39, humidity: 60, pressure: 1011 },
    weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
    wind: { speed: 4.0 },
    name: "Ahmedabad",
    sys: { country: "IN" }
  },
  "jaipur": {
    main: { temp: 31, feels_like: 34, humidity: 55, pressure: 1014 },
    weather: [{ main: "Clouds", description: "scattered clouds", icon: "03d" }],
    wind: { speed: 3.7 },
    name: "Jaipur",
    sys: { country: "IN" }
  },
  "surat": {
    main: { temp: 33, feels_like: 37, humidity: 73, pressure: 1012 },
    weather: [{ main: "Clouds", description: "broken clouds", icon: "04d" }],
    wind: { speed: 2.9 },
    name: "Surat",
    sys: { country: "IN" }
  }
};

// Generate mock forecast data
const generateMockForecast = (baseTemp: number): ForecastData => {
  const forecast = [];
  const weatherConditions = ["Clear", "Clouds", "Rain"];
  const descriptions = {
    "Clear": "clear sky",
    "Clouds": "few clouds", 
    "Rain": "light rain"
  };
  
  for (let i = 1; i <= 5; i++) {
    const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    forecast.push({
      dt: Date.now() / 1000 + (i * 24 * 60 * 60),
      main: {
        temp: baseTemp + Math.floor(Math.random() * 6) - 3
      },
      weather: [{
        main: condition,
        description: descriptions[condition as keyof typeof descriptions],
        icon: "01d"
      }]
    });
  }
  
  return { list: forecast };
};

const Index = () => {
  const [city, setCity] = useState("Mumbai");
  const [searchCity, setSearchCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = (cityName: string) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const normalizedCity = cityName.toLowerCase();
      const data = mockWeatherData[normalizedCity];
      
      if (data) {
        setWeatherData(data);
        setForecastData(generateMockForecast(data.main.temp));
        toast.success(`Weather data loaded for ${cityName}`);
      } else {
        toast.error("City not found. Try one of the popular cities below.");
        setWeatherData(null);
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
            {loading ? (
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
