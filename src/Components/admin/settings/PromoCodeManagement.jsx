import React, { useState } from 'react';
import { Tag, Plus, AlertCircle, Loader2 } from 'lucide-react';
import PromocodeRow from './payment/promocode/PromocodeRow';
import PromocodeModal from './payment/promocode/PromocodeModal';


export default function PromoCodeManagement({ SettingsSection, Modal }) {
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

  const handleOpenModal = () => {
    setNewCode({ code: '', discount: '' });
    setErrors({ code: '', discount: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <SettingsSection
      title="Promo Code Management For Course Purchase"
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
            <div className="h-full overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-500 glass-scrollbar">
              {promoCodes.map(promo => (
                <PromocodeRow key={promo.id} promo={promo} promoCodes={promoCodes} setPromoCodes={setPromoCodes} setNewCode={setNewCode} setEditingId={setEditingId} setErrors={setErrors} setIsModalOpen={setIsModalOpen} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <PromocodeModal Modal={Modal} isModalOpen={isModalOpen} promoCodes={promoCodes} setPromoCodes={setPromoCodes} newCode={newCode} setNewCode={setNewCode} setEditingId={setEditingId} errors={errors} setErrors={setErrors} setIsModalOpen={setIsModalOpen} editingId={editingId} />

    </SettingsSection>
  );
}