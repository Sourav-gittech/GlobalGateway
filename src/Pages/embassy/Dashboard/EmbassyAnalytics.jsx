import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, FileText, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for charts
const revenueData = [
  { month: 'Jan', revenue: 45000, applications: 120, target: 50000 },
  { month: 'Feb', revenue: 52000, applications: 145, target: 50000 },
  { month: 'Mar', revenue: 48000, applications: 130, target: 50000 },
  { month: 'Apr', revenue: 61000, applications: 165, target: 60000 },
  { month: 'May', revenue: 55000, applications: 150, target: 60000 },
  { month: 'Jun', revenue: 67000, applications: 180, target: 60000 },
  { month: 'Jul', revenue: 72000, applications: 195, target: 70000 },
  { month: 'Aug', revenue: 68000, applications: 185, target: 70000 },
  { month: 'Sep', revenue: 75000, applications: 205, target: 70000 },
  { month: 'Oct', revenue: 82000, applications: 220, target: 80000 },
  { month: 'Nov', revenue: 78000, applications: 210, target: 80000 },
  { month: 'Dec', revenue: 85000, applications: 230, target: 80000 },
];

const visaTypeData = [
  { name: 'Student Visa', value: 320, revenue: 320000, color: '#3b82f6' },
  { name: 'Tourist Visa', value: 450, revenue: 450000, color: '#10b981' },
  { name: 'Business Visa', value: 280, revenue: 350000, color: '#f59e0b' },
  { name: 'Worker Visa', value: 190, revenue: 285000, color: '#8b5cf6' },
  { name: 'Family Visa', value: 150, revenue: 225000, color: '#ec4899' },
  { name: 'Resident Visa', value: 120, revenue: 180000, color: '#06b6d4' },
];

const weeklyData = [
  { day: 'Mon', applications: 35, revenue: 8500, approvals: 28 },
  { day: 'Tue', applications: 42, revenue: 10200, approvals: 35 },
  { day: 'Wed', applications: 38, revenue: 9200, approvals: 32 },
  { day: 'Thu', applications: 45, revenue: 11000, approvals: 38 },
  { day: 'Fri', applications: 40, revenue: 9800, approvals: 34 },
  { day: 'Sat', applications: 25, revenue: 6000, approvals: 20 },
  { day: 'Sun', applications: 18, revenue: 4500, approvals: 15 },
];

const countryData = [
  { country: 'India', applications: 450, revenue: 540000 },
  { country: 'USA', applications: 380, revenue: 456000 },
  { country: 'UK', applications: 320, revenue: 384000 },
  { country: 'Canada', applications: 290, revenue: 348000 },
  { country: 'Australia', applications: 250, revenue: 300000 },
  { country: 'Germany', applications: 220, revenue: 264000 },
  { country: 'France', applications: 180, revenue: 216000 },
  { country: 'Others', applications: 420, revenue: 302000 },
];

const applicationStatusData = [
  { name: 'Approved', value: 1654, color: '#10b981' },
  { name: 'Under Review', value: 342, color: '#f59e0b' },
  { name: 'Pending Documents', value: 156, color: '#3b82f6' },
  { name: 'Rejected', value: 98, color: '#ef4444' },
  { name: 'Awaiting Interview', value: 124, color: '#8b5cf6' },
];

export default function EmbassyAnalytics() {
  const [timeRange, setTimeRange] = useState('yearly');
  const [chartView, setChartView] = useState('revenue'); // 'revenue', 'applications', or 'both'

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalApplications = revenueData.reduce((sum, item) => sum + item.applications, 0);
  const avgRevenue = Math.round(totalRevenue / revenueData.length);
  const revenueGrowth = ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue * 100).toFixed(1);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Comprehensive revenue and performance insights</p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { 
              icon: DollarSign, 
              title: 'Total Revenue', 
              value: `₹${(totalRevenue / 1000).toFixed(0)}K`, 
              change: `+${revenueGrowth}%`, 
              subtitle: `Avg: ₹${(avgRevenue / 1000).toFixed(1)}K/month`, 
              bgColor: 'bg-blue-50',
              iconBg: 'bg-blue-600'
            },
            { 
              icon: FileText, 
              title: 'Total Applications', 
              value: totalApplications.toLocaleString(), 
              change: '+12.5%', 
              subtitle: `Avg: ${Math.round(totalApplications / 12)}/month`, 
              bgColor: 'bg-green-50',
              iconBg: 'bg-green-600'
            },
            { 
              icon: Users, 
              title: 'Approval Rate', 
              value: '92.4%', 
              change: '+8.2%', 
              subtitle: '1,654 approved this year', 
              bgColor: 'bg-purple-50',
              iconBg: 'bg-purple-600'
            },
            { 
              icon: Activity, 
              title: 'Avg Processing Time', 
              value: '3.2 days', 
              change: '+5.1%', 
              subtitle: 'Target: 5 days', 
              bgColor: 'bg-orange-50',
              iconBg: 'bg-orange-600'
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className={`${card.bgColor} border border-gray-200 rounded-xl shadow-sm hover:shadow-md p-5 sm:p-6 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold bg-green-50 px-3 py-1.5 rounded-full border border-green-200 text-green-700">
                  <TrendingUp className="w-3 h-3" />
                  {card.change}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-medium">{card.title}</p>
              <p className="text-3xl font-bold mt-2 text-gray-900">{card.value}</p>
              <p className="text-xs mt-2 text-gray-500">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Revenue Trends - Large Chart */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Revenue & Applications Trend</h2>
              <p className="text-sm text-gray-600 mt-1">Monthly performance overview for 2025</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button 
                onClick={() => setChartView('revenue')}
                className={`flex-1 sm:flex-none px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                  chartView === 'revenue' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Revenue
              </button>
              <button 
                onClick={() => setChartView('applications')}
                className={`flex-1 sm:flex-none px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                  chartView === 'applications' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Applications
              </button>
              <button 
                onClick={() => setChartView('both')}
                className={`flex-1 sm:flex-none px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                  chartView === 'both' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Both
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => ['₹' + value.toLocaleString(), '']}
              />
              <Legend wrapperStyle={{ fontSize: '13px' }} />
              {(chartView === 'revenue' || chartView === 'both') && (
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue (₹)" />
              )}
              {(chartView === 'applications' || chartView === 'both') && (
                <Area type="monotone" dataKey="applications" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorApplications)" name="Applications" />
              )}
              <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut and Pie Charts Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visa Type Distribution - Donut Chart */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Visa Type Distribution</h2>
            <p className="text-sm text-gray-600 mb-6">Revenue and application breakdown by visa category</p>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPie>
                  <Pie
                    data={visaTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    innerRadius={70}
                    outerRadius={110}
                    dataKey="value"
                    style={{ fontSize: '11px', fontWeight: '600' }}
                  >
                    {visaTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value + ' applications', '']}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {visaTypeData.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                >
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-600">₹{(item.revenue / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Status Distribution - Pie Chart */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Application Status Overview</h2>
            <p className="text-sm text-gray-600 mb-6">Current status distribution of all applications</p>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPie>
                  <Pie
                    data={applicationStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                    outerRadius={110}
                    dataKey="value"
                    style={{ fontSize: '12px', fontWeight: '700' }}
                  >
                    {applicationStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value + ' applications', '']}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 gap-2.5 mt-4">
              {applicationStatusData.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-semibold text-gray-900">{item.name}</span>
                  </div>
                  <p className="text-base font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Performance */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Weekly Performance</h2>
          <p className="text-sm text-gray-600 mb-6">Daily applications and revenue this week</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="applications" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Applications" />
              <Bar dataKey="approvals" fill="#10b981" radius={[8, 8, 0, 0]} name="Approvals" />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              { label: 'Total Applications', value: weeklyData.reduce((sum, d) => sum + d.applications, 0), color: 'text-blue-600' },
              { label: 'Approved', value: weeklyData.reduce((sum, d) => sum + d.approvals, 0), color: 'text-green-600' },
              { label: 'Revenue', value: `₹${(weeklyData.reduce((sum, d) => sum + d.revenue, 0) / 1000).toFixed(0)}K`, color: 'text-purple-600' }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                <p className={`text-lg font-bold mt-1 ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Top Countries</h2>
          <p className="text-sm text-gray-600 mb-6">Applications by nationality</p>
          <div className="space-y-4">
            {countryData.slice(0, 6).map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-gray-900">{item.country}</span>
                  <span className="text-gray-600 font-semibold">{item.applications}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 h-6 rounded-full transition-all duration-1000"
                    style={{ width: `${(item.applications / countryData[0].applications) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
}