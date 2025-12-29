import React from 'react'
import { Mail } from 'lucide-react'

const ContactWithAdditionalInfo = ({embassy}) => {
    return (
        <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50">
            <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                Contact & General Information
            </h5>
            <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                    <span className="text-slate-500 min-w-[80px]">Email:</span>
                    <span className="text-slate-300">{embassy.email}</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-slate-500 min-w-[80px]">Address:</span>
                    <span className="text-slate-300">{embassy.address}</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-slate-500 min-w-[80px]">Established:</span>
                    <span className="text-slate-300">{embassy.establishedYear}</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-slate-500 min-w-[80px]">Status:</span>
                    <span className={`capitalize font-medium ${embassy.status === 'approved' ? 'text-green-400' : embassy.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                        {embassy.status}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ContactWithAdditionalInfo