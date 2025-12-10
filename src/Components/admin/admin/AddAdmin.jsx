import { X } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';

const AddAdmin = ({ setShowAddModal }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleAddAdmin = (data) => {
        const newAdmin = {
            id: Date.now(),
            email: data.email,
            name: data.name,
            phone: data.phone,
            status: "active",
            addedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        setAdmins([...admins, newAdmin]);
        reset();
        setShowAddModal(false);
        showSuccessNotification("Admin added successfully!");
    };

    const onSubmit = handleSubmit(handleAddAdmin);

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => {
                setShowAddModal(false);
                reset();
            }}
        >
            <div
                className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl max-w-md w-full p-6 space-y-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Add New Admin</h3>
                        <p className="text-sm text-slate-400 mt-1">Grant admin access to a new user</p>
                    </div>
                    <button
                        onClick={() => {
                            setShowAddModal(false);
                            reset();
                        }}
                        className="p-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                            Admin Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                }
                            })}
                            placeholder="Subhradeep Nath"
                            className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            placeholder="admin@example.com"
                            className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[\d\s\-\+\(\)]+$/,
                                    message: "Invalid phone number"
                                },
                                minLength: {
                                    value: 10,
                                    message: "Phone number must be at least 10 digits"
                                }
                            })}
                            placeholder="+91-9876543210"
                            className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => {
                                setShowAddModal(false);
                                reset();
                            }}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onSubmit}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm transition-all font-medium"
                        >
                            Add Admin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAdmin