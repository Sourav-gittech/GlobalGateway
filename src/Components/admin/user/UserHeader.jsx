import React from 'react'
import { UserPlus } from "lucide-react";

const UserHeader = () => {

    const handleNewUser = () => {
        console.log("Create new user");
        // In production: Open create user modal
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Users Management</h1>
                <p className="text-slate-400">Manage user accounts, visa applications, and course enrollments</p>
            </div>
            <button
                onClick={handleNewUser}
                className="px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white text-sm transition-all flex items-center gap-2 w-fit"
            >
                <UserPlus className="w-4 h-4" />
                New User
            </button>
        </div>
    )
}

export default UserHeader