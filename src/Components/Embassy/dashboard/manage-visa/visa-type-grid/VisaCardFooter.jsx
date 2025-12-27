import { Edit2, Lock, Trash2, Unlock } from 'lucide-react'
import React from 'react'

const VisaCardFooter = ({ handleEditVisa, handleBlockVisa, handleDeleteVisa, visaType, policy }) => {
    return (
        <div className="flex gap-2 pt-2">
            <button
                onClick={() => handleEditVisa(visaType.id)}
                className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                <Edit2 className="w-4 h-4" />
                Edit
            </button>
            <button
                onClick={() => handleBlockVisa(visaType.id)}
                className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${policy?.blocked
                    ? 'bg-green-50 text-green-700 hover:bg-green-100'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                    }`}
            >
                {policy?.blocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
            <button
                onClick={() => handleDeleteVisa(visaType.id)}
                className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    )
}

export default VisaCardFooter