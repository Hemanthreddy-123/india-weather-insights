
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

  const handleCityClick = (city: string) => {
    console.log("City clicked:", city);
    onCitySelect(city);
  };

  const handleTabClick = (tabId: string) => {
    console.log("Tab clicked:", tabId);
    setActiveTab(tabId);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleTabClick(tab.id)}
            className={`text-xs transition-all duration-200 font-medium ${
              activeTab === tab.id 
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg" 
                : "bg-blue-900/30 border-blue-400/30 text-blue-200 hover:bg-blue-800/50 hover:text-white hover:border-blue-300/50"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      
      <h3 className="text-white mb-3 font-semibold text-lg">
        {activeTabData?.label} - Quick Access:
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {activeTabData?.cities.map((city) => (
          <Button
            key={city}
            variant="outline"
            size="sm"
            onClick={() => handleCityClick(city)}
            className="bg-blue-900/20 border-blue-400/25 text-blue-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent hover:text-white text-xs transition-all duration-200 shadow-md font-medium"
          >
            {city}
          </Button>
        ))}
      </div>
      
      <p className="text-blue-300 text-xs mt-3 opacity-80">
        Click on any location for instant weather updates • {tabs.reduce((total, tab) => total + tab.cities.length, 0)}+ locations available
      </p>
      
      {/* Contact Information */}
      <div className="mt-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg p-3 border border-blue-400/20">
        <h4 className="text-white font-semibold mb-2 text-sm">Need Help?</h4>
        <div className="text-xs text-blue-200 space-y-1">
          <p>📧 Weather queries: info@weatherindia.pro</p>
          <p>🔧 Technical support: tech@weatherindia.pro</p>
        </div>
      </div>
    </div>
  );
};

export default PopularCities;
