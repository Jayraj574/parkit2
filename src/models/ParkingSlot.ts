import mongoose from 'mongoose';

const parkingSlotSchema = new mongoose.Schema({
  parkingLotId: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingLot', required: true },
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['standard', 'compact', 'handicap', 'ev'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['available', 'occupied', 'reserved'],
    default: 'available'
  },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const ParkingSlot = mongoose.model('Parking Slot', parkingSlotSchema);