import React from 'react'
import { Clock } from 'lucide-react'

const WorkingHours = ({embassy}) => {
    return (
        <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50">
            <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                Working Hours
            </h5>
            <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                    <span className="text-slate-500 min-w-[80px]">Schedule:</span>
                    <span className="text-slate-300">{embassy.workingHours}</span>
                </div>
            </div>
        </div>
    )
}

export default WorkingHours