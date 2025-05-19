import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useParking } from '../context/ParkingContext';
import BookingForm from '../components/features/BookingForm';
import Button from '../components/ui/Button';

const BookingPage: React.FC = () => {
  const { selectedLot, selectedSlot } = useParking();
  const navigate = useNavigate();
  
  // Redirect if no lot or slot is selected
  useEffect(() => {
    if (!selectedLot || !selectedSlot) {
      navigate('/parking-lots');
    }
  }, [selectedLot, selectedSlot, navigate]);
  
  const handleBack = () => {
    navigate(`/parking-lot/${selectedLot?.id}`);
  };
  
  if (!selectedLot || !selectedSlot) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to slot selection
        </Button>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Book Your Parking
        </h1>
        
        <BookingForm />
      </div>
    </div>
  );
};

export default BookingPage;