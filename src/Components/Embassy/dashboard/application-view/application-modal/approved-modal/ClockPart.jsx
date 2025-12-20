import React from 'react'
import { Clock } from 'lucide-react'

const ClockPart = ({ selectedDate, selectedTime, setSelectedTime }) => {

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM"
  ];

  return (
    <div className="space-y-4 h-full flex flex-col">

      {/* unchanged */}
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Clock size={20} className="text-blue-600" />
        Select Time
      </h3>

      {/* ONLY FIX: inner scroll */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              disabled={!selectedDate}
              className={`
                      px-4 py-3 rounded-lg text-sm font-medium transition-all border-2
                      ${!selectedDate ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : ''}
                      ${selectedTime === time ? 'bg-blue-600 text-white border-blue-600 shadow-md' : ''}
                      ${selectedTime !== time && selectedDate ? 'bg-white text-gray-900 border-gray-200 hover:border-blue-600 hover:bg-blue-50' : ''}
                    `}>
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* unchanged */}
      {selectedTime && (
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-600 font-medium mb-1">Selected Time</p>
          <p className="text-lg font-semibold text-green-900">{selectedTime}</p>
        </div>
      )}
    </div>
  )
}

export default ClockPart