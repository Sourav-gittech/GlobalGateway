import React from 'react'
import { Download } from 'lucide-react'

const ContactHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
                <p className="text-slate-400">Manage and respond to user inquiries</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all flex items-center gap-2 w-fit">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
            </button>
        </div>

    )
}

export default ContactHeader