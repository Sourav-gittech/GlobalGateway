import React from 'react'

const EmbassyDocumentSection = ({selectedDocument}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Embassy Name</p>
                    <p className="text-white font-semibold">{selectedDocument.name}</p>
                </div>
                <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Country</p>
                    <p className="text-white font-semibold">{selectedDocument.country}</p>
                </div>
                <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Registration Date</p>
                    <p className="text-white font-semibold">{selectedDocument.registeredDate}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Document File</p>
                    <p className="text-white font-semibold">{selectedDocument.document}</p>
                </div>
                <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">File Size</p>
                    <p className="text-white font-semibold">{selectedDocument.documentSize}</p>
                </div>
                <div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Status</p>
                    <p className={`capitalize font-bold ${selectedDocument.status === 'approved' ? 'text-green-400' : selectedDocument.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                        {selectedDocument.status}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EmbassyDocumentSection