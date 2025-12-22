import React from 'react'
import { Calendar, XCircle } from 'lucide-react';
import GetStatusBadge from './GetStatusBadge';
import { formatDateDDMMYYYY, formatDateTimeMeridianWithoutSecond } from '../../../../util/dateFormat/dateFormatConvertion';

const StatusCard = ({ application, setShowRejectModal, setShowAppointmentModal }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Main Status Section */}
            <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Left Side - Status and Dates */}
                    <div className="flex flex-wrap items-center gap-4">
                        {GetStatusBadge(application?.status)}
                        
                        <div className="h-12 w-px bg-gray-300 hidden sm:block"></div>
                        
                        <div>
                            <p className="text-sm text-gray-600">Submitted</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {formatDateDDMMYYYY(application?.applied_at)}
                            </p>
                        </div>
                        
                        {application?.appointment_date && (
                            <>
                                <div className="h-12 w-px bg-gray-300 hidden sm:block"></div>
                                <div>
                                    <p className="text-sm text-gray-600">Appointment Date</p>
                                    <p className="text-lg font-semibold text-cyan-700">
                                        {formatDateTimeMeridianWithoutSecond(application?.appointment_date)}
                                    </p>
                                    {application?.appointment_location && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {typeof application.appointment_location === 'string' 
                                                ? application.appointment_location 
                                                : application.appointment_location.city || 'N/A'}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right Side - Action Buttons */}
                    <div className="flex gap-2 shrink-0">
                        {!application?.appointment_date && application.status === "processing" && (
                            <button
                                onClick={() => setShowRejectModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm hover:shadow cursor-pointer"
                            >
                                <XCircle size={18} />
                                Reject
                            </button>
                        )}
                        <button
                            onClick={() => setShowAppointmentModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium shadow-sm hover:shadow cursor-pointer"
                        >
                            <Calendar size={18} />
                            {!application?.appointment_date ? 'Set' : 'Change'} Appointment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusCard