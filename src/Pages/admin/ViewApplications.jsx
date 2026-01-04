import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Loader2, FileChartColumnIncreasing } from 'lucide-react';
import ApplicationTable from '../../Components/admin/applications/ApplicationTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllApplications } from '../../Redux/Slice/applicationSlice';
import getSweetAlert from '../../util/alert/sweetAlert';
import ApplicationStats from '../../Components/admin/applications/ApplicationStats';
import { useFullApplicationDetailsById } from '../../tanstack/query/getFullApplicationDetails';

const ViewApplicationsAdmin = () => {
  const dispatch = useDispatch();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { isApplicationLoading, allApplications, isApplicationError } = useSelector(state => state.application);

  useEffect(() => {
    dispatch(getAllApplications())
      .then(res => {
        // console.log('Response after fetching all applications', res);
      })
      .catch(err => {
        console.log('Error occured', err);
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      })
  }, [dispatch]);

  const allApplicationData = [];

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

  //   allApplications?.forEach(application=>{
  //   const { data: applicationDetails, isLoading: applicationDetailsLoading } = useFullApplicationDetailsById(application?.id);
  //   allApplicationData?.push(applicationDetails)

  // })
    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
  }, [allApplications]);

  // Filter and search logic
  useEffect(() => {
    let filtered = allApplications;

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

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'Pending').length,
    approved: applications.filter(a => a.status === 'Approved').length,
    rejected: applications.filter(a => a.status === 'Rejected').length
  }

  // console.log('Application data',allApplicationData);
  
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">View Applications</h1>
          <p className="text-sm md:text-base text-slate-400">Monitor and track all visa applications across embassies</p>
        </div>

        {/* Stats Cards */}
        <ApplicationStats stats={stats} />

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
        <ApplicationTable filteredApplications={allApplications} currentPage={currentPage} />

        {isApplicationLoading && (
          <div className="text-center py-12">
            <Loader2 className="w-16 h-16 text-white animate-spin mx-auto text-center" />
            <p className="text-slate-400 text-lg">Loading...</p>
          </div>
        )}

        {filteredApplications?.length === 0 && (
          <div className="text-center py-16">
            <FileChartColumnIncreasing className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No application found matching your filters</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewApplicationsAdmin;