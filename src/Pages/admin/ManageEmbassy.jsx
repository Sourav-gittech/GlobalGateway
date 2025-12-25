import React, { useState } from 'react';
import { Search, Eye, Check, X, ChevronDown, ChevronRight, Ban, ShieldCheck, Printer, ExternalLink, Building2, Clock, Mail, MapPin, FileText, Shield, Loader2, Globe, Image as ImageIcon } from 'lucide-react';

const ManageEmbassy = () => {
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEmbassies, setExpandedEmbassies] = useState({});
  const [selectedDocument, setSelectedDocument] = useState(null);

  const embassies = [
    { 
      id: 1, 
      name: 'Canadian Embassy', 
      country: 'Canada', 
      flag: '🇨🇦', 
      email: 'canada.embassy@diplomatic.ca', 
      address: '501 Pennsylvania Avenue NW, Washington, DC 20001', 
      registeredDate: '2024-01-15', 
      status: 'pending', 
      document: 'canadian-embassy-proof.pdf', 
      documentSize: '2.4 MB', 
      documentUrl: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800',
      verificationNotes: '', 
      isBlocked: false, 
      establishedYear: '1867',
      workingHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      isNewCountry: true,
      countryDescription: 'Canada is a country in North America. Its ten provinces and three territories extend from the Atlantic Ocean to the Pacific Ocean and northward into the Arctic Ocean, making it the world\'s second-largest country by total area. Canada is known for its vast wilderness, multicultural cities, and natural beauty including mountains, forests, and lakes. The country has a strong economy, high quality of life, and is recognized globally for its welcoming immigration policies and commitment to diversity.',
      countryImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800'
    },
    { 
      id: 2, 
      name: 'UAE Embassy', 
      country: 'United Arab Emirates', 
      flag: '🇦🇪', 
      email: 'uae.embassy@mofa.gov.ae', 
      address: '3522 International Court NW, Washington, DC 20008', 
      registeredDate: '2024-02-20', 
      status: 'approved', 
      document: 'uae-embassy-credentials.pdf', 
      documentSize: '1.8 MB', 
      documentUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      verificationNotes: 'All documents verified successfully', 
      isBlocked: false, 
      establishedYear: '1971',
      workingHours: 'Sun-Thu: 8:00 AM - 3:00 PM',
      isNewCountry: false
    },
    { 
      id: 3, 
      name: 'Indian Embassy', 
      country: 'India', 
      flag: '🇮🇳', 
      email: 'info@indianembassy.org', 
      address: '2107 Massachusetts Avenue NW, Washington, DC 20008', 
      registeredDate: '2023-11-10', 
      status: 'approved', 
      document: 'indian-embassy-authorization.pdf', 
      documentSize: '3.1 MB', 
      documentUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
      verificationNotes: 'Verified and active', 
      isBlocked: true, 
      establishedYear: '1947',
      workingHours: 'Mon-Fri: 9:30 AM - 5:30 PM',
      isNewCountry: false
    },
    { 
      id: 4, 
      name: 'Russian Embassy', 
      country: 'Russia', 
      flag: '🇷🇺', 
      email: 'rusembassy@mid.ru', 
      address: '2650 Wisconsin Avenue NW, Washington, DC 20007', 
      registeredDate: '2024-03-05', 
      status: 'rejected', 
      document: 'russia-embassy-docs.pdf', 
      documentSize: '2.9 MB', 
      documentUrl: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800',
      verificationNotes: 'Invalid document format. Please resubmit with official letterhead.', 
      isBlocked: false, 
      establishedYear: '1991',
      workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      isNewCountry: false
    },
    { 
      id: 5, 
      name: 'Bangladesh Embassy', 
      country: 'Bangladesh', 
      flag: '🇧🇩', 
      email: 'mission.washington@mofa.gov.bd', 
      address: '3510 International Drive NW, Washington, DC 20008', 
      registeredDate: '2024-02-28', 
      status: 'pending', 
      document: 'bangladesh-embassy-verification.pdf', 
      documentSize: '2.2 MB', 
      documentUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
      verificationNotes: '', 
      isBlocked: false, 
      establishedYear: '1971',
      workingHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      isNewCountry: true,
      countryDescription: 'Bangladesh is a country in South Asia, known for its lush greenery and many waterways. The country has a rich cultural heritage, vibrant arts scene, and is home to the world\'s largest river delta. Bangladesh has made significant progress in economic development and poverty reduction. The nation is famous for its textile industry, agricultural production, and natural beauty including the Sundarbans mangrove forest and Cox\'s Bazar, the longest natural sea beach in the world.',
      countryImage: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800'
    },
    { 
      id: 6, 
      name: 'Sri Lankan Embassy', 
      country: 'Sri Lanka', 
      flag: '🇱🇰', 
      email: 'slembassy@slembassyusa.org', 
      address: '3025 Whitehaven Street NW, Washington, DC 20008', 
      registeredDate: '2024-01-22', 
      status: 'approved', 
      document: 'srilanka-embassy-proof.pdf', 
      documentSize: '1.9 MB', 
      documentUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      verificationNotes: 'Approved for visa processing operations', 
      isBlocked: false, 
      establishedYear: '1948',
      workingHours: 'Mon-Fri: 9:00 AM - 4:30 PM',
      isNewCountry: false
    },
    { 
      id: 7, 
      name: 'Argentina Embassy', 
      country: 'Argentina', 
      flag: '🇦🇷', 
      email: 'argentina@embassy.gov.ar', 
      address: '1600 New Hampshire Ave NW, Washington, DC 20009', 
      registeredDate: '2024-01-10', 
      status: 'approved', 
      document: 'argentina-embassy-docs.pdf', 
      documentSize: '2.1 MB', 
      documentUrl: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800',
      verificationNotes: 'Verified and approved', 
      isBlocked: false, 
      establishedYear: '1810',
      workingHours: 'Mon-Fri: 10:00 AM - 4:00 PM',
      isNewCountry: false
    }
  ];

  const getStatusColor = (status) => {
    const colors = { 
      approved: 'bg-green-500/20 text-green-400', 
      pending: 'bg-yellow-500/20 text-yellow-400', 
      rejected: 'bg-red-500/20 text-red-400' 
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  const filteredEmbassies = embassies.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         e.country.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All Status' || e.status === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: embassies.length,
    pending: embassies.filter(e => e.status === 'pending').length,
    approved: embassies.filter(e => e.status === 'approved').length,
    rejected: embassies.filter(e => e.status === 'rejected').length
  };

  const StatCard = ({ label, value, icon: Icon, color = 'text-white' }) => (
    <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-5 h-30 border border-slate-600/50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 text-sm">{label}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
    </div>
  );

  const ActionButton = ({ onClick, icon: Icon, color, title }) => (
    <button 
      onClick={onClick} 
      className={`p-2 hover:bg-${color}-500/20 text-${color}-400 rounded-lg transition-colors`} 
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Embassies</h1>
        <p className="text-slate-400 text-sm mt-1">Review and manage embassy registrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Embassies" value={stats.total} icon={Building2} color="text-white" />
        <StatCard label="Pending Review" value={stats.pending} icon={Clock} color="text-yellow-400" />
        <StatCard label="Approved" value={stats.approved} icon={ShieldCheck} color="text-green-400" />
        <StatCard label="Rejected" value={stats.rejected} icon={X} color="text-red-400" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search embassies..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm" 
          />
        </div>
        
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)} 
          className="px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer min-w-[160px]"
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg border border-slate-600/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600/50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400 w-8"></th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Embassy</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Registered</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Actions</th>
              </tr>
            </thead>
            
            <tbody>
              {filteredEmbassies.map((embassy) => (
                <React.Fragment key={embassy.id}>
                  <tr className="border-b border-slate-600/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setExpandedEmbassies(prev => ({ ...prev, [embassy.id]: !prev[embassy.id] }))} 
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {expandedEmbassies[embassy.id] ? 
                          <ChevronDown className="w-5 h-5" /> : 
                          <ChevronRight className="w-5 h-5" />
                        }
                      </button>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{embassy.flag}</span>
                        <div>
                          <div className="text-white font-medium flex items-center gap-2">
                            {embassy.name}
                            {embassy.isBlocked && (
                              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-medium rounded flex items-center gap-1 border border-red-500/30">
                                <Ban className="w-3 h-3" />
                                Blocked
                              </span>
                            )}
                            {embassy.isNewCountry && (
                              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded flex items-center gap-1 border border-blue-500/30">
                                <Globe className="w-3 h-3" />
                                New Country
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">{embassy.country}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-slate-300 text-sm">{embassy.email}</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{embassy.registeredDate}</td>
                    
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded text-xs font-medium capitalize ${getStatusColor(embassy.status)}`}>
                        {embassy.status}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ActionButton onClick={() => setSelectedDocument(embassy)} icon={Eye} color="blue" title="View Document" />
                        
                        {embassy.isBlocked ? 
                          <ActionButton onClick={() => console.log('Unblock', embassy.id)} icon={ShieldCheck} color="green" title="Unblock" /> :
                          <ActionButton onClick={() => console.log('Block', embassy.id)} icon={Ban} color="red" title="Block" />
                        }
                      </div>
                    </td>
                  </tr>
                  
                  {expandedEmbassies[embassy.id] && (
                    <tr className="bg-slate-700/20 border-b border-slate-600/50">
                      <td colSpan="6" className="px-6 py-6">
                        <div className="ml-8">
                          <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Embassy Details
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Contact & Additional Information Combined */}
                            <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50">
                              <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-400" />
                                Contact & General Information
                              </h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                  <span className="text-slate-500 min-w-[80px]">Email:</span>
                                  <span className="text-slate-300">{embassy.email}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-slate-500 min-w-[80px]">Address:</span>
                                  <span className="text-slate-300">{embassy.address}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-slate-500 min-w-[80px]">Established:</span>
                                  <span className="text-slate-300">{embassy.establishedYear}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-slate-500 min-w-[80px]">Status:</span>
                                  <span className={`capitalize font-medium ${embassy.status === 'approved' ? 'text-green-400' : embassy.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                                    {embassy.status}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Working Hours */}
                            <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50">
                              <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-purple-400" />
                                Working Hours
                              </h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                  <span className="text-slate-500 min-w-[80px]">Schedule:</span>
                                  <span className="text-slate-300">{embassy.workingHours}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Country Setup Data - Only for New Countries */}
                          {embassy.isNewCountry && (
                            <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50">
                              <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-green-400" />
                                Country Setup Information
                              </h5>
                              
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                {/* Country Image */}
                                <div className="lg:col-span-1">
                                  <div className="aspect-video rounded-lg overflow-hidden border border-slate-600/50">
                                    <img 
                                      src={embassy.countryImage} 
                                      alt={embassy.country}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x300?text=Country+Image';
                                      }}
                                    />
                                  </div>
                                  <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                                    <ImageIcon className="w-3 h-3" />
                                    Country Image
                                  </div>
                                </div>

                                {/* Country Info */}
                                <div className="lg:col-span-2 space-y-3">
                                  <div>
                                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Country Name</p>
                                    <p className="text-white font-semibold text-lg">{embassy.country}</p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Country Description</p>
                                    <p className="text-slate-300 text-sm leading-relaxed">{embassy.countryDescription}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmbassies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No embassies found</p>
          </div>
        )}

        <div className="px-6 py-4 border-t border-slate-600/50 text-center text-sm text-slate-500">
          Showing {filteredEmbassies.length} of {embassies.length} embassies
        </div>
      </div>

      {selectedDocument && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800/95 backdrop-blur-xl rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden border border-slate-600/50 shadow-2xl">
            
            <div className="p-6 border-b border-slate-600/50 flex items-center justify-between bg-slate-800/70">
              <div>
                <h3 className="text-2xl font-bold text-white">Document Preview</h3>
                <p className="text-slate-400 text-sm mt-0.5">{selectedDocument.name}</p>
              </div>
              
              <div className="flex items-center gap-3">
                {selectedDocument.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => { console.log('Approve', selectedDocument.id); setSelectedDocument(null); }} 
                      className="flex items-center gap-2 px-6 py-2.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all duration-200 font-semibold border border-green-500/40"
                    >
                      <Check className="w-5 h-5" />
                      Approve
                    </button>
                    
                    <button 
                      onClick={() => { console.log('Reject', selectedDocument.id); setSelectedDocument(null); }} 
                      className="flex items-center gap-2 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200 font-semibold border border-red-500/40"
                    >
                      <X className="w-5 h-5" />
                      Reject
                    </button>
                  </>
                )}
                
                <button 
                  onClick={() => setSelectedDocument(null)} 
                  className="p-2.5 hover:bg-slate-700/50 rounded-lg transition-all"
                >
                  <X className="w-6 h-6 text-slate-400 hover:text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
              <div className="bg-slate-700/30 rounded-lg p-4 mb-6 border border-slate-600/50">
                <img 
                  src={selectedDocument.documentUrl} 
                  alt={selectedDocument.document}
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600?text=Document+Preview';
                  }}
                />
              </div>

              <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-6 border border-slate-600/50 mb-6">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Document Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Embassy Name</p>
                      <p className="text-white font-semibold">{selectedDocument.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Country</p>
                      <p className="text-white font-semibold">{selectedDocument.country}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Registration Date</p>
                      <p className="text-white font-semibold">{selectedDocument.registeredDate}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Document File</p>
                      <p className="text-white font-semibold">{selectedDocument.document}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">File Size</p>
                      <p className="text-white font-semibold">{selectedDocument.documentSize}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Status</p>
                      <p className={`capitalize font-bold ${selectedDocument.status === 'approved' ? 'text-green-400' : selectedDocument.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                        {selectedDocument.status}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-600/50">
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">Contact Information</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <Mail className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-white font-medium">{selectedDocument.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                        <MapPin className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-white font-medium">{selectedDocument.address}</span>
                    </div>
                  </div>
                </div>

                {selectedDocument.verificationNotes && (
                  <div className="mt-6 pt-6 border-t border-slate-600/50">
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Verification Notes</p>
                    <p className="text-slate-300 text-sm">{selectedDocument.verificationNotes}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => window.print()} 
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-slate-700/30 hover:bg-slate-700/40 text-white rounded-lg transition-all duration-200 border border-slate-600/50 font-semibold"
                >
                  <Printer className="w-5 h-5" />
                  <span>Print</span>
                </button>
                
                <button 
                  onClick={() => window.open(selectedDocument.documentUrl, '_blank')} 
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-slate-700/30 hover:bg-slate-700/40 text-white rounded-lg transition-all duration-200 border border-slate-600/50 font-semibold"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Open in New Tab</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEmbassy;