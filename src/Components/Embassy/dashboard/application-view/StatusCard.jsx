import React from 'react'
import { Calendar, XCircle } from 'lucide-react';
import GetStatusBadge from './GetStatusBadge';

const StatusCard = ({ application, appointmentSet, appointmentDetails }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    {GetStatusBadge(application?.status)}
                    <div className="h-12 w-px bg-gray-300 hidden sm:block"></div>
                    <div>
                        <p className="text-sm text-gray-600">Submitted</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {new Date(application?.submittedDate).toLocaleDateString()}
                        </p>
                    </div>
                    {appointmentSet && appointmentDetails && (
                        <>
                            <div className="h-12 w-px bg-gray-300 hidden sm:block"></div>
                            <div>
                                <p className="text-sm text-gray-600">Appointment</p>
                                <p className="text-lg font-semibold text-green-600">
                                    {appointmentDetails.date} at {appointmentDetails.time}
                                </p>
                            </div>
                        </>
                    )}
                </div>
                {!appointmentSet && application.status === "pending" && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowRejectModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <XCircle size={18} />
                            Reject
                        </button>
                        <button
                            onClick={() => setShowAppointmentModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Calendar size={18} />
                            Set Appointment
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StatusCard