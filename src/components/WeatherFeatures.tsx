
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sun, 
  Droplets, 
  Wind, 
  Eye, 
  Thermometer, 
  Gauge, 
  Calendar, 
  MapPin,
  Umbrella,
  Shield
} from "lucide-react";

const WeatherFeatures = () => {
  const features = [
    {
      icon: <Sun className="w-6 h-6" />,
      title: "UV Index",
      description: "Real-time UV radiation levels",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      title: "Humidity Tracker",
      description: "Moisture levels in the air",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Wind className="w-6 h-6" />,
      title: "Wind Speed",
      description: "Current wind conditions",
      color: "from-gray-500 to-slate-600"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Visibility",
      description: "Atmospheric visibility range",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: "Feels Like",
      description: "Apparent temperature perception",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Air Pressure",
      description: "Atmospheric pressure monitoring",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "5-Day Forecast",
      description: "Extended weather predictions",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location Based",
      description: "All Indian cities & districts",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Umbrella className="w-6 h-6" />,
      title: "Rain Alerts",
      description: "Precipitation warnings",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Weather Advice",
      description: "Health & safety recommendations",
      color: "from-teal-500 to-green-600"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Professional Weather Features
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer shadow-lg">
            <CardContent className="p-4 text-center">
              <div className={`bg-gradient-to-br ${feature.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                {feature.title}
              </h3>
              <p className="text-white/70 text-xs">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeatherFeatures;
