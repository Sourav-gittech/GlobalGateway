import React from 'react'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'

const ContactDetails = ({ isEditing, editedData, profileData, handleChange }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Address */}
            <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-shadow">
                <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                        Email Address
                    </label>
                    <div className="text-gray-900 font-medium break-all">
                        {profileData?.email || editedData?.email || 'Not provided'}
                    </div>
                </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-shadow">
                <div className="w-11 h-11 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                        Phone Number
                    </label>
                    {isEditing ? (
                        <input
                            type="tel"
                            value={editedData?.phone || ''}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="Enter phone number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    ) : (
                        <div className="text-gray-900 font-medium">
                            {profileData?.phone || 'Not provided'}
                        </div>
                    )}
                </div>
            </div>

            {/* Physical Address */}
            <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-shadow">
                <div className="w-11 h-11 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                        Physical Address
                    </label>
                    {isEditing ? (
                        <textarea
                            value={editedData?.address || ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                            placeholder="Enter physical address"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        />
                    ) : (
                        <div className="text-gray-900 font-medium">
                            {profileData?.address || 'Not provided'}
                        </div>
                    )}
                </div>
            </div>

            {/* Official Website */}
            <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-shadow">
                <div className="w-11 h-11 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Globe size={20} className="text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                        Official Website
                    </label>
                    {isEditing ? (
                        <input
                            type="url"
                            value={editedData?.website || ''}
                            onChange={(e) => handleChange('website', e.target.value)}
                            placeholder="www.example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    ) : (
                        <a
                            href={profileData?.website ? (profileData.website.startsWith('http') ? profileData.website : `https://${profileData.website}`) : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 font-medium hover:underline truncate block"
                            onClick={(e) => {
                                if (!profileData?.website) e.preventDefault();
                            }}
                        >
                            {profileData?.website || 'Not provided'}
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContactDetails