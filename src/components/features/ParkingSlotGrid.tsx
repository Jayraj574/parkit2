import React from 'react';
import { Zap, Armchair as Wheelchair } from 'lucide-react';
import { ParkingSlot } from '../../types';
import { useParking } from '../../context/ParkingContext';

interface ParkingSlotGridProps {
  onSlotSelect: (slot: ParkingSlot) => void;
}

const ParkingSlotGrid: React.FC<ParkingSlotGridProps> = ({ onSlotSelect }) => {
  const { parkingSlots, selectedSlot } = useParking();

  // Group slots into rows (8 slots per row)
  const rows = parkingSlots.reduce<ParkingSlot[][]>((acc, slot, index) => {
    const rowIndex = Math.floor(index / 8);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(slot);
    return acc;
  }, []);

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-white';
      case 'occupied':
        return 'bg-gray-300';
      case 'reserved':
        return 'bg-amber-100';
      default:
        return 'bg-white';
    }
  };

  // Border color for selected slot
  const getSlotBorder = (slot: ParkingSlot) => {
    if (selectedSlot && selectedSlot.id === slot.id) {
      return 'border-blue-500 ring-2 ring-blue-500';
    }
    return 'border-gray-300';
  };

  // Icon for slot type
  const getSlotIcon = (type: string) => {
    switch (type) {
      case 'ev':
        return <Zap className="h-4 w-4 text-teal-600" />;
      case 'handicap':
        return <Wheelchair className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-200 p-6 rounded-lg mb-6">
        <div className="w-full h-10 bg-gray-400 flex justify-center items-center mb-8 rounded-md">
          <span className="text-white font-medium">ENTRANCE / EXIT</span>
        </div>
        
        <div className="space-y-6">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-4">
              {row.map((slot) => (
                <div key={slot.id} className="relative">
                  <button
                    className={`
                      w-14 h-14 flex flex-col items-center justify-center border rounded-md
                      ${getStatusColor(slot.status)}
                      ${getSlotBorder(slot)}
                      ${slot.status === 'available' ? 'hover:bg-blue-50 cursor-pointer' : 'cursor-not-allowed'}
                      transition-all duration-200
                    `}
                    onClick={() => slot.status === 'available' && onSlotSelect(slot)}
                    disabled={slot.status !== 'available'}
                  >
                    <span className="text-sm font-medium">{slot.name}</span>
                    {getSlotIcon(slot.type)}
                  </button>
                  {slot.status !== 'available' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-gray-500 transform rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded-sm mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 border border-gray-300 rounded-sm mr-2"></div>
          <span>Occupied</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-amber-100 border border-gray-300 rounded-sm mr-2"></div>
          <span>Reserved</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded-sm mr-2 flex items-center justify-center">
            <Zap className="h-3 w-3 text-teal-600" />
          </div>
          <span>EV Charging</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded-sm mr-2 flex items-center justify-center">
            <Wheelchair className="h-3 w-3 text-blue-600" />
          </div>
          <span>Handicap</span>
        </div>
      </div>
    </div>
  );
};

export default ParkingSlotGrid;