import React from "react";
import { X, CheckCircle } from "lucide-react";

export default function ConfirmUnblock({
  open,
  onClose,
  onConfirm,
  title = "Unblock Admin",
  message = "Are you sure you want to unblock this admin?",
}) {
  if (!open) return null; // REQUIRED FIX

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl p-6 relative animate-fadeIn">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white transition"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4">
            <CheckCircle className="text-emerald-400" size={28} />
          </div>

          <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>

          <p className="text-gray-300 text-sm mb-6">{message}</p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20 transition"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
            >
              Unblock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
