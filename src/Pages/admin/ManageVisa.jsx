import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight,
  Lock,
  Unlock,
  Clock,
  Calendar,
  DollarSign,
  FileText,
  Globe,
  Filter,
  MapPin,
  Users
} from 'lucide-react';

const ManageVisa = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedVisa, setExpandedVisa] = useState(null);
  const [visaStatuses, setVisaStatuses] = useState({});

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

  const toggleVisaStatus = (visaId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    setVisaStatuses(prev => ({
      ...prev,
      [visaId]: newStatus
    }));
    
    if (newStatus === 'blocked') {
      alert('Visa globally blocked from the platform');
    } else {
      alert('Visa globally activated on the platform');
    }
  };

 
  const getStatusColor = (status) => {
    return status === 'active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10';
  };

  const getBlockedCountries = (visa) => {
    const blocked = visa.countryStatus.filter(c => c.status === 'blocked').map(c => c.country);
    return blocked.length > 0 ? blocked.join(', ') : 'Open';
  };

  const getAverageProcessing = (visa) => {
    const activeCountries = visa.countryStatus.filter(c => c.status === 'active');
    if (activeCountries.length === 0) return 'N/A';
    const totalDays = activeCountries.reduce((sum, c) => sum + parseInt(c.processing), 0);
    return Math.round(totalDays / activeCountries.length) + ' days';
  };

  const getAverageValidity = (visa) => {
    const validities = visa.countryStatus.map(c => c.validity);
    const uniqueValidities = [...new Set(validities)];
    if (uniqueValidities.length === 1) return uniqueValidities[0];
    return uniqueValidities.join(' / ');
  };

  return (
    <div className="min-h-screen w-full bg-transparent">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-3xl font-bold text-white mb-2">Manage Global Visas</h1>
          <p className="text-slate-400 text-sm">Monitor all visa types and country-specific status</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-xs font-medium">Total Visa Types</h3>
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white">{visaData.length}</p>
            <p className="text-xs text-slate-500 mt-1">System wide</p>
          </div>

          <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-xs font-medium">Active Visas</h3>
              <Unlock className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              {visaData.filter(v => v.globalStatus === 'active').length}
            </p>
            <p className="text-xs text-slate-500 mt-1">Currently accepting</p>
          </div>

          <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-xs font-medium">Not Active Visas</h3>
              <Lock className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              {visaData.filter(v => v.globalStatus === 'blocked').length}
            </p>
            <p className="text-xs text-slate-500 mt-1">Currently disabled</p>
          </div>

          <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-xs font-medium">Total Applications</h3>
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              {visaData.reduce((sum, v) => sum + v.totalApplications, 0).toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">All time</p>
          </div>
        </div>

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
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-600/50">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium text-sm w-12"></th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium text-sm">Visa Type</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium text-sm hidden lg:table-cell">Avg. Processing</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium text-sm hidden xl:table-cell">Validity</th>
                  <th className="text-center px-6 py-3 text-slate-400 font-medium text-sm hidden lg:table-cell">Applications</th>
                  <th className="text-center px-6 py-3 text-slate-400 font-medium text-sm">Global Status</th>
                  <th className="text-left px-6 py-3 text-slate-400 font-medium text-sm">Blocked by Countries</th>
                  <th className="text-center px-6 py-3 text-slate-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisas.map((visa) => {
                  const currentStatus = getVisaStatus(visa.id, visa.globalStatus);
                  return (
                  <React.Fragment key={visa.id}>
                    <tr className="border-b border-slate-600/30 hover:bg-slate-700/20 transition-colors">
                      <td className="px-4 py-4">
                        <button
                          onClick={() => setExpandedVisa(expandedVisa === visa.id ? null : visa.id)}
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          {expandedVisa === visa.id ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-white text-sm">{visa.visaName}</div>
                        <div className="text-xs text-slate-400">{visa.visaType}</div>
                      </td>
                      <td className="px-4 py-4 text-slate-300 text-sm hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          {getAverageProcessing(visa)}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-300 text-sm hidden xl:table-cell">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          {getAverageValidity(visa)}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="text-white font-semibold text-sm text-center">
                          {visa.totalApplications.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {currentStatus === 'active' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium whitespace-nowrap">
                              <Unlock className="w-3 h-3" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-medium whitespace-nowrap">
                              <Lock className="w-3 h-3" />
                              Not Active
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getBlockedCountries(visa) === 'Open' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium whitespace-nowrap">
                            <Unlock className="w-3 h-3" />
                            Open
                          </span>
                        ) : (
                          <div className="text-red-400 text-xs font-medium">
                            {getBlockedCountries(visa)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => toggleVisaStatus(visa.id, currentStatus)}
                            className={`p-2 hover:bg-slate-700/30 rounded-lg transition-colors ${
                              currentStatus === 'active' ? 'text-red-400 hover:text-red-300' : 'text-emerald-400 hover:text-emerald-300'
                            }`}
                            title={currentStatus === 'active' ? 'Block Visa Globally' : 'Activate Visa Globally'}
                          >
                            {currentStatus === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Country-wise Details */}
                    {expandedVisa === visa.id && (
                      <tr className="bg-slate-800/30">
                        <td colSpan="8" className="px-4 py-5">
                          <div className="space-y-5">
                            {/* Global Status Message */}
                            {currentStatus === 'blocked' && (
                              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                                <div className="flex items-center gap-2">
                                  <Lock className="w-5 h-5 text-red-400" />
                                  <p className="text-red-400 font-semibold text-sm">
                                    This visa is not available right at this moment
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Country-wise Status */}
                            <div>
                              <h4 className="text-slate-300 font-semibold mb-3 flex items-center gap-2 text-sm">
                                <Globe className="w-4 h-4" />
                                Country-wise Details
                              </h4>
                              <div className="bg-slate-700/30 rounded-lg border border-slate-600/50 overflow-hidden">
                                <div className="overflow-auto" style={{ maxHeight: '280px' }}>
                                  <style>{`
                                    .country-scroll-container::-webkit-scrollbar {
                                      width: 6px;
                                      height: 6px;
                                    }
                                    .country-scroll-container::-webkit-scrollbar-track {
                                      background: rgba(51, 65, 85, 0.3);
                                    }
                                    .country-scroll-container::-webkit-scrollbar-thumb {
                                      background: rgba(148, 163, 184, 0.4);
                                      border-radius: 3px;
                                    }
                                    .country-scroll-container::-webkit-scrollbar-thumb:hover {
                                      background: rgba(148, 163, 184, 0.6);
                                    }
                                  `}</style>
                                  <table className="w-full">
                                    <thead className="bg-slate-800/50 border-b border-slate-600/50 sticky top-0 z-10">
                                      <tr>
                                        <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Country</th>
                                        <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Processing</th>
                                        <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Validity</th>
                                        <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Fees</th>
                                        <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Applications</th>
                                        <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Visa Status in Country</th>
                                      </tr>
                                    </thead>
                                    <tbody className="country-scroll-container">
                                      {visa.countryStatus.map((country, idx) => (
                                        <tr key={idx} className="border-b border-slate-600/30 hover:bg-slate-700/20 transition-colors">
                                          <td className="px-4 py-3 text-white font-medium text-sm">{country.country}</td>
                                          <td className="px-4 py-3 text-slate-300 text-sm">
                                            <div className="flex items-center gap-1.5">
                                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                                              {country.processing}
                                            </div>
                                          </td>
                                          <td className="px-4 py-3 text-slate-300 text-sm">
                                            <div className="flex items-center gap-1.5">
                                              <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                              {country.validity}
                                            </div>
                                          </td>
                                          <td className="px-4 py-3 text-slate-300 text-sm font-medium">
                                            ₹{country.fees.toLocaleString()}
                                          </td>
                                          <td className="px-4 py-3 text-slate-300 text-sm font-medium">{country.applications.toLocaleString()}</td>
                                          <td className="px-4 py-3">
                                            {country.status === 'active' ? (
                                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium text-emerald-400 bg-emerald-500/10">
                                                <Unlock className="w-3 h-3" />
                                                Open
                                              </span>
                                            ) : (
                                              <div className="text-red-400 text-xs font-medium">
                                                <div className="flex items-start gap-1.5">
                                                  <Lock className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                  <span>
                                                    Blocked for: {country.blockedFor.length > 0 ? country.blockedFor.join(', ') : 'All countries'}
                                                  </span>
                                                </div>
                                              </div>
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            {/* Summary Cards */}
                            <div className="pt-4 border-t border-slate-600/50">
                              <h4 className="text-slate-300 font-semibold mb-3 text-sm">Summary</h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
                                  <div className="text-slate-400 text-xs mb-1.5 font-medium">Active Countries</div>
                                  <div className="text-white text-2xl font-bold">
                                    {visa.countryStatus.filter(c => c.status === 'active').length}
                                  </div>
                                </div>
                                <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
                                  <div className="text-slate-400 text-xs mb-1.5 font-medium">Blocked Countries</div>
                                  <div className="text-white text-2xl font-bold">
                                    {visa.countryStatus.filter(c => c.status === 'blocked').length}
                                  </div>
                                </div>
                                <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
                                  <div className="text-slate-400 text-xs mb-1.5 font-medium">Total Applications</div>
                                  <div className="text-white text-2xl font-bold">
                                    {visa.totalApplications.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
                })}
              </tbody>
            </table>
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