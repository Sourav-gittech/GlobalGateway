import React from 'react'
import { Check, X, AlertCircle } from 'lucide-react';


const ChargesModal = ({ Modal, isModalOpen, charges, setCharges, setNewCharge, newCharge, setEditingId, errors, setErrors, setIsModalOpen, editingId }) => {

    const handleCloseModal = () => {
        setNewCharge({ name: '', percentage: '', sgst: '', cgst: '' });
        setErrors({ name: '', percentage: '', sgst: '', cgst: '' });
        setIsModalOpen(false);
        setEditingId(null);
    };

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

    const isGSTForm = newCharge.name.toLowerCase() === 'gst';

    return (
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
                        className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.name ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700/50'
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
                                    className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.sgst ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700/50'
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
                                    className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.cgst ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700/50'
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
                            className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.percentage ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700/50'
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
    )
}

export default ChargesModal