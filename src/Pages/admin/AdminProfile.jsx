import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Shield,
  Edit2,
  Save,
  X
} from "lucide-react";

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@global.com",
    phone: "+91-9898989898",
    role: "Administrator",

    joinDate: "January 15, 2023",
    bio: "Experienced administrator managing visa processing and immigration operations with over 5 years of expertise."
  });

  const [edit, setEdit] = useState({ ...profile });

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleSave = () => {
    setProfile({ ...edit });
    setIsEditing(false);
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Profile</h1>
        <p className="text-slate-400">Manage your admin account information</p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-transparent border border-slate-700/50 rounded-xl p-6 md:p-8 shadow-xl">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Avatar + Info */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-30 lg:h-30 rounded-full bg-gradient-to-br from-gray-900/30 to-white/10 flex items-center justify-center text-white text-3xl md:text-5xl font-bold shadow-lg border border-white">
              {getInitials(profile.name)}
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {profile.name}
              </h2>
              <p className="text-blue-400 font-medium">{profile.role}</p>

              <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
                <Shield className="w-4 h-4" />
                <span>Full Access</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" /> Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-white flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save
                </button>

                <button
                  onClick={() => {
                    setEdit({ ...profile });
                    setIsEditing(false);
                  }}
                  className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg text-white flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          {/* EMAIL */}
          <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-700/50">
            <label className="text-xs text-slate-400 flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-blue-400" />
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={edit.email}
                onChange={(e) => setEdit({ ...edit, email: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"
              />
            ) : (
              <p className="text-white font-medium">{profile.email}</p>
            )}
          </div>

          {/* PHONE */}
          <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-700/50">
            <label className="text-xs text-slate-400 flex items-center gap-2 mb-1">
              <Phone className="w-4 h-4 text-green-400" />
              Phone
            </label>
            {isEditing ? (
              <input
                type="text"
                value={edit.phone}
                onChange={(e) => setEdit({ ...edit, phone: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"
              />
            ) : (
              <p className="text-white font-medium">{profile.phone}</p>
            )}
          </div>

          {/* JOIN DATE */}
          <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-700/50">
            <label className="text-xs text-slate-400 flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-orange-400" />
              Join Date
            </label>

            <p className="text-white font-medium">{profile.joinDate}</p>
          </div>
        </div>

        {/* BIO SECTION (FULL WIDTH) */}
        <div className="mt-6">
          <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-700/50">
            <label className="text-xs text-slate-400 flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-cyan-400" />
              Bio
            </label>

            {isEditing ? (
              <textarea
                rows="4"
                value={edit.bio}
                onChange={(e) => setEdit({ ...edit, bio: e.target.value })}
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white resize-none"
              />
            ) : (
              <p className="text-white leading-relaxed">{profile.bio}</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
