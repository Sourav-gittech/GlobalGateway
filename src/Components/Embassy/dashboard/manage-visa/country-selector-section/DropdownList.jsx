import React from 'react'
import { Ban } from 'lucide-react';
import { useCountryVisaForSpecificCountry } from '../../../../../tanstack/query/getVisaDetailsCountryWiseForSpecificCountry';

const DropdownList = ({ mockCountries, policies, countryDetails,visaData, visaTypesByCountry, resetForm, selectedCountry, setSelectedCountry, setIsOpen, setIsAddingVisaType }) => {

    

    return (
        <div className="absolute z-50 w-full mt-1 bg-white/80 backdrop-blur-xl border border-white/30 rounded-lg shadow-2xl max-h-60 overflow-y-auto glass-scrollbar">
            {mockCountries.map((country) => {
                // console.log(visaData);

                const visaRow = visaData.find(v => v.visitor_country === country.id);
                const countryVisaCount = visaRow?.visa_id?.length ?? 0;
                const countryPolicyCount = Object.keys(policies[country.id] || {}).length;
                const hasBlocked = Object.values(policies[country.id] || {}).some(p => p.blocked);
                const isSelected = selectedCountry.id === country.id;

                return (
                    <button
                        key={country.id}
                        type="button"
                        onClick={() => {
                            setSelectedCountry(country);
                            setIsOpen(false);
                            resetForm();
                            setIsAddingVisaType(false);
                        }}
                        className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base
                                transition flex items-center justify-between font-medium
                                ${isSelected
                                ? 'bg-blue-500/80 backdrop-blur-sm text-white hover:bg-blue-600/80'
                                : 'text-gray-900 hover:bg-white/40 backdrop-blur-sm'}`}
                    >
                        <span>
                            {country?.name}
                            {countryVisaCount > 0
                                ? ` (${countryPolicyCount}/${countryVisaCount} configured)`
                                : " (No visa types)"}
                        </span>
                        {hasBlocked && (
                            <span className={isSelected ? 'text-white' : 'text-red-500'}><Ban size={14} className="sm:size-4 text-red-600 outline-amber-50 outline-2 rounded-full bg-amber-50" /></span>
                        )}
                    </button>
                );
            })}
        </div>
    )
}

export default DropdownList