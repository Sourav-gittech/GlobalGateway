import React, { useEffect, useState } from "react";
import { FileText, CheckCircle, Clock, Calendar, BarChart2 } from "lucide-react";
import StatsCard from "../../../Components/embassy/dashboard/dashboard/StatsCard";
import ApplicationVolumeChart from "../../../Components/embassy/dashboard/dashboard/application-volume/ApplicationVolumeChart";
import ApplicationVolumeHeader from "../../../Components/embassy/dashboard/dashboard/application-volume/ApplicationVolumeHeader";
import RecentApplicationHeader from "../../../Components/embassy/dashboard/dashboard/recent-application/RecentApplicationHeader";
import ApplicationTable from "../../../Components/embassy/dashboard/dashboard/recent-application/application-table/ApplicationTable";
import QuickLinks from "../../../Components/embassy/dashboard/dashboard/quick-links/QuickLinks";
import UpcommingAppointmtnt from "../../../Components/embassy/dashboard/dashboard/Upcomming-appointmtnt/UpcommingAppointmtnt";
import AvgProcessingTime from "../../../Components/embassy/dashboard/dashboard/avg-processing-time/AvgProcessingTime";
import DashboardHeader from "../../../Components/embassy/dashboard/dashboard/DashboardHeader";
import { useSelector } from "react-redux";
import { useFullCountryDetails } from "../../../tanstack/query/getCountryDetails";

export default function EmbassyDashboard() {

  const { userAuthData } = useSelector(state => state.checkAuth);
  const { embassyData, hasEmbassyerror } = useSelector(state => state.embassy);
  const { data: countryDetails, isLoading: isCountryLoading, isError } = useFullCountryDetails(embassyData?.country_id);

  // Stats data - Real embassy metrics
  const stats = [
    {
      icon: FileText,
      title: "Total Applications",
      value: "247",
      change: "+12.5%",
      trend: "up",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      subtext: "This month"
    },
    {
      icon: CheckCircle,
      title: "Approved Visas",
      value: "189",
      change: "+8.3%",
      trend: "up",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      subtext: "76% approval rate"
    },
    {
      icon: Clock,
      title: "Pending Review",
      value: "42",
      change: "-5.2%",
      trend: "down",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      subtext: "Avg. 3 days wait"
    },
    {
      icon: Calendar,
      title: "Upcoming Interviews",
      value: "16",
      change: "+15%",
      trend: "up",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      subtext: "Next 7 days"
    }
  ];

  // Chart data - Application volume
  const chartData = [
    { month: "Jan", value: 185 },
    { month: "Feb", value: 210 },
    { month: "Mar", value: 195 },
    { month: "Apr", value: 235 },
    { month: "May", value: 220 },
    { month: "Jun", value: 260 },
    { month: "Jul", value: 245 },
    { month: "Aug", value: 275 },
    { month: "Sep", value: 255 },
    { month: "Oct", value: 290 },
    { month: "Nov", value: 270 },
    { month: "Dec", value: 247 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  // Recent applications - Table format
  const recentApplications = [
    {
      id: "#APP-45467",
      name: "John Anderson",
      type: "Tourist Visa",
      country: "United States",
      date: "Dec 15, 2025",
      status: "pending",
      priority: "normal"
    },
    {
      id: "#APP-45468",
      name: "Sarah Williams",
      type: "Student Visa",
      country: "Canada",
      date: "Dec 15, 2025",
      status: "approved",
      priority: "high"
    },
    {
      id: "#APP-45469",
      name: "Michael Chen",
      type: "Work Visa",
      country: "Australia",
      date: "Dec 14, 2025",
      status: "review",
      priority: "urgent"
    },
    {
      id: "#APP-45470",
      name: "Emma Thompson",
      type: "Business Visa",
      country: "United Kingdom",
      date: "Dec 14, 2025",
      status: "approved",
      priority: "normal"
    },
    {
      id: "#APP-45471",
      name: "David Martinez",
      type: "Family Visa",
      country: "Spain",
      date: "Dec 13, 2025",
      status: "rejected",
      priority: "normal"
    }
  ];



  // Processing times
  const processingTimes = [
    { type: "Tourist Visa", days: 5, color: "bg-blue-500", percentage: 15 },
    { type: "Student Visa", days: 15, color: "bg-green-500", percentage: 45 },
    { type: "Work Visa", days: 25, color: "bg-purple-500", percentage: 75 },
    { type: "Business Visa", days: 7, color: "bg-orange-500", percentage: 25 }
  ];

  // Upcoming appointments
  const upcomingAppointments = [
    {
      time: "10:00 AM",
      date: "Dec 20",
      applicant: "Michael Chen",
      type: "Work Visa Interview",
      status: "confirmed"
    },
    {
      time: "11:30 AM",
      date: "Dec 20",
      applicant: "Lisa Kumar",
      type: "Student Visa Interview",
      status: "confirmed"
    },
    {
      time: "02:00 PM",
      date: "Dec 21",
      applicant: "Robert Johnson",
      type: "Tourist Visa Interview",
      status: "pending"
    }
  ];

  // Quick actions
  const quickActions = [
    {
      icon: FileText,
      label: "Review Applications",
      count: "42 pending",
      path: "/embassy/dashboard/applications",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: Calendar,
      label: "Schedule Interview",
      count: "16 upcoming",
      path: "/embassy/dashboard/appointments/schedule",
      color: "bg-purple-500 hover:bg-purple-600"
    },

    {
      icon: BarChart2,
      label: "Analytics",
      count: "View reports",
      path: "/embassy/dashboard/analytics",
      color: "bg-orange-500 hover:bg-orange-600"
    }
  ];

  const getPriorityBadge = (priority) => {
    const styles = {
      urgent: "bg-red-100 text-red-700",
      high: "bg-orange-100 text-orange-700",
      normal: "bg-gray-100 text-gray-700"
    };
    return styles[priority] || styles.normal;
  };

  console.log('User data',userAuthData);
  console.log('Embassy data',embassyData);
  console.log('Country data',countryDetails);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <DashboardHeader />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} stat={stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Charts & Tables */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Application Volume Chart */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <ApplicationVolumeHeader />

            {/* Chart */}
            <ApplicationVolumeChart chartData={chartData} maxValue={maxValue} />
          </div>

          {/* Recent Applications Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[710px]">
            <RecentApplicationHeader />

            <ApplicationTable recentApplications={recentApplications} />
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Actions */}
          <QuickLinks quickActions={quickActions} />

          {/* Upcoming Appointments */}
          <UpcommingAppointmtnt upcomingAppointments={upcomingAppointments} />

          {/* Processing Times */}
          <AvgProcessingTime processingTimes={processingTimes} />

        </div>
      </div>
    </div>
  );
}