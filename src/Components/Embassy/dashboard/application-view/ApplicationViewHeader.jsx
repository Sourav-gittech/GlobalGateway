import React from 'react'
import { ArrowLeft, Download, Printer } from 'lucide-react'
import handleDownload from '../../../../util/pdf/downloadApplicationDetails'

const ApplicationViewHeader = ({ application }) => {

    const handlePrint = () => {
        window.print();
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => window.history.back()}
                    className="p-2 hover:bg-white rounded-lg transition-colors border border-gray-200"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Application Details
                    </h1>
                    <p className="text-gray-600 mt-1">Application ID: {application?.id}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <Printer size={18} />
                    <span className="hidden sm:inline">Print</span>
                </button>
                <button
                    onClick={() => handleDownload(application)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <Download size={18} />
                    <span className="hidden sm:inline">Download</span>
                </button>
            </div>
        </div>
    )
}

export default ApplicationViewHeader