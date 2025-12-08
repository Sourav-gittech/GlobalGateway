import React from 'react'
import { FileText, CheckCircle, Clock, TrendingUp, Loader2 } from "lucide-react";
import { useApplicationStats, useApplicationStatusStats, useApprovedApplicationsStats, usePendingApplicationsStats } from '../../../tanstack/query/getDashboardStats';

function SmallCard({ title, value, Icon, trend }) {
    const trendText = typeof trend === "string" ? trend : "";

    return (
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70 transition-all hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start justify-between mb-2">
                <div className="text-xs sm:text-sm text-slate-400">{title}</div>
                {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />}
            </div>

            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-1">
                {value}
            </div>

            {trendText !== "" && (
                <div className={`text-xs sm:text-sm font-medium ${trendText.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                    {trendText} from last month
                </div>
            )}
        </div>
    );
}

const DashboardStats = () => {
    const { data: applicationStats, isLoading: isApplicationStatsLoading } = useApplicationStats();
    const { data: applicationPendingStats, isLoading: isApplicationPendingLoading } = usePendingApplicationsStats();
    const { data: applicationApprovedStats, isLoading: isApplicationApprovedLoading } = useApprovedApplicationsStats();
    const { data: applicationStatusStats, isLoading: isApplicationStatusLoading } = useApplicationStatusStats();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <SmallCard
                title="Total Applications"
                value={isApplicationStatsLoading ? <Loader2 className="w-8 h-8 text-white animate-spin mb-4" /> : applicationStats?.totalApplications}
                Icon={FileText}
                trend={isApplicationStatsLoading ? <Loader2 className="w-8 h-8 text-white animate-spin mb-4" /> : `${applicationStats?.rate}%`}
            />
            <SmallCard
                title="Approved Visas"
                value={isApplicationApprovedLoading ? <Loader2 className="w-8 h-8 text-white animate-spin mb-4" /> : applicationApprovedStats?.totalApproved}
                Icon={CheckCircle}
                trend={isApplicationApprovedLoading ? <Loader2 className="w-8 h-8 text-white animate-spin mb-4" /> : `${applicationApprovedStats?.isIncrease ? '+' : '-'}${applicationApprovedStats?.rate}%`}
            />
            <SmallCard
                title="Pending Visas"
                value={isApplicationPendingLoading ? <Loader2 className="w-8 h-8 text-white animate-spin mb-4" /> : `${applicationPendingStats?.totalPending}%`}
                Icon={Clock}
                trend={isApplicationPendingLoading ? <Loader2 className="w-8 h-8 text-white animate-spin mb-4" /> : `${applicationPendingStats?.isIncrease ? '+' : '-'}${applicationPendingStats?.rate}%`}
            />
            <SmallCard
                title="Success Rate"
                value={isApplicationStatusLoading ? <Loader2 className="w-8 h-8 text-white animate-spin mb-4" /> : `${applicationStatusStats?.successRate}%`}
                Icon={TrendingUp}
                trend={isApplicationStatusLoading ? <Loader2 className="w-8 h-8 text-white animate-spin mb-4" /> : `${applicationStatusStats?.approvedStats.isIncrease ? "+" : "-"}${applicationStatusStats?.approvedStats.rate}%`}
            />
        </div>
    )
}

export default DashboardStats