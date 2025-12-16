import React from 'react'
import { Calendar } from 'lucide-react';

const AppointmentsSection = ({ appointments, getStatusColor, getStatusIcon }) => {

    if(appointments.length==0){
        return (
            <div className="py-8">
                <p className="text-center">No appointments available</p>
            </div>
        )
    }
    return (
        <div className="space-y-4">
            {appointments.map((appointment) => (
                <div key={appointment.id} className="border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">{appointment.title}</h3>
                            <p className="text-slate-600 text-sm">{appointment.country}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-600">
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{appointment.location}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AppointmentsSection