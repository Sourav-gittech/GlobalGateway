import React from 'react'
import { useFullCountryDetails } from '../../../tanstack/query/getCountryDetails'
import { useVisaDetailsByApplicationId } from '../../../tanstack/query/getApplicationVisaDetails';
import { useCountryWiseVisaDetails } from '../../../tanstack/query/getCountryWiseVisaDetails';
import { calculateProcessingRange } from '../../../functions/calculateExpectedDate';

const VisaApplicationsSection = ({ visaApplications, getStatusColor, getStatusIcon }) => {

    return (
        <div className="space-y-4">
            {visaApplications?.map(visa => {
                const { data: visaData, isLoading: isVisaDataLoading, error: isVisaDataError } = useVisaDetailsByApplicationId(visa?.id);
                const { data: countryWiseVisaDetails, isLoading: isCountryWiseVisaLoading, error: countryWiseVisaError } = useCountryWiseVisaDetails(visa?.country_id);
                const { data: countryDetails, isLoading: isCountryLoading, error: countryError } = useFullCountryDetails(visa?.country_id);
                const countrySpecificVisaDetails = countryWiseVisaDetails?.find(visaType => visaType?.visa_type == visaData?.visa_type);

                // console.log('visa', visaData);
                // console.log('country visa details', countrySpecificVisaDetails);
                // console.log('country', countryDetails);
                // console.log('application', visa);

                const expectedDate = calculateProcessingRange(visa.applied_at, countrySpecificVisaDetails?.visa_details[0]?.visa_processing_time);

                return (
                    <div key={visa?.id} className="border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">{countryDetails?.name}</h3>
                                <p className="text-slate-600 text-sm">{visaData?.visa_type}</p>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(visa.status)}`}>
                                {getStatusIcon(visa.status)}
                                {visa.status.charAt(0).toUpperCase() + visa.status.slice(1)}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                            <div><span className="font-medium text-slate-700">Application #:</span> {visa?.id}</div>
                            {visa.applied_at && <div><span className="font-medium text-slate-700">Applied:</span> {new Date(visa.applied_at).toLocaleDateString("en-GB")}</div>}
                            {visa.status === 'processing' && <div><span className="font-medium text-slate-700">Expected:</span> {new Date(expectedDate?.to).toLocaleDateString("en-GB")}</div>}

                            {visa.approval_date && <div><span className="font-medium text-slate-700">Approved:</span> {new Date(visa.approval_date).toLocaleDateString("en-GB")}</div>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default VisaApplicationsSection