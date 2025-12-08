import React, { useState } from "react";
import { 
  Sliders,
  User,
  Bell,
  Lock,
  Globe,
  Mail,
  Palette,
  Database,
  Shield,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  X,
  Moon,
  Sun,
  Monitor,
  Download
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
function FormField({ label, id, type = "text", placeholder, value, onChange, helper }) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {helper && <p className="mt-1 text-xs text-slate-400">{helper}</p>}
    </div>
  );
}

// Toggle Switch Component
function ToggleSwitch({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="text-sm font-medium text-white mb-1">{label}</div>
        {description && <div className="text-xs text-slate-400">{description}</div>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex-shrink-0 ${
          checked ? 'bg-blue-600' : 'bg-slate-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

// Select Field Component
function SelectField({ label, id, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Settings() {
  // State management
  const [siteName, setSiteName] = useState("Global Gateway");
  const [siteDescription, setSiteDescription] = useState("Immigration Services Platform");
  const [adminEmail, setAdminEmail] = useState("admin@globalgateway.com");
  const [supportEmail, setSupportEmail] = useState("support@globalgateway.com");
  
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [currency, setCurrency] = useState("INR");
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [applicationUpdates, setApplicationUpdates] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handlers
  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
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
    setLanguage("en");
    setTimezone("Asia/Kolkata");
    setCurrency("INR");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your application preferences and configurations</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white text-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-sm text-green-400">Settings saved successfully!</span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
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
          />
          <FormField
            label="Site Description"
            id="siteDescription"
            placeholder="Enter site description"
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
          />
          <FormField
            label="Admin Email"
            id="adminEmail"
            type="email"
            placeholder="admin@example.com"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            helper="Primary contact for system notifications"
          />
          <FormField
            label="Support Email"
            id="supportEmail"
            type="email"
            placeholder="support@example.com"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            helper="Customer support contact email"
          />
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection
          title="Appearance"
          description="Customize the look and feel"
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
          <SelectField
            label="Language"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={[
              { value: "en", label: "English" },
              { value: "hi", label: "Hindi" },
              { value: "es", label: "Spanish" },
              { value: "fr", label: "French" },
            ]}
          />
          <SelectField
            label="Timezone"
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            options={[
              { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
              { value: "America/New_York", label: "America/New York (EST)" },
              { value: "Europe/London", label: "Europe/London (GMT)" },
              { value: "Asia/Tokyo", label: "Asia/Tokyo (JST)" },
            ]}
          />
          <SelectField
            label="Currency"
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            options={[
              { value: "INR", label: "Indian Rupee (₹)" },
              { value: "USD", label: "US Dollar ($)" },
              { value: "EUR", label: "Euro (€)" },
              { value: "GBP", label: "British Pound (£)" },
            ]}
          />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          title="Notifications"
          description="Manage your notification preferences"
          icon={Bell}
        >
          <ToggleSwitch
            label="Email Notifications"
            description="Receive notifications via email"
            checked={emailNotifications}
            onChange={setEmailNotifications}
          />
          <ToggleSwitch
            label="Push Notifications"
            description="Receive push notifications in browser"
            checked={pushNotifications}
            onChange={setPushNotifications}
          />
          <ToggleSwitch
            label="SMS Notifications"
            description="Receive important alerts via SMS"
            checked={smsNotifications}
            onChange={setSmsNotifications}
          />
          <div className="pt-2 border-t border-slate-700/50">
            <div className="text-xs font-medium text-slate-300 mb-3">Notification Types</div>
            <div className="space-y-3">
              <ToggleSwitch
                label="Application Updates"
                description="Get notified about visa application status changes"
                checked={applicationUpdates}
                onChange={setApplicationUpdates}
              />
              <ToggleSwitch
                label="Payment Alerts"
                description="Receive alerts for payment transactions"
                checked={paymentAlerts}
                onChange={setPaymentAlerts}
              />
            </div>
          </div>
        </SettingsSection>

        {/* Account */}
        <SettingsSection
          title="Account"
          description="Manage your account settings"
          icon={User}
        >
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
              <div className="text-sm font-medium text-white mb-1">Account Status</div>
              <div className="text-xs text-slate-400">Active since Jan 15, 2024</div>
            </div>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Update Email
              </button>
              <button className="w-full px-4 py-2.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/30 text-amber-400 text-sm transition-all flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Deactivate Account
              </button>
              <button className="w-full px-4 py-2.5 rounded-lg bg-red-600/30 hover:bg-red-600/50 border border-red-500/30 text-red-400 text-sm transition-all flex items-center justify-center gap-2">
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