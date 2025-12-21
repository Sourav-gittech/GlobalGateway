import React, { useState } from 'react'
import { useFullCountryDetails } from '../../../tanstack/query/getCountryDetails'
import { useVisaDetailsByApplicationId } from '../../../tanstack/query/getApplicationVisaDetails';
import { useCountryWiseVisaDetails } from '../../../tanstack/query/getCountryWiseVisaDetails';
import { calculateProcessingRange } from '../../../functions/calculateExpectedDate';
import { CheckCircle, XCircle, X, Clock, Send } from 'lucide-react';

const VisaApplicationsSection = ({ visaApplications, getStatusColor, getStatusIcon }) => {
    const [selectedVisa, setSelectedVisa] = useState(null);
    const [modalType, setModalType] = useState(null); // 'approved' or 'rejected'

    const openModal = (visa, type) => {
        setSelectedVisa(visa);
        setModalType(type);
    };

    const closeModal = () => {
        setSelectedVisa(null);
        setModalType(null);
    };

    if(visaApplications.length === 0){
        return (
            <div className="py-8">
                <p className="text-center">No visa applications available</p>
            </div>
        )
    }

    return (
        <>
            <div className="space-y-4">
                {visaApplications?.map(visa => {
                    const { data: visaData, isLoading: isVisaDataLoading, error: isVisaDataError } = useVisaDetailsByApplicationId(visa?.id);
                    const { data: countryWiseVisaDetails, isLoading: isCountryWiseVisaLoading, error: countryWiseVisaError } = useCountryWiseVisaDetails(visa?.country_id);
                    const { data: countryDetails, isLoading: isCountryLoading, error: countryError } = useFullCountryDetails(visa?.country_id);
                    const countrySpecificVisaDetails = countryWiseVisaDetails?.find(visaType => visaType?.visa_type == visaData?.visa_type);

                    const expectedDate = calculateProcessingRange(visa.applied_at, countrySpecificVisaDetails?.visa_details[0]?.visa_processing_time);

                    return (
                        <div key={visa?.id} className="border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">{countryDetails?.name}</h3>
                                    <p className="text-slate-600 text-sm">{visaData?.visa_type}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(visa.status)}`}>
                                        {getStatusIcon(visa.status)}
                                        {visa.status.charAt(0).toUpperCase() + visa.status.slice(1)}
                                    </span>
                                    
                                    {visa.status === 'approved' && (
                                        <button
                                            onClick={() => openModal(visa, 'approved')}
                                            className="p-1.5 rounded-full text-green-600 hover:bg-green-50 border border-green-200 transition-colors"
                                            title="View Timeline"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                    
                                    {visa.status === 'rejected' && (
                                        <button
                                            onClick={() => openModal(visa, 'rejected')}
                                            className="p-1.5 rounded-full text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                                            title="View Details"
                                        >
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                                    <div><span className="font-medium text-slate-700">Application #:</span> {visa?.id}</div>
                                    {visa.applied_at && <div><span className="font-medium text-slate-700">Applied:</span> {new Date(visa.applied_at).toLocaleDateString("en-GB")}</div>}
                                    {visa.status === 'processing' && <div><span className="font-medium text-slate-700">Expected:</span> {new Date(expectedDate?.to).toLocaleDateString("en-GB")}</div>}
                                    {visa.approval_date && <div><span className="font-medium text-slate-700">Approved:</span> {new Date(visa.approval_date).toLocaleDateString("en-GB")}</div>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Modal */}
            {selectedVisa && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-slate-900">
                                {modalType === 'approved' ? 'Application Timeline' : 'Rejection Details'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="p-1 rounded-full hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="p-6">
                            {modalType === 'rejected' ? (
                                <RejectionModal visa={selectedVisa} />
                            ) : (
                                <ApprovalTimeline visa={selectedVisa} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

const RejectionModal = ({ visa }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-red-900">Application Rejected</h3>
                    <p className="text-sm text-red-700">Application #{visa?.id}</p>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="font-medium text-slate-900">Embassy Message:</h4>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
                    {visa?.rejection_reason || "Your visa application has been rejected due to incomplete documentation. Please ensure all required documents are submitted and meet the embassy's standards before reapplying."}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div>
                    <p className="text-sm text-slate-600">Applied Date</p>
                    <p className="font-medium text-slate-900">
                        {visa.applied_at ? new Date(visa.applied_at).toLocaleDateString("en-GB") : 'N/A'}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-slate-600">Rejection Date</p>
                    <p className="font-medium text-slate-900">
                        {visa.rejection_date ? new Date(visa.rejection_date).toLocaleDateString("en-GB") : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

const ApprovalTimeline = ({ visa }) => {
    const timelineSteps = [
        {
            label: 'Application Submitted',
            date: visa.applied_at,
            icon: Send,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            completed: true
        },
        {
            label: 'Processing',
            date: visa.processing_date || visa.applied_at,
            icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
            completed: true
        },
        {
            label: 'Approved',
            date: visa.approval_date,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            completed: true
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-green-900">Application Approved</h3>
                    <p className="text-sm text-green-700">Application #{visa?.id}</p>
                </div>
            </div>

            <div className="relative">
                {timelineSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <div key={index} className="relative pb-8 last:pb-0">
                            {index < timelineSteps.length - 1 && (
                                <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200" />
                            )}
                            <div className="flex items-start gap-4">
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${step.bgColor} flex items-center justify-center`}>
                                    <Icon className={`w-5 h-5 ${step.color}`} />
                                </div>
                                <div className="flex-1 pt-1">
                                    <h4 className="font-medium text-slate-900">{step.label}</h4>
                                    <p className="text-sm text-slate-600 mt-1">
                                        {step.date ? new Date(step.date).toLocaleDateString("en-GB", {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        }) : 'Date unavailable'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VisaApplicationsSection