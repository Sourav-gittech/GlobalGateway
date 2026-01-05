import React, { useEffect, useState } from 'react'
import { Trash2, Edit2, X, Check, Loader2 } from "lucide-react";
import getSweetAlert from '../../../../util/alert/sweetAlert';
import { useDispatch } from 'react-redux';
import { deleteCharge, fetchCharges, updateCharge } from '../../../../Redux/Slice/chargesSlice';
import hotToast from '../../../../util/alert/hot-toast';
import { createPortal } from 'react-dom';
import ConfirmBlockUnblockAlert from '../../common/alerts/ConfirmBlockUnblockAlert';
import { useForm } from 'react-hook-form';

const PaymentRow = ({ charge, editingId, setEditingId, isSaving }) => {
    const [currentChargeId, setCurrentChargeId] = useState(null);
    const [alertModalOpen, setAlertModalOpen] = useState(false);
    const [savingEdit, setSavingEdit] = useState(false);
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            charge_type: charge.charge_type,
            amount: charge.amount,
        }
    });

    useEffect(() => {
        if (editingId === charge.id) {
            reset({
                charge_type: charge.charge_type,
                amount: charge.amount,
            });
        }
    }, [editingId, charge, reset]);

    const onSubmit = async (data) => {
        setSavingEdit(true);

        dispatch(updateCharge({
            id: charge.id,
            updatedData: {
                charge_type: data.charge_type.trim(),
                amount: Number(data.amount)
            }
        }))
            .then(res => {
                console.log('Response for updating charges', res);

                if (res.meta.requestStatus === "fulfilled") {
                    hotToast("Charge updated successfully", "success");
                    setEditingId(null);
                    dispatch(fetchCharges());
                } else {
                    getSweetAlert("Error", "Update failed", "error");
                }
                setSavingEdit(false);
            }).catch(err => {
                console.log('Error occured', err);
                getSweetAlert('Oops...', 'Something went wrong!', 'error');
            })
    }

    const handleDeleteCharge = () => {
        try {
            dispatch(deleteCharge(currentChargeId))
                .then(res => {
                    // console.log('Response for deleting charge', res);

                    if (res.meta.requestStatus === "fulfilled") {
                        hotToast("Charge deleted successfully", "success");
                        setAlertModalOpen(false);
                        setCurrentChargeId(null);
                        dispatch(fetchCharges());
                    }
                    else {
                        getSweetAlert('Oops...', 'Something went wrong!', 'error');
                    }
                })
                .catch(err => {
                    console.log('Error occured', err);
                    getSweetAlert('Oops...', 'Something went wrong!', 'error');
                })
        } catch (error) {
            console.error('Error deleting charge:', error);
            getSweetAlert('Error', 'Failed to delete charge', 'error');
        }
    }

    const handleCurrentCharge = (id) => {
        setCurrentChargeId(id);
    }

    return (
        <>
            <div className="flex items-center gap-3 p-3 bg-slate-700/30 border border-slate-600/40 rounded-lg hover:border-slate-500/50 transition-all group">

                <div className="flex-1 min-w-0">
                    {editingId === charge.id ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
                            <input
                                {...register("charge_type", {
                                    required: "Charge name is required",
                                })}
                                autoFocus
                                disabled={savingEdit || isSaving}
                                className={`flex-1 px-2 py-1 bg-slate-700/50 border rounded text-white text-sm ${errors.charge_type ? 'border-red-600' : 'border-slate-600'}`}
                            />

                            <input
                                type="number"
                                {...register("amount", {
                                    required: "Amount is required",
                                    min: {
                                        value: 0,
                                        message: "Amount must be 0 or more",
                                    }
                                })}
                                disabled={savingEdit || isSaving}
                                className={`w-24 px-2 py-1 bg-slate-700/50 border rounded text-white text-sm ${errors.amount ? 'border-red-600' : 'border-slate-600'}`}
                            />

                            <button type="submit" className="p-1 text-green-400 cursor-pointer">
                                {savingEdit ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check />}
                            </button>

                            <button
                                type="button" onClick={() => setEditingId(null)}
                                className="p-1 text-slate-400 cursor-pointer">
                                <X className="w-4 h-4 text-red-500" />
                            </button>
                        </form>
                    ) : (
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-white">{charge.charge_type}</p>
                            <button
                                onClick={() => setEditingId(charge.id)}
                                className="p-1 text-slate-400 hover:text-blue-400"
                            >
                                <Edit2 className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Amount Input */}
                <div className="relative w-25">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">
                        ₹
                    </span>
                    <input type="number" min="0" step="1"
                        value={charge?.amount || ''}
                        placeholder="0" disabled
                        className="w-full pl-6 pr-2 py-1.5 bg-slate-700/50 border border-slate-600/50 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm disabled:opacity-50 cursor-not-allowed"
                    />
                    {charge?.amount == 0 && (
                        <span className="absolute -top-1 -right-1 text-[10px] font-semibold text-green-400 bg-green-500/20 border border-green-500/30 px-1.5 py-0.5 rounded">
                            Free
                        </span>
                    )}
                </div>

                {/* Delete Button */}
                <button
                    onClick={() => { handleCurrentCharge(charge?.id); setAlertModalOpen(true); }}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {alertModalOpen && createPortal(
                <ConfirmBlockUnblockAlert
                    open={alertModalOpen}
                    onClose={() => setAlertModalOpen(false)}
                    onConfirm={handleDeleteCharge}
                    buttonText={'Delete'}
                    type={'Delete'}
                    title={`Delete Charge`}
                    message={`Are you sure you want to delete the charge?`}
                />,
                document.body)}
        </>
    )
}

export default PaymentRow