import { TrendingUp } from 'lucide-react'
import React from 'react'

const ApplicationVolumeHeader = () => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-900">Application Volume</h2>
                <p className="text-sm text-gray-600 mt-1">Monthly trends for 2025</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-200">
                <TrendingUp size={16} />
                <span className="text-sm font-semibold">+12.5%</span>
            </div>
        </div>
    )
}

export default ApplicationVolumeHeader