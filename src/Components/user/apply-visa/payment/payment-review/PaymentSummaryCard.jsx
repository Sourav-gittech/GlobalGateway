import React from 'react'
import TrustBadges from './TrustBadges'

const PaymentSummaryCard = ({ personalInfo, applicationFee, serviceFee, totalAmount, visaData, visaSpecification }) => {

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-4 sm:p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-300">
                    Payment Summary
                </h3>

                <div className="space-y-3 mb-5 pb-5 border-b border-gray-300">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Application Fee</span>
                        <span className="font-semibold text-gray-900">
                            ₹{applicationFee?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'}
                        </span>
                    </div>

                    {
                        serviceFee?.map(charge => {
                            return (
                                <div className="flex justify-between items-center" key={charge?.id}>
                                    <span className="text-sm text-gray-600">{charge?.charge_type ?? 'N/A'}</span>
                                    <span className="font-semibold text-gray-900">
                                        {charge?.amount == '0' ? 'Free' : `₹${Number(charge?.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` ?? 'N/A'}
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl">
                    <span className="text-base md:text-lg font-semibold text-white">Total Amount</span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                        ₹{Number(totalAmount)?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'}
                    </span>
                </div>

                {/* Application Info */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-5 lg:mb-5 border border-gray-300">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Application Details
                    </p>
                    <div className="space-y-2">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Applicant Email</p>
                            <p className="text-sm font-semibold text-gray-900 break-words">
                                {personalInfo?.email ?? 'N/A'}
                            </p>
                        </div>
                        <div className="pt-2 border-t border-gray-300">
                            <p className="text-xs text-gray-500 mb-1">Visa Type</p>
                            <p className="text-sm font-semibold text-gray-900">
                                {visaData?.visa_type ?? 'N/A'}
                            </p>
                        </div>
                        <div className="pt-2 border-t border-gray-300">
                            <p className="text-xs text-gray-500 mb-1">Processing Time</p>
                            <p className="text-sm font-semibold text-gray-900">
                                {visaSpecification?.visa_processing_time ?? 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Trust Badges - Only show on desktop */}
                <div className="hidden lg:block">
                    <TrustBadges />
                </div>
            </div>
        </>
    )
}

export default PaymentSummaryCard