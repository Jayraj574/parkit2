export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  description: string;
  image: string;
  pricePerHour: number;
  totalSpots: number;
  availableSpots: number;
  hasEVCharging: boolean;
  rating: number;
  distance: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ParkingSlot {
  id: string;
  name: string;
  type: 'standard' | 'compact' | 'handicap' | 'ev';
  status: 'available' | 'occupied' | 'reserved';
  price: number;
}

export interface BookingDetails {
  parkingLotId: string;
  slotId: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalCost: number;
  phoneNumber: string;
}