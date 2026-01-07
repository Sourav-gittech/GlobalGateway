// Settings.jsx - Fixed Heights with No Extra Space
import React, { useEffect } from "react";
import GeneralSettings from "../../Components/admin/settings/GeneralSettings";
import AppearanceSettings from "../../Components/admin/settings/AppearanceSettings";
import HolidayManagement from "../../Components/admin/settings/HolidayManagement";
import AdditionalPaymentManagement from "../../Components/admin/settings/AdditionalPaymentManagement";
import PromoCodeManagement from "../../Components/admin/settings/PromoCodeManagement";
import PaymentChargesManagement from "../../Components/admin/settings/PaymentChargesManagement";

import { useDispatch, useSelector } from "react-redux";
import SettingsHeader from "../../Components/admin/settings/SettingsHeader";
import { checkLoggedInUser } from "../../Redux/Slice/auth/checkAuthSlice";
import getSweetAlert from "../../util/alert/sweetAlert";

// Settings Section Component
function SettingsSection({ title, description, icon: Icon, children, className = "" }) {
  return (
    <div className={`flex flex-col p-5 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 ${className}`}>
      <div className="flex items-start gap-3 mb-4 sm:mb-5 flex-shrink-0">
        <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 flex-shrink-0">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{title}</h3>
          {description && <p className="text-sm text-slate-400">{description}</p>}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        {children}
      </div>
    </div>
  );
}

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
};

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
  const dispatch = useDispatch();
  const { userAuthData, isUserLoading } = useSelector(state => state.checkAuth);

  useEffect(() => {
    dispatch(checkLoggedInUser()).catch(() => {
      getSweetAlert('Oops...', 'Something went wrong!', 'error');
    });
  }, [dispatch]);

  return (
    <div className="w-full space-y-6 ">
      {/* Header */}
      <SettingsHeader />

      {/* Top Row - Compact Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <GeneralSettings
            SettingsSection={SettingsSection}
            FormField={FormField}
            userAuthData={userAuthData}
          />
        </div>

        <div>
          <AppearanceSettings
            SettingsSection={SettingsSection}
            userAuthData={userAuthData}
          />
        </div>
      </div>


      {/* Payment Settings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PromoCodeManagement
          SettingsSection={SettingsSection} Modal={Modal}
        />

        <PaymentChargesManagement
          SettingsSection={SettingsSection} Modal={Modal}
        />
      </div>

      {/* Bottom Row - Fixed Height Management Settings */}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-8">
        <HolidayManagement
          SettingsSection={SettingsSection}
        />

        <AdditionalPaymentManagement
          SettingsSection={SettingsSection}
        />
      </div>

    </div>

  );
}