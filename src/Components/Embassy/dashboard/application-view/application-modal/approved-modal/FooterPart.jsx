import React from 'react'
import { CheckCircle } from 'lucide-react';

const FooterPart = ({ handleSetAppointment, selectedDate, selectedTime,setSelectedDate,setSelectedTime }) => {
    return (
        <div className="border-t border-gray-200 px-6 py-4 flex gap-3">
            <button
                onClick={() => {
                    setShowAppointmentModal(false);
                    setSelectedDate(null);
                    setSelectedTime("");
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
                Cancel
            </button>
            <button
                onClick={()=>handleSetAppointment()}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                <CheckCircle size={20} />
                Confirm Appointment
            </button>
        </div>
    )
}

export default FooterPart