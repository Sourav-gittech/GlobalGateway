import React, { useState } from 'react';
import { IndianRupee, Plus, Trash2, Edit2, Check, X, AlertCircle, Loader2 } from 'lucide-react';

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

export default function PaymentChargesManagement({ SettingsSection }) {
  const [charges, setCharges] = useState([
    { id: 1, name: 'GST', percentage: 0, active: true, createdAt: '2024-01-15', isGST: true, sgst: 9, cgst: 9 },
    { id: 2, name: 'Service Charge', percentage: 5, active: true, createdAt: '2024-01-20' },
    { id: 3, name: 'Platform Fee', percentage: 2, active: false, createdAt: '2024-02-01' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCharge, setNewCharge] = useState({ name: '', percentage: '', sgst: '', cgst: '' });
  const [errors, setErrors] = useState({ name: '', percentage: '', sgst: '', cgst: '' });
  const [isLoading] = useState(false);

  const validateName = (name) => {
    if (!name.trim()) return 'Charge name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (name.length > 50) return 'Name must be less than 50 characters';
    
    const isDuplicate = charges.some(
      c => c.name.toLowerCase() === name.toLowerCase() && c.id !== editingId
    );
    if (isDuplicate) return 'This charge already exists';
    
    return '';
  };

  const validatePercentage = (percentage) => {
    if (percentage === '') return 'Percentage is required';
    const num = parseFloat(percentage);
    if (isNaN(num) || num < 0) return 'Percentage must be 0 or greater';
    if (num > 100) return 'Percentage cannot exceed 100%';
    return '';
  };

  const validateGSTComponent = (value, name) => {
    if (value === '') return `${name} is required`;
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) return `${name} must be 0 or greater`;
    if (num > 50) return `${name} cannot exceed 50%`;
    return '';
  };

  const handleSubmit = () => {
    const nameError = validateName(newCharge.name);
    let percentageError = '';
    let sgstError = '';
    let cgstError = '';

    const isGSTCharge = newCharge.name.toLowerCase() === 'gst';

    if (isGSTCharge) {
      sgstError = validateGSTComponent(newCharge.sgst, 'SGST');
      cgstError = validateGSTComponent(newCharge.cgst, 'CGST');
    } else {
      percentageError = validatePercentage(newCharge.percentage);
    }
    
    if (nameError || percentageError || sgstError || cgstError) {
      setErrors({ name: nameError, percentage: percentageError, sgst: sgstError, cgst: cgstError });
      return;
    }

    if (editingId) {
      setCharges(
        charges.map((c) => {
          if (c.id === editingId) {
            const updatedCharge = { ...c, name: newCharge.name.trim() };
            
            if (isGSTCharge) {
              updatedCharge.isGST = true;
              updatedCharge.sgst = parseFloat(newCharge.sgst);
              updatedCharge.cgst = parseFloat(newCharge.cgst);
              updatedCharge.percentage = 0;
            } else {
              updatedCharge.percentage = parseFloat(newCharge.percentage);
              delete updatedCharge.isGST;
              delete updatedCharge.sgst;
              delete updatedCharge.cgst;
            }
            
            return updatedCharge;
          }
          return c;
        })
      );
    } else {
      const newChargeData = {
        id: Date.now(),
        name: newCharge.name.trim(),
        active: true,
        createdAt: new Date().toISOString().split('T')[0],
      };

      if (isGSTCharge) {
        newChargeData.isGST = true;
        newChargeData.sgst = parseFloat(newCharge.sgst);
        newChargeData.cgst = parseFloat(newCharge.cgst);
        newChargeData.percentage = 0;
      } else {
        newChargeData.percentage = parseFloat(newCharge.percentage);
      }

      setCharges([...charges, newChargeData]);
    }

    handleCloseModal();
  };

  const handleEdit = (id) => {
    const charge = charges.find((c) => c.id === id);
    if (charge) {
      if (charge.isGST) {
        setNewCharge({ name: charge.name, percentage: '', sgst: charge.sgst, cgst: charge.cgst });
      } else {
        setNewCharge({ name: charge.name, percentage: charge.percentage, sgst: '', cgst: '' });
      }
      setEditingId(id);
      setErrors({ name: '', percentage: '', sgst: '', cgst: '' });
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this charge?')) {
      setCharges(charges.filter((c) => c.id !== id));
    }
  };

  const handleToggle = (id) => {
    setCharges(charges.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  };

  const handleCloseModal = () => {
    setNewCharge({ name: '', percentage: '', sgst: '', cgst: '' });
    setErrors({ name: '', percentage: '', sgst: '', cgst: '' });
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleOpenModal = () => {
    setNewCharge({ name: '', percentage: '', sgst: '', cgst: '' });
    setErrors({ name: '', percentage: '', sgst: '', cgst: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const isGSTForm = newCharge.name.toLowerCase() === 'gst';

  return (
    <SettingsSection
      title="Payment Charges"
      description="Manage additional charges and fees applied to payments"
      icon={IndianRupee}
    >
      {/* Add Button */}
      <div className="mb-4">
        <button
          disabled={isLoading}
          onClick={handleOpenModal}
          className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add New Charge
        </button>
      </div>

      {/* List Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-slate-300">Payment Charges</h4>
          {charges.length > 0 && (
            <span className="text-xs text-slate-400 bg-slate-700/30 px-2 py-0.5 rounded">
              {charges.length}
            </span>
          )}
        </div>

        {/* Fixed Height Scrollable Container */}
        <div className="h-[420px] overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
            </div>
          ) : charges.length === 0 ? (
            <div className="flex items-start gap-2 p-3 bg-slate-700/20 border border-slate-600/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">No payment charges configured yet</p>
            </div>
          ) : (
            <div className="h-full overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-500">
              {charges.map((charge) => (
                <div
                  key={charge.id}
                  className="flex items-center justify-between p-3.5 bg-slate-700/30 border border-slate-600/30 rounded-lg hover:border-slate-500/50 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <IndianRupee className={`w-4 h-4 flex-shrink-0 ${charge.active ? 'text-green-400' : 'text-slate-500'}`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm ${charge.active ? 'text-white' : 'text-slate-400'}`}>
                          {charge.name}
                        </span>
                        {!charge.active && (
                          <span className="text-xs px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded">
                            Inactive
                          </span>
                        )}
                        {!charge.isGST && charge.percentage === 0 && charge.active && (
                          <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">
                            Free
                          </span>
                        )}
                      </div>
                      {charge.isGST ? (
                        <div className={`text-xs ${charge.active ? 'text-slate-400' : 'text-slate-500'}`}>
                          SGST: {charge.sgst}% + CGST: {charge.cgst}% = {charge.sgst + charge.cgst}%
                        </div>
                      ) : (
                        <span className={`text-xs ${charge.active ? 'text-slate-400' : 'text-slate-500'}`}>
                          {charge.percentage}%
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggle(charge.id)}
                      className={`relative w-11 h-6 rounded-full transition-all duration-200 focus:outline-none ${
                        charge.active ? 'bg-green-500' : 'bg-slate-600'
                      }`}
                      title={charge.active ? 'Deactivate' : 'Activate'}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                          charge.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => handleEdit(charge.id)}
                      className="p-1.5 hover:bg-slate-700/50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-blue-400" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(charge.id)}
                      className="p-1.5 hover:bg-slate-700/50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Payment Charge' : 'Add New Payment Charge'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-2">Charge Name</label>
            <input
              type="text"
              placeholder="Service Charge"
              value={newCharge.name}
              onChange={(e) => {
                setNewCharge({ ...newCharge, name: e.target.value });
                setErrors({ ...errors, name: '' });
              }}
              className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.name ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700/50'
              }`}
              maxLength={50}
            />
            {errors.name && (
              <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </div>
            )}
          </div>

          {isGSTForm ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">SGST %</label>
                  <input
                    type="number"
                    placeholder="9"
                    step="0.01"
                    min="0"
                    max="50"
                    value={newCharge.sgst}
                    onChange={(e) => {
                      setNewCharge({ ...newCharge, sgst: e.target.value });
                      setErrors({ ...errors, sgst: '' });
                    }}
                    className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.sgst ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700/50'
                    }`}
                  />
                  {errors.sgst && (
                    <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      {errors.sgst}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">CGST %</label>
                  <input
                    type="number"
                    placeholder="9"
                    step="0.01"
                    min="0"
                    max="50"
                    value={newCharge.cgst}
                    onChange={(e) => {
                      setNewCharge({ ...newCharge, cgst: e.target.value });
                      setErrors({ ...errors, cgst: '' });
                    }}
                    className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.cgst ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700/50'
                    }`}
                  />
                  {errors.cgst && (
                    <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      {errors.cgst}
                    </div>
                  )}
                </div>
              </div>
              {newCharge.sgst && newCharge.cgst && !errors.sgst && !errors.cgst && (
                <div className="text-center text-sm text-slate-300 bg-slate-700/30 rounded-lg py-2">
                  Total GST: <span className="font-semibold text-green-400">{(parseFloat(newCharge.sgst) + parseFloat(newCharge.cgst)).toFixed(2)}%</span>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm text-slate-300 mb-2">Percentage</label>
              <input
                type="number"
                placeholder="5"
                step="0.01"
                min="0"
                max="100"
                value={newCharge.percentage}
                onChange={(e) => {
                  setNewCharge({ ...newCharge, percentage: e.target.value });
                  setErrors({ ...errors, percentage: '' });
                }}
                className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.percentage ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700/50'
                }`}
              />
              {errors.percentage && (
                <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  {errors.percentage}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            {editingId ? 'Update' : 'Add'}
          </button>
          <button
            onClick={handleCloseModal}
            className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </Modal>
    </SettingsSection>
  );
}