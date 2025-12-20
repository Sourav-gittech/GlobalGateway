import React, { useState } from 'react'
import { X } from 'lucide-react';
import CalenderPart from './approved-modal/CalenderPart';
import ClockPart from './approved-modal/ClockPart';
import FooterPart from './approved-modal/FooterPart';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { updateApplicationStatus } from '../../../../../Redux/Slice/applicationSlice';
import getSweetAlert from '../../../../../util/alert/sweetAlert';
import { buildISOFormat } from '../../../../../util/dateFormat/dateFormatConvertion';
import hotToast from '../../../../../util/alert/hot-toast';

const AppointmentModal = ({ application, setShowAppointmentModal, setSelectedDate, setAppointmentSet, setSelectedTime, selectedDate, selectedTime, currentMonth, setCurrentMonth }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [appointmentDetails, setAppointmentDetails] = useState(null);

    // Calendar functions
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

            console.log(selectedDate, selectedTime);
            const appointmentDate = buildISOFormat(selectedDate, selectedTime);
            dispatch(updateApplicationStatus({ applicationId: application?.id, status: 'processing', appointment_date: appointmentDate }))
                .then(res => {
                    // console.log('Response after updating the application status', res);

                    if (res.meta.requestStatus === "fulfilled") {
                        queryClient.invalidateQueries(["application", application?.id]);
                        hotToast(`Appointment set successfully!`, "success");
                    }
                    else {
                        getSweetAlert('Oops...', 'Something went wrong!', 'error');
                    }
                })
                .catch(err => {
                    console.log('Error occured', err);
                    getSweetAlert('Oops...', 'Something went wrong!', 'error');
                })
        }
    }

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
                    <CalenderPart currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                    {/* ================= RIGHT : TIME ================= */}
                    <ClockPart selectedDate={selectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                </div>
            </div>

            {/* ===== Footer (UNCHANGED UI, fixed position) ===== */}
            <FooterPart handleSetAppointment={handleSetAppointment} selectedDate={selectedDate} selectedTime={selectedTime} setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime} />
        </div>
    )
}

export default AppointmentModal