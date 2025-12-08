import { Download } from 'lucide-react'
import React from 'react'

const TransactionHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Payments</h1>
                <p className="text-slate-400">Manage and track all payment transactions</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white text-sm transition-all flex items-center gap-2 w-fit">
                <Download className="w-4 h-4" />
                Export Report
            </button>
        </div>
    )
}

export default TransactionHeader