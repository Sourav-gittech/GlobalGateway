import React from 'react'
import { Tag, Trash2, Edit2 } from 'lucide-react';

const PromocodeRow = ({ promo, promoCodes, setPromoCodes, setNewCode, setEditingId, setErrors, setIsModalOpen }) => {

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

    return (
        <div className="flex items-center justify-between p-3.5 bg-slate-700/30 border border-slate-600/30 rounded-lg hover:border-slate-500/50 transition-all"
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
                    className={`relative w-11 h-6 rounded-full transition-all duration-200 focus:outline-none ${promo.active ? 'bg-green-500' : 'bg-slate-600'
                        }`}
                    title={promo.active ? 'Deactivate' : 'Activate'}
                >
                    <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${promo.active ? 'translate-x-5' : 'translate-x-0'
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
    )
}

export default PromocodeRow