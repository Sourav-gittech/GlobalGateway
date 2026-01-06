import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit2, Check, X, AlertCircle, Loader2 } from 'lucide-react';

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

export default function PromoCodeManagement({ SettingsSection }) {
  const [promoCodes, setPromoCodes] = useState([
    { id: 1, code: 'SAVE10', discount: 10, active: true, createdAt: '2024-01-15' },
    { id: 2, code: 'FIRST10', discount: 10, active: true, createdAt: '2024-01-20' },
    { id: 3, code: 'SAVE20', discount: 20, active: true, createdAt: '2024-02-01' },
    { id: 4, code: 'WELCOME20', discount: 20, active: false, createdAt: '2024-02-10' },
    { id: 5, code: 'STUDENT15', discount: 15, active: true, createdAt: '2024-02-15' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCode, setNewCode] = useState({ code: '', discount: '' });
  const [errors, setErrors] = useState({ code: '', discount: '' });
  const [isLoading] = useState(false);

  const validateCode = (code) => {
    if (!code.trim()) return 'Code is required';
    if (code.length < 3) return 'Code must be at least 3 characters';
    if (code.length > 20) return 'Code must be less than 20 characters';
    if (!/^[A-Z0-9]+$/.test(code)) return 'Code must contain only letters and numbers';
    
    const isDuplicate = promoCodes.some(
      p => p.code === code && p.id !== editingId
    );
    if (isDuplicate) return 'This code already exists';
    
    return '';
  };

  const validateDiscount = (discount) => {
    if (!discount) return 'Discount is required';
    const num = parseInt(discount);
    if (isNaN(num) || num < 1) return 'Discount must be at least 1%';
    if (num > 100) return 'Discount cannot exceed 100%';
    return '';
  };

  const handleSubmit = () => {
    const codeError = validateCode(newCode.code);
    const discountError = validateDiscount(newCode.discount);
    
    if (codeError || discountError) {
      setErrors({ code: codeError, discount: discountError });
      return;
    }

    if (editingId) {
      setPromoCodes(
        promoCodes.map((p) =>
          p.id === editingId
            ? { ...p, code: newCode.code.toUpperCase(), discount: parseInt(newCode.discount) }
            : p
        )
      );
    } else {
      setPromoCodes([
        ...promoCodes,
        {
          id: Date.now(),
          code: newCode.code.toUpperCase(),
          discount: parseInt(newCode.discount),
          active: true,
          createdAt: new Date().toISOString().split('T')[0],
        },
      ]);
    }

    handleCloseModal();
  };

  const handleEdit = (id) => {
    const promo = promoCodes.find((p) => p.id === id);
    if (promo) {
      setNewCode({ code: promo.code, discount: promo.discount });
      setEditingId(id);
      setErrors({ code: '', discount: '' });
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this promo code?')) {
      setPromoCodes(promoCodes.filter((p) => p.id !== id));
    }
  };

  const handleToggle = (id) => {
    setPromoCodes(promoCodes.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  const handleCloseModal = () => {
    setNewCode({ code: '', discount: '' });
    setErrors({ code: '', discount: '' });
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleOpenModal = () => {
    setNewCode({ code: '', discount: '' });
    setErrors({ code: '', discount: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <SettingsSection
      title="Promo Code Management"
      description="Create and manage discount codes for your services"
      icon={Tag}
    >
      {/* Add Button */}
      <div className="mb-4">
        <button
          disabled={isLoading}
          onClick={handleOpenModal}
          className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add New Promo Code
        </button>
      </div>

      {/* List Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-slate-300">Active Promo Codes</h4>
          {promoCodes.length > 0 && (
            <span className="text-xs text-slate-400 bg-slate-700/30 px-2 py-0.5 rounded">
              {promoCodes.length}
            </span>
          )}
        </div>

        {/* Fixed Height Scrollable Container */}
        <div className="h-[420px] overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
            </div>
          ) : promoCodes.length === 0 ? (
            <div className="flex items-start gap-2 p-3 bg-slate-700/20 border border-slate-600/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">No promo codes created yet</p>
            </div>
          ) : (
            <div className="h-full overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-500">
              {promoCodes.map((promo) => (
                <div
                  key={promo.id}
                  className="flex items-center justify-between p-3.5 bg-slate-700/30 border border-slate-600/30 rounded-lg hover:border-slate-500/50 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Tag className={`w-4 h-4 flex-shrink-0 ${promo.active ? 'text-blue-400' : 'text-slate-500'}`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm ${promo.active ? 'text-white' : 'text-slate-400'}`}>
                          {promo.code}
                        </span>
                        {!promo.active && (
                          <span className="text-xs px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded">
                            Inactive
                          </span>
                        )}
                      </div>
                      <span className={`text-xs ${promo.active ? 'text-slate-400' : 'text-slate-500'}`}>
                        {promo.discount}% discount
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggle(promo.id)}
                      className={`relative w-11 h-6 rounded-full transition-all duration-200 focus:outline-none ${
                        promo.active ? 'bg-green-500' : 'bg-slate-600'
                      }`}
                      title={promo.active ? 'Deactivate' : 'Activate'}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                          promo.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => handleEdit(promo.id)}
                      className="p-1.5 hover:bg-slate-700/50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-blue-400" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(promo.id)}
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
        title={editingId ? 'Edit Promo Code' : 'Add New Promo Code'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-2">Code</label>
            <input
              type="text"
              placeholder="SAVE20"
              value={newCode.code}
              onChange={(e) => {
                setNewCode({ ...newCode, code: e.target.value.toUpperCase() });
                setErrors({ ...errors, code: '' });
              }}
              className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm font-mono uppercase placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.code ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700/50'
              }`}
              maxLength={20}
            />
            {errors.code && (
              <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.code}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">Discount Percentage</label>
            <input
              type="number"
              placeholder="10"
              min="1"
              max="100"
              value={newCode.discount}
              onChange={(e) => {
                setNewCode({ ...newCode, discount: e.target.value });
                setErrors({ ...errors, discount: '' });
              }}
              className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.discount ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700/50'
              }`}
            />
            {errors.discount && (
              <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.discount}
              </div>
            )}
          </div>
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