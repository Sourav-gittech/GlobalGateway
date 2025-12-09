import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react';
import CountryDetailsExpanded from './CountryDetailsExpanded';

const CountryRow = ({ c }) => {
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdownId((prev) => (prev === id ? null : id));
    };

    return (
        <>
            {/* MAIN ROW */}
            <tr className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                <td className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-6 rounded overflow-hidden bg-slate-700 flex items-center justify-center flex-shrink-0">
                            {c.flag_url ? (
                                <img
                                    src={c.flag_url}
                                    alt={`${c.name} flag`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Globe className="w-4 h-4 text-slate-400" />
                            )}
                        </div>

                        <div className="min-w-0">
                            <div className="text-sm font-medium text-white truncate">
                                {c.name}
                            </div>
                            <div className="text-xs text-slate-400 truncate">
                                {c.official_name}
                            </div>
                        </div>
                    </div>
                </td>

                <td className="p-4">
                    <span className="text-sm text-slate-300 font-mono">
                        {c.code}
                    </span>
                </td>

                <td className="p-4 text-sm text-slate-300">{c.continent}</td>
                <td className="p-4 text-sm text-slate-300">{c.region}</td>
                <td className="p-4 text-sm text-slate-300">{c.capital}</td>
                <td className="p-4 text-sm text-slate-300">{c.currency}</td>
                <td className="p-4 text-sm text-slate-300">{c.language}</td>

                <td className="p-4">
                    <div className="flex flex-col gap-1">
                        {c.visa_required && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs inline-block w-fit whitespace-nowrap">
                                Visa Required
                            </span>
                        )}
                        <span
                            className={`px-2 py-0.5 rounded-full border text-xs inline-block w-fit whitespace-nowrap ${c.is_active
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                                }`}
                        >
                            {c.is_active ? "Active" : "Inactive"}
                        </span>
                    </div>
                </td>

                {/* ACTIONS */}
                <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                        <button
                            onClick={() => {
                                setSelectedCountry(c);
                                setIsModalOpen(true);
                            }}
                            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() =>
                                confirm("Delete this country?") &&
                                setCountries(countries.filter((x) => x.id !== c.id))
                            }
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </td>

                {/* DROPDOWN */}
                <td className="p-4">
                    <button
                        onClick={() => toggleDropdown(c.id)}
                        className="p-2 rounded-lg bg-slate-700/40 hover:bg-slate-600/40 text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                        {openDropdownId === c.id ? (
                            <>
                                <ChevronUp className="w-4 h-4" />
                                <span className="hidden sm:inline text-xs">
                                    Less
                                </span>
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4" />
                                <span className="hidden sm:inline text-xs">
                                    More
                                </span>
                            </>
                        )}
                    </button>
                </td>
            </tr>

            {/* EXPANDED ROW */}
            {openDropdownId === c.id && (
                <CountryDetailsExpanded c={c} />
            )}
        </>
    )
}

export default CountryRow