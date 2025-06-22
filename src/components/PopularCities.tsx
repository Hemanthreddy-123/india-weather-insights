
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PopularCitiesProps {
  onCitySelect: (city: string) => void;
}

const PopularCities = ({ onCitySelect }: PopularCitiesProps) => {
  const [activeTab, setActiveTab] = useState("major");

  const majorCities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat"
  ];

  const andhraDistricts = [
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool",
    "Anantapur", "Chittoor", "Tirupati", "Kakinada", "Rajamahendravaram"
  ];

  const otherCities = [
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal",
    "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra"
  ];

  const tabs = [
    { id: "major", label: "Major Cities", cities: majorCities },
    { id: "andhra", label: "Andhra Pradesh", cities: andhraDistricts },
    { id: "other", label: "Other Cities", cities: otherCities }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs transition-all duration-200 ${
              activeTab === tab.id 
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0" 
                : "bg-white/20 border-white/30 text-white hover:bg-white/30"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      
      <h3 className="text-white mb-3 font-semibold">
        {activeTabData?.label} - Quick Access:
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {activeTabData?.cities.map((city) => (
          <Button
            key={city}
            variant="outline"
            size="sm"
            onClick={() => onCitySelect(city)}
            className="bg-white/15 border-white/25 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent text-xs transition-all duration-200 shadow-md"
          >
            {city}
          </Button>
        ))}
      </div>
      
      <p className="text-white/60 text-xs mt-2">
        Click on any location for instant weather updates • {tabs.reduce((total, tab) => total + tab.cities.length, 0)}+ locations available
      </p>
    </div>
  );
};

export default PopularCities;
