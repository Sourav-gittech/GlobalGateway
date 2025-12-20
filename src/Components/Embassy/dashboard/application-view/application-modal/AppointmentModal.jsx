import React, { useState } from 'react'
import { Calendar, CheckCircle, ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';

const AppointmentModal = ({ setShowAppointmentModal, setSelectedDate,setAppointmentSet, setSelectedTime, selectedDate, selectedTime, currentMonth,setCurrentMonth }) => {

      const [appointmentDetails, setAppointmentDetails] = useState(null);
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const generateCalendarDays = () => {
        const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
        const days = [];

        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

      // Calendar functions
      const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
    
        return { daysInMonth, startingDayOfWeek };
      };
    
      const isDateDisabled = (day) => {
        if (!day) return true;
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
      };
    
      const handleDateSelect = (day) => {
        if (!day || isDateDisabled(day)) return;
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(date);
      };
    
      const handlePreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
      };
    
      const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
      };
    
      const handleSetAppointment = () => {
        if (selectedDate && selectedTime) {
          const details = {
            date: selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            time: selectedTime,
            timestamp: new Date()
          };
          setAppointmentDetails(details);
          setAppointmentSet(true);
          setShowAppointmentModal(false);
          setSelectedDate(null);
          setSelectedTime("");
        }
      };
    
      const timeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
        "04:00 PM", "04:30 PM", "05:00 PM"
      ];
    


    return (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">

            {/* ===== Header (UNCHANGED UI, now fixed) ===== */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <h2 className="text-2xl font-bold text-gray-900">Set Appointment</h2>
                <button
                    onClick={() => {
                        setShowAppointmentModal(false);
                        setSelectedDate(null);
                        setSelectedTime("");
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            {/* ===== Body (NO PAGE SCROLL) ===== */}
            <div className="flex-1 overflow-hidden p-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">

                    {/* ================= LEFT : CALENDAR ================= */}
                    <div className="space-y-4 h-full flex flex-col">

                        {/* unchanged */}
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Calendar size={20} className="text-blue-600" />
                            Select Date
                        </h3>

                        {/* unchanged */}
                        <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
                            <button onClick={handlePreviousMonth} className="p-2 hover:bg-blue-100 rounded-lg">
                                <ChevronLeft size={20} className="text-blue-600" />
                            </button>
                            <span className="text-lg font-semibold text-gray-900">
                                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            </span>
                            <button onClick={handleNextMonth} className="p-2 hover:bg-blue-100 rounded-lg">
                                <ChevronRight size={20} className="text-blue-600" />
                            </button>
                        </div>

                        {/* unchanged UI, now stretches correctly */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1">
                            <div className="grid grid-cols-7 gap-2 mb-2">
                                {dayNames.map(day => (
                                    <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {generateCalendarDays().map((day, idx) => {
                                    const isSelected =
                                        selectedDate &&
                                        day === selectedDate.getDate() &&
                                        currentMonth.getMonth() === selectedDate.getMonth() &&
                                        currentMonth.getFullYear() === selectedDate.getFullYear();

                                    const isDisabled = isDateDisabled(day);

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleDateSelect(day)}
                                            disabled={isDisabled}
                                            className={`
                        aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                        ${!day ? 'invisible' : ''}
                        ${isDisabled ? 'text-gray-300 cursor-not-allowed' : ''}
                        ${isSelected ? 'bg-blue-600 text-white shadow-md scale-105' : ''}
                        ${!isSelected && !isDisabled ? 'hover:bg-blue-50 text-gray-900' : ''}
                      `}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* unchanged */}
                        {selectedDate && (
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <p className="text-sm text-blue-600 font-medium mb-1">Selected Date</p>
                                <p className="text-lg font-semibold text-blue-900">
                                    {selectedDate.toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ================= RIGHT : TIME ================= */}
                    <div className="space-y-4 h-full flex flex-col">

                        {/* unchanged */}
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Clock size={20} className="text-blue-600" />
                            Select Time
                        </h3>

                        {/* 🔧 ONLY FIX: inner scroll */}
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
                    `}
                                    >
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
                </div>
            </div>

            {/* ===== Footer (UNCHANGED UI, fixed position) ===== */}
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
                    onClick={handleSetAppointment}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <CheckCircle size={20} />
                    Confirm Appointment
                </button>
            </div>
        </div>
    )
}

export default AppointmentModal