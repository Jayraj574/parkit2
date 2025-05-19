import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CreditCard, PhoneCall } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const BookingForm: React.FC = () => {
  const { selectedLot, selectedSlot, setBookingDetails } = useParking();
  const navigate = useNavigate();
  
  const [startTime] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!selectedLot || !selectedSlot) {
    return null;
  }

  // Calculate end time based on duration
  const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);
  
  // Calculate total cost
  const totalCost = selectedSlot.price * duration;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const bookingDetails = {
        parkingLotId: selectedLot.id,
        slotId: selectedSlot.id,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration,
        totalCost,
        phoneNumber,
      };
      
      setBookingDetails(bookingDetails);
      setIsProcessing(false);
      navigate('/confirmation');
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Complete Your Booking</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600">Parking Details</span>
              <span className="text-sm text-blue-600">{selectedSlot.name}</span>
            </div>
            <div className="text-sm text-gray-700">
              <p className="font-medium">{selectedLot.name}</p>
              <p className="mt-1">{selectedLot.address}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (hours)
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 24].map((hours) => (
                    <option key={hours} value={hours}>
                      {hours} {hours === 1 ? 'hour' : 'hours'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <Input
              label="Phone Number (for OTP verification)"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              icon={<PhoneCall className="h-5 w-5 text-gray-400" />}
              error={errors.phoneNumber}
              className="pl-10"
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between text-sm mb-2">
              <span>Base rate</span>
              <span>${selectedSlot.price.toFixed(2)}/hr</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Duration</span>
              <span>{duration} {duration === 1 ? 'hour' : 'hours'}</span>
            </div>
            <div className="flex justify-between font-medium text-base pt-2 border-t">
              <span>Total</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isFullWidth
              isLoading={isProcessing}
              className="flex items-center justify-center"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              {isProcessing ? 'Processing...' : 'Pay & Book Now'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;