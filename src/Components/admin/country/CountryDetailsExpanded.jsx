import React from 'react'

const CountryDetailsExpanded = ({ c }) => {
    return (
        <tr className="border-b border-slate-700/40 bg-slate-900/40">
            <td colSpan={10} className="p-0">
                <div className="relative w-full h-56 md:h-72 overflow-hidden">
                    <img
                        src={c.image_url}
                        alt={c.name}
                        className="w-full h-full object-cover opacity-90"
                    />

                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <img
                            src={c.flag_url}
                            alt="flag"
                            className="h-10 w-14 object-cover rounded shadow-md border border-slate-600"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                {c.name}
                            </h2>
                            <p className="text-slate-300 text-sm">
                                {c.official_name}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-10 bg-slate-900/60">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">
                                Basic Information
                            </h3>
                            <div className="text-slate-300 text-sm space-y-2">
                                <p>
                                    <b>Continent:</b> {c.continent}
                                </p>
                                <p>
                                    <b>Region:</b> {c.region}
                                </p>
                                <p>
                                    <b>Capital:</b> {c.capital}
                                </p>
                                <p>
                                    <b>Area:</b> {c.area}
                                </p>
                                <p>
                                    <b>Population:</b> {c.population}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">
                                Cultural & Financial
                            </h3>
                            <div className="text-slate-300 text-sm space-y-2">
                                <p>
                                    <b>Currency:</b> {c.currency}
                                </p>
                                <p>
                                    <b>Language:</b> {c.language}
                                </p>
                                <p>
                                    <b>Visa Required:</b>{" "}
                                    {c.visa_required ? "Yes" : "No"}
                                </p>
                                <p>
                                    <b>Status:</b> {c.is_active ? "Active" : "Inactive"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {c.overview && (
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">
                                Overview
                            </h3>
                            <p className="text-slate-300 text-sm">
                                {c.overview}
                            </p>
                        </div>
                    )}

                    {c.description && (
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">
                                Description
                            </h3>
                            <p className="text-slate-300 text-sm">
                                {c.description}
                            </p>
                        </div>
                    )}

                    {c.available_visas && (
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">
                                Available Visas
                            </h3>
                            <p className="text-slate-300 text-sm">
                                {c.available_visas}
                            </p>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    )
}

export default CountryDetailsExpanded