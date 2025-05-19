import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';
import Button from '../ui/Button';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, evOnly, setEvOnly } = useParking();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  const navigate = useNavigate();

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    navigate('/parking-lots');
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 md:p-6">
      <form onSubmit={handleSearch}>
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter location or address"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="ev-charging"
              type="checkbox"
              checked={evOnly}
              onChange={(e) => setEvOnly(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="ev-charging"
              className="ml-2 block text-sm text-gray-700"
            >
              EV Charging Available
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isFullWidth
            className="transition-transform active:scale-95"
          >
            <Search className="mr-2 h-5 w-5" />
            Find Parking
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;