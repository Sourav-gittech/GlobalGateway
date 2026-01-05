import React, { useState, useEffect } from "react";
import { DollarSign, Save, RotateCcw, Info, Plus, Loader2 } from "lucide-react";
import PaymentRow from "./additionalPayment/PaymentRow";
import PaymentModal from "./additionalPayment/PaymentModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharges } from "../../../Redux/Slice/chargesSlice";
import getSweetAlert from "../../../util/alert/sweetAlert";

// Mock sweet alert function
// const getSweetAlert = (title, text, icon, showConfirm = false) => {
//   if (showConfirm) {
//     return Promise.resolve({ isConfirmed: window.confirm(`${title}\n${text}`) });
//   }
//   alert(`${title}\n${text}`);
//   return Promise.resolve();
// };

// Settings Section Wrapper Component - For Demo Only (use the one from Settings.jsx in production)
const SettingsSection = ({ title, description, icon: Icon, children }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 h-[640px] flex flex-col">
    <div className="flex items-start gap-3 mb-6 flex-shrink-0">
      {Icon && <Icon className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />}
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
      </div>
    </div>
    <div className="flex-1 flex flex-col min-h-0">
      {children}
    </div>
  </div>
);

export default function AdditionalPaymentManagement() {
  const dispatch = useDispatch();

  const [charges, setCharges] = useState([]);
  const [originalCharges, setOriginalCharges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { isChargesLoading, allCharges, hasChargesError } = useSelector(state => state?.charge);
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCharge, setNewCharge] = useState({ label: '', amount: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchCharges())
      .then(res => {
        // console.log('Response for fetching all charges', res);
      })
      .catch(err => {
        console.log('Error occured', err);
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      })
  }, []);

  useEffect(() => {
    const changed = JSON.stringify(charges) !== JSON.stringify(originalCharges);
    setHasChanges(changed);
  }, [charges, originalCharges]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await new Promise(resolve => setTimeout(resolve, 800));

      setOriginalCharges(JSON.parse(JSON.stringify(charges)));
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
    setCharges(JSON.parse(JSON.stringify(originalCharges)));
    setEditingId(null);
  };

  const openAddModal = () => {
    setNewCharge({ label: '', amount: '' });
    setShowAddModal(true);
  };

  const totalAdditional = charges.reduce((sum, charge) => sum + charge.amount, 0);

  // console.log('All available charges', allCharges);

  if (isChargesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <SettingsSection
            title="Additional Payment Management"
            description="Configure additional visa service charges"
            icon={DollarSign}
          >
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
            </div>
          </SettingsSection>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <SettingsSection
          title="Additional Payment Management"
          description="Configure additional visa service charges"
          icon={DollarSign}
        >
          {/* Container with fixed height - matching Holiday Management */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Info Notice - Fixed */}
            <div className="flex items-start gap-2 p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg flex-shrink-0 mb-4">
              <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-300">
                Application fee is managed separately. Set amount to ₹0 to mark service as free.
              </p>
            </div>

            {/* Add New Charge Button - Fixed */}
            <button
              onClick={openAddModal}
              disabled={isSaving}
              className="w-full px-4 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed flex-shrink-0 mb-4"
            >
              <Plus className="w-4 h-4" />
              Add New Charge
            </button>

            {/* Charges List Section - Flexible */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <h4 className="text-sm font-medium text-slate-300">Payment Charges</h4>
                {allCharges?.length > 0 && (
                  <span className="text-xs text-slate-400 bg-slate-700/30 px-2 py-0.5 rounded">
                    {allCharges?.length} {allCharges?.length === 1 ? 'charge' : 'charges'}
                  </span>
                )}
              </div>

              {/* Scrollable Charges List */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-500 glass-scrollbar">
                {allCharges?.length === 0 ? (
                  <div className="flex items-start gap-2 p-3 bg-slate-700/20 border border-slate-600/30 rounded-lg">
                    <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-400">No charges configured. Add your first charge to get started.</p>
                  </div>
                ) : (
                  allCharges?.map(charge => (
                    <PaymentRow key={charge.id} charges={charges} charge={charge} setCharges={setCharges} editingId={editingId} isSaving={isSaving} />
                  ))
                )}
              </div>
            </div>

            {/* Total Summary - Fixed at Bottom */}
            {allCharges?.length > 0 && (
              <div className="p-3 bg-slate-700/20 border border-slate-600/30 rounded-lg flex-shrink-0 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Total Additional Charges</span>
                  <span className="text-xl font-bold text-white">
                    ₹{totalAdditional?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons - Fixed at Bottom */}
            {allCharges?.length > 0 && (
              <div className="space-y-2 flex-shrink-0 mt-4">
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving || isChargesLoading || !hasChanges}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${hasChanges && !isSaving && !isChargesLoading
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={isSaving || isChargesLoading || !hasChanges}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${hasChanges && !isSaving && !isChargesLoading
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
            )}
          </div>
        </SettingsSection>

        {/* Add Charge Modal */}
        <PaymentModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} charges={charges} />

      </div>
    </div>
  );
}