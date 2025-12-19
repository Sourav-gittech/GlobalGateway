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
  AlertCircle,
  Award,
  Shield,
  FileCheck
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    embassyName: "US Embassy",
    country: "United States",
    continent: "North America",
    countryCode: "US",
    email: "contact@usembassy.com",
    phone: "+1 (555) 123-4567",
    address: "123 Embassy Lane, Capital City",
    website: "www.usembassy.com",
    establishedDate: "January 15, 1985",
    totalStaff: "45",
    workingHours: "9:00 AM - 5:00 PM",
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
      change: "+12.5%",
      changeType: "positive",
      bgColor: "bg-blue-50",
      iconColor: "bg-blue-100 text-blue-600",
      textColor: "text-blue-600"
    },
    {
      icon: Clock,
      label: "Average Processing Time",
      value: "15 days",
      change: "-3 days",
      changeType: "positive",
      bgColor: "bg-green-50",
      iconColor: "bg-green-100 text-green-600",
      textColor: "text-green-600"
    },
    {
      icon: AlertCircle,
      label: "Pending Reviews",
      value: "23",
      change: "5 urgent",
      changeType: "neutral",
      bgColor: "bg-yellow-50",
      iconColor: "bg-yellow-100 text-yellow-600",
      textColor: "text-yellow-600"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Excellence in Service",
      description: "Recognized for outstanding diplomatic services",
      bgColor: "bg-purple-50",
      iconColor: "bg-purple-100 text-purple-600"
    },
    {
      icon: Shield,
      title: "Security Certified",
      description: "ISO 27001 certified for data protection",
      bgColor: "bg-cyan-50",
      iconColor: "bg-cyan-100 text-cyan-600"
    },
    {
      icon: FileCheck,
      title: "Accredited Institution",
      description: "Fully accredited by international bodies",
      bgColor: "bg-emerald-50",
      iconColor: "bg-emerald-100 text-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cover Photo */}
      <div className="relative w-full bg-gray-40">
        {/* Cover Photo - Smaller height */}
        <div className="relative h-48 sm:h-56 md:h-54 -mt-7 w-full overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-500">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          {/* Edit Cover Button */}
          {isEditing && (
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-gray-300 text-white
    hover:bg-white/30 transition-all duration-300 ease-out active:scale-95"
            >
              <Camera size={18} className="opacity-90" />
              <span className="hidden sm:inline text-sm font-medium">
                Change Cover
              </span>
            </button>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="
        flex items-center gap-2 px-5 py-2.5
        rounded-xl
        bg-white/10 backdrop-blur-xl
        border border-blue-400/30
        text-blue-300
        hover:bg-white/30
        hover:text-white
        transition-all duration-300 ease-out
        active:scale-95
        font-medium
      "
              >
                <Edit2 size={18} />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                {/* Cancel */}
                <button
                  onClick={handleCancel}
                  className="
          flex items-center gap-2 px-5 py-2.5
          rounded-xl
          bg-white/10 backdrop-blur-xl
          border border-white/30
          text-white
          hover:bg-white/30
          hover:text-white
          transition-all duration-300 ease-out
          active:scale-95
        "
                >
                  <X size={18} />
                  <span className="hidden sm:inline">Cancel</span>
                </button>

                {/* Save */}
                <button
                  onClick={handleSave}
                  className="
          flex items-center gap-2 px-5 py-2.5
          rounded-xl
          bg-emerald-500/20 backdrop-blur-xl
          border border-emerald-400/30
          text-emerald-300
          shadow-[0_10px_35px_rgba(0,0,0,0.35)]
          hover:bg-emerald-500/30
          hover:text-emerald-400
          transition-all duration-300 ease-out
          active:scale-95
          font-medium
        "
                >
                  <Save size={18} />
                  <span className="hidden sm:inline">Save Changes</span>
                </button>
              </div>
            )}
          </div>

        </div>


        {/* Profile Info Section - Separated containers */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto relative">
            {/* Embassy Logo - Absolute positioned, half overlapping cover */}
            <div className="absolute left-0 -mt-16 sm:-mt-20">
              <div className="w-32 h-32 sm:w-45 sm:h-45 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden">
                <img 
                  src={`https://flagcdn.com/w320/${profileData.countryCode.toLowerCase()}.png`}
                  alt={`${profileData.country} flag`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Embassy Info - Independent positioning */}
            <div className="pt-4 pb-6 pl-0 -mt-3 sm:pl-48">
               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1">
               <span className="text-gray-900">
              {profileData.embassyName.slice(0, Math.ceil(profileData.embassyName.length / 2))}
              </span>
              <span className="text-gray-800">
              {profileData.embassyName.slice(Math.ceil(profileData.embassyName.length / 2))}
              </span>
              </h1>


              <p className="text-md text-gray-600 font-medium ml-1">{profileData.country}, {profileData.continent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.bgColor} rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.iconColor} flex items-center justify-center`}>
                  <stat.icon size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stat.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, idx) => (
              <div key={idx} className={`${achievement.bgColor} rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200`}>
                <div className={`w-12 h-12 rounded-lg ${achievement.iconColor} flex items-center justify-center mb-4`}>
                  <achievement.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium truncate">{profileData.email}</p>
                  )}
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
                    <p className="text-gray-900 font-medium">{profileData.phone}</p>
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
                      value={editedData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.address}</p>
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
                      value={editedData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  ) : (
                    <a
                      href={`https://${profileData.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium hover:underline truncate block"
                    >
                      {profileData.website}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
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
          </div>
        </div>
      </div>
    </div>
  );
}