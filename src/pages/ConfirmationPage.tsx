import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useParking } from '../context/ParkingContext';
import Button from '../components/ui/Button';
import { getParkingLotById } from '../data/parkingLots';

const ConfirmationPage: React.FC = () => {
  const { bookingDetails, selectedLot } = useParking();
  const navigate = useNavigate();
  
  // Redirect if no booking details
  React.useEffect(() => {
    if (!bookingDetails) {
      navigate('/');
    }
  }, [bookingDetails, navigate]);
  
  if (!bookingDetails) {
    return null;
  }
  
  // Get the parking lot info if not already selected
  const parkingLot = selectedLot || getParkingLotById(bookingDetails.parkingLotId);
  
  if (!parkingLot) {
    return null;
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCancel = async () => {
    try {
      const response = await fetch(`/api/bookings/${bookingDetails.id}/cancel`, {
        method: 'POST',
      });
      
      if (response.ok) {
        alert('Booking cancelled successfully');
        navigate('/');
      } else {
        throw new Error('Failed to cancel booking');
      }
    } catch (error) {
      alert('Failed to cancel booking. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 inline-flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            Booking Confirmed!
          </h1>
          <p className="mt-2 text-gray-600">
            Your OTP for entry is: <span className="font-bold">{Math.random().toString().slice(2, 6)}</span>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Booking Details
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-md">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{parkingLot.name}</p>
                <p className="text-sm text-gray-600">{parkingLot.address}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-md">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">
                  {formatDate(bookingDetails.startTime)}
                </p>
                <p className="text-sm text-gray-600">Booking date</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-md">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">
                  {formatTime(bookingDetails.startTime)} - {formatTime(bookingDetails.endTime)}
                </p>
                <p className="text-sm text-gray-600">
                  {bookingDetails.duration} {bookingDetails.duration === 1 ? 'hour' : 'hours'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Spot</span>
              <span className="font-medium">{bookingDetails.slotId.split('-')[1]}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium">
                {bookingDetails.duration} {bookingDetails.duration === 1 ? 'hour' : 'hours'}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-900 font-medium">Total</span>
              <span className="text-gray-900 font-bold">
                ${bookingDetails.totalCost.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between gap-4">
          <Button 
            variant="outline"
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel Booking
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/')}
            className="flex-1"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;