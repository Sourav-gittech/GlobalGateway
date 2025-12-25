import React, { forwardRef } from 'react';
import { CheckCircle, User, FileText, PlaneTakeoff } from 'lucide-react';

const ApproveLetter = forwardRef(({ visa, countryDetails, visaData }, ref) => {
  // Static mock data - replace these with your actual props later
  const mockVisa = {
    id: 'GG-2024-87654',
    approval_date: '2024-12-20',
    application_personal_info: {
      first_name: 'John',
      last_name: 'Doe',
      nationality: 'United States',
      date_of_birth: '1990-05-15'
    },
    application_passport: {
      passport_number: 'P12345678'
    }
  };

  const mockCountryDetails = {
    name: 'Thailand'
  };

  const mockVisaData = {
    visa_type: 'Tourist Visa',
    visa_category: 'Single Entry',
    duration_of_stay: '90 days',
    purpose_of_visit: 'Tourism and leisure activities'
  };

  // Use mock data for now (later switch to props)
  const visaInfo = visa || mockVisa;
  const country = countryDetails || mockCountryDetails;
  const visaDetails = visaData || mockVisaData;

  const fullName = `${visaInfo?.application_personal_info?.first_name || ''} ${visaInfo?.application_personal_info?.last_name || ''}`.trim();
  
  // Calculate visa validity dates
  const approvalDate = new Date(visaInfo?.approval_date);
  const issueDate = approvalDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  
  // Add 6 months for typical tourist visa validity
  const expiryDate = new Date(approvalDate);
  expiryDate.setMonth(expiryDate.getMonth() + 6);
  const expiryDateStr = expiryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div ref={ref} className="bg-white p-8 max-w-4xl mx-auto text-gray-900" style={{ fontFamily: 'Times New Roman, serif', fontSize: '11pt', lineHeight: '1.5' }}>
      
      {/* Header with Official Logo */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
        <div className="relative w-20 h-20 border-4 border-blue-900 rounded-full mx-auto mb-3 flex items-center justify-center bg-white">
          <PlaneTakeoff className="w-10 h-10 text-blue-900" strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-bold uppercase mb-1 text-gray-900" style={{ letterSpacing: '0.15em' }}>GLOBAL GATEWAY</h1>
        <p className="text-base font-semibold text-gray-800">International Visa Services</p>
        <p className="text-xs text-gray-600 mt-1">In partnership with {country?.name} Embassy</p>
      </div>

      {/* Document Title */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold uppercase text-gray-900 mb-2" style={{ letterSpacing: '0.1em' }}>VISA APPROVAL LETTER</h2>
        <div className="w-32 h-0.5 bg-gray-800 mx-auto"></div>
      </div>

      {/* Approval Notice */}
      <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-700">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-green-800 mb-1">VISA APPLICATION APPROVED</p>
            <p className="text-sm text-gray-800">
              This is to certify that the visa application has been approved by the consular officer and the visa has been issued as per the details mentioned below.
            </p>
          </div>
        </div>
      </div>

      {/* Reference Information */}
      <div className="mb-6 pb-4 border-b border-gray-300">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 font-semibold">Application Reference:</span>
            <p className="font-bold font-mono text-base">{visaInfo?.id}</p>
          </div>
          <div className="text-right">
            <span className="text-gray-600 font-semibold">Issue Date:</span>
            <p className="font-bold text-base">{issueDate}</p>
          </div>
        </div>
      </div>

      {/* Applicant Information */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase mb-3 text-gray-900 flex items-center gap-2">
          <User className="w-4 h-4" />
          Applicant Details
        </h3>
        <div className="bg-gray-50 p-4 rounded">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Full Name:</span>
              <p className="font-semibold text-gray-900">{fullName}</p>
            </div>
            <div>
              <span className="text-gray-600">Nationality:</span>
              <p className="font-semibold text-gray-900">{visaInfo?.application_personal_info?.nationality || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-600">Passport Number:</span>
              <p className="font-semibold text-gray-900 font-mono">{visaInfo?.application_passport?.passport_number}</p>
            </div>
            <div>
              <span className="text-gray-600">Date of Birth:</span>
              <p className="font-semibold text-gray-900">
                {new Date(visaInfo?.application_personal_info?.date_of_birth).toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visa Details */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase mb-3 text-gray-900 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Visa Information
        </h3>
        <div className="border-2 border-gray-800 rounded overflow-hidden">
          <div className="bg-gray-800 text-white px-4 py-2">
            <p className="font-bold text-lg">{visaDetails?.visa_type || 'Tourist Visa'}</p>
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Visa Type:</span>
                <p className="font-semibold text-gray-900">{visaDetails?.visa_type || 'Tourist Visa'}</p>
              </div>
              <div>
                <span className="text-gray-600">Visa Category:</span>
                <p className="font-semibold text-gray-900">{visaDetails?.visa_category || 'Single Entry'}</p>
              </div>
              <div>
                <span className="text-gray-600">Issue Date:</span>
                <p className="font-semibold text-gray-900">{issueDate}</p>
              </div>
              <div>
                <span className="text-gray-600">Expiry Date:</span>
                <p className="font-semibold text-gray-900">{expiryDateStr}</p>
              </div>
              <div>
                <span className="text-gray-600">Duration of Stay:</span>
                <p className="font-semibold text-gray-900">{visaDetails?.duration_of_stay || '90 days'}</p>
              </div>
              <div>
                <span className="text-gray-600">Number of Entries:</span>
                <p className="font-semibold text-gray-900">{visaDetails?.visa_category || 'Single'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purpose of Visit */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase mb-3 text-gray-900">Purpose of Visit</h3>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-sm text-gray-800">
            {visaDetails?.purpose_of_visit || 'Tourism and leisure activities'}
          </p>
        </div>
      </div>

      {/* Important Notes */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase mb-3 text-gray-900">Important Instructions</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
          <ul className="text-xs space-y-2 text-gray-800">
            <li>• This visa must be used before the expiry date mentioned above</li>
            <li>• The visa holder must comply with all immigration laws and regulations</li>
            <li>• This visa does not guarantee entry; final decision rests with immigration officers at port of entry</li>
            <li>• Carry this approval letter along with your passport during travel</li>
            <li>• The visa cannot be extended beyond the validity period</li>
            <li>• Any violation of visa conditions may result in deportation and future visa restrictions</li>
          </ul>
        </div>
      </div>

      {/* Required Documents for Travel */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase mb-3 text-gray-900">Documents Required for Travel</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span>Valid Passport</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span>Visa Approval Letter</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span>Return Flight Tickets</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span>Accommodation Proof</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span>Travel Insurance</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span>Financial Proof</span>
          </div>
        </div>
      </div>

      {/* Official Certification */}
      <div className="mb-6 p-4 bg-gray-100 border border-gray-400">
        <p className="text-xs text-center text-gray-700">
          This is an official visa approval document issued by Global Gateway in coordination with the {country?.name} Embassy. 
          Any tampering or alteration will render this document invalid and may result in legal action.
        </p>
      </div>

      {/* Signature Section with Official Seal */}
      <div className="mb-6 pt-4 border-t-2 border-gray-300">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="h-16 mb-2"></div>
            <div className="border-t border-gray-400 pt-1">
              <p className="text-xs font-semibold">Authorized Consular Officer</p>
              <p className="text-xs text-gray-600">Global Gateway - Visa Services</p>
              <p className="text-xs text-gray-600">{country?.name} Embassy</p>
            </div>
          </div>
          <div className="text-right">
            <div className="w-24 h-24 border-4 border-blue-900 rounded-full ml-auto mb-2 flex flex-col items-center justify-center bg-white">
              <PlaneTakeoff className="w-10 h-10 text-blue-900 mb-1" strokeWidth={2.5} />
              <span className="text-xs font-bold text-blue-900" style={{ fontSize: '8px' }}>GLOBAL</span>
              <span className="text-xs font-bold text-blue-900" style={{ fontSize: '8px' }}>GATEWAY</span>
            </div>
            <p className="text-xs text-gray-600 font-semibold">Official Seal</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-400 text-center">
        <p className="text-xs text-gray-600 mb-1">
          Global Gateway International - Authorized Visa Processing Partner
        </p>
        <p className="text-xs text-gray-600 mb-1">
          {country?.name} Embassy - Consular Section
        </p>
        <p className="text-xs text-gray-600 mb-1">
          For inquiries: visa.support@globalgateway.travel | Emergency: +1-800-VISA-HELP
        </p>
        <p className="text-xs text-gray-500 mt-2">
          This is an official document. Please retain for your records and travel purposes.
        </p>
        <p className="text-xs text-gray-400 font-mono mt-2">
          Document ID: {visaInfo?.id} | Issued: {issueDate}
        </p>
      </div>
    </div>
  );
});

ApproveLetter.displayName = 'ApproveLetter';

export default ApproveLetter;