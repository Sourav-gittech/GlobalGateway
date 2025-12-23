import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Save, X, Clock, Calendar, IndianRupee, CheckCircle, XCircle, ChevronDown, ChevronUp, GraduationCap, Plane, Users, Briefcase, HardHat, Home, AlertCircle, Lock, Unlock, GripVertical } from 'lucide-react';

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
  'Student Visa': GraduationCap,
  'Tourist Visa': Plane,
  'Family Visa': Users,
  'Business Visa': Briefcase,
  'Worker Visa': HardHat,
  'Resident Visa': Home,
};

// Mock visa types per country - Each country can have different visa types
const mockVisaTypesByCountry = {
  1: [ // India
    { id: 1, name: "Student Visa", icon: "Student Visa" },
    { id: 2, name: "Tourist Visa", icon: "Tourist Visa" },
    { id: 3, name: "Family Visa", icon: "Family Visa" },
    { id: 4, name: "Business Visa", icon: "Business Visa" },
    { id: 5, name: "Worker Visa", icon: "Worker Visa" },
    { id: 6, name: "Resident Visa", icon: "Resident Visa" },
    { id: 7, name: "Medical Visa", icon: "Business Visa" },
  ],
  2: [ // United States
    { id: 1, name: "Student Visa", icon: "Student Visa" },
    { id: 2, name: "Tourist Visa", icon: "Tourist Visa" },
    { id: 4, name: "Business Visa", icon: "Business Visa" },
  ],
  // Other countries will start with empty arrays
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
  const [selectedCountry, setSelectedCountry] = useState(mockCountries[0]);
  const [editingVisa, setEditingVisa] = useState(null);
  const [expandedVisa, setExpandedVisa] = useState(null);
  const [policies, setPolicies] = useState(mockVisaPolicies);
  const [visaTypesByCountry, setVisaTypesByCountry] = useState(mockVisaTypesByCountry);
  const [isAddingVisaType, setIsAddingVisaType] = useState(false);
  const [newVisaTypeName, setNewVisaTypeName] = useState('');
  const [newVisaTypeIcon, setNewVisaTypeIcon] = useState('Business Visa');
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const editFormRef = useRef(null);
  const addVisaFormRef = useRef(null);

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

  const handleEditVisa = (visaTypeId) => {
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
  };

  const handleAddVisaType = () => {
    if (!newVisaTypeName.trim()) {
      alert('Please enter a visa type name');
      return;
    }

    const countryVisaTypes = visaTypesByCountry[selectedCountry.id] || [];
    const newId = countryVisaTypes.length > 0 
      ? Math.max(...countryVisaTypes.map(v => v.id)) + 1 
      : 1;

    const newVisaType = {
      id: newId,
      name: newVisaTypeName.trim(),
      icon: newVisaTypeIcon
    };

    setVisaTypesByCountry(prev => ({
      ...prev,
      [selectedCountry.id]: [...(prev[selectedCountry.id] || []), newVisaType]
    }));

    setNewVisaTypeName('');
    setNewVisaTypeIcon('Business Visa');
    setIsAddingVisaType(false);
    alert('Visa type added successfully! Now configure its policy.');
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayField = (field, index) => {
    setFormData({ 
      ...formData, 
      [field]: formData[field].filter((_, i) => i !== index) 
    });
  };

  const updateArrayField = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const getVisaPolicy = (visaTypeId) => {
    return policies[selectedCountry.id]?.[visaTypeId];
  };

  const currentCountryVisaTypes = visaTypesByCountry[selectedCountry.id] || [];
  const countryPolicies = policies[selectedCountry.id] || {};
  const activePolicies = Object.values(countryPolicies).filter(p => p.status === 'active' && !p.blocked).length;
  const blockedPolicies = Object.values(countryPolicies).filter(p => p.blocked).length;
  const totalConfigured = Object.keys(countryPolicies).length;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Countries</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockCountries.length}</p>
              <p className="text-xs text-gray-500 mt-1">All countries</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Policies</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{activePolicies}</p>
              <p className="text-xs text-green-600 mt-1">Currently accepting</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Blocked Visas</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{blockedPolicies}</p>
              <p className="text-xs text-red-600 mt-1">Not accepting</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Configured</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalConfigured}/{currentCountryVisaTypes.length}</p>
              <p className="text-xs text-gray-500 mt-1">Visa types setup</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Country Selector */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Country</label>
        <select
          value={selectedCountry.id}
          onChange={(e) => {
            setSelectedCountry(mockCountries.find(c => c.id === parseInt(e.target.value)));
            resetForm();
            setIsAddingVisaType(false);
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {mockCountries.map((country) => {
            const countryPolicyCount = Object.keys(policies[country.id] || {}).length;
            const countryVisaCount = (visaTypesByCountry[country.id] || []).length;
            const hasBlocked = Object.values(policies[country.id] || {}).some(p => p.blocked);
            return (
              <option key={country.id} value={country.id}>
                {country.name} {countryVisaCount > 0 ? `(${countryPolicyCount}/${countryVisaCount} configured)` : '(No visa types)'} {hasBlocked ? '🔒' : ''}
              </option>
            );
          })}
        </select>
      </div>

      {/* Add Visa Type Form */}
      {isAddingVisaType && (
        <div ref={addVisaFormRef} className="bg-white rounded-xl border-2 border-blue-500 shadow-lg p-6 animate-slideIn">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add New Visa Type</h2>
              <p className="text-sm text-gray-600">Create a new visa type for {selectedCountry.name}</p>
            </div>
            <button onClick={() => setIsAddingVisaType(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visa Type Name *</label>
              <input
                type="text"
                value={newVisaTypeName}
                onChange={(e) => setNewVisaTypeName(e.target.value)}
                placeholder="e.g., Medical Visa, Transit Visa, etc."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Icon *</label>
              <select
                value={newVisaTypeIcon}
                onChange={(e) => setNewVisaTypeIcon(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.keys(iconMapping).map((iconName) => (
                  <option key={iconName} value={iconName}>{iconName}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleAddVisaType}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm inline-flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Visa Type
              </button>
              <button
                onClick={() => {
                  setIsAddingVisaType(false);
                  setNewVisaTypeName('');
                  setNewVisaTypeIcon('Business Visa');
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {editingVisa && (
        <div ref={editFormRef} className="bg-white rounded-xl border-2 border-blue-500 shadow-lg p-6 animate-slideIn">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {currentCountryVisaTypes.find(v => v.id === editingVisa)?.name}
              </h2>
              <p className="text-sm text-gray-600">Configure policy for {selectedCountry.name}</p>
            </div>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-5">
            {/* Block Toggle */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-900">Block this visa type</p>
                    <p className="text-sm text-red-700">Citizens from {selectedCountry.name} cannot apply</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.blocked}
                    onChange={(e) => setFormData({ ...formData, blocked: e.target.checked, status: e.target.checked ? 'inactive' : formData.status })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
                </div>
              </label>
            </div>

            {!formData.blocked && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Processing Time *</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={formData.processingTime}
                        onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
                        placeholder="45"
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={formData.processingUnit}
                        onChange={(e) => setFormData({ ...formData, processingUnit: e.target.value })}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Validity Period *</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={formData.validityPeriod}
                        onChange={(e) => setFormData({ ...formData, validityPeriod: e.target.value })}
                        placeholder="1"
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={formData.validityUnit}
                        onChange={(e) => setFormData({ ...formData, validityUnit: e.target.value })}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Fees (₹) *</label>
                    <input
                      type="number"
                      value={formData.applicationFees}
                      onChange={(e) => setFormData({ ...formData, applicationFees: e.target.value })}
                      placeholder="10000"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Enter 0 to make this visa free
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Required Documents */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">Required Documents *</label>
                    <button
                      onClick={() => addArrayField('requiredDocuments')}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add Document
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.requiredDocuments.map((doc, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={doc}
                          onChange={(e) => updateArrayField('requiredDocuments', idx, e.target.value)}
                          placeholder="e.g., Passport copy"
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.requiredDocuments.length > 1 && (
                          <button
                            onClick={() => removeArrayField('requiredDocuments', idx)}
                            className="px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSaveVisa}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm inline-flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Policy
              </button>
              <button
                onClick={resetForm}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Visa Type Button */}
      {!editingVisa && !isAddingVisaType && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Need a new visa type?</h3>
              <p className="text-sm text-gray-600 mt-1">Add custom visa types specific to {selectedCountry.name}'s embassy requirements</p>
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

      {/* Drag & Drop Info */}
      {currentCountryVisaTypes.length > 1 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <GripVertical className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Drag to Reorder</p>
              <p className="text-xs text-blue-700 mt-1">Click and drag the grip icon on any visa card to reorder them</p>
            </div>
          </div>
        </div>
      )}

      {/* Visa Types Grid with Drag & Drop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCountryVisaTypes.map((visaType, index) => {
          const policy = getVisaPolicy(visaType.id);
          const isConfigured = !!policy;
          const isExpanded = expandedVisa === visaType.id;
          const Icon = iconMapping[visaType.icon] || Briefcase;

          return (
            <div
              key={visaType.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all cursor-move ${
                policy?.blocked ? 'border-red-300' : 'border-gray-200'
              } ${dragOverItem === index ? 'border-blue-500 border-2 scale-105' : ''} ${
                draggedItem === index ? 'opacity-50' : ''
              }`}
            >
              <div className="p-5">
                {/* Drag Handle */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-grab active:cursor-grabbing" />
                  <span className="text-xs font-medium text-gray-500">Drag to reorder</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    policy?.blocked ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${policy?.blocked ? 'text-red-600' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{visaType.name}</h3>
                    {isConfigured && (
                      <span className={`inline-flex items-center gap-1 text-xs font-medium mt-1 ${
                        policy.blocked ? 'text-red-600' : policy.status === 'active' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {policy.blocked ? (
                          <><Lock className="w-3 h-3" />Blocked</>
                        ) : policy.status === 'active' ? (
                          <><CheckCircle className="w-3 h-3" />Active</>
                        ) : (
                          <><XCircle className="w-3 h-3" />Inactive</>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {isConfigured ? (
                  <div className="space-y-3">
                    {!policy.blocked && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs font-medium">Processing</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900">{policy.processingTime} {policy.processingUnit}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                              <Calendar className="w-4 h-4" />
                              <span className="text-xs font-medium">Validity</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900">{policy.validityPeriod} {policy.validityUnit}</p>
                          </div>
                        </div>

                        <div className={`rounded-lg p-3 border ${
                          policy.applicationFees == 0 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <IndianRupee className={`w-4 h-4 ${policy.applicationFees == 0 ? 'text-green-600' : 'text-gray-600'}`} />
                            <span className={`text-xs font-medium ${policy.applicationFees == 0 ? 'text-green-600' : 'text-gray-600'}`}>
                              Fees {policy.applicationFees == 0 && '(FREE)'}
                            </span>
                          </div>
                          <p className={`text-sm font-bold ${policy.applicationFees == 0 ? 'text-green-700' : 'text-gray-900'}`}>
                            {policy.applicationFees == 0 ? 'No charge' : `₹${parseInt(policy.applicationFees).toLocaleString()}`}
                          </p>
                        </div>

                        <button
                          onClick={() => setExpandedVisa(isExpanded ? null : visaType.id)}
                          className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1"
                        >
                          {isExpanded ? <><ChevronUp className="w-4 h-4" />Hide</> : <><ChevronDown className="w-4 h-4" />Details</>}
                        </button>

                        {isExpanded && (
                          <div className="pt-3 border-t border-gray-200">
                            <p className="text-xs font-semibold text-gray-700 mb-2">Required Documents:</p>
                            <ul className="space-y-1">
                              {policy.requiredDocuments.map((doc, idx) => (
                                <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}

                    {policy.blocked && (
                      <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                        <p className="text-sm text-red-800 font-medium">Blocked for {selectedCountry.name}</p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleEditVisa(visaType.id)}
                        className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleBlockVisa(visaType.id)}
                        className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                          policy.blocked
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        {policy.blocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteVisa(visaType.id)}
                        className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleEditVisa(visaType.id)}
                      className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Configure Policy
                    </button>
                    <button
                      onClick={() => handleDeleteVisaType(visaType.id)}
                      className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Visa Type
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {currentCountryVisaTypes.length === 0 && (
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Visa Types Yet</h3>
          <p className="text-sm text-gray-600 mb-6">
            Get started by adding visa types for {selectedCountry.name}
          </p>
          <button
            onClick={() => setIsAddingVisaType(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add First Visa Type
          </button>
        </div>
      )}

      <style jsx>{`
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