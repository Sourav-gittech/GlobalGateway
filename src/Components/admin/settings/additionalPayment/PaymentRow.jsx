import React from 'react'
import { Trash2, Edit2, X, Check, Loader2 } from "lucide-react";

const PaymentRow = ({ charges, charge, setCharges, editingId, isSaving, deletingId }) => {

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

    return (
        <div className="flex items-center gap-3 p-3 bg-slate-700/30 border border-slate-600/40 rounded-lg hover:border-slate-500/50 transition-all group">

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
    )
}

export default PaymentRow