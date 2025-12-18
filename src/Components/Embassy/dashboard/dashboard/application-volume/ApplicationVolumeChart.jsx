import React from 'react'

const ApplicationVolumeChart = ({chartData,maxValue}) => {
    return (
        <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
                {chartData.map((data, idx) => {
                    const height = (data.value / maxValue) * 100;
                    return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex items-end justify-center h-full">
                                <div
                                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl hover:from-blue-700 hover:to-blue-500 transition-all duration-300 cursor-pointer group relative shadow-sm"
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap z-10 font-medium shadow-lg">
                                        {data.value} applications
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-gray-600 font-medium">{data.month}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ApplicationVolumeChart