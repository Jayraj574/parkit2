import { ParkingLot } from '../models/ParkingLot';
import { ParkingSlot } from '../models/ParkingSlot';
import { Booking } from '../models/Booking';

export async function searchParkingLots(query: string, evOnly: boolean) {
  const filter: any = {};
  
  if (query) {
    filter.$or = [
      { name: { $regex: query, $options: 'i' } },
      { address: { $regex: query, $options: 'i' } }
    ];
  }
  
  if (evOnly) {
    filter.hasEVCharging = true;
  }
  
  return await ParkingLot.find(filter);
}

export async function getParkingLotById(id: string) {
  return await ParkingLot.findById(id);
}

export async function getParkingSlots(parkingLotId: string) {
  return await ParkingSlot.find({ parkingLotId });
}

export async function createBooking(bookingData: any) {
  const booking = new Booking(bookingData);
  await booking.save();
  
  // Update slot status
  await ParkingSlot.findByIdAndUpdate(bookingData.slotId, {
    status: 'reserved'
  });
  
  // Update available spots count
  const parkingLot = await ParkingLot.findById(bookingData.parkingLotId);
  if (parkingLot) {
    parkingLot.availableSpots -= 1;
    await parkingLot.save();
  }
  
  return booking;
}

export async function cancelBooking(bookingId: string) {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }

  // Update booking status
  booking.status = 'cancelled';
  await booking.save();

  // Free up the parking slot
  await ParkingSlot.findByIdAndUpdate(booking.slotId, {
    status: 'available'
  });

  // Update available spots count
  const parkingLot = await ParkingLot.findById(booking.parkingLotId);
  if (parkingLot) {
    parkingLot.availableSpots += 1;
    await parkingLot.save();
  }

  return booking;
}

export async function confirmBooking(bookingId: string) {
  return await Booking.findByIdAndUpdate(bookingId, {
    status: 'confirmed'
  }, { new: true });
}