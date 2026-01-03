import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const ViewApplicationsAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data - in production, fetch from API
  useEffect(() => {
    const mockApplications = [
      {
        id: 'd98edfdd-7219-4c...',
        applicantName: 'Aman Gupta',
        applicantCountry: 'India',
        appliedForCountry: 'Spain',
        visaType: 'Research Visa',
        status: 'Approved',
        applyDate: '2026-01-01',
        approveDate: '2026-01-03'
      },
      {
        id: 'a45fcdee-8320-5d...',
        applicantName: 'Sarah Johnson',
        applicantCountry: 'USA',
        appliedForCountry: 'Germany',
        visaType: 'Tourist Visa',
        status: 'Pending',
        applyDate: '2026-01-02',
        approveDate: null
      },
      {
        id: 'b67gdeef-9431-6e...',
        applicantName: 'Mohammed Ali',
        applicantCountry: 'Egypt',
        appliedForCountry: 'Canada',
        visaType: 'Work Visa',
        status: 'Rejected',
        applyDate: '2025-12-28',
        approveDate: '2026-01-02'
      },
      {
        id: 'c78hefgg-1542-7f...',
        applicantName: 'Li Wei',
        applicantCountry: 'China',
        appliedForCountry: 'Australia',
        visaType: 'Student Visa',
        status: 'Approved',
        applyDate: '2025-12-30',
        approveDate: '2026-01-04'
      },
      {
        id: 'e89jfghh-2653-8g...',
        applicantName: 'Maria Garcia',
        applicantCountry: 'Mexico',
        appliedForCountry: 'Spain',
        visaType: 'Business Visa',
        status: 'Pending',
        applyDate: '2026-01-03',
        approveDate: null
      },
      {
        id: 'f90kghii-3764-9h...',
        applicantName: 'John Smith',
        applicantCountry: 'UK',
        appliedForCountry: 'USA',
        visaType: 'Tourist Visa',
        status: 'Approved',
        applyDate: '2025-12-25',
        approveDate: '2025-12-29'
      }
    ];
    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = applications;

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(app => app.status.toLowerCase() === filterStatus.toLowerCase());
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicantCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.appliedForCountry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, applications]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-500/10 text-green-400 border border-green-500/20 backdrop-blur-sm';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 backdrop-blur-sm';
      case 'rejected':
        return 'bg-red-500/10 text-red-400 border border-red-500/20 backdrop-blur-sm';
      default:
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/20 backdrop-blur-sm';
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'Pending').length,
    approved: applications.filter(a => a.status === 'Approved').length,
    rejected: applications.filter(a => a.status === 'Rejected').length
  };

  const getStatusLabel = () => {
    switch(filterStatus) {
      case 'all': return 'All Status';
      case 'pending': return 'Pending';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      default: return 'All Status';
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">View Applications</h1>
          <p className="text-sm md:text-base text-slate-400">Monitor and track all visa applications across embassies</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs md:text-sm mb-1">Total Applications</p>
                <p className="text-2xl md:text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-blue-500/20 p-2 md:p-3 rounded-lg">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs md:text-sm mb-1">Pending</p>
                <p className="text-2xl md:text-3xl font-bold">{stats.pending}</p>
              </div>
              <div className="bg-yellow-500/20 p-2 md:p-3 rounded-lg">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs md:text-sm mb-1">Approved</p>
                <p className="text-2xl md:text-3xl font-bold">{stats.approved}</p>
              </div>
              <div className="bg-green-500/20 p-2 md:p-3 rounded-lg">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs md:text-sm mb-1">Rejected</p>
                <p className="text-2xl md:text-3xl font-bold">{stats.rejected}</p>
              </div>
              <div className="bg-red-500/20 p-2 md:p-3 rounded-lg">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
            />
          </div>

          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer min-w-[160px] pr-10"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg border border-slate-600/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-600/50 bg-slate-800/50">
                  <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-slate-300">Application ID</th>
                  <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-slate-300">Applicant Name</th>
                  <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-slate-300 hidden md:table-cell">From Country</th>
                  <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-slate-300 hidden lg:table-cell">Applied For</th>
                  <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-slate-300 hidden xl:table-cell">Visa Type</th>
                  <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-slate-300 hidden lg:table-cell">Apply Date</th>
                  <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-slate-300 hidden xl:table-cell">Decision Date</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((app, index) => (
                  <tr
                    key={app.id}
                    className="border-b border-slate-600/30 hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-4 py-4 text-xs md:text-sm text-blue-400 font-mono">{app.id}</td>
                    <td className="px-4 py-4 text-xs md:text-sm text-white">{app.applicantName}</td>
                    <td className="px-4 py-4 text-xs md:text-sm text-slate-300 hidden md:table-cell">{app.applicantCountry}</td>
                    <td className="px-4 py-4 text-xs md:text-sm text-slate-300 hidden lg:table-cell">{app.appliedForCountry}</td>
                    <td className="px-4 py-4 text-xs md:text-sm text-slate-300 hidden xl:table-cell">{app.visaType}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs md:text-sm text-slate-300 hidden lg:table-cell">{app.applyDate}</td>
                    <td className="px-4 py-4 text-xs md:text-sm text-slate-300 hidden xl:table-cell">{app.approveDate || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-slate-400 text-lg">No applications found</p>
            </div>
          )}

          {/* Pagination */}
          <div className="px-4 md:px-6 py-4 border-t border-slate-600/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs md:text-sm text-slate-400">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredApplications.length)} of {filteredApplications.length} applications
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 md:px-4 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg hover:bg-slate-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 md:gap-2 text-xs md:text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden md:inline">Previous</span>
              </button>
              
              <div className="flex items-center gap-1 md:gap-2">
                {[...Array(totalPages)].slice(0, 5).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 md:px-4 py-2 rounded-lg transition-colors text-xs md:text-sm ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700/30 border border-slate-600/50 hover:bg-slate-700/50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 md:px-4 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg hover:bg-slate-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 md:gap-2 text-xs md:text-sm"
              >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicationsAdmin;