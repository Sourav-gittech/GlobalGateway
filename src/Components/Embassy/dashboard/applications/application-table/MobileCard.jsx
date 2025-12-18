import React from 'react'
import { useNavigate } from 'react-router-dom'
import GetStatusBadge from './GetStatusBadge';
import { Eye } from 'lucide-react';

const MobileCard = ({ app }) => {
    const navigate = useNavigate();

    return (
        <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <p className="text-sm font-medium text-blue-600">{app.id}</p>
                    <p className="text-base font-semibold text-gray-900 mt-1">{app.applicantName}</p>
                    <p className="text-xs text-gray-500">{app.email}</p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Visa Type:</span>
                    <span className="text-sm font-medium text-gray-900">{app.visaType}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    {GetStatusBadge(app.status)}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Submitted:</span>
                    <span className="text-sm text-gray-900">{new Date(app.submittedDate).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => navigate(`/embassy/dashboard/applications/${app.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Eye size={16} />
                    View Details
                </button>
            </div>
        </div>
    )
}

export default MobileCard