import React, { useState, useEffect, useMemo } from "react";
import { Calendar, Plus, AlertCircle, Loader2 } from "lucide-react";
import HolidayModal from "./holiday/HolidayModal";
import HolidayRow from "./holiday/HolidayRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchHolidays } from "../../../Redux/Slice/holidaySlice";
import getSweetAlert from "../../../util/alert/sweetAlert";

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

export default function HolidayManagement() {
  const dispatch = useDispatch();
  const [holidays, setHolidays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [newHoliday, setNewHoliday] = useState({ month: null, day: null, description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isHolidayLoading, holidayData, holidayError } = useSelector(state => state.holiday);

  useEffect(() => {
    dispatch(fetchHolidays())
      .then(res => {
        // console.log('Response for fetching holiday list',res);
      })
      .catch(err => {
        console.log('Error occured', err);
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      })
  }, []);

  const fetchHolidays1 = async () => {
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

  const openModal = () => {
    setNewHoliday({ month: null, day: null, description: "" });
    setCurrentMonth(new Date());
    setShowModal(true);
  };

  // console.log('Holiday list',holidayData);

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
              className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add New Holiday
            </button>
          </div>

          {/* Holidays List - Fixed Height Container */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-slate-300">Scheduled Holidays</h4>
              {holidayData?.length > 0 && (
                <span className="text-xs text-slate-400 bg-slate-700/30 px-2 py-0.5 rounded">
                  {holidayData?.length}
                </span>
              )}
            </div>

            {/* Fixed Height Scrollable Area - Shows exactly 4 items */}
            <div className="h-[420px] overflow-hidden">
              {isHolidayLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                </div>
              ) : (!isHolidayLoading && holidayData?.length == 0) ? (
                <div className="flex items-start gap-2 p-3 bg-slate-700/20 border border-slate-600/30 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-400">No holidays scheduled</p>
                </div>
              ) : (
                <div className="h-full overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-500 glass-scrollbar">
                  {holidayData?.map(holiday => (
                    <HolidayRow key={holiday?.id} holiday={holiday} deletingId={deletingId} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </SettingsSection>

        {/* Modal for Adding Holiday */}
        <HolidayModal showModal={showModal} newHoliday={newHoliday} setShowModal={setShowModal} holidays={holidayData} setNewHoliday={setNewHoliday} setHolidays={setHolidays} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />

      </div>
    </div>
  );
}