import React, { useState } from "react";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, FileText, Download, CheckCircle, XCircle, Clock, AlertCircle, Briefcase, Globe, CreditCard, Shield, Eye, Printer, X, ChevronLeft, ChevronRight } from "lucide-react";
import { decodeBase64Url } from "../../../../util/encodeDecode/base64";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useApplicationById } from "../../../../tanstack/query/getApplicationAllDetailsById";
import ApplicationViewHeader from "../../../../Components/embassy/dashboard/application-view/ApplicationViewHeader";

export default function ApplicationView() {

  const { application_id } = useParams();
  const dispatch = useDispatch();
  const applicationId = decodeBase64Url(application_id);

  const [activeTab, setActiveTab] = useState("personal");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointmentSet, setAppointmentSet] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const { data: application1, isLoading, isError, error, } = useApplicationById(applicationId);

  const id = "APP-001";

  // Mock application data
  const application = {
    id: id,
    status: appointmentSet ? "approved" : "pending",
    submittedDate: "2024-12-15T10:30:00",
    lastUpdated: "2024-12-16T14:20:00",

    personal: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      nationality: "American",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      maritalStatus: "Single"
    },

    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    },

    passport: {
      number: "P123456789",
      issueDate: "2020-01-15",
      expiryDate: "2030-01-15",
      issuePlace: "New York",
      issueCountry: "United States"
    },

    visa: {
      type: "Tourist Visa",
      purpose: "Tourism and sightseeing",
      duration: "30 days",
      entryType: "Single Entry",
      travelDate: "2025-02-15",
      returnDate: "2025-03-15"
    },

    employment: {
      status: "Employed",
      occupation: "Software Engineer",
      company: "Tech Corp Inc.",
      companyAddress: "456 Tech Avenue, San Francisco, CA",
      monthlyIncome: "$8,000",
      yearsEmployed: "5 years"
    },

    travelHistory: [
      { country: "Canada", year: "2023", purpose: "Tourism" },
      { country: "Mexico", year: "2022", purpose: "Business" },
      { country: "UK", year: "2021", purpose: "Tourism" }
    ],

    documents: [
      { name: "Passport Copy", type: "PDF", size: "2.4 MB", status: "verified" },
      { name: "Photograph", type: "JPG", size: "1.2 MB", status: "verified" },
      { name: "Bank Statement", type: "PDF", size: "3.1 MB", status: "verified" },
      { name: "Employment Letter", type: "PDF", size: "0.8 MB", status: "verified" },
      { name: "Travel Insurance", type: "PDF", size: "1.5 MB", status: "pending" }
    ],

    payment: {
      amount: "$160",
      method: "Credit Card",
      transactionId: "TXN-20241215-001",
      status: "Completed",
      date: "2024-12-15T10:30:00"
    },

    timeline: [
      {
        action: "Application Submitted",
        timestamp: "2024-12-15T10:30:00",
        user: "John Doe",
        description: "Application submitted online"
      },
      {
        action: "Payment Received",
        timestamp: "2024-12-15T10:35:00",
        user: "System",
        description: "Payment of $160 confirmed"
      },
      {
        action: "Documents Verified",
        timestamp: "2024-12-16T09:15:00",
        user: "Admin",
        description: "All documents verified successfully"
      },
      {
        action: "Under Review",
        timestamp: "2024-12-16T14:20:00",
        user: "Officer Smith",
        description: "Application moved to review queue"
      }
    ]
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: Clock,
        label: "Pending Review"
      },
      approved: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: CheckCircle,
        label: "Approved"
      },
      rejected: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: XCircle,
        label: "Rejected"
      },
      under_review: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: AlertCircle,
        label: "Under Review"
      }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${config.bg} ${config.text}`}>
        <Icon size={18} />
        {config.label}
      </span>
    );
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const generateCalendarDays = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const isDateDisabled = (day) => {
    if (!day) return true;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (day) => {
    if (!day || isDateDisabled(day)) return;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleSetAppointment = () => {
    if (selectedDate && selectedTime) {
      const details = {
        date: selectedDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        time: selectedTime,
        timestamp: new Date()
      };
      setAppointmentDetails(details);
      setAppointmentSet(true);
      setShowAppointmentModal(false);
      setSelectedDate(null);
      setSelectedTime("");
    }
  };

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM"
  ];

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "visa", label: "Visa Details", icon: FileText },
    { id: "documents", label: "Documents", icon: Shield },
    { id: "timeline", label: "Timeline", icon: Clock }
  ];

  console.log('Specific application details', application1);

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <ApplicationViewHeader application={application} />

      {/* Status Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {getStatusBadge(application.status)}
            <div className="h-12 w-px bg-gray-300 hidden sm:block"></div>
            <div>
              <p className="text-sm text-gray-600">Submitted</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(application.submittedDate).toLocaleDateString()}
              </p>
            </div>
            {appointmentSet && appointmentDetails && (
              <>
                <div className="h-12 w-px bg-gray-300 hidden sm:block"></div>
                <div>
                  <p className="text-sm text-gray-600">Appointment</p>
                  <p className="text-lg font-semibold text-green-600">
                    {appointmentDetails.date} at {appointmentDetails.time}
                  </p>
                </div>
              </>
            )}
          </div>
          {!appointmentSet && application.status === "pending" && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowRejectModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle size={18} />
                Reject
              </button>
              <button
                onClick={() => setShowAppointmentModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Calendar size={18} />
                Set Appointment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Personal Info Tab */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={20} className="text-blue-600" />
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">First Name</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.personal.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Last Name</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.personal.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Date of Birth</label>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {new Date(application.personal.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Gender</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.personal.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Nationality</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.personal.nationality}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Marital Status</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.personal.maritalStatus}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail size={20} className="text-blue-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <p className="text-base font-medium text-gray-900 mt-1">{application.personal.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-green-600" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Phone</label>
                      <p className="text-base font-medium text-gray-900 mt-1">{application.personal.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-blue-600" />
                  Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Street Address</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.address.street}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">City</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.address.city}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">State/Province</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.address.state}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">ZIP/Postal Code</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.address.zipCode}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Country</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.address.country}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase size={20} className="text-blue-600" />
                  Employment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Employment Status</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.employment.status}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Occupation</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.employment.occupation}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Company</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.employment.company}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Monthly Income</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.employment.monthlyIncome}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-600">Company Address</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.employment.companyAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visa Details Tab */}
          {activeTab === "visa" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-blue-600" />
                  Visa Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Visa Type</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.visa.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Entry Type</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.visa.entryType}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Duration</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.visa.duration}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Travel Date</label>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {new Date(application.visa.travelDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Return Date</label>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {new Date(application.visa.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-600">Purpose of Visit</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.visa.purpose}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-blue-600" />
                  Passport Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Passport Number</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.passport.number}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Issue Place</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.passport.issuePlace}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Issue Date</label>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {new Date(application.passport.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Expiry Date</label>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {new Date(application.passport.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe size={20} className="text-blue-600" />
                  Travel History
                </h3>
                <div className="space-y-3">
                  {application.travelHistory.map((travel, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Globe size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{travel.country}</p>
                          <p className="text-sm text-gray-600">{travel.purpose}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{travel.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-blue-600" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Amount</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.payment.amount}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Payment Method</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.payment.method}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Transaction ID</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{application.payment.transactionId}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Status</label>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium mt-1">
                      <CheckCircle size={14} />
                      {application.payment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield size={20} className="text-blue-600" />
                Uploaded Documents
              </h3>
              {application.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${doc.status === "verified"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {doc.status === "verified" ? "✓ Verified" : "⏳ Pending"}
                    </span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye size={18} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={20} className="text-blue-600" />
                Activity Timeline
              </h3>
              <div className="relative">
                {application.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4 pb-8 last:pb-0">
                    <div className="relative flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 z-10">
                        <CheckCircle size={18} className="text-blue-600" />
                      </div>
                      {idx < application.timeline.length - 1 && (
                        <div className="absolute top-10 w-0.5 h-full bg-gray-200"></div>
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">{item.action}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                      <p className="text-xs text-gray-500">By: {item.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>



      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">

          {/* Modal */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">

            {/* ===== Header (UNCHANGED UI, now fixed) ===== */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-2xl font-bold text-gray-900">Set Appointment</h2>
              <button
                onClick={() => {
                  setShowAppointmentModal(false);
                  setSelectedDate(null);
                  setSelectedTime("");
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* ===== Body (NO PAGE SCROLL) ===== */}
            <div className="flex-1 overflow-hidden p-6">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">

                {/* ================= LEFT : CALENDAR ================= */}
                <div className="space-y-4 h-full flex flex-col">

                  {/* unchanged */}
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar size={20} className="text-blue-600" />
                    Select Date
                  </h3>

                  {/* unchanged */}
                  <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
                    <button onClick={handlePreviousMonth} className="p-2 hover:bg-blue-100 rounded-lg">
                      <ChevronLeft size={20} className="text-blue-600" />
                    </button>
                    <span className="text-lg font-semibold text-gray-900">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </span>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-blue-100 rounded-lg">
                      <ChevronRight size={20} className="text-blue-600" />
                    </button>
                  </div>

                  {/* unchanged UI, now stretches correctly */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1">
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {dayNames.map(day => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {generateCalendarDays().map((day, idx) => {
                        const isSelected =
                          selectedDate &&
                          day === selectedDate.getDate() &&
                          currentMonth.getMonth() === selectedDate.getMonth() &&
                          currentMonth.getFullYear() === selectedDate.getFullYear();

                        const isDisabled = isDateDisabled(day);

                        return (
                          <button
                            key={idx}
                            onClick={() => handleDateSelect(day)}
                            disabled={isDisabled}
                            className={`
                        aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                        ${!day ? 'invisible' : ''}
                        ${isDisabled ? 'text-gray-300 cursor-not-allowed' : ''}
                        ${isSelected ? 'bg-blue-600 text-white shadow-md scale-105' : ''}
                        ${!isSelected && !isDisabled ? 'hover:bg-blue-50 text-gray-900' : ''}
                      `}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* unchanged */}
                  {selectedDate && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-blue-600 font-medium mb-1">Selected Date</p>
                      <p className="text-lg font-semibold text-blue-900">
                        {selectedDate.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </div>

                {/* ================= RIGHT : TIME ================= */}
                <div className="space-y-4 h-full flex flex-col">

                  {/* unchanged */}
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Clock size={20} className="text-blue-600" />
                    Select Time
                  </h3>

                  {/* 🔧 ONLY FIX: inner scroll */}
                  <div className="flex-1 overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          disabled={!selectedDate}
                          className={`
                      px-4 py-3 rounded-lg text-sm font-medium transition-all border-2
                      ${!selectedDate ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : ''}
                      ${selectedTime === time ? 'bg-blue-600 text-white border-blue-600 shadow-md' : ''}
                      ${selectedTime !== time && selectedDate ? 'bg-white text-gray-900 border-gray-200 hover:border-blue-600 hover:bg-blue-50' : ''}
                    `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* unchanged */}
                  {selectedTime && (
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <p className="text-sm text-green-600 font-medium mb-1">Selected Time</p>
                      <p className="text-lg font-semibold text-green-900">{selectedTime}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ===== Footer (UNCHANGED UI, fixed position) ===== */}
            <div className="border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => {
                  setShowAppointmentModal(false);
                  setSelectedDate(null);
                  setSelectedTime("");
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSetAppointment}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-md  bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-red-100/70 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle size={24} className="text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Reject Application</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Are you sure you want to reject this application? This action cannot be undone.
              </p>
              <textarea
                placeholder="Reason for rejection (optional)..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    alert("Application rejected");
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}