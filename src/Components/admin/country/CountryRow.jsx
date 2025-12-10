import React from 'react';
import { ChevronDown, ChevronRight, Edit, Trash2, Globe } from 'lucide-react';
import CountryDetailsExpanded from './CountryDetailsExpanded';

const CountryRow = ({ country, setSelectedCountry, setIsModalOpen, setCountries, countries, expandedCountryId, setExpandedCountryId }) => {
    const isExpanded = expandedCountryId === country.id;

    const handleToggleExpand = () => {
        setExpandedCountryId(isExpanded ? null : country.id);
    };

    return (
        <>
            {/* MAIN ROW */}
            <tr className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                {/* CHEVRON COLUMN - Expandable */}
                <td className="p-4">
                    <button
                        onClick={handleToggleExpand}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        {isExpanded ? (
                            <ChevronDown className="w-5 h-5" />
                        ) : (
                            <ChevronRight className="w-5 h-5" />
                        )}
                    </button>
                </td>

                {/* COUNTRY */}
                <td className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-6 rounded overflow-hidden bg-slate-700 flex items-center justify-center flex-shrink-0">
                            {country?.country_details?.flag_url ? (
                                <img
                                    src={country?.country_details?.flag_url}
                                    alt={`${country?.name} flag`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Globe className="w-4 h-4 text-slate-400" />
                            )}
                        </div>

                        <div className="min-w-0">
                            <div className="text-sm font-medium text-white truncate">
                                {country?.name}
                            </div>
                            <div className="text-xs text-slate-400 truncate">
                                {country?.country_details?.official_name}
                            </div>
                        </div>
                    </div>
                </td>

                {/* CODE */}
                <td className="p-4">
                    <span className="text-sm text-slate-300 font-mono">
                        {country?.country_details?.code}
                    </span>
                </td>

                {/* CONTINENT */}
                <td className="p-4 text-sm text-slate-300">{country?.country_details?.region}</td>

                {/* REGION */}
                <td className="p-4 text-sm text-slate-300">{country?.region}</td>

                {/* CAPITAL */}
                <td className="p-4 text-sm text-slate-300">{country?.capital}</td>

                {/* CURRENCY */}
                <td className="p-4 text-sm text-slate-300">{country?.currency}</td>

                {/* LANGUAGE */}
                <td className="p-4 text-sm text-slate-300">{country?.language}</td>

                {/* STATUS */}
                <td className="p-4">
                    <div className="flex flex-col gap-1">
                        <span
                            className={`px-2 py-0.5 rounded-full border text-xs inline-block w-fit whitespace-nowrap ${
                                country?.is_active
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                            }`}
                        >
                            {country?.is_active ? "Active" : "Inactive"}
                        </span>
                        {country?.visa_required && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs inline-block w-fit whitespace-nowrap">
                                Visa Required
                            </span>
                        )}
                    </div>
                </td>

                {/* ACTIONS */}
                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setSelectedCountry(country);
                                setIsModalOpen(true);
                            }}
                            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-colors"
                            title="Edit"
                        >
                            <Edit className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() =>
                                confirm("Delete this country?") &&
                                setCountries(countries.filter((x) => x.id !== country?.id))
                            }
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </td>
            </tr>

            {/* EXPANDED ROW */}
            {isExpanded && <CountryDetailsExpanded c={country} />}
        </>
    );
};

export default CountryRow;