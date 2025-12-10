import React from 'react'
import AdminCard from './AdminCard'
import AdminRow from './AdminRow'
import { Loader2 } from 'lucide-react';

const AdminTable = ({ filteredAdmins, admins, isAdminLoading, setAdmins, setSuccessMessage, setShowSuccess }) => {

    const showSuccessNotification = (message) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleBlockAdmin = (id) => {
        setAdmins(admins.map(admin =>
            admin.id === id
                ? { ...admin, status: admin.status === "active" ? "blocked" : "active" }
                : admin
        ));
        const admin = admins.find(a => a.id === id);
        showSuccessNotification(
            admin.status === "active"
                ? "Admin access blocked successfully!"
                : "Admin access restored successfully!"
        );
    };

    const handleDeleteAdmin = (id) => {
        setAdmins(admins.filter(admin => admin.id !== id));
        showSuccessNotification("Admin removed successfully!");
    };

    return (
        <>
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-700/50">
                            <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Admin Name</th>
                            <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</th>
                            <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</th>
                            <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Verification</th>
                            <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Added Date</th>
                            <th className="text-right p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isAdminLoading && (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center">
                                    <Loader2 className="w-8 h-8 text-white animate-spin mx-auto" />
                                </td>
                            </tr>
                        )}
                        {!isAdminLoading && (!filteredAdmins || filteredAdmins.length === 0) && (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                                    No admins found matching your criteria
                                </td>
                            </tr>
                        )}
                        {!isAdminLoading && filteredAdmins?.length > 0 &&
                            filteredAdmins.map((admin, index) => (
                                <AdminRow key={admin.id} index={index} admin={admin} filteredAdmins={filteredAdmins} handleBlockAdmin={handleBlockAdmin} handleDeleteAdmin={handleDeleteAdmin} />
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden divide-y divide-slate-700/30">
                {filteredAdmins.map((admin) => (
                    <AdminCard key={admin.id} admin={admin} handleBlockAdmin={handleBlockAdmin} handleDeleteAdmin={handleDeleteAdmin} />
                ))}
            </div>
        </>
    )
}

export default AdminTable