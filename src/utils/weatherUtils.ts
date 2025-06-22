
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

export const generateMockForecast = (baseTemp: number): ForecastData => {
  const forecast = [];
  const weatherConditions = ["Clear", "Clouds", "Rain", "Thunderstorm"];
  const descriptions = {
    "Clear": "clear sky",
    "Clouds": "scattered clouds", 
    "Rain": "light rain",
    "Thunderstorm": "thunderstorm"
  };
  
  for (let i = 1; i <= 5; i++) {
    const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const tempVariation = Math.floor(Math.random() * 8) - 4; // -4 to +4 degrees variation
    
    forecast.push({
      dt: Date.now() / 1000 + (i * 24 * 60 * 60),
      main: {
        temp: baseTemp + tempVariation
      },
      weather: [{
        main: condition,
        description: descriptions[condition as keyof typeof descriptions],
        icon: condition === "Clear" ? "01d" : condition === "Clouds" ? "03d" : condition === "Rain" ? "10d" : "11d"
      }]
    });
  }
  
  return { list: forecast };
};
