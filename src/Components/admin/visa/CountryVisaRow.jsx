import { Calendar, Clock, Lock, Unlock } from 'lucide-react'
import React from 'react'

const CountryVisaRow = ({ country }) => {
    return (
        <>
            <td className="px-4 py-3 text-white font-medium text-sm">{country.country}</td>
            <td className="px-4 py-3 text-slate-300 text-sm">
                <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {country.processing}
                </div>
            </td>
            <td className="px-4 py-3 text-slate-300 text-sm">
                <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {country.validity}
                </div>
            </td>
            <td className="px-4 py-3 text-slate-300 text-sm font-medium">
                ₹{country.fees.toLocaleString()}
            </td>
            <td className="px-4 py-3 text-slate-300 text-sm font-medium">{country.applications.toLocaleString()}</td>
            <td className="px-4 py-3">
                {country.status === 'active' ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium text-emerald-400 bg-emerald-500/10">
                        <Unlock className="w-3 h-3" />
                        Open
                    </span>
                ) : (
                    <div className="text-red-400 text-xs font-medium">
                        <div className="flex items-start gap-1.5">
                            <Lock className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span>
                                Blocked for: {country.blockedFor.length > 0 ? country.blockedFor.join(', ') : 'All countries'}
                            </span>
                        </div>
                    </div>
                )}
            </td>
        </>
    )
}

export default CountryVisaRow