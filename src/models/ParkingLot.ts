import mongoose from 'mongoose';

const parkingLotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  totalSpots: { type: Number, required: true },
  availableSpots: { type: Number, required: true },
  hasEVCharging: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  distance: { type: String },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const ParkingLot = mongoose.model('Parking Lot', parkingLotSchema);