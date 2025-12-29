import React from 'react'
import { Ban, ChevronDown, ChevronRight, Eye, Globe, ShieldCheck } from 'lucide-react';
import EmbassyExpanded from './EmbassyExpanded';

const EmbassyRow = ({ embassy, expandedEmbassies, setExpandedEmbassies,setSelectedDocument }) => {

    const getStatusColor = (status) => {
        const colors = {
            approved: 'bg-green-500/20 text-green-400',
            pending: 'bg-yellow-500/20 text-yellow-400',
            rejected: 'bg-red-500/20 text-red-400'
        };
        return colors[status] || 'bg-gray-500/20 text-gray-400';
    };

    const ActionButton = ({ onClick, icon: Icon, color, title }) => (
        <button
            onClick={onClick}
            className={`p-2 hover:bg-${color}-500/20 text-${color}-400 rounded-lg transition-colors cursor-pointer`}
            title={title}
        >
            <Icon className="w-4 h-4" />
        </button>
    );

    return (
        <>
            <tr className="border-b border-slate-600/50 hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4">
                    <button
                        onClick={() => setExpandedEmbassies(prev => ({ ...prev, [embassy.id]: !prev[embassy.id] }))}
                        className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                        {expandedEmbassies[embassy.id] ?
                            <ChevronDown className="w-5 h-5" /> :
                            <ChevronRight className="w-5 h-5" />
                        }
                    </button>
                </td>

                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{embassy.flag}</span>
                        <div>
                            <div className="text-white font-medium flex items-center gap-2">
                                {embassy.name}
                                {embassy.isBlocked && (
                                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-medium rounded flex items-center gap-1 border border-red-500/30">
                                        <Ban className="w-3 h-3" />
                                        Blocked
                                    </span>
                                )}
                                {embassy.isNewCountry && (
                                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded flex items-center gap-1 border border-blue-500/30">
                                        <Globe className="w-3 h-3" />
                                        New Country
                                    </span>
                                )}
                            </div>
                            <div className="text-xs text-slate-500">{embassy.country}</div>
                        </div>
                    </div>
                </td>

                <td className="px-6 py-4 text-slate-300 text-sm">{embassy.email}</td>
                <td className="px-6 py-4 text-slate-300 text-sm">{embassy.registeredDate}</td>

                <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded text-xs font-medium capitalize ${getStatusColor(embassy.status)}`}>
                        {embassy.status}
                    </span>
                </td>

                <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <ActionButton onClick={() => setSelectedDocument(embassy)} icon={Eye} color="blue" title="View Document" />

                        {embassy.isBlocked ?
                            <ActionButton onClick={() => console.log('Unblock', embassy.id)} icon={ShieldCheck} color="green" title="Unblock" /> :
                            <ActionButton onClick={() => console.log('Block', embassy.id)} icon={Ban} color="red" title="Block" />
                        }
                    </div>
                </td>
            </tr>

            {expandedEmbassies[embassy.id] && (
                <EmbassyExpanded embassy={embassy} />
            )}
        </>
    )
}

export default EmbassyRow