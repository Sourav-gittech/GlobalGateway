import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, FileText, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AnalyticsStats from '../../../Components/embassy/dashboard/analytics/AnalyticsStats';
import RevenueTrends from '../../../Components/embassy/dashboard/analytics/charts/RevenueTrends';
import VisaTypeDistribution from '../../../Components/embassy/dashboard/analytics/charts/VisaTypeDistribution';
import ApplicationStatus from '../../../Components/embassy/dashboard/analytics/charts/ApplicationStatus';
import WeeklyPerformance from '../../../Components/embassy/dashboard/analytics/charts/WeeklyPerformance';
import TopCountries from '../../../Components/embassy/dashboard/analytics/charts/TopCountries';
import { useSelector } from 'react-redux';
import { useFullCountryDetails } from '../../../tanstack/query/getCountryDetails';
import { useApplicationsByCountryId } from '../../../tanstack/query/getApplicationsByCountryId';
import { useApplicationStats } from '../../../tanstack/query/getApplicationStatsForEmbassy';

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

  const { embassyData } = useSelector(state => state.embassy);
  const { data: countryDetails } = useFullCountryDetails(embassyData?.country_id);
  const { data: allTypeApplications } = useApplicationsByCountryId(embassyData?.country_id, "all");
  // console.log(embassyData);

  const { data: allStats = [] } = useApplicationStats({ countryId: embassyData?.country_id, statusFilter: "all" });

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalApplications = allStats?.length;
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
        <AnalyticsStats totalRevenue={totalRevenue} revenueGrowth={revenueGrowth} avgRevenue={avgRevenue} totalApplications={totalApplications} />

        {/* Revenue Trends - Large Chart */}
        <RevenueTrends setChartView={setChartView} chartView={chartView} revenueData={revenueData} />

        {/* Donut and Pie Charts Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visa Type Distribution - Donut Chart */}
          <VisaTypeDistribution visaTypeData={visaTypeData} />

          {/* Application Status Distribution - Pie Chart */}
          <ApplicationStatus applicationStatusData={applicationStatusData} />

        </div>

        {/* Weekly Performance */}
        <WeeklyPerformance weeklyData={weeklyData} />

        {/* Top Countries Section */}
        <TopCountries countryData={countryData} />

      </div>
    </div>
  );
}