
import { Button } from "@/components/ui/button";

interface PopularCitiesProps {
  onCitySelect: (city: string) => void;
}

const PopularCities = ({ onCitySelect }: PopularCitiesProps) => {
  const popularIndianCities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat",
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal",
    "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad", "Agra"
  ];

  return (
    <div>
      <h3 className="text-white mb-3 font-semibold">Popular Indian Cities:</h3>
      <div className="flex flex-wrap gap-2">
        {popularIndianCities.slice(0, 10).map((city) => (
          <Button
            key={city}
            variant="outline"
            size="sm"
            onClick={() => onCitySelect(city)}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white text-xs"
          >
            {city}
          </Button>
        ))}
      </div>
      <p className="text-white/60 text-xs mt-2">
        Click on any city for instant weather updates
      </p>
    </div>
  );
};

export default PopularCities;
