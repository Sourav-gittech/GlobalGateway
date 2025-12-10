import React from "react";
import { X, Trash2 } from "lucide-react";

export default function ConfirmDeleteModal({ open, onClose, onConfirm, title = "Delete Item", message = "Are you sure you want to delete this item? This action cannot be undone." }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      
      {/* Modal Box */}
      <div className="w-full max-w-md rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl p-6 relative animate-fadeIn">
        
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white transition"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center text-center">
          
          {/* Icon */}
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-500/20 border border-red-500/30 mb-4">
            <Trash2 className="text-red-400" size={28} />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>

          {/* Message */}
          <p className="text-gray-300 text-sm mb-6">
            {message}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20 transition"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
