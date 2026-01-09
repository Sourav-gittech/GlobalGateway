import React from 'react'
import { IndianRupee, Trash2, Edit2 } from 'lucide-react';

const ChargesRow = ({ charge, charges, setCharges, setNewCharge, setEditingId, setErrors, setIsModalOpen }) => {

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

    return (
        <div className="flex items-center justify-between p-3.5 bg-slate-700/30 border border-slate-600/30 rounded-lg hover:border-slate-500/50 transition-all"
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
                    className={`relative w-11 h-6 rounded-full transition-all duration-200 focus:outline-none ${charge.active ? 'bg-green-500' : 'bg-slate-600'
                        }`}
                    title={charge.active ? 'Deactivate' : 'Activate'}
                >
                    <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${charge.active ? 'translate-x-5' : 'translate-x-0'
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
    )
}

export default ChargesRow