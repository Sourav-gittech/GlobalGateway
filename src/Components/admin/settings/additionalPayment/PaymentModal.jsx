// import React from 'react'
// import { Plus, X, Loader2 } from "lucide-react";

// // Modal Component
// const Modal = ({ isOpen, onClose, children }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//             <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md">
//                 {children}
//             </div>
//         </div>
//     );
// };

// const PaymentModal = ({ showAddModal, setShowAddModal, newCharge, setNewCharge, isAdding, setIsAdding, charges,setCharges,getSweetAlert }) => {

//     const handleAddCharge = async () => {
//         if (!newCharge.label.trim()) {
//             getSweetAlert('Validation Error', 'Please enter a charge name', 'warning');
//             return;
//         }

//         const amount = parseFloat(newCharge.amount);
//         if (isNaN(amount) || amount < 0) {
//             getSweetAlert('Validation Error', 'Please enter a valid amount (minimum 0)', 'warning');
//             return;
//         }

//         const labelExists = charges.some(c =>
//             c.label.toLowerCase() === newCharge.label.trim().toLowerCase()
//         );
//         if (labelExists) {
//             getSweetAlert('Validation Error', 'A charge with this name already exists', 'warning');
//             return;
//         }

//         try {
//             setIsAdding(true);
//             await new Promise(resolve => setTimeout(resolve, 500));

//             const newId = charges.length > 0 ? Math.max(...charges.map(c => c.id)) + 1 : 1;
//             const newChargeData = {
//                 id: newId,
//                 label: newCharge.label.trim(),
//                 amount: amount
//             };

//             setCharges([...charges, newChargeData]);
//             setNewCharge({ label: '', amount: '' });
//             setShowAddModal(false);

//             getSweetAlert('Success', 'Charge added successfully', 'success');
//         } catch (error) {
//             console.error('Error adding charge:', error);
//             getSweetAlert('Error', 'Failed to add charge', 'error');
//         } finally {
//             setIsAdding(false);
//         }
//     };

//     return (
//         <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-4 border-b border-slate-700">
//                 <h3 className="text-lg font-semibold text-white">Add New Charge</h3>
//                 <button
//                     onClick={() => setShowAddModal(false)}
//                     className="p-1 hover:bg-slate-700/50 rounded-lg transition-colors"
//                 >
//                     <X className="w-5 h-5 text-slate-400" />
//                 </button>
//             </div>

//             {/* Modal Content */}
//             <div className="p-4 space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium text-slate-300 mb-2">
//                         Charge Name
//                     </label>
//                     <input
//                         type="text"
//                         placeholder="e.g., Document Attestation"
//                         value={newCharge.label}
//                         onChange={(e) => setNewCharge({ ...newCharge, label: e.target.value })}
//                         disabled={isAdding}
//                         maxLength={100}
//                         className="w-full px-3 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-slate-300 mb-2">
//                         Amount (₹)
//                     </label>
//                     <input
//                         type="number"
//                         min="0"
//                         step="1"
//                         placeholder="0"
//                         value={newCharge.amount}
//                         onChange={(e) => setNewCharge({ ...newCharge, amount: e.target.value })}
//                         disabled={isAdding}
//                         className="w-full px-3 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
//                     />
//                 </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="flex gap-2 p-4 border-t border-slate-700">
//                 <button
//                     onClick={() => setShowAddModal(false)}
//                     disabled={isAdding}
//                     className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700/50 text-white rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed"
//                 >
//                     Cancel
//                 </button>
//                 <button
//                     onClick={handleAddCharge}
//                     disabled={isAdding || !newCharge.label.trim()}
//                     className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
//                 >
//                     {isAdding ? (
//                         <>
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                             Adding...
//                         </>
//                     ) : (
//                         <>
//                             <Plus className="w-4 h-4" />
//                             Add Charge
//                         </>
//                     )}
//                 </button>
//             </div>
//         </Modal>
//     )
// }

// export default PaymentModal





import React from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import getSweetAlert from "../../../../util/alert/sweetAlert";
import hotToast from "../../../../util/alert/hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addCharge, fetchCharges } from "../../../../Redux/Slice/chargesSlice";

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md">
                {children}
            </div>
        </div>
    );
};

const PaymentModal = ({ showAddModal, setShowAddModal, charges }) => {
    const dispatch = useDispatch();
    const { isChargesLoading, allCharges, hasChargesError } = useSelector(state => state?.charge);

    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        defaultValues: {
            label: "",
            amount: "",
        }
    });

    const onSubmit = async (data) => {
        const labelExists = charges.some(c => c.label.toLowerCase() === data.label.trim().toLowerCase());

        if (labelExists) {
            getSweetAlert("Validation Error", "A charge with this name already exists", "warning");
            return;
        }

        try {
            const newChargeData = {
                charge_type: data?.label?.trim()?.split(" ")?.map(charge => charge?.charAt(0)?.toUpperCase() + charge?.slice(1)?.toLowerCase())?.join(" "),
                amount: data?.amount
            }

            dispatch(addCharge(newChargeData))
                .then(res => {
                    // console.log('Response for adding charges', res);

                    if (res.meta.requestStatus === "fulfilled") {
                        reset();
                        setShowAddModal(false);
                        hotToast("New charge added successfully", "success");
                        dispatch(fetchCharges())
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
            console.error("Error adding charge:", error);
            getSweetAlert("Error", "Failed to add charge", "error");
        }
    };

    const clearField = () => {
        setShowAddModal(false);
        reset();
    }

    return (
        <Modal isOpen={showAddModal} onClose={() => clearField()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <h3 className="text-lg font-semibold text-white">
                    Add New Charge
                </h3>
                <button
                    onClick={() => clearField()}
                    className="p-1 hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer">
                    <X className="w-5 h-5 text-slate-400" />
                </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4 space-y-4">
                    {/* Charge Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Charge Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Document Attestation"
                            disabled={isChargesLoading}
                            maxLength={100}
                            {...register("label", {
                                required: "Charge name is required",
                            })}
                            className="w-full px-3 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                        />
                        {errors.label && (
                            <p className="text-xs text-red-400 mt-1">
                                {errors.label.message}
                            </p>
                        )}
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Amount (₹)
                        </label>
                        <input
                            type="number" min="0" step="1" placeholder="0"
                            disabled={isChargesLoading}
                            {...register("amount", {
                                required: "Amount is required",
                                min: {
                                    value: 0,
                                    message: "Amount must be 0 or more",
                                },
                            })}
                            className="w-full px-3 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                        />
                        {errors.amount && (
                            <p className="text-xs text-red-400 mt-1">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex gap-2 p-4 border-t border-slate-700">
                    <button
                        type="button"
                        onClick={() => clearField()}
                        disabled={isChargesLoading}
                        className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700/50 text-white rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isChargesLoading}
                        className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                    >
                        {isChargesLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Adding...
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" />
                                Add Charge
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default PaymentModal;