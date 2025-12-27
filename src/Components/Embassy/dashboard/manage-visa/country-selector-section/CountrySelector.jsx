import React from 'react'
import DropdownBtn from './DropdownBtn';
import DropdownList from './DropdownList';
import { Ban } from 'lucide-react';

const CountrySelector = ({ setIsOpen, isOpen, selectedCountry, resetForm, visaData, countryDetails, visaTypesByCountry, mockCountries, policies, setSelectedCountry, setIsAddingVisaType, dropdownRef }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-3 sm:p-4 md:p-5 w-full">

            <label htmlFor="country-select"
                className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-2">
                Select Country
            </label>

            <div className="relative w-full" ref={dropdownRef}>
                {/* Selected Value Display */}
                <DropdownBtn setIsOpen={setIsOpen} isOpen={isOpen} visaData={visaData} selectedCountry={selectedCountry} policies={policies} />

                {/* Dropdown List */}
                {isOpen && (
                    <DropdownList mockCountries={mockCountries} resetForm={resetForm} visaData={visaData} countryDetails={countryDetails} policies={policies} visaTypesByCountry={visaTypesByCountry} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setIsOpen={setIsOpen} setIsAddingVisaType={setIsAddingVisaType} />
                )}
            </div>

            {/* Blocked */}
            {Object.values(policies[selectedCountry?.id] || {}).some(p => p.blocked) && (
                <div className="mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-600 bg-red-50/50 backdrop-blur-sm px-2 py-1 rounded">
                    <Ban size={14} className="sm:size-4" />
                    <span className="font-medium">Blocked country</span>
                </div>
            )}
        </div>
    )
}

export default CountrySelector