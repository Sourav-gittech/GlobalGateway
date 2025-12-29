import { Mail, MapPin } from 'lucide-react'
import React from 'react'

const EmbassyContactSection = ({ selectedDocument }) => {
    return (
        <div className="mt-6 pt-6 border-t border-slate-600/50">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">Contact Information</p>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-white font-medium">{selectedDocument.email}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                        <MapPin className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-white font-medium">{selectedDocument.address}</span>
                </div>
            </div>
        </div>

    )
}

export default EmbassyContactSection