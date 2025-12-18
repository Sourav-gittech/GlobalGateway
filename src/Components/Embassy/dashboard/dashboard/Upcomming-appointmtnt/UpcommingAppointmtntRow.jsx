import React from 'react'
import { Clock } from 'lucide-react'

const UpcommingAppointmtntRow = ({ apt }) => {
    return (
        <div className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer group">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                    <span className="text-xs font-bold text-blue-700">{apt.date.split(' ')[1]}</span>
                    <span className="text-[10px] text-blue-600 font-medium">{apt.date.split(' ')[0]}</span>
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{apt.applicant}</p>
                <p className="text-xs text-gray-600 mt-1">{apt.type}</p>
                <div className="flex items-center gap-2 mt-1.5">
                    <Clock size={12} className="text-gray-500" />
                    <span className="text-xs text-gray-500 font-medium">{apt.time}</span>
                </div>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                }`}>
                {apt.status}
            </span>
        </div>
    )
}

export default UpcommingAppointmtntRow