import React, { useState } from "react";
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  TrendingDown,
  Building2,
  Calendar,
  MessageSquare,
  BarChart2,
  Settings,
  Users,
  AlertCircle,
  Eye,
  UserCheck,
  Filter,
  Search,
  Download,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmbassyDashboard() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");

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

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
      approved: "bg-green-50 text-green-700 border border-green-200",
      rejected: "bg-red-50 text-red-700 border border-red-200",
      review: "bg-blue-50 text-blue-700 border border-blue-200"
    };
    return styles[status] || styles.pending;
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      urgent: "bg-red-100 text-red-700",
      high: "bg-orange-100 text-orange-700",
      normal: "bg-gray-100 text-gray-700"
    };
    return styles[priority] || styles.normal;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20">
              <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                Embassy Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Welcome back! Here's your visa management overview
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                    <stat.icon size={22} className={stat.iconColor} />
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium mb-2">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <TrendingUp size={16} className="text-green-600" />
                    ) : (
                      <TrendingDown size={16} className="text-red-600" />
                    )}
                    <span className={`text-sm font-semibold ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{stat.subtext}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Charts & Tables */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Application Volume Chart */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Application Volume</h2>
                <p className="text-sm text-gray-600 mt-1">Monthly trends for 2025</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-200">
                <TrendingUp size={16} />
                <span className="text-sm font-semibold">+12.5%</span>
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-64">
              <div className="absolute inset-0 flex items-end justify-between gap-2">
                {chartData.map((data, idx) => {
                  const height = (data.value / maxValue) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center h-full">
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl hover:from-blue-700 hover:to-blue-500 transition-all duration-300 cursor-pointer group relative shadow-sm"
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap z-10 font-medium shadow-lg">
                            {data.value} applications
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{data.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Applications Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[710px]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter size={18} className="text-gray-600" />
                </button>
                <button 
                  onClick={() => navigate("/embassy/dashboard/applications")}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Application ID</th>
                    <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Applicant</th>
                    <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Type</th>
                    <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-right text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentApplications.map((app, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{app.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{app.country}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{app.type}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(app.status)}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => navigate(`/embassy/dashboard/applications/${app.id}`)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(action.path)}
                  className="w-full group relative overflow-hidden flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-blue-200/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/50 backdrop-blur-sm flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform shadow-sm">
                    <action.icon size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm text-gray-900">{action.label}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{action.count}</p>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h2>
              <button 
                onClick={() => navigate("/embassy/dashboard/appointments")}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {upcomingAppointments.map((apt, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                      <span className="text-xs font-bold text-blue-700">{apt.date.split(' ')[1]}</span>
                      <span className="text-[10px] text-blue-600 font-medium">{apt.date.split(' ')[0]}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{apt.applicant}</p>
                    <p className="text-xs text-gray-600 mt-1">{apt.type}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Clock size={12} className="text-gray-500" />
                      <span className="text-xs text-gray-500 font-medium">{apt.time}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    apt.status === 'confirmed' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

         
         

          {/* Processing Times */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Avg Processing Times</h2>

            <div className="space-y-4">
              {processingTimes.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">{item.type}</span>
                    <span className="text-sm font-bold text-gray-900">{item.days} days</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-700 shadow-sm`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-600 leading-relaxed">
                Based on last 90 days of processed applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}