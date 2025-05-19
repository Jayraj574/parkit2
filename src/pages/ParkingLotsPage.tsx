import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { useParking } from '../context/ParkingContext';
import ParkingLotCard from '../components/features/ParkingLotCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ParkingLotsPage: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    evOnly, 
    setEvOnly, 
    filteredParkingLots 
  } = useParking();
  const navigate = useNavigate();
  
  // If there's no search query, redirect to home
  useEffect(() => {
    if (!searchQuery) {
      navigate('/');
    }
  }, [searchQuery, navigate]);

  // Filter toggle handler
  const handleEvFilterToggle = () => {
    setEvOnly(!evOnly);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <Input
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for a location"
                icon={<Search className="h-5 w-5 text-gray-400" />}
                className="w-full"
              />
            </div>
            <div className="flex items-center">
              <button
                onClick={handleEvFilterToggle}
                className={`
                  flex items-center px-4 py-2 rounded-full border text-sm font-medium
                  ${evOnly 
                    ? 'bg-teal-50 border-teal-500 text-teal-700' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}
                `}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                EV Charging
              </button>
            </div>
          </div>
        </div>
        
        {/* Results header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Parking near {searchQuery}
            </h1>
            <p className="text-sm text-gray-500">
              {filteredParkingLots.length} locations found
            </p>
          </div>
          {searchQuery && (
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Showing results for "{searchQuery}"</span>
            </div>
          )}
        </div>
        
        {/* Results grid */}
        {filteredParkingLots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParkingLots.map((parkingLot) => (
              <ParkingLotCard key={parkingLot.id} parkingLot={parkingLot} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No parking locations found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or changing the location.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              Return to Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingLotsPage;