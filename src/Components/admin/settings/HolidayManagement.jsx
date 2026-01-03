import React, { useState, useEffect } from "react";
import { Calendar, Plus, Trash2, AlertCircle, Loader2 } from "lucide-react";
import getSweetAlert from "../../../util/alert/sweetAlert";

export default function HolidayManagement({ SettingsSection }) {
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({
    date: "",
    description: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setHolidays([
        { id: 1, date: "2026-01-12", description: "Swami Vivekananda Birthday" },
        { id: 2, date: "2026-01-26", description: "Republic Day" },
        { id: 3, date: "2026-03-08", description: "Holi" }
      ]);
    } catch (error) {
      console.error('Error fetching holidays:', error);
      getSweetAlert('Error', 'Failed to load holidays', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHoliday = async () => {
    if (!newHoliday.date) {
      getSweetAlert('Validation Error', 'Please select a holiday date', 'warning');
      return;
    }

    if (!newHoliday.description.trim()) {
      getSweetAlert('Validation Error', 'Please enter a holiday name', 'warning');
      return;
    }

    const dateExists = holidays.some(h => h.date === newHoliday.date);
    if (dateExists) {
      getSweetAlert('Validation Error', 'A holiday already exists on this date', 'warning');
      return;
    }

    try {
      setIsAdding(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newId = holidays.length > 0 ? Math.max(...holidays.map(h => h.id)) + 1 : 1;
      setHolidays([...holidays, { ...newHoliday, id: newId }]);
      setNewHoliday({ date: "", description: "" });
      
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

  return (
    <SettingsSection
      title="Holiday Management"
      description="Set embassy appointment calendar holidays"
      icon={Calendar}
    >
      {/* Add Holiday Form */}
      <div className="space-y-3 flex-shrink-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Date
            </label>
            <input
              type="date"
              value={newHoliday.date}
              onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
              disabled={isLoading || isAdding}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Holiday Name
            </label>
            <input
              type="text"
              placeholder="e.g., Republic Day"
              value={newHoliday.description}
              onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
              disabled={isLoading || isAdding}
              maxLength={100}
              className="w-full px-3 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
            />
          </div>
        </div>

        <button
          onClick={handleAddHoliday}
          disabled={isLoading || isAdding || !newHoliday.date || !newHoliday.description.trim()}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
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

      {/* Holidays List - Fixed Height for 3 Items */}
      <div className="mt-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-slate-300">Scheduled Holidays</h4>
          {holidays.length > 0 && (
            <span className="text-xs text-slate-400 bg-slate-700/30 px-2 py-0.5 rounded">
              {holidays.length}
            </span>
          )}
        </div>
        
        {isLoading && holidays.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
          </div>
        ) : holidays.length === 0 ? (
          <div className="flex items-start gap-2 p-3 bg-slate-700/20 border border-slate-600/30 rounded-lg">
            <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400">No holidays scheduled</p>
          </div>
        ) : (
          /* Fixed height container - shows exactly 3 items, scrolls if more */
          <div className="h-[234px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-500">
            {holidays
              .sort((a, b) => new Date(a.date) - new Date(b.date))
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
                      {new Date(holiday.date + 'T00:00:00').toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
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
    </SettingsSection>
  );
}