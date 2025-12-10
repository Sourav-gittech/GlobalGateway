import React from "react";
import GeneralSettings from "../../Components/admin/settings/GeneralSettings";
import AppearanceSettings from "../../Components/admin/settings/AppearanceSettings";

// Settings Section Component
function SettingsSection({ title, description, icon: Icon, children }) {
  return (
    <div className="p-5 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <div className="flex items-start gap-3 mb-4 sm:mb-5">
        <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{title}</h3>
          {description && <p className="text-sm text-slate-400">{description}</p>}
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

// Form Field Component
function FormField({ label, id, type = "text", placeholder, value, onChange, helper, disabled }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled}
          className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      {helper && <p className="mt-1 text-xs text-slate-400">{helper}</p>}
    </div>
  );
}

export default function Settings() {

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings and Privacy</h1>
          <p className="text-slate-400">Manage your application preferences and configurations</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* General Settings - Disabled */}
        <GeneralSettings SettingsSection={SettingsSection} FormField={FormField} />

        {/* Appearance & Account */}
        <AppearanceSettings SettingsSection={SettingsSection} />

      </div>
    </div>
  );
}