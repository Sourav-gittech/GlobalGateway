import React from 'react'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'

const ContactDetails = ({ isEditing, editedData, profileData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Email Address
                    </label>
                    <div className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                        {editedData?.email}
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Phone Number
                    </label>
                    {isEditing ? (
                        <input
                            type="tel"
                            value={editedData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />
                    ) : (
                        <p className="text-gray-900 font-medium">{profileData?.phone}</p>
                    )}
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Physical Address
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editedData?.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />
                    ) : (
                        <p className="text-gray-900 font-medium">{profileData?.address}</p>
                    )}
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Globe size={20} className="text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Official Website
                    </label>
                    {isEditing ? (
                        <input
                            type="url"
                            value={editedData?.website}
                            onChange={(e) => handleChange('website', e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />
                    ) : (
                        <a
                            href={`https://${profileData?.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 font-medium hover:underline truncate block"
                        >
                            {profileData?.website}
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContactDetails