import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ParkingProvider } from './context/ParkingContext';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import ParkingLotsPage from './pages/ParkingLotsPage';
import ParkingLotDetailPage from './pages/ParkingLotDetailPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  return (
    <ParkingProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/parking-lots" element={<ParkingLotsPage />} />
              <Route path="/parking-lot/:id" element={<ParkingLotDetailPage />} />
              <Route path="/bookings" element={<BookingPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm">&copy; 2025 ParkEase. All rights reserved.</p>
                </div>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-300 hover:text-white">
                    Terms
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Privacy
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Help
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ParkingProvider>
  );
}

export default App;