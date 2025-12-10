import React from 'react'
import AdminCard from './AdminCard'
import AdminRow from './AdminRow'
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUserBlock } from '../../../Redux/Slice/userSlice';
import hotToast from '../../../util/alert/hot-toast';
import { getAllAdmins } from '../../../Redux/Slice/adminSlice';
import { logoutUser } from '../../../Redux/Slice/auth/checkAuthSlice';
import { useNavigate } from 'react-router-dom';

const AdminTable = ({ filteredAdmins, isAdminLoading, setSuccessMessage, setShowSuccess }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isuserLoading, userAuthData, userError } = useSelector(state => state.checkAuth);
    // console.log('Logged user data', userAuthData);

    const AdminTable = ({
        filteredAdmins,
        admins,
        isAdminLoading,
        setAdmins,
        setSuccessMessage,
        setShowSuccess
    }) => {
        const showSuccessNotification = (message) => {
            setSuccessMessage(message);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        };

        const handleBlockAdmin = (adminId, currentStatus) => {
            // console.log("change status of admin:", adminId, currentStatus);
            const status = !currentStatus ? 'blocked' : 'unblocked';

            dispatch(toggleUserBlock({ id: adminId, currentStatus }))
                .then(res => {
                    // console.log('Response for changing status', res);

                    if (res?.meta?.requestStatus == "fulfilled") {
                        hotToast(`Admin ${status} successfully`, "success");
                        dispatch(getAllAdmins());

                        if (userAuthData?.id == adminId && !currentStatus) {
                            dispatch(logoutUser("admin"));
                            navigate("/admin/");
                        }
                    }
                    else {
                        hotToast(`Admin ${status} unsuccessfull`, "error");
                    }
                })
                .catch(err => {
                    console.log('Error occured', err);
                    getSweetAlert('Oops...', 'Something went wrong!', 'error');
                })
        };

        const handleDeleteAdmin = (id) => {
            // setAdmins(admins.filter(admin => admin.id !== id));

            const handleBlockAdmin = async (id) => {
                // Find the admin BEFORE updating state
                const admin = admins.find(a => a.id === id);
                const wasBlocked = admin?.is_blocked;

                // Toggle is_blocked state
                setAdmins(admins.map(a =>
                    a.id === id
                        ? { ...a, is_blocked: !a.is_blocked }
                        : a
                ));

                // Show notification with correct message based on previous state
                if (wasBlocked === false) {
                    // Admin was active, now blocking
                    showSuccessNotification("Admin blocked successfully!");
                } else {
                    // Admin was blocked, now unblocking
                    showSuccessNotification("Admin unblocked successfully!");
                }
            };

            const handleDeleteAdmin = async (id) => {
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
                                        <AdminRow
                                            key={admin.id}
                                            index={index}
                                            admin={admin}
                                            filteredAdmins={filteredAdmins}
                                            handleBlockAdmin={handleBlockAdmin}
                                            handleDeleteAdmin={handleDeleteAdmin}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile/Tablet Card View */}
                    <div className="lg:hidden divide-y divide-slate-700/30">
                        {!isAdminLoading && filteredAdmins?.length > 0 &&
                            filteredAdmins.map((admin) => (
                                <AdminCard
                                    key={admin.id}
                                    admin={admin}
                                    handleBlockAdmin={handleBlockAdmin}
                                    handleDeleteAdmin={handleDeleteAdmin}
                                />
                            ))}
                    </div>
                </>
            )
        }
    }
}

export default AdminTable