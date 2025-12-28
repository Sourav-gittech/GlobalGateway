import React from 'react'

const VisaSummary = ({visa}) => {
    return (
        <div className="pt-4 border-t border-slate-600/50">
            <h4 className="text-slate-300 font-semibold mb-3 text-sm">Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
                    <div className="text-slate-400 text-xs mb-1.5 font-medium">Active Countries</div>
                    <div className="text-white text-2xl font-bold">
                        {visa.countryStatus.filter(c => c.status === 'active').length}
                    </div>
                </div>
                <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
                    <div className="text-slate-400 text-xs mb-1.5 font-medium">Blocked Countries</div>
                    <div className="text-white text-2xl font-bold">
                        {visa.countryStatus.filter(c => c.status === 'blocked').length}
                    </div>
                </div>
                <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
                    <div className="text-slate-400 text-xs mb-1.5 font-medium">Total Applications</div>
                    <div className="text-white text-2xl font-bold">
                        {visa.totalApplications.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VisaSummary