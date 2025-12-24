import React, { useState } from 'react'
import { useFullCountryDetails } from '../../../tanstack/query/getCountryDetails'
import { useVisaDetailsByApplicationId } from '../../../tanstack/query/getApplicationVisaDetails';
import { useCountryWiseVisaDetails } from '../../../tanstack/query/getCountryWiseVisaDetails';
import { calculateProcessingRange } from '../../../functions/calculateExpectedDate';
import { CheckCircle, XCircle, X, Clock, Send, History } from 'lucide-react';
import RejectionModal from './modal/RejectModal';
import ApprovalTimeline from './modal/ApproveModal';

const VisaApplicationsSection = ({ visaApplications, getStatusColor, getStatusIcon }) => {
    const [selectedVisa, setSelectedVisa] = useState(null);
    const [modalType, setModalType] = useState(null);

    const openModal = (visa, type) => {
        setSelectedVisa(visa);
        setModalType(type);
    };

    const closeModal = () => {
        setSelectedVisa(null);
        setModalType(null);
    };

    if (visaApplications.length === 0) {
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

                    // Normalize status to lowercase for comparison
                    const normalizedStatus = visa.status?.toLowerCase();

                    return (
                        <div key={visa?.id} className="border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">{countryDetails?.name}</h3>
                                    <p className="text-slate-600 text-sm">{visaData?.visa_type}</p>
                                </div>
                                <div className="flex items-center gap-2">

                                    {normalizedStatus === 'approved' && (
                                        <button
                                            onClick={() => openModal(visa, 'approved')}
                                            className="p-1.5 rounded-full text-green-600 hover:bg-green-50 border border-green-200 transition-colors flex-shrink-0"
                                            title="View Timeline"
                                            type="button"
                                        >
                                            <History className="w-4 h-4" />
                                        </button>
                                    )}

                                    {normalizedStatus === 'rejected' && (
                                        <button
                                            onClick={() => openModal(visa, 'rejected')}
                                            className="p-1.5 rounded-full text-red-600 hover:bg-red-50 border border-red-200 transition-colors flex-shrink-0"
                                            title="View Details"
                                            type="button"
                                        >
                                            <History className="w-4 h-4" />
                                        </button>
                                    )}

                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(visa.status)}`}>
                                        {getStatusIcon(visa.status)}
                                        {visa.status?.charAt(0).toUpperCase() + visa.status?.slice(1)}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                                    <div><span className="font-medium text-slate-700">Application #:</span> {visa?.id}</div>
                                    {visa.applied_at && <div><span className="font-medium text-slate-700">Applied:</span> {new Date(visa.applied_at).toLocaleDateString("en-GB")}</div>}
                                    {normalizedStatus === 'processing' && expectedDate && <div><span className="font-medium text-slate-700">Expected:</span> {new Date(expectedDate?.to).toLocaleDateString("en-GB")}</div>}
                                    {visa.approval_date && <div><span className="font-medium text-slate-700">Approved:</span> {new Date(visa.approval_date).toLocaleDateString("en-GB")}</div>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Modal */}
            {selectedVisa && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]"
                    onClick={closeModal}
                    style={{
                        animation: 'fadeIn 0.2s ease-out'
                    }}
                >
                    <div
                        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 animate-[slideUp_0.3s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            animation: 'slideUp 0.3s ease-out'
                        }}
                    >
                        <div className="sticky top-0 bg-white/60 backdrop-blur-xl border-b border-white/30 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-slate-900">
                                {modalType === 'approved' ? 'Application Timeline' : 'Rejection Details'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="p-1.5 rounded-full hover:bg-white/50 transition-all duration-200 hover:scale-110"
                                type="button"
                            >
                                <X className="w-5 h-5 text-slate-700" />
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

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            }`}</style>
        </>
    )
}

export default VisaApplicationsSection
