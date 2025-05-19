import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

interface OTPVerificationProps {
  phoneNumber: string;
  onVerificationComplete: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ 
  phoneNumber, 
  onVerificationComplete 
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = Array(4).fill(0).map(() => React.useRef<HTMLInputElement>(null));
  const navigate = useNavigate();

  // Auto-generate mock OTP for demo
  const mockOtp = '1234';
  
  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isVerified]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }
    
    // Update the OTP array with the new value
    const newOtp = [...otp];
    newOtp[index] = value.substring(0, 1);
    setOtp(newOtp);
    
    // Auto-focus next input if value exists
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleResend = () => {
    // Reset timeLeft
    setTimeLeft(30);
    
    // For demo - just show a toast/notification (mock implementation)
    alert(`OTP resent! (Mock: ${mockOtp})`);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      // For demo purposes, accept any 4-digit code
      const enteredOtp = otp.join('');
      const isValid = enteredOtp.length === 4;
      
      if (isValid) {
        setIsVerified(true);
        setTimeout(() => {
          onVerificationComplete();
        }, 1000);
      } else {
        // Reset the OTP inputs
        setOtp(['', '', '', '']);
        inputRefs[0].current?.focus();
        alert('Invalid OTP. Please try again.');
      }
      
      setIsVerifying(false);
    }, 1000);
  };

  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      {isVerified ? (
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Verified!</h2>
          <p className="text-gray-600 mb-6">Your booking has been confirmed.</p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/')}
            className="mt-4"
          >
            Return Home
          </Button>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Verify Your Booking</h2>
            <p className="text-gray-600 mt-2">
              We've sent a 4-digit code to {formatPhoneNumber(phoneNumber)}
            </p>
          </div>
          
          <div className="flex justify-center space-x-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={1}
                autoFocus={index === 0}
              />
            ))}
          </div>
          
          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              isFullWidth
              onClick={handleVerify}
              isLoading={isVerifying}
              disabled={otp.some(digit => !digit)}
            >
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {timeLeft > 0 ? (
                  <>Didn't receive the code? Resend in {timeLeft}s</>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Resend OTP
                  </button>
                )}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OTPVerification;