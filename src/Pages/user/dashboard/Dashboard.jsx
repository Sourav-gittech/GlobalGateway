import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar, CreditCard, FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import ProfileCard from '../../../Components/user/dashboard/ProfileCard';
import DashboardHeader from '../../../Components/user/dashboard/DashboardHeader';
import StatsCard from '../../../Components/user/dashboard/StatsCard';
import VisaApplicationsSection from '../../../Components/user/dashboard/VisaApplicationsSection';
import PaymentsSection from '../../../Components/user/dashboard/PaymentsSection';
import AppointmentsSection from '../../../Components/user/dashboard/AppointmentsSection';
import { checkLoggedInUser } from '../../../Redux/Slice/auth/checkAuthSlice';
import { getAllApplication_specificUser } from '../../../Redux/Slice/applicationSlice';
import { fetchUserTransactionsWithApplications } from '../../../Redux/Slice/transactionSlice';
import { useApplicationsByUser } from '../../../tanstack/query/getApplicationsByUser';

const Dashboard = () => {
  const dispatch = useDispatch(),
    { isuserLoading, userAuthData, userError } = useSelector(state => state.checkAuth),
     { data: application, isLoading: isApplicationLoading, isError: isApplicationError, error } = useApplicationsByUser(userAuthData?.id),
    { isTransactionLoading, transactions, hasTransactionError } = useSelector(state => state.transaction);

  // console.log('Dashboard user data', userAuthData);
  // console.log('All application for specific user', application);
  // console.log('All transactions', transactions);

  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    dispatch(checkLoggedInUser())
      .then(res => {
        // console.log('Response for fetching user profile', res);
      })
      .catch((err) => {
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
        console.log("Error occurred", err);
      });
  }, [dispatch]);

  useEffect(() => {
    if (userAuthData) {
      dispatch(fetchUserTransactionsWithApplications(userAuthData?.id))
        .then(res => {
          // console.log('Response for fetching all transaction', res);
        })
        .catch((err) => {
          getSweetAlert('Oops...', 'Something went wrong!', 'error');
          console.log("Error occurred", err);
        });
    }
  }, [dispatch, userAuthData]);

  const [visaApplications] = useState([
    {
      id: 1,
      country: 'United States',
      type: 'Tourist Visa',
      status: 'processing',
      appliedDate: '2024-01-15',
      expectedDate: '2024-02-28',
      applicationNumber: 'US-2024-001234'
    },
    {
      id: 2,
      country: 'Canada',
      type: 'Work Visa',
      status: 'approved',
      appliedDate: '2023-12-01',
      approvedDate: '2024-01-10',
      applicationNumber: 'CA-2023-005678'
    },
    {
      id: 3,
      country: 'United Kingdom',
      type: 'Student Visa',
      status: 'pending',
      appliedDate: '2024-02-01',
      applicationNumber: 'UK-2024-009876'
    }
  ]);

  const [appointments] = useState([
    {
      id: 1,
      title: 'Biometric Appointment',
      country: 'United States',
      date: '2024-02-20',
      time: '10:00 AM',
      location: 'VFS Global, New Delhi',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Document Verification',
      country: 'Canada',
      date: '2024-02-25',
      time: '2:30 PM',
      location: 'Embassy, Mumbai',
      status: 'pending'
    }
  ]);

  const [payments] = useState([
    {
      id: 1,
      description: 'US Tourist Visa Fee',
      amount: 160,
      currency: 'USD',
      status: 'completed',
      date: '2024-01-15',
      transactionId: 'TXN-US-001234'
    },
    {
      id: 2,
      description: 'Canada Work Visa Fee',
      amount: 155,
      currency: 'CAD',
      status: 'completed',
      date: '2023-12-01',
      transactionId: 'TXN-CA-005678'
    },
    {
      id: 3,
      description: 'UK Student Visa Fee',
      amount: 348,
      currency: 'GBP',
      status: 'pending',
      date: '2024-02-01',
      transactionId: 'TXN-UK-009876'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'completed':
      case 'success':
      case 'confirmed':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'processing':
      case 'pending':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'rejected':
      case 'failed':
      case 'cancelled':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'completed':
      case 'success':
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
      case 'failed':
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (isuserLoading || isApplicationLoading) {
    return (
      <div className='flex flex-col h-screen items-center justify-center bg-black'>
        <div className="w-18 h-18 border-2 border-white border-t-transparent rounded-full animate-spin" />
        <span className='mt-5 text-white'>Loading...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner with Image */}
      <DashboardHeader />

      {/* Profile Card */}
      <ProfileCard userAuthData={userAuthData} />

      {/* Stats Cards */}
      <StatsCard visaApplications={Array.isArray(application) ? application : []} payments={transactions} appointments={appointments} />

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="border-b border-slate-200">
            <nav className="flex -mb-px overflow-x-auto">
              {[
                { id: 'overview', label: 'Visa Applications', icon: FileText },
                { id: 'appointments', label: 'Appointments', icon: Calendar },
                { id: 'payments', label: 'Payments', icon: CreditCard }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === tab.id
                    ? 'border-red-600 text-red-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    }`}>
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <VisaApplicationsSection visaApplications={Array.isArray(application) ? application : []} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
            )}

            {activeTab === 'appointments' && (
              <AppointmentsSection appointments={appointments} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
            )}

            {activeTab === 'payments' && (
              <PaymentsSection transactions={transactions} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;