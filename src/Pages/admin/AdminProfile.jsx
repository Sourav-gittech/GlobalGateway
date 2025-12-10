import React, { useState } from "react";
import { User, Mail, Phone, Building, Calendar, Shield, Edit2, Save, X, AlertCircle } from "lucide-react";

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [profile, setProfile] = useState({
    name: "Global Gateway Admin",
    email: "admin@global.com",
    phone: "+91-9898989898",
    role: "Administrator",
    joinDate: "January 15, 2023",
  });
  const [edit, setEdit] = useState({ ...profile });

  const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const validateForm = () => {
    const newErrors = {};
    if (!edit.name.trim()) newErrors.name = "Name is required";
    if (!edit.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
    if (!edit.phone.match(/^\+?[\d\s\-()]+$/)) newErrors.phone = "Invalid phone format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setProfile({ ...edit });
      setIsEditing(false);
      setErrors({});
    }
  };

  const handleCancel = () => {
    setEdit({ ...profile });
    setIsEditing(false);
    setErrors({});
  };

  const InfoCard = ({ icon: Icon, label, value, field, type = "text", color }) => (
    <div className="bg-transparent p-4 rounded-lg border border-slate-700/50 transition-all hover:border-slate-600/50">
      <label className="text-xs text-slate-400 flex items-center gap-2 mb-2" htmlFor={field}>
        <Icon className={`w-4 h-4 ${color}`} />
        {label}
      </label>
      {isEditing && field ? (
        <div>
          <input
            id={field}
            type={type}
            value={edit[field]}
            onChange={(e) => setEdit({ ...edit, [field]: e.target.value })}
            className={`w-full px-3 py-2 rounded bg-slate-800 border ${errors[field] ? 'border-red-500' : 'border-slate-600'} text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            aria-invalid={!!errors[field]}
            aria-describedby={errors[field] ? `${field}-error` : undefined}
          />
          {errors[field] && (
            <p id={`${field}-error`} className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors[field]}
            </p>
          )}
        </div>
      ) : (
        <p className="text-white font-medium break-words">{value}</p>
      )}
    </div>
  );

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Profile</h1>
          <p className="text-slate-400 text-sm md:text-base">Manage your admin account information</p>
        </header>

        {/* Main Card */}
        <div className="bg-transparent border border-slate-800/50 rounded-2xl p-6 md:p-10 mt-10">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 md:w-30 md:h-30 rounded-full bg-gradient-to-br from-gray-600 to-white/10 flex items-center justify-center text-white text-3xl md:text-5xl font-bold shadow-lg ring-4 ring-slate-400" aria-label={`Profile picture for ${profile.name}`}>
                {getInitials(profile.name)}
              </div>
              <div>
                <h2 className="text-xl md:text-3xl font-bold text-white">{profile.name}</h2>
                <p className="text-blue-400 font-medium text-sm md:text-base">{profile.role}</p>
                <div className="flex items-center gap-2 mt-1 text-slate-400 text-xs md:text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Full Access</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-transparent border border-gray-300 hover:bg-white/10 px-5 py-2.5 rounded-lg text-white flex items-center gap-2 transition-all"
                  aria-label="Edit profile"
                >
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-700 hover:bg-green-800 px-5 py-2.5 rounded-lg text-white flex items-center gap-2 transition-all"
                    aria-label="Save changes"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-slate-700 hover:bg-slate-600 px-5 py-2.5 rounded-lg text-white flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label="Cancel editing"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
            <InfoCard icon={Mail} label="Email Address" value={profile.email} field="email" type="email" color="text-blue-400" />
            <InfoCard icon={Phone} label="Phone Number" value={profile.phone} field="phone" color="text-green-400" />
            <InfoCard icon={Calendar} label="Member Since" value={profile.joinDate} color="text-orange-400" />
          </div>
        </div>
      </div>
    </div>
  );
}