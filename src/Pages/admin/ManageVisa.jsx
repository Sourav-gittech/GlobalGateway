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
  const [filterCountry, setFilterCountry] = useState('all');
  const [expandedVisa, setExpandedVisa] = useState(null);

  // Sample comprehensive visa data showing all relationships
  const visaData = [
    {
      id: 1,
      visaName: 'Student Visa',
      visaType: 'Educational',
      processing: '45 days',
      validity: '1 year',
      fees: 10000,
      currency: 'INR (₹)',
      globalStatus: 'active',
      totalApplications: 1247,
      description: 'For students pursuing higher education',
      requirements: ['Admission letter', 'Financial proof', 'Passport copy', 'Medical certificate'],
      countryStatus: [
        { country: 'India', status: 'active', applications: 690 },
        { country: 'Bangladesh', status: 'active', applications: 189 },
        { country: 'Sri Lanka', status: 'active', applications: 145 },
        { country: 'Russia', status: 'blocked', applications: 0 },
        { country: 'Argentina', status: 'blocked', applications: 0 },
        { country: 'UAE', status: 'active', applications: 223 }
      ]
    },
    {
      id: 2,
      visaName: 'Tourist Visa',
      visaType: 'Tourism',
      processing: '20 days',
      validity: '6 months',
      fees: 20000,
      currency: 'INR (₹)',
      globalStatus: 'active',
      totalApplications: 3421,
      description: 'For tourism and leisure travel',
      requirements: ['Travel itinerary', 'Hotel bookings', 'Return tickets', 'Bank statement'],
      countryStatus: [
        { country: 'India', status: 'active', applications: 1546 },
        { country: 'Bangladesh', status: 'active', applications: 432 },
        { country: 'Sri Lanka', status: 'active', applications: 321 },
        { country: 'Russia', status: 'active', applications: 289 },
        { country: 'Argentina', status: 'active', applications: 245 },
        { country: 'UAE', status: 'active', applications: 588 }
      ]
    },
    {
      id: 3,
      visaName: 'Business Visa',
      visaType: 'Business',
      processing: '30 days',
      validity: '2 years',
      fees: 25000,
      currency: 'INR (₹)',
      globalStatus: 'blocked',
      totalApplications: 892,
      description: 'For business activities and meetings',
      requirements: ['Business invitation', 'Company registration', 'Tax documents', 'Financial statements'],
      countryStatus: [
        { country: 'India', status: 'blocked', applications: 0 },
        { country: 'Bangladesh', status: 'blocked', applications: 0 },
        { country: 'Sri Lanka', status: 'blocked', applications: 0 },
        { country: 'Russia', status: 'active', applications: 234 },
        { country: 'Argentina', status: 'active', applications: 189 },
        { country: 'UAE', status: 'active', applications: 469 }
      ]
    },
    {
      id: 4,
      visaName: 'Work Visa',
      visaType: 'Employment',
      processing: '60 days',
      validity: '3 years',
      fees: 35000,
      currency: 'INR (₹)',
      globalStatus: 'active',
      totalApplications: 2156,
      description: 'For employment and professional work',
      requirements: ['Job offer', 'Work permit', 'Medical certificate', 'Police clearance'],
      countryStatus: [
        { country: 'India', status: 'active', applications: 1001 },
        { country: 'Bangladesh', status: 'active', applications: 298 },
        { country: 'Sri Lanka', status: 'active', applications: 223 },
        { country: 'Russia', status: 'blocked', applications: 0 },
        { country: 'Argentina', status: 'active', applications: 178 },
        { country: 'UAE', status: 'active', applications: 456 }
      ]
    },
    {
      id: 5,
      visaName: 'Family Visa',
      visaType: 'Family Reunion',
      processing: '40 days',
      validity: '5 years',
      fees: 15000,
      currency: 'INR (₹)',
      globalStatus: 'active',
      totalApplications: 1834,
      description: 'For family reunification purposes',
      requirements: ['Relationship proof', 'Sponsor documents', 'Birth certificate', 'Marriage certificate'],
      countryStatus: [
        { country: 'India', status: 'active', applications: 834 },
        { country: 'Bangladesh', status: 'active', applications: 289 },
        { country: 'Sri Lanka', status: 'active', applications: 234 },
        { country: 'Russia', status: 'active', applications: 156 },
        { country: 'Argentina', status: 'active', applications: 123 },
        { country: 'UAE', status: 'active', applications: 198 }
      ]
    }
  ];

  const countries = ['all', ...new Set(visaData.flatMap(v => v.countryStatus.map(c => c.country)))];

  const filteredVisas = visaData.filter(visa => {
    const matchesSearch = visa.visaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visa.visaType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || visa.globalStatus === filterStatus;
    const matchesCountry = filterCountry === 'all' || 
                          visa.countryStatus.some(c => c.country === filterCountry);
    return matchesSearch && matchesStatus && matchesCountry;
  });

  const toggleVisaStatus = (visaId) => {
    alert('Visa status toggled. This action would update the database.');
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10';
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
              <h3 className="text-slate-400 text-xs font-medium">Blocked Visas</h3>
              <Lock className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              {visaData.filter(v => v.globalStatus === 'blocked').length}
            </p>
            <p className="text-xs text-slate-500 mt-1">Not accepting</p>
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
            <option value="blocked">Blocked</option>
          </select>

          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer min-w-[160px]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '12px'
            }}
          >
            <option value="all">All Countries</option>
            {countries.filter(c => c !== 'all').map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
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
                  <th className="text-left px-4 py-3 text-slate-400 font-medium text-sm hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium text-sm hidden lg:table-cell">Processing</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium text-sm hidden xl:table-cell">Validity</th>
                  <th className="text-left px-6 py-3 text-slate-400 font-medium text-sm">Fees</th>
                  <th className="text-center px-6 py-3 text-slate-400 font-medium text-sm hidden lg:table-cell">Applications</th>
                  <th className="text-center px-6 py-3 text-slate-400 font-medium text-sm">Status</th>
                  <th className="text-center px-6 py-3 text-slate-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisas.map((visa) => (
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
                        <div className="text-xs text-slate-400 md:hidden">{visa.visaType}</div>
                      </td>
                      <td className="px-4 py-4 text-slate-300 text-sm hidden md:table-cell">{visa.visaType}</td>
                      <td className="px-4 py-4 text-slate-300 text-sm hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          {visa.processing}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-300 text-sm hidden xl:table-cell">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          {visa.validity}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-white font-semibold text-sm">
                          ₹{visa.fees.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-400">{visa.currency}</div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="text-white font-semibold text-sm text-center">
                          {visa.totalApplications.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {visa.globalStatus === 'active' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium whitespace-nowrap">
                              <Unlock className="w-3 h-3" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-medium whitespace-nowrap">
                              <Lock className="w-3 h-3" />
                              Blocked
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => toggleVisaStatus(visa.id)}
                            className={`p-2 hover:bg-slate-700/30 rounded-lg transition-colors ${
                              visa.globalStatus === 'active' ? 'text-red-400 hover:text-red-300' : 'text-emerald-400 hover:text-emerald-300'
                            }`}
                            title={visa.globalStatus === 'active' ? 'Block Visa' : 'Activate Visa'}
                          >
                            {visa.globalStatus === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Country-wise Details with Fixed Height */}
                    {expandedVisa === visa.id && (
                      <tr className="bg-slate-800/30">
                        <td colSpan="9" className="px-4 py-5">
                          <div className="space-y-5">
                            {/* Country-wise Status with Fixed Height and Internal Scroll */}
                            <div>
                              <h4 className="text-slate-300 font-semibold mb-3 flex items-center gap-2 text-sm">
                                <Globe className="w-4 h-4" />
                                Country-wise Status
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
                                        <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Status</th>
                                        <th className="text-left px-4 py-2.5 text-slate-400 text-xs font-medium">Applications</th>
                                      </tr>
                                    </thead>
                                    <tbody className="country-scroll-container">
                                      {visa.countryStatus.map((country, idx) => (
                                        <tr key={idx} className="border-b border-slate-600/30 hover:bg-slate-700/20 transition-colors">
                                          <td className="px-4 py-3 text-white font-medium text-sm">{country.country}</td>
                                          <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(country.status)}`}>
                                              {country.status === 'active' ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                              {country.status.charAt(0).toUpperCase() + country.status.slice(1)}
                                            </span>
                                          </td>
                                          <td className="px-4 py-3 text-slate-300 text-sm font-medium">{country.applications.toLocaleString()}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            {/* Description and Requirements */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div className="bg-slate-700/30 rounded-lg border border-slate-600/50 p-4">
                                <h4 className="text-slate-300 font-semibold mb-3 text-sm">Description</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">{visa.description}</p>
                              </div>
                              
                              <div className="bg-slate-700/30 rounded-lg border border-slate-600/50 p-4">
                                <h4 className="text-slate-300 font-semibold mb-3 text-sm">Requirements</h4>
                                <ul className="space-y-2">
                                  {visa.requirements.map((req, idx) => (
                                    <li key={idx} className="text-slate-400 text-sm flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                      {req}
                                    </li>
                                  ))}
                                </ul>
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
                ))}
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