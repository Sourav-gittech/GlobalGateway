import React from 'react'
import { Plus, Trash2 } from 'lucide-react'

const VisaCardConfigBtn = ({ handleEditVisa, handleDeleteVisaType, visaType }) => {
    return (
        <div className="space-y-2">
            <button
                onClick={() => handleEditVisa(Object.keys(visaType)[0])}
                className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 transition-colors flex items-center justify-center gap-2"
            >
                <Plus className="w-4 h-4" />
                Configure Policy
            </button>
            <button
                onClick={() => handleDeleteVisaType(visaType.id)}
                className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                <Trash2 className="w-4 h-4" />
                Remove Visa Type
            </button>
        </div>
    )
}

export default VisaCardConfigBtn