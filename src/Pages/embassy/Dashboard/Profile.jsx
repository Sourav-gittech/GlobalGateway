import React, { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Users,
  Clock,
  Edit2,
  Save,
  X,
  Camera,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    embassyName: "US Embassy",
    country: "United States",
    email: "contact@usembassy.com",
    phone: "+1 (555) 123-4567",
    address: "123 Embassy Lane, Capital City",
    website: "www.usembassy.com",
    establishedDate: "January 15, 1985",
    totalStaff: "45",
    workingHours: "9:00 AM - 5:00 PM",
    description: "The United States Embassy provides consular services, visa processing, and diplomatic support to citizens and visitors."
  });

  const [editedData, setEditedData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editedData });
    setIsEditing(false);
    // TODO: Add API call to save data
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...profileData });
  };

  const handleChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    {
      icon: CheckCircle,
      label: "Applications Processed",
      value: "1,234",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Clock,
      label: "Average Processing Time",
      value: "15 days",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      label: "Active Staff",
      value: profileData.totalStaff,
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: AlertCircle,
      label: "Pending Reviews",
      value: "23",
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Embassy Profile</h1>
          <p className="text-gray-600 mt-1">Manage your embassy information and settings</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit2 size={18} />
            <span className="hidden sm:inline">Edit Profile</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <X size={18} />
              <span className="hidden sm:inline">Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save size={18} />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
          {isEditing && (
            <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
              <Camera size={18} />
            </button>
          )}
        </div>

        {/* Profile Content */}
        <div className="relative px-6 pb-6">
          {/* Embassy Logo */}
          <div className="relative -mt-16 mb-4">
            <div className="w-32 h-32 rounded-xl bg-white border-4 border-white shadow-lg flex items-center justify-center">
              <Building2 size={48} className="text-blue-600" />
              {isEditing && (
                <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Camera size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Embassy Info */}
          <div className="space-y-6">
            {/* Name and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Embassy Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.embassyName}
                    onChange={(e) => handleChange('embassyName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-semibold">{profileData.embassyName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-semibold">{profileData.country}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              {isEditing ? (
                <textarea
                  value={editedData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-600">{profileData.description}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone size={18} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin size={18} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.address}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Globe size={18} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editedData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <a href={`https://${profileData.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {profileData.website}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-pink-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Established
                  </label>
                  <p className="text-gray-900">{profileData.establishedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Users size={18} className="text-indigo-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Staff
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.totalStaff}
                      onChange={(e) => handleChange('totalStaff', e.target.value)}
                      className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.totalStaff}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-teal-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Working Hours
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.workingHours}
                      onChange={(e) => handleChange('workingHours', e.target.value)}
                      className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.workingHours}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}