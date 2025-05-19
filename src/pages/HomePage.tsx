import React from 'react';
import { Car } from 'lucide-react';
import SearchBar from '../components/features/SearchBar';

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
      {/* Hero section */}
      <div className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            Find and Book Parking Instantly
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Secure the perfect parking spot in seconds. No more circling the block.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto mt-10">
          <SearchBar />
        </div>
      </div>
      
      {/* Features section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Parking Made Simple
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our platform makes finding and booking parking effortless.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-900 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* How it works section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Book your parking spot in three easy steps.
            </p>
          </div>
          
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  {index !== steps.length - 1 && (
                    <div className="hidden sm:block absolute top-12 right-0 h-0.5 w-1/2 bg-gray-300"></div>
                  )}
                  {index !== 0 && (
                    <div className="hidden sm:block absolute top-12 left-0 h-0.5 w-1/2 bg-gray-300"></div>
                  )}
                  <div className="relative flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 text-white text-xl font-bold">
                      {index + 1}
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-base text-center text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to find parking?</span>
            <span className="block text-blue-100">Start your search now.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#search"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Find Parking
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature icons would normally be imported from lucide-react
// For simplicity, I'm just using Car for all of them here
const features = [
  {
    title: 'Real-time Availability',
    description: 'See exactly which spots are available in real-time. No more guessing or disappointment.',
    icon: Car,
  },
  {
    title: 'EV Charging Filters',
    description: 'Easily find parking lots with EV charging stations for your electric vehicle.',
    icon: Car,
  },
  {
    title: 'Secure Booking',
    description: 'Book and pay securely through our platform with instant confirmation.',
    icon: Car,
  },
];

const steps = [
  {
    title: 'Search Location',
    description: 'Enter your destination to find nearby parking options.',
  },
  {
    title: 'Select a Spot',
    description: 'Choose from available spots and select the one that suits you best.',
  },
  {
    title: 'Book & Pay',
    description: 'Complete your booking, receive an OTP confirmation, and you\'re all set!',
  },
];

export default HomePage;