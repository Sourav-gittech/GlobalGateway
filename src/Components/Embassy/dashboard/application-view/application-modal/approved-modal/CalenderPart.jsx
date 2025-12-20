import React from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const CalenderPart = ({ currentMonth, setCurrentMonth, selectedDate, setSelectedDate }) => {

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    // YYYY-MM-DD format (IMPORTANT)
    const GLOBAL_HOLIDAYS = [
        "2025-01-26", // Republic Day
        "2025-08-15", // Independence Day
        "2025-10-02", // Gandhi Jayanti
        "2025-12-25", // Christmas
    ];

    const handlePreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

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

        const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );

        // normalize today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // block today & past
        if (date <= today) return true;

        // block weekends (Saturday = 6, Sunday = 0)
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) return true;

        // block global holidays
        //   const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
        const formattedDate = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
        ].join("-");
        if (GLOBAL_HOLIDAYS.includes(formattedDate)) return true;

        return false;
    };

    const handleDateSelect = (day) => {
        if (!day || isDateDisabled(day)) return;
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(date);
    };

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

    return (
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
    )
}

export default CalenderPart