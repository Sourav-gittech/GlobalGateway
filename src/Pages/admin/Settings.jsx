import React, { useState } from "react";
import { 
  Globe,
  Palette,
  Save,
  RefreshCw,
  Check,
  Moon,
  Sun,
  Monitor,
  Mail,
  Lock,
  X
} from "lucide-react";

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
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      {helper && <p className="mt-1 text-xs text-slate-400">{helper}</p>}
    </div>
  );
}

export default function Settings() {
  // State management
  const [siteName, setSiteName] = useState("Global Gateway");
  const [siteDescription, setSiteDescription] = useState("Visa Immigration Services Platform-connecting Users with Embessies");
  const [adminEmail, setAdminEmail] = useState("admin@globalgateway.com");
  const [supportEmail, setSupportEmail] = useState("support@globalgateway.com");
  
  const [theme, setTheme] = useState("dark");
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handlers
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleReset = () => {
    setSiteName("Global Gateway");
    setSiteDescription("Immigration Services Platform");
    setAdminEmail("admin@globalgateway.com");
    setSupportEmail("support@globalgateway.com");
    setTheme("dark");
  };

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
        <SettingsSection
          title="General"
          description="Basic application settings"
          icon={Globe}
        >
          <FormField
            label="Site Name"
            id="siteName"
            placeholder="Enter site name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            disabled={true}
          />
          <FormField
            label="Site Description"
            id="siteDescription"
            placeholder="Enter site description"
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            disabled={true}
          />
          <FormField
            label="Admin Email"
            id="adminEmail"
            type="email"
            placeholder="admin@example.com"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            helper="Primary contact for system notifications"
            disabled={true}
          />
          <FormField
            label="Support Email"
            id="supportEmail"
            type="email"
            placeholder="support@example.com"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            helper="Customer support contact email"
            disabled={true}
          />
        </SettingsSection>

        {/* Appearance & Account */}
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
                className={`p-3 rounded-lg border transition-all ${
                  theme === "light"
                    ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                    : "bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                }`}
              >
                <Sun className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs">Light</div>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-3 rounded-lg border transition-all ${
                  theme === "dark"
                    ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                    : "bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                }`}
              >
                <Moon className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs">Dark</div>
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`p-3 rounded-lg border transition-all ${
                  theme === "system"
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
              <button className="w-full px-4 py-2.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/30 text-white text-sm transition-all flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Deactivate Account
              </button>
              <button className="w-full px-4 py-2.5 rounded-lg bg-red-600/30 hover:bg-red-600/50 border border-red-500/30 text-white text-sm transition-all flex items-center justify-center gap-2">
                <X className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}