import React, { useState, useEffect, useMemo } from "react";
import { Calendar, Plus, Trash2, AlertCircle, Loader2, ChevronLeft, ChevronRight, X } from "lucide-react";

// Mock sweet alert function
const getSweetAlert = (title, text, icon, showConfirm = false) => {
  if (showConfirm) {
    return Promise.resolve({ isConfirmed: window.confirm(`${title}\n${text}`) });
  }
  alert(`${title}\n${text}`);
  return Promise.resolve();
};

// Settings Section Wrapper Component
const SettingsSection = ({ title, description, icon: Icon, children }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
    <div className="flex items-start gap-3 mb-6">
      {Icon && <Icon className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />}
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
      </div>
    </div>
    {children}
  </div>
);

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default function HolidayManagement() {
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({ month: null, day: null, description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      // Mock data - format: month:MM,day:DD
      setHolidays([
        { id: 1, date: "month:1,day:12", description: "Swami Vivekananda Birthday" },
        { id: 2, date: "month:1,day:26", description: "Republic Day" },
        { id: 3, date: "month:3,day:8", description: "Holi" },
        { id: 4, date: "month:8,day:15", description: "Independence Day" },
        { id: 5, date: "month:10,day:2", description: "Gandhi Jayanti" }
      ]);
    } catch (error) {
      console.error('Error fetching holidays:', error);
      getSweetAlert('Error', 'Failed to load holidays', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Create a Set for quick holiday lookup
  const holidaySet = useMemo(() => {
    const set = new Set();
    holidays.forEach(h => {
      const [, month, day] = h.date.match(/month:(\d+),day:(\d+)/) || [];
      if (month && day) {
        set.add(`${month}-${day}`);
      }
    });
    return set;
  }, [holidays]);

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
    return { daysInMonth: lastDay.getDate(), startingDayOfWeek: firstDay.getDay() };
  };

  const generateCalendarDays = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const isDateSelected = (day) => {
    if (!day || newHoliday.month === null || newHoliday.day === null) return false;
    return newHoliday.month === currentMonth.getMonth() + 1 && newHoliday.day === day;
  };

  const isDateHoliday = (day) => {
    if (!day) return false;
    const month = currentMonth.getMonth() + 1;
    return holidaySet.has(`${month}-${day}`);
  };

  const handleDateSelect = (day) => {
    if (!day) return;
    const month = currentMonth.getMonth() + 1;
    
    // Check if this date is already a holiday
    if (holidaySet.has(`${month}-${day}`)) {
      getSweetAlert('Already a Holiday', 'This date already has a holiday scheduled', 'warning');
      return;
    }

    setNewHoliday({ ...newHoliday, month, day });
  };

  const handleAddHoliday = async () => {
    if (newHoliday.month === null || newHoliday.day === null) {
      getSweetAlert('Validation Error', 'Please select a date from the calendar', 'warning');
      return;
    }

    if (!newHoliday.description.trim()) {
      getSweetAlert('Validation Error', 'Please enter a holiday name', 'warning');
      return;
    }

    const dateKey = `${newHoliday.month}-${newHoliday.day}`;
    if (holidaySet.has(dateKey)) {
      getSweetAlert('Validation Error', 'A holiday already exists on this date', 'warning');
      return;
    }

    try {
      setIsAdding(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      const newId = holidays.length > 0 ? Math.max(...holidays.map(h => h.id)) + 1 : 1;
      const newHolidayData = {
        id: newId,
        date: `month:${newHoliday.month},day:${newHoliday.day}`,
        description: newHoliday.description
      };

      setHolidays([...holidays, newHolidayData]);
      setNewHoliday({ month: null, day: null, description: "" });
      setShowModal(false);

      getSweetAlert('Success', 'Holiday added successfully', 'success');
    } catch (error) {
      console.error('Error adding holiday:', error);
      getSweetAlert('Error', 'Failed to add holiday', 'error');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteHoliday = async (id, description) => {
    try {
      const result = await getSweetAlert(
        'Delete Holiday?',
        `Remove "${description}" from the calendar?`,
        'warning',
        true
      );

      if (!result || !result.isConfirmed) return;

      setDeletingId(id);
      await new Promise(resolve => setTimeout(resolve, 500));

      setHolidays(holidays.filter(h => h.id !== id));
      getSweetAlert('Deleted', 'Holiday removed successfully', 'success');
    } catch (error) {
      console.error('Error deleting holiday:', error);
      getSweetAlert('Error', 'Failed to delete holiday', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const formatHolidayDate = (dateStr) => {
    const [, month, day] = dateStr.match(/month:(\d+),day:(\d+)/) || [];
    if (!month || !day) return 'Invalid date';
    
    const date = new Date(2024, parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getSelectedDateDisplay = () => {
    if (newHoliday.month === null || newHoliday.day === null) return null;
    const date = new Date(2024, newHoliday.month - 1, newHoliday.day);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long'
    });
  };

  const openModal = () => {
    setNewHoliday({ month: null, day: null, description: "" });
    setCurrentMonth(new Date());
    setShowModal(true);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <SettingsSection
          title="Holiday Management"
          description="Set recurring holidays for the appointment calendar (date repeats annually)"
          icon={Calendar}
        >
          {/* Add Holiday Button */}
          <div className="mb-4">
            <button
              onClick={openModal}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add New Holiday
            </button>
          </div>

          {/* Holidays List - Fixed Height Container */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-slate-300">Scheduled Holidays</h4>
              {holidays.length > 0 && (
                <span className="text-xs text-slate-400 bg-slate-700/30 px-2 py-0.5 rounded">
                  {holidays.length}
                </span>
              )}
            </div>

            {/* Fixed Height Scrollable Area - Shows exactly 4 items */}
            <div className="h-[420px] overflow-hidden">
              {isLoading && holidays.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                </div>
              ) : holidays.length === 0 ? (
                <div className="flex items-start gap-2 p-3 bg-slate-700/20 border border-slate-600/30 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-400">No holidays scheduled</p>
                </div>
              ) : (
                <div className="h-full overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-500">
                  {holidays
                    .sort((a, b) => {
                      const [, aMonth, aDay] = a.date.match(/month:(\d+),day:(\d+)/).map(Number);
                      const [, bMonth, bDay] = b.date.match(/month:(\d+),day:(\d+)/).map(Number);
                      return aMonth === bMonth ? aDay - bDay : aMonth - bMonth;
                    })
                    .map((holiday) => (
                      <div
                        key={holiday.id}
                        className="flex items-center justify-between gap-3 p-3 bg-slate-700/30 border border-slate-600/40 rounded-lg hover:border-slate-500/50 hover:bg-slate-700/40 transition-all group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {holiday.description}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {formatHolidayDate(holiday.date)} (Annual)
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteHoliday(holiday.id, holiday.description)}
                          disabled={deletingId === holiday.id}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === holiday.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </SettingsSection>

        {/* Modal for Adding Holiday */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
            <h3 className="text-lg font-semibold text-white">Add Holiday</h3>
            <button
              onClick={() => setShowModal(false)}
              className="p-1 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Modal Content - Fixed Height with Scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Calendar */}
            <div className="bg-slate-700/20 border border-slate-600/40 rounded-lg p-4 space-y-3">
              {/* Month Navigation */}
              <div className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                <button 
                  onClick={handlePreviousMonth} 
                  className="p-2 hover:bg-slate-600/40 rounded-lg transition-colors"
                >
                  <ChevronLeft size={18} className="text-blue-400" />
                </button>
                <span className="text-sm font-semibold text-white">
                  {monthNames[currentMonth.getMonth()]}
                </span>
                <button 
                  onClick={handleNextMonth} 
                  className="p-2 hover:bg-slate-600/40 rounded-lg transition-colors"
                >
                  <ChevronRight size={18} className="text-blue-400" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-slate-400 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays().map((day, idx) => {
                    const isSelected = isDateSelected(day);
                    const isHoliday = isDateHoliday(day);

                    return (
                      <button
                        key={idx}
                        onClick={() => handleDateSelect(day)}
                        disabled={!day || isHoliday}
                        className={`
                          aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all
                          ${!day ? "invisible" : ""}
                          ${isHoliday ? "bg-red-500/20 text-red-300 cursor-not-allowed border border-red-500/30" : ""}
                          ${isSelected ? "bg-blue-500 text-white shadow-lg scale-105" : ""}
                          ${!isSelected && !isHoliday && day ? "hover:bg-slate-600/40 text-slate-200 border border-slate-600/30" : ""}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {getSelectedDateDisplay() && (
                <div className="bg-blue-500/10 rounded-lg p-2 border border-blue-500/30">
                  <p className="text-xs text-blue-300 font-medium mb-0.5">Selected Date</p>
                  <p className="text-sm font-semibold text-blue-200">
                    {getSelectedDateDisplay()} (Repeats every year)
                  </p>
                </div>
              )}
            </div>

            {/* Holiday Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Holiday Name
              </label>
              <input
                type="text"
                placeholder="e.g., Republic Day"
                value={newHoliday.description}
                onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
                disabled={isAdding}
                maxLength={100}
                className="w-full px-3 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex gap-2 p-4 border-t border-slate-700 flex-shrink-0">
            <button
              onClick={() => setShowModal(false)}
              disabled={isAdding}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700/50 text-white rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleAddHoliday}
              disabled={isAdding || newHoliday.month === null || newHoliday.day === null || !newHoliday.description.trim()}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Holiday
                </>
              )}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}