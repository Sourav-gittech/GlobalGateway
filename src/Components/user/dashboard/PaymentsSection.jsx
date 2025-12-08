import React from 'react'
import { useVisaDetailsByApplicationId } from '../../../tanstack/query/getApplicationVisaDetails';
import { useCountryByApplicationId } from '../../../tanstack/query/getCountryByApplicationId';

const PaymentsSection = ({ transactions, getStatusColor, getStatusIcon }) => {
    // console.log('Transaction details', transactions);

    return (
        <div className="space-y-4">
            {transactions?.map(payment => {
                const { data: visaData, isLoading: isVisaDataLoading, error: isVisaDataError } = useVisaDetailsByApplicationId(payment?.application_id);
                const { data: countryDetails, isLoading: isCountryLoading, error: countryError } = useCountryByApplicationId(visaData?.application_id);

                // console.log('Visa data retrive', visaData);
                // console.log('country details', countryDetails);

                const paymentDate = payment?.payment_date ? new Date(payment.payment_date.replace(" at", "")) : null;

                const formattedDate = paymentDate ? paymentDate.toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }) : "N/A";

                return (
                    <div key={payment?.id} className="border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">{countryDetails?.name} {visaData?.visa_type}</h3>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{payment?.currency == 'Rupee' ? '₹' : ''} {payment?.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(payment?.status)}`}>
                                {getStatusIcon(payment?.status)}
                                {payment?.status?.charAt(0).toUpperCase() + payment?.status?.slice(1)}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-600">
                            <div><span className="font-medium text-slate-700">Transaction ID:</span> {payment?.transaction_details?.transaction_id}</div>
                            <div><span className="font-medium text-slate-700">Payment Mode:</span> {payment?.transaction_details?.payment_method == "card" ? "Card" : "UPI"}</div>
                            <div><span className="font-medium text-slate-700">Date:</span> {formattedDate}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default PaymentsSection