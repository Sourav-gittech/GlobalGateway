import React from 'react'
import { usePersonalInfoByApplicationId } from '../../../tanstack/query/getApplicationPersonalInfo';
import { useCountryByApplicationId } from '../../../tanstack/query/getCountryByApplicationId';
import { formatDateDDMMYY } from '../../../util/dateFormat/dateFormatConvertion';
import { useFullApplicationDetailsById } from '../../../tanstack/query/getFullApplicationDetails';

const ApplicationRow = ({ app }) => {

    const { data: applicantsData, isLoading: applicantsDataLoading } = usePersonalInfoByApplicationId(app?.id);
    const { data: countryData, isLoading: countryDataLoading } = useCountryByApplicationId(app?.id);
    const { data: applicationDetails, isLoading: applicationDetailsLoading } = useFullApplicationDetailsById(app?.id);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return 'bg-green-500/10 text-green-400 border border-green-500/20 backdrop-blur-sm px-2';
            case 'pending':
                return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 backdrop-blur-sm px-3';
            case 'processing':
                return 'bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-sm px-1.5';
            case 'rejected':
                return 'bg-red-500/10 text-red-400 border border-red-500/20 backdrop-blur-sm px-2.5';
            default:
                return 'bg-slate-500/10 text-slate-400 border border-slate-500/20 backdrop-blur-sm';
        }
    }

    const getStatusLabel = (status) => {
        switch (status.toLowerCase()) {
            case 'all': return 'All Status';
            case 'processing': return 'Processing';
            case 'pending': return 'Pending';
            case 'approved': return 'Approved';
            case 'rejected': return 'Rejected';
            default: return 'All Status';
        }
    }

    // console.log('Personal data', applicantsData);
    // console.log('Country details', countryData);
    // console.log('Application details', applicationDetails);

    const applicantsName = applicantsData?.first_name + " " + applicantsData?.last_name;

    return (
        <tr className="border-b border-slate-600/30 hover:bg-slate-700/30 transition-colors">
            <td className="px-4 py-4 text-xs md:text-sm text-blue-400 font-mono">{app?.id?.length > 16 ? app?.id?.slice(0, 16) + '...' : app?.id}</td>
            <td className="px-4 py-4 text-xs md:text-sm text-white">
                {applicantsDataLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" /> : applicantsName?.length > 12 ? applicantsName?.slice(0, 12) + '...' : applicantsName ?? 'N/A'}
            </td>
            <td className="px-4 py-4 text-xs md:text-sm text-slate-300 hidden md:table-cell">
                {applicantsDataLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" /> : applicantsData?.country?.length > 12 ? applicantsData?.country?.slice(0, 12) + '...' : applicantsData?.country ?? 'N/A'}
            </td>
            <td className="px-4 py-4 text-xs md:text-sm text-slate-300 hidden lg:table-cell">
                {countryDataLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" /> : countryData?.name?.length > 12 ? countryData?.name?.slice(0, 12) + '...' : countryData?.name ?? 'N/A'}
            </td>
            <td className="px-4 py-4 text-xs md:text-sm text-slate-300 hidden xl:table-cell text-center">
                {applicationDetailsLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" /> : !applicationDetails?.application_visa_details?.visa_type ? 'N/A' : applicationDetails?.application_visa_details?.visa_type?.length > 10 ? applicationDetails?.application_visa_details?.visa_type?.slice(0, 10) + '...' : applicationDetails?.application_visa_details?.visa_type ?? 'N/A'}
            </td>
            <td className="px-4 py-4">
                <span className={`py-1 rounded-full text-xs font-medium ${getStatusColor(app?.status)}`}>
                    {getStatusLabel(app?.status)}
                </span>
            </td>
            <td className="px-4 py-4 text-xs md:text-sm text-slate-300 hidden lg:table-cell">{formatDateDDMMYY(app?.created_at) ?? 'N/A'}</td>
            <td className="px-4 py-4 text-xs md:text-sm text-slate-300 hidden xl:table-cell text-center">
                {app?.status === 'approved' && app?.approval_date ? formatDateDDMMYY(app.approval_date) : app?.status === 'rejected' && app?.updated_at ? formatDateDDMMYY(app.updated_at) : 'N/A'}
            </td>
        </tr>
    )
}

export default ApplicationRow