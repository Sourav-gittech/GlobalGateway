import React, { useState } from 'react'
import { Globe, MapPin, Users, DollarSign, Languages, Plane, CheckCircle, Map, Building2, FileText } from 'lucide-react'

const CountryDetailsExpanded = ({ c }) => {
    const [imageError, setImageError] = useState(false)
    const [flagError, setFlagError] = useState(false)

    const fmt = (n) => n ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 'N/A'

    const stats = [
        { icon: MapPin, label: 'Capital', value: c.capital || 'N/A', color: 'blue' },
        { icon: Users, label: 'Population', value: fmt(c.population), color: 'amber' },
        { icon: Map, label: 'Area', value: c.area ? `${fmt(c.area)} km²` : 'N/A', color: 'blue' },
        { icon: DollarSign, label: 'Currency', value: c.currency || 'N/A', color: 'green' }
    ]

    const sections = [
        {
            title: 'Geographic',
            icon: Globe,
            color: 'blue',
            items: [
                { label: 'Continent', value: c.continent, icon: Globe },
                { label: 'Region', value: c.region, icon: MapPin },
                { label: 'Capital', value: c.capital, icon: Building2 },
                { label: 'Area', value: c.area ? `${fmt(c.area)} km²` : null, icon: Map }
            ]
        },
        {
            title: 'Demographics',
            icon: Users,
            color: 'amber',
            items: [
                { label: 'Population', value: fmt(c.population), icon: Users },
                { label: 'Language', value: c.language, icon: Languages },
                { label: 'Currency', value: c.currency, icon: DollarSign },
                { label: 'Code', value: c.code, icon: FileText, mono: true }
            ]
        },
        {
            title: 'Travel Info',
            icon: Plane,
            color: 'blue',
            items: [
                { 
                    label: 'Visa', 
                    value: c.visa_required ? (
                        <span className="flex items-center gap-1 text-amber-400 font-semibold">
                            <CheckCircle className="w-4 h-4" /> Required
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-green-400 font-semibold">
                            <CheckCircle className="w-4 h-4" /> Not Required
                        </span>
                    ),
                    icon: Plane
                },
                { 
                    label: 'Status', 
                    value: c.is_active ? (
                        <span className="flex items-center gap-1 text-green-400 font-semibold">
                            <CheckCircle className="w-4 h-4" /> Active
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-slate-400 font-semibold">
                            <XCircle className="w-4 h-4" /> Inactive
                        </span>
                    )
                }
            ]
        }
    ]

    const colors = {
        blue: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
        purple: 'text-purple-400 border-purple-500/30 bg-purple-500/5',
        green: 'text-green-400',
        amber: 'text-amber-400',
        cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5'
    }

    return (
        <tr className="bg-slate-900/95">
            <td colSpan={10} className="p-0">
                <div className="border-l-4 border-gray-600">
                    {/* Hero */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                        {!imageError && c.image_url ? (
                            <>
                                <img src={c.image_url} alt={c.name} className="w-full h-full object-cover opacity-40" onError={() => setImageError(true)} loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Globe className="w-20 h-20 text-slate-700" />
                            </div>
                        )}

                        <div className="absolute inset-0 flex items-end p-6">
                            <div className="flex items-center gap-4 w-full">
                                {/* Flag */}
                                <div className="h-14 w-20 rounded-lg shadow-2xl border-2 border-white/20 bg-slate-800 flex items-center justify-center overflow-hidden">
                                    {!flagError && c.flag_url ? (
                                        <img src={c.flag_url} alt={`${c.name} flag`} className="w-full h-full object-cover" onError={() => setFlagError(true)} loading="lazy" />
                                    ) : (
                                        <Globe className="w-6 h-6 text-slate-500" />
                                    )}
                                </div>

                                {/* Name */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-2xl font-bold text-white">{c.name || 'Unknown'}</h2>
                                        {c.code && <span className="px-2 py-1 rounded bg-slate-800/80 border border-slate-600 text-slate-300 text-xs font-mono">{c.code}</span>}
                                    </div>
                                    {c.official_name && <p className="text-slate-300 text-sm flex items-center gap-1"><Building2 className="w-3 h-3" />{c.official_name}</p>}
                                </div>

                                {/* Badges */}
                                <div className="flex gap-2">
                                    <span className={`px-3 py-1 rounded-lg border text-xs font-semibold ${c.is_active ? 'bg-green-500/20 text-green-300 border-green-500/50' : 'bg-slate-500/20 text-slate-300 border-slate-500/50'}`}>
                                        {c.is_active ? '✓ Active' : '○ Inactive'}
                                    </span>
                                    {c.visa_required && (
                                        <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/50 text-xs font-semibold flex items-center gap-1">
                                            <Plane className="w-3 h-3" /> Visa
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-700/20 border-y border-slate-700/50">
                        {stats.map(({ icon: Icon, label, value, color }) => (
                            <div key={label} className="bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-colors">
                                <div className="flex items-center gap-2">
                                    <Icon className={`w-4 h-4 ${colors[color]}`} />
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase">{label}</p>
                                        <p className="text-sm font-semibold text-white">{value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Details */}
                    <div className="p-6 space-y-6 bg-slate-900">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {sections.map(({ title, icon: Icon, color, items }) => (
                                <div key={title} className={`rounded-xl border ${colors[color]} bg-slate-800/40`}>
                                    <div className="p-3 border-b border-slate-700/50 bg-slate-800/50">
                                        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                            <Icon className={`w-4 h-4 ${colors[color]}`} />
                                            {title}
                                        </h3>
                                    </div>
                                    <div className="p-3 space-y-2">
                                        {items.map(({ label, value, icon: ItemIcon, mono }) => 
                                            value ? (
                                                <div key={label} className="flex items-center justify-between gap-3 py-1 border-b border-slate-700/30 last:border-0">
                                                    <div className="flex items-center gap-1 text-slate-400">
                                                        {ItemIcon && <ItemIcon className="w-3 h-3" />}
                                                        <span className="text-xs uppercase">{label}</span>
                                                    </div>
                                                    <div className={`text-sm text-slate-200 ${mono ? 'font-mono' : 'font-semibold'}`}>
                                                        {value}
                                                    </div>
                                                </div>
                                            ) : null
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Text Content */}
                        {(c.overview || c.description) && (
                            <div className="space-y-4">
                                {c.overview && (
                                    <div className="rounded-xl border border-slate-700/50 bg-slate-800/40">
                                        <div className="p-3 border-b border-slate-700/50 bg-slate-800/50">
                                            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-indigo-400" /> Overview
                                            </h3>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-sm text-slate-300 leading-relaxed">{c.overview}</p>
                                        </div>
                                    </div>
                                )}
                                {c.description && (
                                    <div className="rounded-xl border border-slate-700/50 bg-slate-800/40">
                                        <div className="p-3 border-b border-slate-700/50 bg-slate-800/50">
                                            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-violet-400" /> Description
                                            </h3>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{c.description}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default CountryDetailsExpanded