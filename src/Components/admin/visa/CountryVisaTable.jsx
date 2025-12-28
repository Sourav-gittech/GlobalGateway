import React from 'react'
import CountryVisaRow from './CountryVisaRow'

const CountryVisaTable = ({visa}) => {
    return (
        <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-600/50 sticky top-0 z-10">
                <tr>
                    <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Country</th>
                    <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Processing</th>
                    <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Validity</th>
                    <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Fees</th>
                    <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Applications</th>
                    <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Visa Status in Country</th>
                </tr>
            </thead>
            <tbody className="country-scroll-container">
                {visa.countryStatus.map((country, idx) => (
                    <tr key={idx} className="border-b border-slate-600/30 hover:bg-slate-700/20 transition-colors">
                        <CountryVisaRow country={country} />
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CountryVisaTable