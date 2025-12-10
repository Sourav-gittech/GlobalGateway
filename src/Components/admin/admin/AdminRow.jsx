import { Ban, Calendar, CheckCircle, CircleAlert, Mail, Phone, Trash2, XCircle } from 'lucide-react'
import React from 'react'

const AdminRow = ({ admin, index, filteredAdmins, handleBlockAdmin, handleDeleteAdmin }) => {
    return (
        <tr className={`border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors ${index === filteredAdmins.length - 1 ? 'border-b-0' : ''
            }`}
        >
            <td className="p-4">
                <div className="text-sm font-medium text-white">{admin?.name ? admin?.name : 'N/A'}</div>
            </td>
            <td className="p-4">
                <div className="text-sm text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {admin.email ? admin.email : 'N/A'}
                </div>
            </td>
            <td className="p-4">
                <div className="text-sm text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {admin.phone ? admin.phone : 'N/A'}
                </div>
            </td>
            <td className="p-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${admin.is_verified === "pending"
                    ? "text-orange-400 bg-orange-500/20 border-orange-500/30" : admin.is_verified === "success"
                        ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
                        : "text-red-400 bg-red-500/20 border-red-500/30"
                    }`}>
                    {admin.is_verified === "pending" ? (
                        <CircleAlert className="w-3 h-3" />
                    ) : admin.is_verified === "success" ? (
                        <CheckCircle className="w-3 h-3" />
                    ) : (
                        <XCircle className="w-3 h-3" />
                    )}
                    {admin.is_verified === "pending" ? "Pending" : admin.is_verified === "success" ? "success" : "Failed"}
                </span>
            </td>
            <td className="p-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${admin?.is_blocked === false
                    ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
                    : "text-red-400 bg-red-500/20 border-red-500/30"
                    }`}>
                    {admin?.is_blocked === false ? (
                        <CheckCircle className="w-3 h-3" />
                    ) : (
                        <XCircle className="w-3 h-3" />
                    )}
                    {admin?.is_blocked === false ? "Active" : "Blocked"}
                </span>
            </td>
            <td className="p-4">
                <div className="text-sm text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {admin?.updated_at ? new Date(admin?.created_at)?.toLocaleDateString("en-GB") : "N/A"}
                </div>
            </td>
            <td className="p-4">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => handleBlockAdmin(admin.id)}
                        className={`p-2 rounded-lg border transition-all ${admin.status === "active"
                            ? "bg-amber-600/20 hover:bg-amber-600/30 border-amber-500/30 text-amber-400"
                            : "bg-red-600/20 hover:bg-red-600/30 border-red-500/30 text-red-400"
                            }`}
                        title={admin.status === "active" ? "Block access" : "Restore access"}
                    >
                        <Ban className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 transition-all"
                        title="Remove admin"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default AdminRow