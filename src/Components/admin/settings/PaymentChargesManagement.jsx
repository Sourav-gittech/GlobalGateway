import React, { useState } from 'react';
import { IndianRupee, Plus, AlertCircle, Loader2 } from 'lucide-react';
import ChargesRow from './payment/paymentCharges/ChargesRow';
import ChargesModal from './payment/paymentCharges/ChargesModal';

export default function PaymentChargesManagement({ SettingsSection,Modal }) {
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

  const handleOpenModal = () => {
    setNewCharge({ name: '', percentage: '', sgst: '', cgst: '' });
    setErrors({ name: '', percentage: '', sgst: '', cgst: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <SettingsSection
      title="Payment Charges For Course"
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
            <div className="h-full overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-500 glass-scrollbar">
              {charges.map(charge => (
                <ChargesRow key={charge.id} charge={charge} charges={charges} setCharges={setCharges} setNewCharge={setNewCharge} setEditingId={setEditingId} setErrors={setErrors} setIsModalOpen={setIsModalOpen} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ChargesModal Modal={Modal} charges={charges} setCharges={setCharges} setNewCharge={setNewCharge} newCharge={newCharge} setEditingId={setEditingId} errors={errors} setErrors={setErrors} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} editingId={editingId} />

    </SettingsSection>
  );
}