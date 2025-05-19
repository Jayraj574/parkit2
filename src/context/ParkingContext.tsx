import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ParkingLot, ParkingSlot, BookingDetails } from '../types';
import { filterParkingLots, getParkingLotById } from '../data/parkingLots';
import { getParkingSlots } from '../data/parkingSlots';

interface ParkingContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  evOnly: boolean;
  setEvOnly: (evOnly: boolean) => void;
  filteredParkingLots: ParkingLot[];
  selectedLot: ParkingLot | null;
  selectLot: (lot: ParkingLot) => void;
  parkingSlots: ParkingSlot[];
  selectedSlot: ParkingSlot | null;
  selectSlot: (slot: ParkingSlot) => void;
  bookingDetails: BookingDetails | null;
  setBookingDetails: (details: BookingDetails) => void;
  resetSelection: () => void;
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export const ParkingProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [evOnly, setEvOnly] = useState(false);
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  // Filter parking lots based on search query and EV filter
  const filteredParkingLots = filterParkingLots(searchQuery, evOnly);

  // Get parking slots for the selected lot
  const parkingSlots = selectedLot ? getParkingSlots(selectedLot.id) : [];

  const selectLot = (lot: ParkingLot) => {
    setSelectedLot(lot);
    setSelectedSlot(null);
  };

  const selectSlot = (slot: ParkingSlot) => {
    if (slot.status === 'available') {
      setSelectedSlot(slot);
    }
  };

  const resetSelection = () => {
    setSelectedLot(null);
    setSelectedSlot(null);
    setBookingDetails(null);
  };

  return (
    <ParkingContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        evOnly,
        setEvOnly,
        filteredParkingLots,
        selectedLot,
        selectLot,
        parkingSlots,
        selectedSlot,
        selectSlot,
        bookingDetails,
        setBookingDetails,
        resetSelection,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = (): ParkingContextType => {
  const context = useContext(ParkingContext);
  if (context === undefined) {
    throw new Error('useParking must be used within a ParkingProvider');
  }
  return context;
};