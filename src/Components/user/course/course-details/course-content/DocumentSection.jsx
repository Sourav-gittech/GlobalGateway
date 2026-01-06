import React from 'react'
import { FileText, Lock, Download, FileIcon } from 'lucide-react';

const DocumentSection = ({ isPurchased, course }) => {

    const handleDocumentDownload = (doc) => {
        if (!doc.isFree && !isPurchased) {
            alert('Please purchase the course to download this document');
            return;
        }
        alert(`Downloading: ${doc.name}`);
    };

    return (
        <div>
            <h3 className="text-lg font-bold text-[#2C3E50] mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#FF5252]" />
                Course Documents
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#FF5252 #f1f1f1' }}>
                {course.documents.map((doc, idx) => (
                    <div
                        key={idx}
                        className="border border-gray-200 rounded-lg p-4 hover:border-[#FF5252] transition-all bg-white hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${doc.isFree || isPurchased
                                    ? 'bg-blue-100'
                                    : 'bg-gray-100'
                                    }`}>
                                    <FileIcon className={`w-6 h-6 ${doc.isFree || isPurchased
                                        ? 'text-blue-600'
                                        : 'text-gray-400'
                                        }`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-gray-900 text-sm truncate">{doc.name}</h4>
                                        {doc.isFree && (
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold uppercase flex-shrink-0">
                                                Free
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-600">
                                        <span className="font-medium">{doc.type}</span>
                                        <span>•</span>
                                        <span>{doc.size}</span>
                                        <span>•</span>
                                        <span>{doc.pages} pages</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDocumentDownload(doc)}
                                disabled={!doc.isFree && !isPurchased}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all flex-shrink-0 ${doc.isFree || isPurchased
                                    ? 'bg-[#FF5252] hover:bg-[#E63946] text-white shadow-md hover:shadow-lg transform hover:scale-105'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {doc.isFree || isPurchased ? (
                                    <>
                                        <Download className="w-4 h-4" />
                                        <span>Download</span>
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-4 h-4" />
                                        <span>Locked</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DocumentSection