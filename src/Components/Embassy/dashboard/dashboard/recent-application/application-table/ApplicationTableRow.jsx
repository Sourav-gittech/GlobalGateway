import { Eye } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ApplicationTableRow = ({ app }) => {
    const navigate = useNavigate();
    const getStatusBadge = (status) => {
        const styles = {
            pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
            approved: "bg-green-50 text-green-700 border border-green-200",
            rejected: "bg-red-50 text-red-700 border border-red-200",
            review: "bg-blue-50 text-blue-700 border border-blue-200"
        };
        return styles[status] || styles.pending;
    };

    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.id}</td>
            <td className="px-6 py-4">
                <div>
                    <p className="text-sm font-medium text-gray-900">{app.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{app.country}</p>
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">{app.type}</td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(app.status)}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <button
                    onClick={() => navigate(`/embassy/dashboard/applications/${app.id}`)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-colors"
                >
                    <Eye size={18} />
                </button>
            </td>
        </tr>
    )
}

export default ApplicationTableRow