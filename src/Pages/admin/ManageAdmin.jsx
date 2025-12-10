import React, { useEffect, useState } from "react";
import { UserPlus, Search, Check, AlertCircle } from "lucide-react";
import AdminStats from "../../Components/admin/admin/AdminStats";
import AddAdmin from "../../Components/admin/admin/AddAdmin";
import AdminTable from "../../Components/admin/admin/AdminTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins } from "../../Redux/Slice/adminSlice";
import getSweetAlert from "../../util/alert/sweetAlert";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      email: "subhradeepnath2.o@gmail.com",
      name: "Subhradeep Nath",
      phone: "+91-9876543210",
      status: "active",
      addedDate: "Nov 15, 202"
    },
    {
      id: 2,
      email: "sarah.johnson@globalgateway.com",
      name: "Sarah Johnson",
      phone: "+1 (555) 234-5678",
      status: "active",
      addedDate: "Feb 20, 2024"
    },
    {
      id: 3,
      email: "mike.wilson@globalgateway.com",
      name: "Mike Wilson",
      phone: "+1 (555) 345-6789",
      status: "blocked",
      addedDate: "Mar 10, 2024"
    },
    {
      id: 4,
      email: "jane.smith@globalgateway.com",
      name: "Jane Smith",
      phone: "+1 (555) 456-7890",
      status: "active",
      addedDate: "Apr 5, 2024"
    },
    {
      id: 5,
      email: "david.brown@globalgateway.com",
      name: "David Brown",
      phone: "+1 (555) 567-8901",
      status: "active",
      addedDate: "May 18, 2024"
    },
    {
      id: 6,
      email: "emily.davis@globalgateway.com",
      name: "Emily Davis",
      phone: "+1 (555) 678-9012",
      status: "active",
      addedDate: "Jun 22, 2024"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const { getAdminData, isAdminLoading, isAdminError } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getAllAdmins())
      .then(res => {
        // console.log('Response after fetching all admins', res);
      })
      .catch(err => {
        console.log('Error occured', err);
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      })
  }, []);

  console.log('All admins', getAdminData);

  const filteredAdmins = getAdminData.filter(admin => {
    const matchesSearch =
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.phone.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || admin.is_blocked === (filterStatus === "true");

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Admin Management</h1>
          <p className="text-sm sm:text-base text-slate-400">Manage admin access and permissions</p>
        </div>

        {/* Statistics Cards */}
        <AdminStats admins={getAdminData} />
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center gap-3">
          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-sm text-green-400">{successMessage}</span>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by name, email or phone..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
          />
        </div>

        <div className="flex gap-3">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer min-w-[120px]"
          >
            <option value="all">All Status</option>
            <option value="false">Active</option>
            <option value="true">Blocked</option>
          </select>

          <button onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Admin</span>
          </button>
        </div>
      </div>

      {/* Admin List */}
      <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
        {/* Desktop Table View */}
        <AdminTable filteredAdmins={filteredAdmins} isAdminLoading={isAdminLoading} admins={admins} setAdmins={setAdmins} setSuccessMessage={setSuccessMessage} setShowSuccess={setShowSuccess} />

        {filteredAdmins.length === 0 && (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No admins found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <AddAdmin setShowAddModal={setShowAddModal} />
      )}
    </div>
  );
}