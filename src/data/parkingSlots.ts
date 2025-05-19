import { ParkingSlot } from '../types';

const generateSlots = (lotId: string): Record<string, ParkingSlot[]> => {
  const slots: Record<string, ParkingSlot[]> = {};
  
  // Generate random slots for the parking lot
  const totalSlots = 40;
  const slotsArray: ParkingSlot[] = [];
  
  for (let i = 1; i <= totalSlots; i++) {
    // Determine slot type - make some EV chargers
    let type: 'standard' | 'compact' | 'handicap' | 'ev' = 'standard';
    
    if (i % 20 === 0) type = 'handicap';
    else if (i % 10 === 0) type = 'compact';
    else if (i % 5 === 0) type = 'ev';
    
    // Determine status - make most available but some occupied or reserved
    let status: 'available' | 'occupied' | 'reserved' = 'available';
    const rand = Math.random();
    if (rand < 0.2) status = 'occupied';
    else if (rand < 0.3) status = 'reserved';
    
    const slotName = String.fromCharCode(65 + Math.floor((i-1) / 8)) + ((i-1) % 8 + 1);
    
    slotsArray.push({
      id: `${lotId}-${i}`,
      name: slotName,
      type,
      status,
      price: type === 'ev' ? 7.5 : type === 'handicap' ? 5.0 : 5.5
    });
  }
  
  slots[lotId] = slotsArray;
  return slots;
};

const parkingSlotsMap: Record<string, ParkingSlot[]> = {
  '1': generateSlots('1')['1'],
  '2': generateSlots('2')['2'],
  '3': generateSlots('3')['3'],
  '4': generateSlots('4')['4'],
};

export const getParkingSlots = (parkingLotId: string): ParkingSlot[] => {
  return parkingSlotsMap[parkingLotId] || [];
};

export const getParkingSlotById = (parkingLotId: string, slotId: string): ParkingSlot | undefined => {
  const slots = getParkingSlots(parkingLotId);
  return slots.find(slot => slot.id === slotId);
};