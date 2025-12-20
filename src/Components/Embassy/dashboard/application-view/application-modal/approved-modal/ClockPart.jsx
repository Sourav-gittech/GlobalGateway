import React from 'react'
import { Clock } from 'lucide-react'

const ClockPart = ({ selectedDate, selectedTime, setSelectedTime }) => {
  // Generate time slots at 1-hour intervals from 9 AM to 5 PM
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM"
  ];

  const handleTimeSelect = (time) => {
    if (!selectedDate) return;
    setSelectedTime(time);
  };

  return (
    <div className="space-y-4 h-full flex flex-col ">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Clock size={20} className="text-blue-600" />
        Select Time
      </h3>

      {/* Time slots grid with scroll */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time;
            const isDisabled = !selectedDate;

            return (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                disabled={isDisabled}
                className={`
                  px-4 mt-5 ml-5 py-3 rounded-xl text-lg font-medium transition-all border-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${isDisabled 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                    : isSelected 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                      : 'bg-white text-gray-900 border-gray-200 hover:border-blue-600 hover:bg-blue-50'
                  }
                `}
                aria-label={`Select ${time}`}
                aria-pressed={isSelected}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected time confirmation */}
      {selectedTime && (
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-600 font-medium mb-1">Selected Time</p>
          <p className="text-lg font-semibold text-green-900">{selectedTime}</p>
        </div>
      )}
    </div>
  );
};

export default ClockPart;