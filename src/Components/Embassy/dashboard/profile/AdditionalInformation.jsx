import { Calendar, Clock } from 'lucide-react'
import React from 'react'

const AdditionalInformation = ({ profileData, editedData, isEditing }) => {
    return (
        <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Additional Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-lg border border-pink-100">
                    <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                        <Calendar size={20} className="text-pink-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Established
                        </label>
                        <p className="text-gray-900 font-medium">{profileData.establishedDate}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                        <Clock size={20} className="text-teal-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Working Hours
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedData.workingHours}
                                onChange={(e) => handleChange('workingHours', e.target.value)}
                                className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{profileData.workingHours}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdditionalInformation