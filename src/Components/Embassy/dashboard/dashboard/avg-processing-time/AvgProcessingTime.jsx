import React from 'react'
import AvgProcessingTimeRow from './AvgProcessingTimeRow'

const AvgProcessingTime = ({processingTimes}) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Avg Processing Times</h2>

            <div className="space-y-4">
                {processingTimes.map((item, idx) => (
                    <AvgProcessingTimeRow key={idx} item={item} />
                ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-600 leading-relaxed">
                    Based on last 90 days of processed applications
                </p>
            </div>
        </div>
    )
}

export default AvgProcessingTime