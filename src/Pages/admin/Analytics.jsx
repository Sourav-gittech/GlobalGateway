import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { 
  TrendingUp, 
  Users, 
  Globe, 
  FileCheck,
  Calendar,
  Target,
  BarChart3,
  PieChart
} from "lucide-react";
import { ApplicationTrendChart } from "../../Components/admin/ui/charts/analytics/ApplicationChart";
import { ApprovalRateChart } from "../../Components/admin/ui/charts/analytics/ApprovalRateChart";
import { MonthlyComparisonChart } from "../../Components/admin/ui/charts/analytics/MonthlyComparisonChart";
import { VisaTypeChart } from "../../Components/admin/ui/charts/analytics/VisaTypeChart";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Filler,
  Legend
);


// Metric Card Component
function MetricCard({ title, value, change, Icon, iconColor }) {
  const isPositive = change.startsWith("+");
  
  return (
    <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <div className="text-slate-400 text-sm mb-1">{title}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

// Chart Card Component
function ChartCard({ title, subtitle, children, actions }) {
  return (
    <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      <div className="h-64 lg:h-80">{children}</div>
    </div>
  );
}

// Main Analytics Component
export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-slate-400">Deep insights into visa applications and trends</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 12 months
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Applications"
          value="3,847"
          change="+12.5%"
          Icon={Users}
          iconColor="bg-blue-500/20 text-blue-400"
        />
        <MetricCard
          title="Approval Rate"
          value="92%"
          change="+2.1%"
          Icon={FileCheck}
          iconColor="bg-green-500/20 text-green-400"
        />
        <MetricCard
          title="Avg. Processing Time"
          value="32 days"
          change="-3.5%"
          Icon={TrendingUp}
          iconColor="bg-cyan-500/20 text-cyan-400"
        />
        <MetricCard
          title="Countries Served"
          value="45"
          change="+5"
          Icon={Globe}
          iconColor="bg-amber-500/20 text-amber-400"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Trends */}
        <ChartCard
          title="Application Trends"
          subtitle="Monthly application volume over the year"
        >
          <ApplicationTrendChart />
        </ChartCard>

        {/* Approval Rate */}
        <ChartCard
          title="Approval Rate Trends"
          subtitle="Success rate percentage by month"
        >
          <ApprovalRateChart />
        </ChartCard>

        {/* Year Comparison */}
        <ChartCard
          title="Year-over-Year Comparison"
          subtitle="Compare current vs previous year performance"
        >
          <MonthlyComparisonChart />
        </ChartCard>

        {/* Visa Type Distribution */}
        <ChartCard
          title="Visa Type Distribution"
          subtitle="Applications breakdown by visa category"
        >
          <VisaTypeChart />
        </ChartCard>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Top Performing Category</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">Work Visa</p>
          <p className="text-sm text-slate-400">1,450 applications • 94% approval rate</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-white">Best Month</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">December</p>
          <p className="text-sm text-slate-400">450 applications • 18% increase</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <PieChart className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-white">Market Share</h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">38%</p>
          <p className="text-sm text-slate-400">Leading visa service provider</p>
        </div>
      </div>
    </div>
  );
}