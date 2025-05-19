import { ParkingLot } from '../types';

export const parkingLots: ParkingLot[] = [
  {
    id: '1',
    name: 'Downtown Parking',
    address: '123 Main Street, Downtown',
    description: 'Conveniently located in the heart of downtown with 24/7 security.',
    image: 'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pricePerHour: 4.5,
    totalSpots: 120,
    availableSpots: 45,
    hasEVCharging: true,
    rating: 4.5,
    distance: '0.3 miles',
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  {
    id: '2',
    name: 'Central Park Garage',
    address: '456 Park Avenue, Midtown',
    description: 'Spacious parking with easy access to Central Park and shopping centers.',
    image: 'https://images.pexels.com/photos/3043592/pexels-photo-3043592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pricePerHour: 6.0,
    totalSpots: 200,
    availableSpots: 78,
    hasEVCharging: true,
    rating: 4.2,
    distance: '0.7 miles',
    coordinates: {
      lat: 40.7736,
      lng: -73.9566,
    },
  },
  {
    id: '3',
    name: 'Harbor View Parking',
    address: '789 Waterfront Drive, Harbor District',
    description: 'Scenic parking with views of the harbor and quick access to restaurants.',
    image: 'https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pricePerHour: 5.0,
    totalSpots: 150,
    availableSpots: 32,
    hasEVCharging: false,
    rating: 4.7,
    distance: '1.2 miles',
    coordinates: {
      lat: 40.7023,
      lng: -74.0123,
    },
  },
  {
    id: '4',
    name: 'Tech District Parking',
    address: '101 Innovation Way, Tech District',
    description: 'Modern parking facility with advanced security and EV charging stations.',
    image: 'https://images.pexels.com/photos/257684/pexels-photo-257684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pricePerHour: 7.5,
    totalSpots: 180,
    availableSpots: 92,
    hasEVCharging: true,
    rating: 4.8,
    distance: '1.5 miles',
    coordinates: {
      lat: 40.7589,
      lng: -73.9851,
    },
  },
];

export const getParkingLotById = (id: string): ParkingLot | undefined => {
  return parkingLots.find(lot => lot.id === id);
};

export const filterParkingLots = (query: string, evOnly: boolean): ParkingLot[] => {
  return parkingLots.filter(lot => {
    const matchesQuery = !query || 
      lot.name.toLowerCase().includes(query.toLowerCase()) || 
      lot.address.toLowerCase().includes(query.toLowerCase());
    
    const matchesEV = !evOnly || lot.hasEVCharging;
    
    return matchesQuery && matchesEV;
  });
};