import React, { useEffect, useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Users,
  Clock,
  Edit2,
  Save,
  X,
  Camera,
  CheckCircle,
  AlertCircle,
  Award,
  Shield,
  FileCheck
} from "lucide-react";
import ProfileSection from "../../../Components/embassy/dashboard/profile/hero-section/ProfileSection";
import ActionBtn from "../../../Components/embassy/dashboard/profile/hero-section/ActionBtn";
import StatsCard from "../../../Components/embassy/dashboard/profile/StatsCard";
import AchievementSection from "../../../Components/embassy/dashboard/profile/AchievementSection";
import ContactDetails from "../../../Components/embassy/dashboard/profile/ContactDetails";
import AdditionalInformation from "../../../Components/embassy/dashboard/profile/AdditionalInformation";
import { useSelector } from "react-redux";
import { useFullCountryDetails } from "../../../tanstack/query/getCountryDetails";
import { useApplicationStats } from "../../../tanstack/query/getApplicationStatsForEmbassy";
import { useApplicationsByCountryId } from "../../../tanstack/query/getApplicationsByCountryId";
import { getMonthlyChange } from "../../../util/embassy-stats/calcMonthlyChange";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const { isuserLoading, userAuthData, userError } = useSelector(state => state.checkAuth);
  const { isEmbassyLoading, embassyData, hasEmbassyerror } = useSelector(state => state.embassy);
  const { data: countryDetails, isLoading: isCountryLoading, isError: embassyError } = useFullCountryDetails(embassyData?.country_id);
  const { data: allTypeApplications, isLoading: isAllTypeApplicationLoading, error: allTypeApplicationsError } = useApplicationsByCountryId(embassyData?.country_id, 'all');
  const { data: processingTypeApplications, isLoading: isProcessingTypeApplicationLoading, error: processingTypeApplicationsError } = useApplicationsByCountryId(embassyData?.country_id, 'processing');
  // Stats data - Real embassy metrics
  const { data: allStats = [] } = useApplicationStats({ countryId: embassyData?.country_id, statusFilter: "all" });
  const { data: processingStats = [] } = useApplicationStats({ countryId: embassyData?.country_id, statusFilter: "processing" });

  const totalChange = getMonthlyChange(allStats);
  const processingChange = getMonthlyChange(processingStats);

  const [profileData, setProfileData] = useState({
    embassyName: "US Embassy",
    country: "United States",
    continent: "North America",
    countryCode: "US",
    email: "contact@usembassy.com",
    phone: "+1 (555) 123-4567",
    address: "123 Embassy Lane, Capital City",
    website: "www.usembassy.com",
    establishedDate: "January 15, 1985",
    totalStaff: "45",
    workingHours: "9:00 AM - 5:00 PM",
  });

  const [editedData, setEditedData] = useState({ ...profileData });

  const handleSave = async () => {
    try {
      // If a cover photo was selected, upload it to Supabase
      if (coverPhoto) {
        // TODO: Implement Supabase upload
        // Example:
        // const { data, error } = await supabase.storage
        //   .from('cover-photos')
        //   .upload(`${userId}/${Date.now()}-${coverPhoto.file.name}`, coverPhoto.file);
        // 
        // if (error) throw error;
        // const coverUrl = data.path; // Save this URL to your profile
        
        console.log('Uploading cover photo to Supabase:', coverPhoto.file);
      }
      
      setProfileData({ ...editedData });
      setIsEditing(false);
      // TODO: Add API call to save data
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save changes');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...profileData });
    setCoverPhoto(null); // Reset cover photo on cancel
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setCoverPhoto({ file, preview: imageUrl });
      
      // TODO: Upload to Supabase bucket when handleSave is called
      console.log('Cover photo selected:', file.name);
    }
  };

  const handleChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    {
      icon: CheckCircle,
      label: "Applications Processed",
      value: allTypeApplications?.length,
      change: totalChange?.trend,
      changeType: totalChange?.changeText,
      bgColor: "bg-blue-50",
      iconColor: "bg-blue-100 text-blue-600",
      textColor: "text-blue-600"
    },
    {
      icon: Clock,
      label: "Average Processing Time",
      value: "15 days",
      change: "-3 days",
      changeType: "positive",
      bgColor: "bg-green-50",
      iconColor: "bg-green-100 text-green-600",
      textColor: "text-green-600"
    },
    {
      icon: AlertCircle,
      label: "Pending Reviews",
      value: processingTypeApplications?.length,
      change: processingChange?.trend,
      changeType: processingChange?.changeText,
      bgColor: "bg-yellow-50",
      iconColor: "bg-yellow-100 text-yellow-600",
      textColor: "text-yellow-600"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Excellence in Service",
      description: "Recognized for outstanding diplomatic services",
      bgColor: "bg-purple-50",
      iconColor: "bg-purple-100 text-purple-600"
    },
    {
      icon: Shield,
      title: "Security Certified",
      description: "ISO 27001 certified for data protection",
      bgColor: "bg-cyan-50",
      iconColor: "bg-cyan-100 text-cyan-600"
    },
    {
      icon: FileCheck,
      title: "Accredited Institution",
      description: "Fully accredited by international bodies",
      bgColor: "bg-emerald-50",
      iconColor: "bg-emerald-100 text-emerald-600"
    }
  ];

  console.log('User data', userAuthData);
  console.log('Embassy data', embassyData);
  console.log('Country data', countryDetails);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cover Photo */}
      <div className="relative w-full bg-gray-40">
        {/* Cover Photo - Smaller height */}
        <div className="relative h-48 sm:h-56 md:h-54 -mt-7 w-full overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-500">
          {coverPhoto ? (
            // Display uploaded image preview
            <img 
              src={coverPhoto.preview} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          ) : (
            // Default pattern background
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>
          )}

          {/* Edit Cover Button */}
          {isEditing && (
            <>
              <input
                type="file"
                id="coverPhotoInput"
                accept="image/*"
                className="hidden"
                onChange={handleCoverPhotoChange}
              />
              <button
                onClick={() => document.getElementById('coverPhotoInput').click()}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-gray-300 text-white
    hover:bg-white/30 transition-all duration-300 ease-out active:scale-95"
              >
                <Camera size={18} className="opacity-90" />
                <span className="hidden sm:inline text-sm font-medium">
                  Change Cover
                </span>
              </button>
            </>
          )}

          {/* Action Buttons */}
          <ActionBtn isEditing={isEditing} setIsEditing={setIsEditing} setEditedData={setEditedData} handleCancel={handleCancel} handleSave={handleSave} profileData={profileData} />
        </div>

        {/* Profile Info Section - Separated containers */}
        <ProfileSection profileData={countryDetails} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatsCard key={idx} stat={stat} />
          ))}
        </div>

        {/* Achievements Section */}
        <AchievementSection achievements={achievements} />

        {/* Contact Information Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Contact Details Grid */}
            <ContactDetails isEditing={isEditing} editedData={editedData} profileData={embassyData} />

            {/* Additional Information */}
            <AdditionalInformation profileData={profileData} isEditing={isEditing} editedData={editedData} />
          </div>
        </div>
      </div>
    </div>
  );
}