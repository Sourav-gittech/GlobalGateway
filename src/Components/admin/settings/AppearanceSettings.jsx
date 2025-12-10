import React, { useState } from 'react'
import { Palette, Moon, Sun, Monitor, Mail, Lock, X } from "lucide-react";

const AppearanceSettings = ({ SettingsSection }) => {

    const [theme, setTheme] = useState("dark");

    return (
        <SettingsSection
            title="Appearance & Account"
            description="Customize look and manage your account"
            icon={Palette}
        >
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                    Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={() => setTheme("light")}
                        className={`p-3 rounded-lg border transition-all ${theme === "light"
                            ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                            : "bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                            }`}
                    >
                        <Sun className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-xs">Light</div>
                    </button>
                    <button
                        onClick={() => setTheme("dark")}
                        className={`p-3 rounded-lg border transition-all ${theme === "dark"
                            ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                            : "bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                            }`}
                    >
                        <Moon className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-xs">Dark</div>
                    </button>
                    <button
                        onClick={() => setTheme("system")}
                        className={`p-3 rounded-lg border transition-all ${theme === "system"
                            ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                            : "bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                            }`}
                    >
                        <Monitor className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-xs">System</div>
                    </button>
                </div>
            </div>

            <div className="pt-4 border-t border-slate-700/50">
                <div className="text-sm font-medium text-slate-300 mb-3">Account Information</div>
                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="text-sm font-medium text-white mb-1">Account Status</div>
                    <div className="text-xs text-slate-400">Active since Jan 15, 2024</div>
                </div>
                <div className="space-y-2 mt-4">
                    <button className="w-full px-4 py-2.5 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        Update Email
                    </button>
                    <button className="w-full px-4 py-2.5 rounded-lg bg-red-600/30 hover:bg-red-900 border border-red-500/30 text-white text-sm transition-all flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" />
                        Deactivate Account
                    </button>
                    {/* <button className="w-full px-4 py-2.5 rounded-lg bg-red-600/30 hover:bg-red-600/50 border border-red-500/30 text-white text-sm transition-all flex items-center justify-center gap-2">
                        <X className="w-4 h-4" />
                        Delete Account
                    </button> */}
                </div>
            </div>
        </SettingsSection>
    )
}

export default AppearanceSettings