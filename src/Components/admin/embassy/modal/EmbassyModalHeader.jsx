import { Check, X } from 'lucide-react';
import React from 'react'

const EmbassyModalHeader = ({selectedDocument,setSelectedDocument}) => {
    return (
        <div className="p-6 border-b border-slate-600/50 flex items-center justify-between bg-slate-800/70">
            <div>
                <h3 className="text-2xl font-bold text-white">Document Preview</h3>
                <p className="text-slate-400 text-sm mt-0.5">{selectedDocument.name}</p>
            </div>

            <div className="flex items-center gap-3">
                {selectedDocument.status === 'pending' && (
                    <>
                        <button
                            onClick={() => { console.log('Approve', selectedDocument.id); setSelectedDocument(null); }}
                            className="flex items-center gap-2 px-6 py-2.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all duration-200 font-semibold border border-green-500/40 cursor-pointer"
                        >
                            <Check className="w-5 h-5" />
                            Approve
                        </button>

                        <button
                            onClick={() => { console.log('Reject', selectedDocument.id); setSelectedDocument(null); }}
                            className="flex items-center gap-2 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200 font-semibold border border-red-500/40 cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                            Reject
                        </button>
                    </>
                )}

                <button
                    onClick={() => setSelectedDocument(null)}
                    className="p-2.5 hover:bg-slate-700/50 rounded-lg transition-all cursor-pointer"
                >
                    <X className="w-6 h-6 text-slate-400 hover:text-white" />
                </button>
            </div>
        </div>
    )
}

export default EmbassyModalHeader