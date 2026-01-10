import React from 'react'
import { Check, X, AlertCircle } from 'lucide-react';

const PromocodeModal = ({ Modal, isModalOpen, promoCodes, setPromoCodes, newCode, setNewCode, setEditingId, errors, setErrors, setIsModalOpen, editingId }) => {
    
    const isChargesLoading = false;
    const handleCloseModal = () => {
        setNewCode({ code: '', discount: '' });
        setErrors({ code: '', discount: '' });
        setIsModalOpen(false);
        setEditingId(null);
    };

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

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={editingId ? 'Edit Promo Code' : 'Add New Promo Code'}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-slate-300 mb-2">Code</label>
                    <input type="text" placeholder="SAVE20" value={newCode.code}
                        onChange={(e) => {
                            setNewCode({ ...newCode, code: e.target.value.toUpperCase() });
                            setErrors({ ...errors, code: '' });
                        }}
                        className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm font-mono uppercase placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.code ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700/50'
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
                    <label className="block text-sm text-slate-300 mb-2">
                        Available
                    </label>

                    <select
                        value={newCode.available}
                        onChange={(e) => {
                            setNewCode({ ...newCode, available: e.target.value });
                            setErrors({ ...errors, available: "" });
                        }}
                        className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                            ${errors.available ? "border-red-500/50 focus:ring-red-500" : "border-slate-700/50"}`}>
                        <option value="" disabled className="text-slate-500">
                            Select availability
                        </option>
                        <option value="first_time">First Time</option>
                        <option value="always">Always</option>
                    </select>

                    {errors.available && (
                        <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            {errors.available}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm text-slate-300 mb-2">Discount Percentage</label>
                    <input type="number" placeholder="10" min="1" max="100" value={newCode.discount}
                        onChange={(e) => {
                            setNewCode({ ...newCode, discount: e.target.value });
                            setErrors({ ...errors, discount: '' });
                        }}
                        className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.discount ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700/50'
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
                    onClick={handleSubmit} disabled={isChargesLoading}
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                    <Check className="w-4 h-4" />
                    {editingId ? 'Update' : 'Add'}
                </button>
                <button
                    onClick={handleCloseModal} disabled={isChargesLoading}
                    className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                    <X className="w-4 h-4" />
                    Cancel
                </button>
            </div>
        </Modal>
    )
}

export default PromocodeModal