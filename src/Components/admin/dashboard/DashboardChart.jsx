import React from 'react'
import { UserChart } from './charts/UserChart'
import { RevenueChart } from './charts/RevenueChart'
import { useApplicationStats } from '../../../tanstack/query/getDashboardStats';
import { useApprovalStats } from '../../../tanstack/query/getApprovalStats';
import { Loader2 } from 'lucide-react';

// StatCard Component
function StatCard({ title, value, delta, isLoading, children }) {
    return (
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <div>
                    <div className="text-xs sm:text-sm text-slate-400 mb-1">{title}</div>
                    <div className="text-2xl sm:text-3xl font-semibold text-white">{value}</div>
                </div>

                {/* Loader OR delta text */}
                {isLoading ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                    <div className={`text-sm sm:text-base font-medium ${delta?.startsWith('+') ? 'text-green-400' : delta?.startsWith('-') ? 'text-red-400' : 'text-slate-300'}`}>
                        {delta}
                    </div>
                )}
            </div>

            <div className="h-48 sm:h-56 lg:h-64">{children}</div>
        </div>
    );
}


const DashboardChart = () => {
    const { data: applicationStats, isLoading: isApplicationStatsLoading } = useApplicationStats();
    const { data: approvalStats, isLoading: isApprovalStatsLoading } = useApprovalStats();

    return (
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">

            {/* Application Stats */}
            <StatCard
                title="Application Volume"
                value={applicationStats?.totalApplications ?? 0}
                delta={`${applicationStats?.rate ?? 0}%`}
                isLoading={isApplicationStatsLoading}
            >
                <UserChart />
            </StatCard>

            {/* Approval Stats */}
            <StatCard
                title="Approval Rate"
                value={`${approvalStats?.approvalRate ?? 0}%`}
                delta={`${approvalStats?.delta > 0 ? "+" : ""}${approvalStats?.delta ?? 0}%`}
                isLoading={isApprovalStatsLoading}
            >
                <RevenueChart />
            </StatCard>
        </div>
    );
};


export default DashboardChart