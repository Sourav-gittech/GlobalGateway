import React from 'react'
import { Building2, FileText } from 'lucide-react';
import AdditionalInfo from './row-expanded/AdditionalInfo';
import ContactWithWorkingHours from './row-expanded/ContactWithWorkingHours';
import NewCountrySection from './row-expanded/NewCountrySection';

const EmbassyExpanded = ({ embassy }) => {

    return (
        <tr className="bg-slate-700/20 border-b border-slate-600/50">
            {(!embassy?.starting_hours || !embassy?.country_id) ? (
                <td colSpan="12" className="px-6 py-6">
                    <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50 flex flex-col justify-center items-center h-50">
                        {/* <span className='text-center'> */}
                        <FileText className='mx-auto h-10 w-10' />
                        <p className='pt-2'>Application under processing</p>
                        {/* </span> */}
                    </div>
                </td>
            ) : (
                <td colSpan="12" className="px-6 py-6">
                    <div className="ml-8">
                        <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Embassy Details
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Additional Information Combined */}
                            <AdditionalInfo embassy={embassy} />

                            {/* Contact & Working Hours */}
                            <ContactWithWorkingHours embassy={embassy} />
                        </div>

                        {/* Country Setup Data - Only for New Countries */}
                        {!embassy?.is_country_listed && (
                            <NewCountrySection embassy={embassy} />
                        )}
                    </div>
                </td>
            )}
        </tr>
    )
}

export default EmbassyExpanded