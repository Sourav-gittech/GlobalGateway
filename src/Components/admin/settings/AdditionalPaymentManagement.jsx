import React, { useState, useEffect } from "react";
import { DollarSign, Save, RotateCcw, Info } from "lucide-react";
import getSweetAlert from "../../../util/alert/sweetAlert";

export default function AdditionalPaymentManagement({ SettingsSection }) {
  const [payments, setPayments] = useState({
    serviceCharge: 2000,
    vfsCharge: 1500,
    travelInsurance: 1200,
    formFillingAssistance: 0
  });
  const [originalPayments, setOriginalPayments] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchPaymentSettings();
  }, []);

  useEffect(() => {
    const changed = Object.keys(payments).some(
      key => payments[key] !== originalPayments[key]
    );
    setHasChanges(changed);
  }, [payments, originalPayments]);

  const fetchPaymentSettings = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data = {
        serviceCharge: 2000,
        vfsCharge: 1500,
        travelInsurance: 1200,
        formFillingAssistance: 0
      };
      
      setPayments(data);
      setOriginalPayments(data);
    } catch (error) {
      console.error('Error fetching payment settings:', error);
      getSweetAlert('Error', 'Failed to load payment settings', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentChange = (key, value) => {
    if (value === '' || value === null || value === undefined) {
      setPayments({ ...payments, [key]: 0 });
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return;
    
    setPayments({ ...payments, [key]: numValue });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setOriginalPayments({ ...payments });
      setHasChanges(false);
      getSweetAlert('Success', 'Payment settings updated successfully', 'success');
    } catch (error) {
      console.error('Error saving payment settings:', error);
      getSweetAlert('Error', 'Failed to update payment settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setPayments({ ...originalPayments });
  };

  const paymentFields = [
    { key: 'serviceCharge', label: 'Service Charge' },
    { key: 'vfsCharge', label: 'VFS / Visa Application Center Charge' },
    { key: 'travelInsurance', label: 'Travel Insurance Cost' },
    { key: 'formFillingAssistance', label: 'Form Filling Assistance Charge' }
  ];

  const totalAdditional = Object.values(payments).reduce((a, b) => a + b, 0);

  return (
    <SettingsSection
      title="Additional Payment Management"
      description="Configure additional visa service charges"
      icon={DollarSign}
    >
      <div className="space-y-4">
        {/* Info Notice */}
        <div className="flex items-start gap-2 p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg flex-shrink-0">
          <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-300">
            Application fee is managed separately. Set amount to ₹0 to mark service as free.
          </p>
        </div>

        {/* Payment Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paymentFields.map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={payments[field.key] || ''}
                  onChange={(e) => handlePaymentChange(field.key, e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value === '') handlePaymentChange(field.key, '0');
                  }}
                  disabled={isLoading || isSaving}
                  placeholder="0"
                  className="w-full pl-8 pr-16 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm disabled:opacity-50"
                />
                {payments[field.key] === 0 && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-green-400 bg-green-500/20 border border-green-500/30 px-2 py-0.5 rounded">
                    Free
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total Summary */}
        <div className="p-3 bg-slate-700/20 border border-slate-600/30 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-300">Total Additional Charges</span>
            <span className="text-xl font-bold text-white">
              ₹{totalAdditional.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving || isLoading || !hasChanges}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                hasChanges && !isSaving && !isLoading
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleReset}
              disabled={isSaving || isLoading || !hasChanges}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                hasChanges && !isSaving && !isLoading
                  ? 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                  : 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Helper Text */}
          {hasChanges && (
            <div className="flex items-center gap-2 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <Info className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <p className="text-xs text-amber-300">Unsaved changes</p>
            </div>
          )}
        </div>
      </div>
    </SettingsSection>
  );
}