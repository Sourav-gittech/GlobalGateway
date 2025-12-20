import React, { useState } from 'react'
import { X } from 'lucide-react';
import CalenderPart from './approved-modal/CalenderPart';
import ClockPart from './approved-modal/ClockPart';
import FooterPart from './approved-modal/FooterPart';
import ReasonSelection from './approved-modal/ReasonSelection';
import LocationSelection from './approved-modal/LocationSelection';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { updateApplicationStatus } from '../../../../../Redux/Slice/applicationSlice';
import getSweetAlert from '../../../../../util/alert/sweetAlert';
import { buildISOFormat } from '../../../../../util/dateFormat/dateFormatConvertion';
import hotToast from '../../../../../util/alert/hot-toast';

const AppointmentModal = ({ application, visaDetails, setShowAppointmentModal,currentCountry, setSelectedDate, setAppointmentSet, setSelectedTime, selectedDate, selectedTime, currentMonth, setCurrentMonth }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Calendar functions
    const handleSetAppointment = () => {
        if (selectedDate && selectedTime && selectedReasons.length > 0 && selectedLocation) {
            const details = {
                date: selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                time: selectedTime,
                reasons: selectedReasons,
                location: selectedLocation,
                timestamp: new Date()
            };
            setAppointmentDetails(details);
            setAppointmentSet(true);
            setShowAppointmentModal(false);
            setSelectedDate(null);
            setSelectedTime("");
            setSelectedReasons([]);
            setSelectedLocation(null);

            console.log(selectedDate, selectedTime, selectedReasons, selectedLocation);
            const appointmentDate = buildISOFormat(selectedDate, selectedTime);
            
            dispatch(updateApplicationStatus({ 
                applicationId: application?.id, 
                status: 'processing', 
                appointment_date: appointmentDate,
                appointment_reasons: selectedReasons,
                appointment_location_id: selectedLocation.id
            }))
                .then(res => {
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
        } else if (selectedReasons.length === 0) {
            hotToast('Please select at least one reason for appointment', 'error');
        } else if (!selectedLocation) {
            hotToast('Please select an office location', 'error');
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">

            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <h2 className="text-2xl font-bold text-gray-900">Set Appointment</h2>
                <button
                    onClick={() => {
                        setShowAppointmentModal(false);
                        setSelectedDate(null);
                        setSelectedTime("");
                        setSelectedReasons([]);
                        setSelectedLocation(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* LEFT : CALENDAR */}
                    <CalenderPart 
                        currentMonth={currentMonth} 
                        setCurrentMonth={setCurrentMonth} 
                        selectedDate={selectedDate} 
                        setSelectedDate={setSelectedDate} 
                    />

                    {/* RIGHT : TIME */}
                    <ClockPart 
                        selectedDate={selectedDate} 
                        selectedTime={selectedTime} 
                        setSelectedTime={setSelectedTime} 
                    />
                </div>

                {/* LOCATION SELECTION - Full Width */}
                <div className="mt-6">
                    <LocationSelection 
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                        application={application}
                        visaDetails={visaDetails}
                        currentCountry={currentCountry}
                    />
                </div>

                {/* REASON SELECTION - Full Width */}
                <div className="mt-6">
                    <ReasonSelection 
                        selectedReasons={selectedReasons}
                        setSelectedReasons={setSelectedReasons}
                    />
                </div>
            </div>

            {/* Footer */}
            <FooterPart 
                handleSetAppointment={handleSetAppointment} 
                selectedDate={selectedDate} 
                selectedTime={selectedTime}
                selectedReasons={selectedReasons}
                selectedLocation={selectedLocation}
                setSelectedDate={setSelectedDate} 
                setSelectedTime={setSelectedTime} 
            />
        </div>
    )
}

export default AppointmentModal