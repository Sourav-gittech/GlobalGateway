import React from 'react'
import { FileText, Lock, Unlock, Users } from 'lucide-react'

const VisaStats = ({getVisaStatus}) => {

    const visaData = [
        {
            id: 1,
            visaName: 'Student Visa',
            visaType: 'Educational',
            globalStatus: 'active',
            totalApplications: 1247,
            countryStatus: [
                { country: 'India', status: 'active', processing: '40 days', validity: '1 year', fees: 10000, applications: 690, blockedFor: [] },
                { country: 'Bangladesh', status: 'active', processing: '45 days', validity: '1 year', fees: 9500, applications: 189, blockedFor: [] },
                { country: 'Sri Lanka', status: 'active', processing: '50 days', validity: '1 year', fees: 10500, applications: 145, blockedFor: [] },
                { country: 'Russia', status: 'blocked', processing: '45 days', validity: '1 year', fees: 10000, applications: 0, blockedFor: ['India', 'China', 'Pakistan'] },
                { country: 'Argentina', status: 'blocked', processing: '45 days', validity: '1 year', fees: 10000, applications: 0, blockedFor: ['Brazil', 'Chile'] },
                { country: 'UAE', status: 'active', processing: '45 days', validity: '1 year', fees: 11000, applications: 223, blockedFor: [] }
            ]
        },
        {
            id: 2,
            visaName: 'Tourist Visa',
            visaType: 'Tourism',
            globalStatus: 'active',
            totalApplications: 3421,
            countryStatus: [
                { country: 'India', status: 'active', processing: '15 days', validity: '6 months', fees: 20000, applications: 1546, blockedFor: [] },
                { country: 'Bangladesh', status: 'active', processing: '20 days', validity: '6 months', fees: 19000, applications: 432, blockedFor: [] },
                { country: 'Sri Lanka', status: 'active', processing: '18 days', validity: '6 months', fees: 20500, applications: 321, blockedFor: [] },
                { country: 'Russia', status: 'active', processing: '25 days', validity: '6 months', fees: 21000, applications: 289, blockedFor: [] },
                { country: 'Argentina', status: 'active', processing: '22 days', validity: '6 months', fees: 19500, applications: 245, blockedFor: [] },
                { country: 'UAE', status: 'active', processing: '20 days', validity: '6 months', fees: 22000, applications: 588, blockedFor: [] }
            ]
        },
        {
            id: 3,
            visaName: 'Business Visa',
            visaType: 'Business',
            globalStatus: 'blocked',
            totalApplications: 892,
            countryStatus: [
                { country: 'India', status: 'blocked', processing: '30 days', validity: '2 years', fees: 25000, applications: 0, blockedFor: ['USA', 'UK', 'Canada'] },
                { country: 'Bangladesh', status: 'blocked', processing: '30 days', validity: '2 years', fees: 24000, applications: 0, blockedFor: ['Australia', 'New Zealand'] },
                { country: 'Sri Lanka', status: 'blocked', processing: '30 days', validity: '2 years', fees: 26000, applications: 0, blockedFor: ['Singapore', 'Malaysia'] },
                { country: 'Russia', status: 'active', processing: '35 days', validity: '2 years', fees: 27000, applications: 234, blockedFor: [] },
                { country: 'Argentina', status: 'active', processing: '32 days', validity: '2 years', fees: 25500, applications: 189, blockedFor: [] },
                { country: 'UAE', status: 'active', processing: '28 days', validity: '2 years', fees: 28000, applications: 469, blockedFor: [] }
            ]
        },
        {
            id: 4,
            visaName: 'Work Visa',
            visaType: 'Employment',
            globalStatus: 'active',
            totalApplications: 2156,
            countryStatus: [
                { country: 'India', status: 'active', processing: '55 days', validity: '3 years', fees: 35000, applications: 1001, blockedFor: [] },
                { country: 'Bangladesh', status: 'active', processing: '60 days', validity: '3 years', fees: 33000, applications: 298, blockedFor: [] },
                { country: 'Sri Lanka', status: 'active', processing: '65 days', validity: '3 years', fees: 36000, applications: 223, blockedFor: [] },
                { country: 'Russia', status: 'blocked', processing: '60 days', validity: '3 years', fees: 35000, applications: 0, blockedFor: ['Ukraine', 'Poland', 'Estonia'] },
                { country: 'Argentina', status: 'active', processing: '62 days', validity: '3 years', fees: 34000, applications: 178, blockedFor: [] },
                { country: 'UAE', status: 'active', processing: '58 days', validity: '3 years', fees: 37000, applications: 456, blockedFor: [] }
            ]
        },
        {
            id: 5,
            visaName: 'Family Visa',
            visaType: 'Family Reunion',
            globalStatus: 'active',
            totalApplications: 1834,
            countryStatus: [
                { country: 'India', status: 'active', processing: '38 days', validity: '5 years', fees: 15000, applications: 834, blockedFor: [] },
                { country: 'Bangladesh', status: 'active', processing: '42 days', validity: '5 years', fees: 14500, applications: 289, blockedFor: [] },
                { country: 'Sri Lanka', status: 'active', processing: '40 days', validity: '5 years', fees: 15500, applications: 234, blockedFor: [] },
                { country: 'Russia', status: 'active', processing: '45 days', validity: '5 years', fees: 16000, applications: 156, blockedFor: [] },
                { country: 'Argentina', status: 'active', processing: '40 days', validity: '5 years', fees: 14800, applications: 123, blockedFor: [] },
                { country: 'UAE', status: 'active', processing: '35 days', validity: '5 years', fees: 16500, applications: 198, blockedFor: [] }
            ]
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-400 text-xs font-medium">Total Visa Types</h3>
                    <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-3xl font-bold text-white">{visaData.length}</p>
                <p className="text-xs text-slate-500 mt-1">System wide</p>
            </div>

            <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-400 text-xs font-medium">Active Visas</h3>
                    <Unlock className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-3xl font-bold text-white">
                    {visaData.filter(
                        v => getVisaStatus(v.id, v.globalStatus) === 'active'
                    ).length}
                </p>
                <p className="text-xs text-slate-500 mt-1">Currently accepting</p>
            </div>

            <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-400 text-xs font-medium">Not Active Visas</h3>
                    <Lock className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-3xl font-bold text-white">
                    {visaData.filter(
                        v => getVisaStatus(v.id, v.globalStatus) === 'blocked'
                    ).length}
                </p>
                <p className="text-xs text-slate-500 mt-1">Currently disabled</p>
            </div>

            <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-400 text-xs font-medium">Total Applications</h3>
                    <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-3xl font-bold text-white">
                    {visaData.reduce((sum, v) => sum + v.totalApplications, 0).toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-1">All time</p>
            </div>
        </div>
    )
}

export default VisaStats