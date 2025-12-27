import React, { useState, useEffect, useRef } from 'react';
import { Plus, Calendar, GraduationCap, Plane, Users, Briefcase, HardHat, Home, Lock, HeartPulse, Ship, Landmark, Globe, ShieldCheck, BookOpen, Stethoscope, Building2, AlertTriangle, Scroll, Navigation, BadgeCheck, FlaskConical, Theater, Trophy, Star } from 'lucide-react';
import StatsGrid from '../../../Components/embassy/dashboard/manage-visa/stats-section/StatsGrid';
import CountrySelector from '../../../Components/embassy/dashboard/manage-visa/country-selector-section/CountrySelector';
import AddVisa from '../../../Components/embassy/dashboard/manage-visa/new-visa/AddVisa';
import EditVisaDetails from '../../../Components/embassy/dashboard/manage-visa/edit-visa/EditVisaDetails';
import VisaTypeCard from '../../../Components/embassy/dashboard/manage-visa/visa-type-grid/VisaTypeCard';
import EmptyVisa from '../../../Components/embassy/dashboard/manage-visa/EmptyVisa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCountryDetails } from '../../../Redux/Slice/countrySlice';
import getSweetAlert from '../../../util/alert/sweetAlert';
import { useFullCountryDetails } from "../../../tanstack/query/getCountryDetails";
import { useCountryVisaForSpecificCountry } from '../../../tanstack/query/getVisaDetailsCountryWiseForSpecificCountry';

// Mock countries - Replace with your actual country data from Supabase
const mockCountries = [
  { id: 1, name: "India", code: "IN" },
  { id: 2, name: "United States", code: "US" },
  { id: 3, name: "United Kingdom", code: "GB" },
  { id: 4, name: "Canada", code: "CA" },
  { id: 5, name: "Australia", code: "AU" },
  { id: 6, name: "Germany", code: "DE" },
  { id: 7, name: "France", code: "FR" },
  { id: 8, name: "Japan", code: "JP" },
  { id: 9, name: "China", code: "CN" },
  { id: 10, name: "Brazil", code: "BR" },
];

// Default visa type icons mapping
const iconMapping = {
  "Student": GraduationCap,
  "Exchange": BookOpen,
  "Tourist": Plane,
  "Visitor": Globe,
  "Transit": Ship,
  "Family": Users,
  "Spouse": HeartPulse,
  "Business": Briefcase,
  "Work": HardHat,
  "Resident": Home,
  "Medical": Stethoscope,
  "Diplomatic": Landmark,
  "Official": BadgeCheck,
  "Conference": Building2,
  "Research": FlaskConical,
  "Journalist": Scroll,
  "Temporary": Calendar,
  "Emergency": AlertTriangle,
  "Restricted": Lock,
  "Airport Transit": Navigation,
  "Government": ShieldCheck,
  "Cultural": Theater,
  "Sports": Trophy,
  "Talent": Star
};

// Mock visa policies data
const mockVisaPolicies = {
  1: { // India
    1: { // Student Visa
      processingTime: "45", processingUnit: "days",
      validityPeriod: "1", validityUnit: "year",
      applicationFees: 10000, status: "active", blocked: false,
      requiredDocuments: ["Admission documents", "Academic Transcripts", "English Test Score"]
    },
    2: { // Tourist Visa
      processingTime: "20", processingUnit: "days",
      validityPeriod: "6", validityUnit: "months",
      applicationFees: 20000, status: "active", blocked: false,
      requiredDocuments: ["Hotel booking details", "No criminal record certificate"]
    },
    4: { // Business Visa - BLOCKED
      processingTime: "15", processingUnit: "days",
      validityPeriod: "1", validityUnit: "year",
      applicationFees: 25000, status: "inactive", blocked: true,
      requiredDocuments: ["Business invitation letter"]
    }
  },
  2: { // United States
    1: { // Student Visa - FREE
      processingTime: "60", processingUnit: "days",
      validityPeriod: "5", validityUnit: "years",
      applicationFees: 0, status: "active", blocked: false,
      requiredDocuments: ["I-20 Form", "Financial Documents", "SEVIS Fee Receipt"]
    }
  }
};

export default function VisaPolicyManage() {
  const dispatch = useDispatch();
  const { embassyData } = useSelector(state => state.embassy);
  const { data: countryDetails, isLoading: isCountryLoading, isError: embassyError } = useFullCountryDetails(embassyData?.country_id);
  const { isAllCountryListLoading, getAllCountryList, isAllCountryListError } = useSelector(state => state.allCountry);
  const { data: visaData = [], isLoading: isVisaDataLoading } = useCountryVisaForSpecificCountry(countryDetails?.id);

  useEffect(() => {
    dispatch(fetchAllCountryDetails())
      .then(res => {
        // console.log('Response for fetching all country', res);
      })
      .catch(err => {
        console.log('Error occured', err);
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      });
  }, []);

  const countryListWithoutOwn = getAllCountryList?.filter(country => country?.name?.toLowerCase() != embassyData?.country_name?.toLowerCase());

  const [selectedCountry, setSelectedCountry] = useState(countryListWithoutOwn[0]);
  const [editingVisa, setEditingVisa] = useState(null);
  const [expandedVisa, setExpandedVisa] = useState(null);
  const [policies, setPolicies] = useState(mockVisaPolicies);
  const [visaTypesByCountry, setVisaTypesByCountry] = useState(countryListWithoutOwn);
  const [isAddingVisaType, setIsAddingVisaType] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const editFormRef = useRef(null);
  const addVisaFormRef = useRef(null);

  const visaRow = visaData?.find(v => v?.visitor_country === selectedCountry?.id);

  const [formData, setFormData] = useState({
    processingTime: '',
    processingUnit: 'days',
    validityPeriod: '',
    validityUnit: 'months',
    applicationFees: '',
    status: 'active',
    blocked: false,
    requiredDocuments: ['']
  });

  // Add this useEffect to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // Scroll to form when editing or adding
  useEffect(() => {
    if (editingVisa && editFormRef.current) {
      setTimeout(() => {
        editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [editingVisa]);

  useEffect(() => {
    if (isAddingVisaType && addVisaFormRef.current) {
      setTimeout(() => {
        addVisaFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [isAddingVisaType]);

  const resetForm = () => {
    setFormData({
      processingTime: '',
      processingUnit: 'days',
      validityPeriod: '',
      validityUnit: 'months',
      applicationFees: '',
      status: 'active',
      blocked: false,
      requiredDocuments: ['']
    });
    setEditingVisa(null);
  };

  const handleEditVisa = (visaTypeId) => {
    console.log(visaTypeId);

    const existingPolicy = policies[selectedCountry.id]?.[visaTypeId];
    if (existingPolicy) {
      setFormData(existingPolicy);
    } else {
      resetForm();
    }
    setEditingVisa(visaTypeId);
    setExpandedVisa(null);
    setIsAddingVisaType(false);
  };

  const handleSaveVisa = () => {
    if (!editingVisa) return;

    // Basic validation
    if (!formData.blocked) {
      if (!formData.processingTime || !formData.validityPeriod || formData.applicationFees === '') {
        alert('Please fill in all required fields');
        return;
      }
      if (formData.requiredDocuments.some(doc => !doc.trim())) {
        alert('Please fill in all required documents or remove empty entries');
        return;
      }
    }

    setPolicies(prev => ({
      ...prev,
      [selectedCountry.id]: {
        ...(prev[selectedCountry.id] || {}),
        [editingVisa]: { ...formData }
      }
    }));

    resetForm();
    alert('Visa policy saved successfully!');
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e, index) => {
    setDragOverItem(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedItem === null || draggedItem === dropIndex) {
      return;
    }

    const currentVisaTypes = [...(visaTypesByCountry[selectedCountry.id] || [])];
    const draggedItemContent = currentVisaTypes[draggedItem];

    // Remove dragged item
    currentVisaTypes.splice(draggedItem, 1);

    // Insert at new position
    const finalDropIndex = draggedItem < dropIndex ? dropIndex - 1 : dropIndex;
    currentVisaTypes.splice(finalDropIndex, 0, draggedItemContent);

    setVisaTypesByCountry(prev => ({
      ...prev,
      [selectedCountry.id]: currentVisaTypes
    }));

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDeleteVisa = (visaTypeId) => {
    if (window.confirm('Are you sure you want to delete this visa policy?')) {
      setPolicies(prev => {
        const countryPolicies = { ...prev[selectedCountry.id] };
        delete countryPolicies[visaTypeId];
        return {
          ...prev,
          [selectedCountry.id]: countryPolicies
        };
      });
    }
  };

  const handleDeleteVisaType = (visaTypeId) => {
    if (window.confirm('Are you sure you want to remove this visa type completely? This will also delete its policy if configured.')) {
      // Remove from visa types
      setVisaTypesByCountry(prev => ({
        ...prev,
        [selectedCountry.id]: (prev[selectedCountry.id] || []).filter(v => v.id !== visaTypeId)
      }));

      // Remove policy if exists
      setPolicies(prev => {
        const countryPolicies = { ...prev[selectedCountry.id] };
        delete countryPolicies[visaTypeId];
        return {
          ...prev,
          [selectedCountry.id]: countryPolicies
        };
      });
    }
  };

  const handleBlockVisa = (visaTypeId) => {
    const policy = policies[selectedCountry.id]?.[visaTypeId];
    if (!policy) return;

    const action = policy.blocked ? 'unblock' : 'block';
    if (window.confirm(`Are you sure you want to ${action} this visa type for ${selectedCountry.name}?`)) {
      setPolicies(prev => ({
        ...prev,
        [selectedCountry.id]: {
          ...prev[selectedCountry.id],
          [visaTypeId]: {
            ...policy,
            blocked: !policy.blocked,
            status: !policy.blocked ? 'inactive' : policy.status
          }
        }
      }));
    }
  }

  // alert('Visa type added successfully! Now configure its policy.');

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayField = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const getVisaPolicy = (visaTypeId) => {
    return policies[selectedCountry.id]?.[visaTypeId];
  };

  const currentCountryVisaTypes = visaRow?.visa_id?.length ?? 0;
  const currentCountryVisaTypeDetails = visaRow?.visa_icon ?? [];

  const countryPolicies = policies[selectedCountry?.id] || {};

  // console.log(visaRow);

  if (isAllCountryListLoading || isCountryLoading || isVisaDataLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-transparent">
        <div className="w-18 h-18 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <span className="mt-5 text-black">Loading...</span>
      </div>
    );
  }

  // console.log('Logges embassy data', embassyData);
  // console.log('All available country details', getAllCountryList);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Visa Policies</h1>
        <p className="mt-1 text-sm sm:text-base text-gray-600">
          Configure visa policies, set fees, and manage country-specific restrictions
        </p>
      </div>

      {/* Stats Grid */}
      <StatsGrid countryPolicies={countryPolicies} currentCountryVisaTypes={currentCountryVisaTypes} mockCountries={getAllCountryList} />

      {/* Country Selector */}
      <CountrySelector setIsOpen={setIsOpen} isOpen={isOpen} selectedCountry={selectedCountry} countryDetails={countryDetails} visaTypesByCountry={visaTypesByCountry} visaData={visaData} mockCountries={countryListWithoutOwn} policies={policies} resetForm={resetForm} setSelectedCountry={setSelectedCountry} setIsAddingVisaType={setIsAddingVisaType} dropdownRef={dropdownRef} />

      {/* Add Visa Type Form */}
      {isAddingVisaType && (
        <AddVisa selectedCountry={selectedCountry} setIsAddingVisaType={setIsAddingVisaType} iconMapping={iconMapping} countryDetails={countryDetails} />
      )}

      {/* Edit Form */}
      {editingVisa && (
        <EditVisaDetails currentCountryVisaTypes={currentCountryVisaTypeDetails} countryDetails={countryDetails} selectedCountry={selectedCountry} editingVisa={editingVisa} setEditingVisa={setEditingVisa} />
      )}

      {/* Add Visa Type Button */}
      {!editingVisa && !isAddingVisaType && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Need a new visa type?</h3>
              <p className="text-sm text-gray-600 mt-1">Add custom visa types specific to {selectedCountry?.name}'s embassy requirements</p>
            </div>
            <button
              onClick={() => setIsAddingVisaType(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Visa Type
            </button>
          </div>
        </div>
      )}


      {/* Visa Types Grid with Drag & swap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCountryVisaTypeDetails?.map((visaType, index) => (
          <VisaTypeCard key={index} index={index} visaType={visaType} country_id={embassyData?.country_id} getVisaPolicy={getVisaPolicy} expandedVisa={expandedVisa} iconMapping={iconMapping} handleDeleteVisaType={handleDeleteVisaType} handleEditVisa={handleEditVisa}
            dragOverItem={dragOverItem} draggedItem={draggedItem} selectedCountry={selectedCountry} handleBlockVisa={handleBlockVisa} handleDeleteVisa={handleDeleteVisa} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd}
            handleDragOver={handleDragOver} handleDragEnter={handleDragEnter} handleDrop={handleDrop} setExpandedVisa={setExpandedVisa} />
        ))}
      </div>

      {/* Empty State */}
      {currentCountryVisaTypes == 0 && (
        <EmptyVisa selectedCountry={selectedCountry} setIsAddingVisaType={setIsAddingVisaType} />
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}