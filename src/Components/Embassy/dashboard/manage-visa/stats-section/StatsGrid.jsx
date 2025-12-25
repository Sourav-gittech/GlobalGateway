import React from 'react'
import StatsCard from './StatsCard'
import { CheckCircle, Lock } from 'lucide-react';

const StatsGrid = ({ countryPolicies, currentCountryVisaTypes, mockCountries }) => {

    const activePolicies = Object.values(countryPolicies).filter(p => p.status === 'active' && !p.blocked).length;
    const blockedPolicies = Object.values(countryPolicies).filter(p => p.blocked).length;
    const totalConfigured = Object.keys(countryPolicies).length;

    const stats = [
        { id: 1, title: 'Total Countries', subTitle: 'All countries', count: mockCountries.length, icon: CheckCircle, iconColor: 'text-blue-600', subtitleColor: 'text-gray-500' },
        { id: 2, title: 'Active Policies', subTitle: 'Currently accepting', count: activePolicies, icon: CheckCircle, iconColor: 'text-green-600', subtitleColor: 'text-green-600' },
        { id: 3, title: 'Blocked Visas', subTitle: 'Not accepting', count: blockedPolicies, icon: Lock, iconColor: 'text-red-600', subtitleColor: 'text-red-500' },
        { id: 4, title: 'Configured', subTitle: 'Visa types setup', count: totalConfigured + '/' + currentCountryVisaTypes.length, icon: CheckCircle, iconColor: 'text-purple-600', subtitleColor: 'text-purple-500' }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {stats?.map(stat => (
                <StatsCard key={stat?.id} stat={stat} />
            ))}
        </div>
    )
}

export default StatsGrid