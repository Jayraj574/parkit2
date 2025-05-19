import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Zap, Star, ArrowLeft } from 'lucide-react';
import { useParking } from '../context/ParkingContext';
import ParkingSlotGrid from '../components/features/ParkingSlotGrid';
import Button from '../components/ui/Button';
import { ParkingSlot } from '../types';
import { getParkingLotById } from '../data/parkingLots';

const ParkingLotDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedLot, selectLot, selectedSlot, selectSlot } = useParking();
  const navigate = useNavigate();
  
  // Fetch parking lot data if not already selected
  useEffect(() => {
    if (!selectedLot && id) {
      const parkingLot = getParkingLotById(id);
      if (parkingLot) {
        selectLot(parkingLot);
      } else {
        navigate('/parking-lots');
      }
    }
  }, [id, selectedLot, selectLot, navigate]);
  
  // Handle going back
  const handleBack = () => {
    navigate('/parking-lots');
  };
  
  // Handle slot selection
  const handleSlotSelect = (slot: ParkingSlot) => {
    selectSlot(slot);
  };
  
  // Handle proceed to booking
  const handleProceedToBooking = () => {
    if (selectedSlot) {
      navigate('/booking');
    }
  };
  
  if (!selectedLot) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to results
        </Button>
        
        {/* Parking lot header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="h-64 w-full relative">
            <img
              src={selectedLot.image}
              alt={selectedLot.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-md shadow-sm flex items-center">
              <Star className="h-4 w-4 text-amber-500 mr-1" />
              <span className="font-medium">{selectedLot.rating}</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">
                {selectedLot.name}
              </h1>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-900">
                  ${selectedLot.pricePerHour.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 ml-1">/hour</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-start">
              <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
              <p className="ml-2 text-gray-600">{selectedLot.address}</p>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  Open 24/7
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {selectedLot.availableSpots} spots available
                </span>
              </div>
              {selectedLot.hasEVCharging && (
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-teal-600 mr-2" />
                  <span className="text-sm text-gray-600">
                    EV Charging Available
                  </span>
                </div>
              )}
            </div>
            
            <p className="mt-4 text-gray-600">{selectedLot.description}</p>
          </div>
        </div>
        
        {/* Slot selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Select a Parking Spot
          </h2>
          <ParkingSlotGrid onSlotSelect={handleSlotSelect} />
        </div>
        
        {/* Booking action */}
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="lg"
            disabled={!selectedSlot}
            onClick={handleProceedToBooking}
            className="transition-transform active:scale-95"
          >
            {selectedSlot 
              ? `Book Spot ${selectedSlot.name}`
              : 'Select a spot to continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParkingLotDetailPage;