import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Zap, Star } from 'lucide-react';
import { ParkingLot } from '../../types';
import { useParking } from '../../context/ParkingContext';
import Button from '../ui/Button';

interface ParkingLotCardProps {
  parkingLot: ParkingLot;
}

const ParkingLotCard: React.FC<ParkingLotCardProps> = ({ parkingLot }) => {
  const { selectLot } = useParking();
  const navigate = useNavigate();

  const handleSelectLot = () => {
    selectLot(parkingLot);
    navigate(`/parking-lot/${parkingLot.id}`);
  };

  // Calculate availability percentage for the progress bar
  const availabilityPercentage = Math.round(
    (parkingLot.availableSpots / parkingLot.totalSpots) * 100
  );

  // Determine color based on availability
  const getAvailabilityColor = () => {
    if (availabilityPercentage < 20) return 'bg-red-500';
    if (availabilityPercentage < 50) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-4px] hover:shadow-lg">
      <div className="relative h-40">
        <img
          src={parkingLot.image}
          alt={parkingLot.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow-sm flex items-center">
          <Star className="h-4 w-4 text-amber-500 mr-1" />
          <span className="text-sm font-medium">{parkingLot.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">
            {parkingLot.name}
          </h3>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700">
              ${parkingLot.pricePerHour.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 ml-1">/hr</span>
          </div>
        </div>
        
        <div className="mt-2 flex items-start">
          <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="ml-2 text-sm text-gray-600 line-clamp-2">
            {parkingLot.address}
          </p>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">
              {parkingLot.availableSpots} of {parkingLot.totalSpots} spots available
            </span>
            <span className="text-xs text-gray-500">{parkingLot.distance}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getAvailabilityColor()}`}
              style={{ width: `${availabilityPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          {parkingLot.hasEVCharging && (
            <div className="flex items-center text-sm text-teal-600">
              <Zap className="h-4 w-4 mr-1" />
              EV Charging
            </div>
          )}
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleSelectLot}
            className="transition-transform active:scale-95"
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParkingLotCard;