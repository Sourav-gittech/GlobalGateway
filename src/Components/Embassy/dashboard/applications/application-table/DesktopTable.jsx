import React from 'react'
import { Calendar, Eye, MoreVertical, User } from 'lucide-react'
import GetStatusBadge from './GetStatusBadge'
import { useNavigate } from 'react-router-dom'

const DesktopTable = ({ app }) => {
    const navigate = useNavigate();

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-blue-600">{app.id}</span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <User size={18} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{app.applicantName}</p>
                        <p className="text-xs text-gray-500">{app.email}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-900">{app.visaType}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {GetStatusBadge(app.status)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} />
                    {new Date(app.submittedDate).toLocaleDateString()}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => navigate(`/embassy/dashboard/applications/${app.id}`)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                    >
                        <Eye size={18} />
                    </button>
                    <button
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="More Options"
                    >
                        <MoreVertical size={18} />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default DesktopTable