import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  UserPlus,
  Trash2,
  Shield,
  Mail,
  Phone,
  Calendar,
  Search,
  X,
  Check,
  Ban,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

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

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         admin.phone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || admin.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalAdmins = admins.length;
  const activeAdmins = admins.filter(a => a.status === "active").length;
  const blockedAdmins = admins.filter(a => a.status === "blocked").length;

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

  const showSuccessNotification = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const onSubmit = handleSubmit(handleAddAdmin);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Admin Management</h1>
          <p className="text-sm sm:text-base text-slate-400">Manage admin access and permissions</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-400 mb-1">Total Admins</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{totalAdmins}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-400 mb-1">Active</p>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-400">{activeAdmins}</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-400 mb-1">Blocked</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-400">{blockedAdmins}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
              </div>
            </div>
          </div>
        </div>
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
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer min-w-[120px]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
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
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Admin Name</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Added Date</th>
                <th className="text-right p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin, index) => (
                <tr 
                  key={admin.id}
                  className={`border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors ${
                    index === filteredAdmins.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="p-4">
                    <div className="text-sm font-medium text-white">{admin.name}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {admin.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {admin.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                      admin.status === "active" 
                        ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
                        : "text-red-400 bg-red-500/20 border-red-500/30"
                    }`}>
                      {admin.status === "active" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {admin.status === "active" ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {admin.addedDate}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleBlockAdmin(admin.id)}
                        className={`p-2 rounded-lg border transition-all ${
                          admin.status === "active"
                            ? "bg-amber-600/20 hover:bg-amber-600/30 border-amber-500/30 text-amber-400"
                            : "bg-red-600/20 hover:bg-red-600/30 border-red-500/30 text-red-400"
                        }`}
                        title={admin.status === "active" ? "Block access" : "Restore access"}
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 transition-all"
                        title="Remove admin"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden divide-y divide-slate-700/30">
          {filteredAdmins.map((admin) => (
            <div key={admin.id} className="p-4 hover:bg-slate-700/20 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white mb-2">{admin.name}</h3>
                  <div className="space-y-1.5">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{admin.email}</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span>{admin.phone}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border ${
                      admin.status === "active" 
                        ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
                        : "text-red-400 bg-red-500/20 border-red-500/30"
                    }`}>
                      {admin.status === "active" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {admin.status === "active" ? "Active" : "Blocked"}
                    </span>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {admin.addedDate}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBlockAdmin(admin.id)}
                    className={`p-2 rounded-lg border transition-all ${
                      admin.status === "active"
                        ? "bg-amber-600/20 hover:bg-amber-600/30 border-amber-500/30 text-amber-400"
                        : "bg-emerald-600/20 hover:bg-emerald-600/30 border-emerald-500/30 text-emerald-400"
                    }`}
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAdmin(admin.id)}
                    className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAdmins.length === 0 && (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No admins found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
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
      )}
    </div>
  );
}