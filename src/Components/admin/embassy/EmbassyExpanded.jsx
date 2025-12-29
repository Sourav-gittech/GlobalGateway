import React from 'react'
import { Building2 } from 'lucide-react';
import ContactWithAdditionalInfo from './row-expanded/ContactWithAdditionalInfo';
import WorkingHours from './row-expanded/WorkingHours';
import NewCountrySection from './row-expanded/NewCountrySection';

const EmbassyExpanded = ({embassy}) => {
    return (
        <tr className="bg-slate-700/20 border-b border-slate-600/50">
            <td colSpan="6" className="px-6 py-6">
                <div className="ml-8">
                    <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Embassy Details
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Contact & Additional Information Combined */}
                        <ContactWithAdditionalInfo embassy={embassy} />

                        {/* Working Hours */}
                        <WorkingHours embassy={embassy} />
                    </div>

                    {/* Country Setup Data - Only for New Countries */}
                    {embassy?.isNewCountry && (
                        <NewCountrySection embassy={embassy} />
                    )}
                </div>
            </td>
        </tr>
    )
}

export default EmbassyExpanded