import React, { useState, useEffect } from "react";
import { DollarSign, Save, RotateCcw, Info, Plus, Trash2, Edit2, X, Check, Loader2 } from "lucide-react";

// Mock sweet alert function
const getSweetAlert = (title, text, icon, showConfirm = false) => {
  if (showConfirm) {
    return Promise.resolve({ isConfirmed: window.confirm(`${title}\n${text}`) });
  }
  alert(`${title}\n${text}`);
  return Promise.resolve();
};

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

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default function AdditionalPaymentManagement() {
  const [charges, setCharges] = useState([]);
  const [originalCharges, setOriginalCharges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCharge, setNewCharge] = useState({ label: '', amount: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchPaymentSettings();
  }, []);

  useEffect(() => {
    const changed = JSON.stringify(charges) !== JSON.stringify(originalCharges);
    setHasChanges(changed);
  }, [charges, originalCharges]);

  const fetchPaymentSettings = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data = [
        { id: 1, label: 'Service Charge', amount: 2000 },
        { id: 2, label: 'VFS / Visa Application Center Charge', amount: 1500 },
        { id: 3, label: 'Travel Insurance Cost', amount: 1200 },
        { id: 4, label: 'Form Filling Assistance Charge', amount: 0 }
      ];
      
      setCharges(data);
      setOriginalCharges(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.error('Error fetching payment settings:', error);
      getSweetAlert('Error', 'Failed to load payment settings', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (id, value) => {
    if (value === '' || value === null || value === undefined) {
      setCharges(charges.map(c => c.id === id ? { ...c, amount: 0 } : c));
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return;
    
    setCharges(charges.map(c => c.id === id ? { ...c, amount: numValue } : c));
  };

  const handleLabelEdit = (id, newLabel) => {
    if (!newLabel.trim()) {
      getSweetAlert('Validation Error', 'Charge name cannot be empty', 'warning');
      return;
    }
    setCharges(charges.map(c => c.id === id ? { ...c, label: newLabel } : c));
    setEditingId(null);
  };

  const handleAddCharge = async () => {
    if (!newCharge.label.trim()) {
      getSweetAlert('Validation Error', 'Please enter a charge name', 'warning');
      return;
    }

    const amount = parseFloat(newCharge.amount);
    if (isNaN(amount) || amount < 0) {
      getSweetAlert('Validation Error', 'Please enter a valid amount (minimum 0)', 'warning');
      return;
    }

    const labelExists = charges.some(c => 
      c.label.toLowerCase() === newCharge.label.trim().toLowerCase()
    );
    if (labelExists) {
      getSweetAlert('Validation Error', 'A charge with this name already exists', 'warning');
      return;
    }

    try {
      setIsAdding(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      const newId = charges.length > 0 ? Math.max(...charges.map(c => c.id)) + 1 : 1;
      const newChargeData = {
        id: newId,
        label: newCharge.label.trim(),
        amount: amount
      };

      setCharges([...charges, newChargeData]);
      setNewCharge({ label: '', amount: '' });
      setShowAddModal(false);

      getSweetAlert('Success', 'Charge added successfully', 'success');
    } catch (error) {
      console.error('Error adding charge:', error);
      getSweetAlert('Error', 'Failed to add charge', 'error');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteCharge = async (id, label) => {
    try {
      const result = await getSweetAlert(
        'Delete Charge?',
        `Remove "${label}" from payment settings?`,
        'warning',
        true
      );

      if (!result || !result.isConfirmed) return;

      setDeletingId(id);
      await new Promise(resolve => setTimeout(resolve, 500));

      setCharges(charges.filter(c => c.id !== id));
      getSweetAlert('Deleted', 'Charge removed successfully', 'success');
    } catch (error) {
      console.error('Error deleting charge:', error);
      getSweetAlert('Error', 'Failed to delete charge', 'error');
    } finally {
      setDeletingId(null);
    }
  };

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

  if (isLoading) {
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
              className="w-full px-4 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed flex-shrink-0 mb-4"
            >
              <Plus className="w-4 h-4" />
              Add New Charge
            </button>

            {/* Charges List Section - Flexible */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <h4 className="text-sm font-medium text-slate-300">Payment Charges</h4>
                {charges.length > 0 && (
                  <span className="text-xs text-slate-400 bg-slate-700/30 px-2 py-0.5 rounded">
                    {charges.length} {charges.length === 1 ? 'charge' : 'charges'}
                  </span>
                )}
              </div>

              {/* Scrollable Charges List */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-500 glass-scrollbar">
                {charges.length === 0 ? (
                  <div className="flex items-start gap-2 p-3 bg-slate-700/20 border border-slate-600/30 rounded-lg">
                    <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-400">No charges configured. Add your first charge to get started.</p>
                  </div>
                ) : (
                  charges.map((charge) => (
                    <div
                      key={charge.id}
                      className="flex items-center gap-3 p-3 bg-slate-700/30 border border-slate-600/40 rounded-lg hover:border-slate-500/50 transition-all group"
                    >
                      {/* Label - Editable */}
                      <div className="flex-1 min-w-0">
                        {editingId === charge.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              defaultValue={charge.label}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleLabelEdit(charge.id, e.target.value);
                                if (e.key === 'Escape') setEditingId(null);
                              }}
                              autoFocus
                              maxLength={100}
                              className="flex-1 px-2 py-1 bg-slate-700/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />
                            <button
                              onClick={(e) => {
                                const input = e.currentTarget.parentElement.querySelector('input');
                                handleLabelEdit(charge.id, input.value);
                              }}
                              className="p-1 text-green-400 hover:bg-green-500/10 rounded transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 text-slate-400 hover:bg-slate-600/50 rounded transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group/label">
                            <p className="text-sm font-medium text-white truncate">
                              {charge.label}
                            </p>
                            <button
                              onClick={() => setEditingId(charge.id)}
                              className="p-1 opacity-0 group-hover/label:opacity-100 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-all"
                              title="Edit name"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Amount Input */}
                      <div className="relative w-32">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={charge.amount || ''}
                          onChange={(e) => handleAmountChange(charge.id, e.target.value)}
                          onBlur={(e) => {
                            if (e.target.value === '') handleAmountChange(charge.id, '0');
                          }}
                          disabled={isSaving || editingId === charge.id}
                          placeholder="0"
                          className="w-full pl-6 pr-2 py-1.5 bg-slate-700/50 border border-slate-600/50 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm disabled:opacity-50"
                        />
                        {charge.amount === 0 && (
                          <span className="absolute -top-1 -right-1 text-[10px] font-semibold text-green-400 bg-green-500/20 border border-green-500/30 px-1.5 py-0.5 rounded">
                            Free
                          </span>
                        )}
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteCharge(charge.id, charge.label)}
                        disabled={deletingId === charge.id || editingId === charge.id}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === charge.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Total Summary - Fixed at Bottom */}
            {charges.length > 0 && (
              <div className="p-3 bg-slate-700/20 border border-slate-600/30 rounded-lg flex-shrink-0 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Total Additional Charges</span>
                  <span className="text-xl font-bold text-white">
                    ₹{totalAdditional.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons - Fixed at Bottom */}
            {charges.length > 0 && (
              <div className="space-y-2 flex-shrink-0 mt-4">
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
            )}
          </div>
        </SettingsSection>

        {/* Add Charge Modal */}
        <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white">Add New Charge</h3>
            <button
              onClick={() => setShowAddModal(false)}
              className="p-1 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Charge Name
              </label>
              <input
                type="text"
                placeholder="e.g., Document Attestation"
                value={newCharge.label}
                onChange={(e) => setNewCharge({ ...newCharge, label: e.target.value })}
                disabled={isAdding}
                maxLength={100}
                className="w-full px-3 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Amount (₹)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={newCharge.amount}
                onChange={(e) => setNewCharge({ ...newCharge, amount: e.target.value })}
                disabled={isAdding}
                className="w-full px-3 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex gap-2 p-4 border-t border-slate-700">
            <button
              onClick={() => setShowAddModal(false)}
              disabled={isAdding}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700/50 text-white rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCharge}
              disabled={isAdding || !newCharge.label.trim()}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Charge
                </>
              )}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}