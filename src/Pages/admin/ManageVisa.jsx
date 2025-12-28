import React, { useEffect, useState } from 'react';
import { Search, FileText } from 'lucide-react';
import VisaStats from '../../Components/admin/visa/VisaStats';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVisa } from '../../Redux/Slice/visaSlice';
import VisaTable from '../../Components/admin/visa/VisaTable';

const ManageVisa = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedVisa, setExpandedVisa] = useState(null);
  const [visaStatuses, setVisaStatuses] = useState({});
  const dispatch = useDispatch();
  const { isVisaListloading, visaListData } = useSelector(state => state?.visa);

  useEffect(() => {
    dispatch(fetchAllVisa())
      .then(res => {
        // console.log('Response for fetching all visa', res);
      })
      .catch(err => {
        console.log('Error occured', err);
      })
  }, [dispatch]);

  // Sample comprehensive visa data showing all relationships
  const visaData = [
    {
      id: 1,
      visaName: 'Student Visa',
      visaType: 'Educational',
      globalStatus: 'active',
      totalApplications: 1247,
      countryStatus: [
        { country: 'India', status: 'active', processing: '40 days', validity: '1 year', fees: 10000, applications: 690, blockedFor: [] },
        { country: 'Bangladesh', status: 'active', processing: '45 days', validity: '1 year', fees: 9500, applications: 189, blockedFor: [] },
        { country: 'Sri Lanka', status: 'active', processing: '50 days', validity: '1 year', fees: 10500, applications: 145, blockedFor: [] },
        { country: 'Russia', status: 'blocked', processing: '45 days', validity: '1 year', fees: 10000, applications: 0, blockedFor: ['India', 'China', 'Pakistan'] },
        { country: 'Argentina', status: 'blocked', processing: '45 days', validity: '1 year', fees: 10000, applications: 0, blockedFor: ['Brazil', 'Chile'] },
        { country: 'UAE', status: 'active', processing: '45 days', validity: '1 year', fees: 11000, applications: 223, blockedFor: [] }
      ]
    },
    {
      id: 2,
      visaName: 'Tourist Visa',
      visaType: 'Tourism',
      globalStatus: 'active',
      totalApplications: 3421,
      countryStatus: [
        { country: 'India', status: 'active', processing: '15 days', validity: '6 months', fees: 20000, applications: 1546, blockedFor: [] },
        { country: 'Bangladesh', status: 'active', processing: '20 days', validity: '6 months', fees: 19000, applications: 432, blockedFor: [] },
        { country: 'Sri Lanka', status: 'active', processing: '18 days', validity: '6 months', fees: 20500, applications: 321, blockedFor: [] },
        { country: 'Russia', status: 'active', processing: '25 days', validity: '6 months', fees: 21000, applications: 289, blockedFor: [] },
        { country: 'Argentina', status: 'active', processing: '22 days', validity: '6 months', fees: 19500, applications: 245, blockedFor: [] },
        { country: 'UAE', status: 'active', processing: '20 days', validity: '6 months', fees: 22000, applications: 588, blockedFor: [] }
      ]
    },
    {
      id: 3,
      visaName: 'Business Visa',
      visaType: 'Business',
      globalStatus: 'blocked',
      totalApplications: 892,
      countryStatus: [
        { country: 'India', status: 'blocked', processing: '30 days', validity: '2 years', fees: 25000, applications: 0, blockedFor: ['USA', 'UK', 'Canada'] },
        { country: 'Bangladesh', status: 'blocked', processing: '30 days', validity: '2 years', fees: 24000, applications: 0, blockedFor: ['Australia', 'New Zealand'] },
        { country: 'Sri Lanka', status: 'blocked', processing: '30 days', validity: '2 years', fees: 26000, applications: 0, blockedFor: ['Singapore', 'Malaysia'] },
        { country: 'Russia', status: 'active', processing: '35 days', validity: '2 years', fees: 27000, applications: 234, blockedFor: [] },
        { country: 'Argentina', status: 'active', processing: '32 days', validity: '2 years', fees: 25500, applications: 189, blockedFor: [] },
        { country: 'UAE', status: 'active', processing: '28 days', validity: '2 years', fees: 28000, applications: 469, blockedFor: [] }
      ]
    },
    {
      id: 4,
      visaName: 'Work Visa',
      visaType: 'Employment',
      globalStatus: 'active',
      totalApplications: 2156,
      countryStatus: [
        { country: 'India', status: 'active', processing: '55 days', validity: '3 years', fees: 35000, applications: 1001, blockedFor: [] },
        { country: 'Bangladesh', status: 'active', processing: '60 days', validity: '3 years', fees: 33000, applications: 298, blockedFor: [] },
        { country: 'Sri Lanka', status: 'active', processing: '65 days', validity: '3 years', fees: 36000, applications: 223, blockedFor: [] },
        { country: 'Russia', status: 'blocked', processing: '60 days', validity: '3 years', fees: 35000, applications: 0, blockedFor: ['Ukraine', 'Poland', 'Estonia'] },
        { country: 'Argentina', status: 'active', processing: '62 days', validity: '3 years', fees: 34000, applications: 178, blockedFor: [] },
        { country: 'UAE', status: 'active', processing: '58 days', validity: '3 years', fees: 37000, applications: 456, blockedFor: [] }
      ]
    },
    {
      id: 5,
      visaName: 'Family Visa',
      visaType: 'Family Reunion',
      globalStatus: 'active',
      totalApplications: 1834,
      countryStatus: [
        { country: 'India', status: 'active', processing: '38 days', validity: '5 years', fees: 15000, applications: 834, blockedFor: [] },
        { country: 'Bangladesh', status: 'active', processing: '42 days', validity: '5 years', fees: 14500, applications: 289, blockedFor: [] },
        { country: 'Sri Lanka', status: 'active', processing: '40 days', validity: '5 years', fees: 15500, applications: 234, blockedFor: [] },
        { country: 'Russia', status: 'active', processing: '45 days', validity: '5 years', fees: 16000, applications: 156, blockedFor: [] },
        { country: 'Argentina', status: 'active', processing: '40 days', validity: '5 years', fees: 14800, applications: 123, blockedFor: [] },
        { country: 'UAE', status: 'active', processing: '35 days', validity: '5 years', fees: 16500, applications: 198, blockedFor: [] }
      ]
    }
  ];


  const getStatusColor = (status) => {
    return status === 'active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10';
  };

  const getVisaStatus = (visaId, defaultStatus) => {
    return visaStatuses[visaId] || defaultStatus;
  };

  const filteredVisas = visaData.filter(visa => {
    const currentStatus = getVisaStatus(visa.id, visa.globalStatus);
    const matchesSearch = visa.visaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visa.visaType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || currentStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  console.log('All available visa', visaListData);

  return (
    <div className="min-h-screen w-full bg-transparent">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-3xl font-bold text-white mb-2">Manage Global Visas</h1>
          <p className="text-slate-400 text-sm">Monitor all visa types and country-specific status</p>
        </div>

        {/* Stats Cards */}
        <VisaStats getVisaStatus={getVisaStatus} />

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search visa types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer min-w-[140px]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '12px'
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Not Active</option>
          </select>
        </div>

        {/* Visa Table */}
        <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <VisaTable expandedVisa={expandedVisa} setExpandedVisa={setExpandedVisa} filteredVisas={visaListData} isVisaListloading={isVisaListloading} getVisaStatus={getVisaStatus} />
          </div>

          {filteredVisas.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No visa types found matching your filters</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        select option {
          background-color: rgb(51, 65, 85);
          color: white;
          padding: 8px;
        }
      `}</style>
    </div>
  );
};

export default ManageVisa;