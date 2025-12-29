import React, { useState } from 'react';
import { Search, Eye, Check, X, ChevronDown, ChevronRight, Ban, ShieldCheck, Printer, ExternalLink, Building2, Clock, Mail, MapPin, FileText, Shield, Loader2, Globe, Image as ImageIcon } from 'lucide-react';
import EmbassyStats from '../../Components/admin/embassy/EmbassyStats';
import EmbassyTable from '../../Components/admin/embassy/EmbassyTable';
import EmbassyModal from '../../Components/admin/embassy/modal/EmbassyModal';

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
  ]

  const filteredEmbassies = embassies.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All Status' || e.status === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Embassies</h1>
        <p className="text-slate-400 text-sm mt-1">Review and manage embassy registrations</p>
      </div>

      <EmbassyStats embassies={embassies} />

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
          <EmbassyTable filteredEmbassies={filteredEmbassies} expandedEmbassies={expandedEmbassies} setExpandedEmbassies={setExpandedEmbassies} setSelectedDocument={setSelectedDocument} />
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
        <EmbassyModal selectedDocument={selectedDocument} setSelectedDocument={setSelectedDocument} />
      )}
    </div>
  );
};

export default ManageEmbassy;