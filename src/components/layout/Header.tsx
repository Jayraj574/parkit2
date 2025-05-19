import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { resetSelection } = useParking();

  const handleLogoClick = () => {
    resetSelection();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center" 
              onClick={handleLogoClick}
            >
              <Car className="h-8 w-8 text-blue-900" />
              <span className="ml-2 text-xl font-bold text-blue-900">ParkEase</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          {/* Desktop nav */}
          <nav className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-gray-500 hover:text-blue-900'
              }`}
              onClick={handleLogoClick}
            >
              Find Parking
            </Link>
            <Link 
              to="/bookings" 
              className={`px-3 py-2 text-sm font-medium ${
                location.pathname === '/bookings' 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-gray-500 hover:text-blue-900'
              }`}
            >
              My Bookings
            </Link>
            <Link 
              to="/help" 
              className={`px-3 py-2 text-sm font-medium ${
                location.pathname === '/help' 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-gray-500 hover:text-blue-900'
              }`}
            >
              Help
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white pb-3 border-b">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-4 py-2 text-base font-medium ${
                location.pathname === '/' 
                  ? 'text-blue-900 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-900'
              }`}
              onClick={() => {
                setIsMenuOpen(false);
                handleLogoClick();
              }}
            >
              Find Parking
            </Link>
            <Link
              to="/bookings"
              className={`block px-4 py-2 text-base font-medium ${
                location.pathname === '/bookings' 
                  ? 'text-blue-900 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Bookings
            </Link>
            <Link
              to="/help"
              className={`block px-4 py-2 text-base font-medium ${
                location.pathname === '/help' 
                  ? 'text-blue-900 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;