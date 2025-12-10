import React from 'react'
import { Ban, Calendar, CheckCircle, Mail, Phone, Trash2, XCircle } from 'lucide-react'

const AdminCard = ({ admin, handleBlockAdmin, handleDeleteAdmin }) => {
    return (
        <div className="p-4 hover:bg-slate-700/20 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white mb-2">{admin.name}</h3>
                    <div className="space-y-1.5">
                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                            <Mail className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{admin.email}</span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                            <Phone className="w-3 h-3 flex-shrink-0" />
                            <span>{admin.phone}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border ${admin.status === "active"
                            ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
                            : "text-red-400 bg-red-500/20 border-red-500/30"
                            }`}>
                            {admin.status === "active" ? (
                                <CheckCircle className="w-3 h-3" />
                            ) : (
                                <XCircle className="w-3 h-3" />
                            )}
                            {admin.status === "active" ? "Active" : "Blocked"}
                        </span>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {admin.addedDate}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleBlockAdmin(admin.id)}
                        className={`p-2 rounded-lg border transition-all ${admin.status === "active"
                            ? "bg-amber-600/20 hover:bg-amber-600/30 border-amber-500/30 text-amber-400"
                            : "bg-emerald-600/20 hover:bg-emerald-600/30 border-emerald-500/30 text-emerald-400"
                            }`}
                    >
                        <Ban className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminCard