import { Edit2, Save, X } from 'lucide-react';
import React from 'react'

const ActionBtn = ({ isEditing, setIsEditing, setEditedData, handleCancel, handleSave, profileData }) => {

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData({ ...profileData });
    };

    return (
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            {!isEditing ? (
                <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-blue-400/30
        text-blue-300 hover:bg-white/30 hover:text-white transition-all duration-300 ease-out active:scale-95 font-medium">
                    <Edit2 size={18} />
                    <span className="hidden sm:inline">Edit Profile</span>
                </button>
            ) : (
                <div className="flex items-center gap-3">
                    {/* Cancel */}
                    <button
                        onClick={handleCancel}
                        className=" flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/30
                  text-white hover:bg-white/30 hover:text-white transition-all duration-300 ease-out active:scale-95">
                        <X size={18} />
                        <span className="hidden sm:inline">Cancel</span>
                    </button>

                    {/* Save */}
                    <button
                        onClick={handleSave}
                        className=" flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/20 backdrop-blur-xl border border-emerald-400/30
          text-emerald-300 shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:bg-emerald-500/30 hover:text-emerald-400
          transition-all duration-300 ease-out active:scale-95 font-medium">
                        <Save size={18} />
                        <span className="hidden sm:inline">Save Changes</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default ActionBtn