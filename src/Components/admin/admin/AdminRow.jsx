import React from 'react'
import { Ban, Calendar, CheckCircle, CircleAlert, CircleCheck, Mail, Phone, Trash2, XCircle } from 'lucide-react'

const AdminRow = ({ admin, index, filteredAdmins, handleBlockAdmin, handleDeleteAdmin }) => {
    // console.log('Current admin details',admin);

    const Icon = !admin.is_blocked ? Ban : CircleCheck;
    return (
        <tr className={`border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors ${index === filteredAdmins.length - 1 ? 'border-b-0' : ''
            }`}
        >
            <td className="p-4">
                <div className="text-sm font-medium text-white">{admin?.name ? admin?.name : 'N/A'}</div>
            </td>
            <td className="p-4">
                <div className="text-sm text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {admin.email ? admin.email : 'N/A'}
                </div>
            </td>
            <td className="p-4">
                <div className="text-sm text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {admin.phone ? admin.phone : 'N/A'}
                </div>
            </td>
            <td className="p-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${admin.is_verified === "pending"
                    ? "text-orange-400 bg-orange-500/20 border-orange-500/30" : admin.is_verified === "success"
                        ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/30 px-3"
                        : "text-red-400 bg-red-500/20 border-red-500/30"
                    }`}>
                    {admin.is_verified === "pending" ? (
                        <CircleAlert className="w-3 h-3" />
                    ) : admin.is_verified === "success" ? (
                        <CheckCircle className="w-3 h-3" />
                    ) : (
                        <XCircle className="w-3 h-3" />
                    )}
                    {admin.is_verified === "pending" ? "Pending" : admin.is_verified === "success" ? "success" : "Failed"}
                </span>
            </td>
            <td className="p-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${!admin?.is_blocked
                    ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/30 px-3"
                    : "text-red-400 bg-red-500/20 border-red-500/30"
                    }`}>
                    {admin?.is_blocked === false ? (
                        <CheckCircle className="w-3 h-3" />
                    ) : (
                        <XCircle className="w-3 h-3" />
                    )}
                    {!admin?.is_blocked ? "Active" : "Blocked"}
                </span>
            </td>
            <td className="p-4">
                <div className="text-sm text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {admin?.updated_at ? new Date(admin?.created_at)?.toLocaleDateString("en-GB") : "N/A"}
                </div>
            </td>
            <td className="p-4">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => handleBlockAdmin(admin?.id, admin?.is_blocked)}
                        className={`p-2 rounded-lg border transition-all ${admin.is_blocked
                            ? "bg-green-600/20 hover:bg-green-600/30 border-green-500/30 text-green-400"
                            : "bg-red-600/20 hover:bg-red-600/30 border-red-500/30 text-red-400"} ${admin.is_verified === "pending" ? 'cursor-not-allowed bg-red-600/50 hover:bg-red-600/50 text-red-500' : 'cursor-pointer'}`}
                        title={!admin.is_blocked ? "Block access" : "Restore access"} disabled={admin.is_verified === "pending"}
                    >
                        <Icon className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="p-2 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-400 transition-all cursor-pointer"
                        title="Remove admin"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

import {
  Ban,
  Calendar,
  CheckCircle,
  CircleAlert,
  Mail,
  Phone,
  Trash2,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";

import ConfirmDelete from "../../../Components/admin/common/alarts/ConfirmDelete";
import ConfirmBlock from "../../../Components/admin/common/alarts/ConfirmBlock";
import ConfirmUnblock from "../../../Components/admin/common/alarts/ConfirmUnblock";

const AdminRow = ({
  admin,
  index,
  filteredAdmins,
  handleBlockAdmin,
  handleDeleteAdmin,
}) => {
  // DELETE MODAL
  const [openDelete, setOpenDelete] = useState(false);
  const openDeleteModal = () => setOpenDelete(true);
  const closeDeleteModal = () => setOpenDelete(false);

  const confirmDelete = async () => {
    await handleDeleteAdmin(admin.id);
    closeDeleteModal();
  };

  // BLOCK / UNBLOCK MODALS
  const [openBlock, setOpenBlock] = useState(false);
  const [openUnblock, setOpenUnblock] = useState(false);

  const openBlockModal = () => setOpenBlock(true);
  const closeBlockModal = () => setOpenBlock(false);

  const openUnblockModal = () => setOpenUnblock(true);
  const closeUnblockModal = () => setOpenUnblock(false);

  // Wait for API completion then close modal (same as delete behavior)
  const confirmBlock = async () => {
    await handleBlockAdmin(admin.id);
    closeBlockModal();
  };

  const confirmUnblock = async () => {
    await handleBlockAdmin(admin.id);
    closeUnblockModal();
  };

  return (
    <>

      <tr
        className={`border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors ${
          index === filteredAdmins.length - 1 ? "border-b-0" : ""
        }`}
      >
        <td className="p-4">
          <div className="text-sm font-medium text-white">
            {admin?.name || "N/A"}
          </div>
        </td>

        <td className="p-4">
          <div className="text-sm text-slate-300 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            {admin.email || "N/A"}
          </div>
        </td>

        <td className="p-4">
          <div className="text-sm text-slate-300 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            {admin.phone || "N/A"}
          </div>
        </td>

        <td className="p-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
              admin.is_verified === "pending"
                ? "text-orange-400 bg-orange-500/20 border-orange-500/30"
                : admin.is_verified === "success"
                ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
                : "text-red-400 bg-red-500/20 border-red-500/30"
            }`}
          >
            {admin.is_verified === "pending" ? (
              <CircleAlert className="w-3 h-3" />
            ) : admin.is_verified === "success" ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <XCircle className="w-3 h-3" />
            )}
            {admin.is_verified === "pending"
              ? "Pending"
              : admin.is_verified === "success"
              ? "Success"
              : "Failed"}
          </span>
        </td>

        <td className="p-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
              admin?.is_blocked === false
                ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
                : "text-red-400 bg-red-500/20 border-red-500/30"
            }`}
          >
            {admin?.is_blocked === false ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <XCircle className="w-3 h-3" />
            )}
            {admin?.is_blocked === false ? "Active" : "Blocked"}
          </span>
        </td>

        <td className="p-4">
          <div className="text-sm text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {new Date(admin?.created_at)?.toLocaleDateString("en-GB")}
          </div>
        </td>

        <td className="p-4">
          <div className="flex items-center justify-end gap-2">

            {/* BLOCK / UNBLOCK BUTTON - Toggles based on admin.is_blocked */}
            {admin?.is_blocked === false ? (
              <button
                onClick={openBlockModal}
                className="p-2 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-400 transition-all"
                title="Block Admin"
              >
                <Ban className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={openUnblockModal}
                className="p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 transition-all"
                title="Unblock Admin"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            )}

            {/* DELETE BUTTON */}
            <button
              onClick={openDeleteModal}
              className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 transition-all"
              title="Delete Admin"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* DELETE MODAL */}
      <ConfirmDelete
        open={openDelete}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Admin?"
        message={`Are you sure you want to delete "${admin.name}"? This action cannot be undone.`}
      />

      {/* BLOCK MODAL */}
      <ConfirmBlock
        open={openBlock}
        onClose={closeBlockModal}
        onConfirm={confirmBlock}
        title="Block Admin?"
        message={`Are you sure you want to block "${admin.name}"? They will lose access immediately.`}
      />

      {/* UNBLOCK MODAL */}
      <ConfirmUnblock
        open={openUnblock}
        onClose={closeUnblockModal}
        onConfirm={confirmUnblock}
        title="Unblock Admin?"
        message={`Are you sure you want to unblock "${admin.name}"? They will regain access.`}
      />
    </>
  );
};

export default AdminRow;