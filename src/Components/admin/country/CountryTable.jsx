import React, { useState } from 'react';
import { Globe, Plus } from 'lucide-react';
import CountryRow from './CountryRow';
import CountryFormModal from './CountryFormModal';

const CountryTable = ({ searchQuery, filtered, countries, filterContinent, setCountries }) => {
    const [expandedCountryId, setExpandedCountryId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleSaveCountry = (countryData) => {
        if (selectedCountry) {
            // Update existing country
            setCountries(countries.map(c => c.id === countryData.id ? countryData : c));
        } else {
            // Add new country
            setCountries([...countries, countryData]);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCountry(null);
    };

    return (
        <>
            <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden max-h-[600px] flex flex-col">
                <div className="overflow-x-auto overflow-y-auto flex-1">
                    <table className="w-full">
                        <thead className="sticky top-0 bg-slate-800/90 backdrop-blur-sm z-10">
                            <tr className="border-b border-slate-700/50">
                                <th className="w-12 p-4"></th>
                                {["Country", "Code", "Continent", "Region", "Capital", "Currency", "Language", "Status", "Actions"].map((h) => (
                                    <th
                                        key={h}
                                        className="text-left p-4 text-sm font-semibold text-slate-300"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((c) => (
                                <CountryRow 
                                    key={c.id} 
                                    c={c}
                                    setSelectedCountry={setSelectedCountry}
                                    setIsModalOpen={setIsModalOpen}
                                    setCountries={setCountries}
                                    countries={countries}
                                    expandedCountryId={expandedCountryId}
                                    setExpandedCountryId={setExpandedCountryId}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* FOOTER */}
                {filtered.length === 0 && (
                    <div className="p-12 text-center">
                        <Globe className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-400 mb-2">
                            {searchQuery || filterContinent
                                ? "No countries found"
                                : "No countries yet"}
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">
                            {searchQuery || filterContinent
                                ? "Try adjusting your search"
                                : "Add your first country"}
                        </p>

                        {!searchQuery && !filterContinent && (
                            <button
                                onClick={() => {
                                    setSelectedCountry(null);
                                    setIsModalOpen(true);
                                }}
                                className="px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white text-sm transition-all inline-flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Country
                            </button>
                        )}
                    </div>
                )}

                {filtered.length > 0 && (
                    <div className="p-4 border-t border-slate-700/50 text-sm text-slate-400 text-center">
                        Showing {filtered.length} of {countries.length} countries
                    </div>
                )}
            </div>

            {/* MODAL */}
            <CountryFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                country={selectedCountry}
                onSave={handleSaveCountry}
            />
        </>
    );
};

export default CountryTable;