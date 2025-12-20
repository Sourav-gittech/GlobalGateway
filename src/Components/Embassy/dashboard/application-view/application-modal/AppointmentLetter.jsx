import React, { forwardRef } from 'react';

const AppointmentLetter = forwardRef(({ application, appointmentDetails }, ref) => {
    const reasonLabels = {
        physical_verification: 'Physical Verification',
        biometric_test: 'Biometric Collection',
        document_verification: 'Document Verification',
        interview: 'Consular Interview',
        additional_information: 'Additional Information',
        medical_examination: 'Medical Examination'
    };

    const location = appointmentDetails?.location || {
        name: 'U.S. Embassy Consular Section',
        address: '24 Ferozeshah Road, New Delhi 110001',
        phone: '+91-11-2419-8000'
    };

    return (
        <div ref={ref} className="bg-white p-8 max-w-3xl mx-auto text-gray-900" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11pt', lineHeight: '1.4' }}>
            {/* Header */}
            <div className="text-center mb-6 pb-4 border-b-2 border-red-800">
                <div className="w-16 h-16 border-3 border-red-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <div className="text-red-800 font-bold text-xs">US</div>
                </div>
                <h1 className="text-xl font-bold uppercase tracking-wide mb-1">Appointment Letter</h1>
                <p className="text-sm text-gray-700">U.S. Embassy - Consular Section</p>
            </div>

            {/* Reference Number */}
            <div className="mb-4 pb-3 border-b border-gray-300">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-xs text-gray-600 uppercase">Appointment ID:</span>
                        <span className="ml-2 font-bold font-mono">{application?.application_id || 'N/A'}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-600">Date Issued: </span>
                        <span className="text-xs">{new Date().toLocaleDateString('en-US')}</span>
                    </div>
                </div>
            </div>

            {/* Applicant Details */}
            <div className="mb-4">
                <h2 className="text-sm font-bold uppercase mb-2 text-red-800">Applicant Details</h2>
                <div className="text-sm">
                    <div className="flex mb-1">
                        <span className="w-32 text-gray-600">Name:</span>
                        <span className="font-semibold">{application?.user_name || 'N/A'}</span>
                    </div>
                    <div className="flex mb-1">
                        <span className="w-32 text-gray-600">Passport No:</span>
                        <span className="font-semibold">{application?.passport_number || 'N/A'}</span>
                    </div>
                    <div className="flex mb-1">
                        <span className="w-32 text-gray-600">Email:</span>
                        <span>{application?.user_email || 'N/A'}</span>
                    </div>
                    <div className="flex">
                        <span className="w-32 text-gray-600">Phone:</span>
                        <span>{application?.user_phone || 'N/A'}</span>
                    </div>
                </div>
            </div>

            {/* Appointment Details */}
            <div className="mb-4 bg-red-50 border-l-4 border-red-800 p-4">
                <h2 className="text-sm font-bold uppercase mb-2 text-red-800">Appointment Schedule</h2>
                <div className="text-sm">
                    <div className="flex mb-1">
                        <span className="w-24 text-gray-700 font-semibold">Date:</span>
                        <span className="font-bold">{appointmentDetails?.date || 'TBD'}</span>
                    </div>
                    <div className="flex mb-2">
                        <span className="w-24 text-gray-700 font-semibold">Time:</span>
                        <span className="font-bold">{appointmentDetails?.time || 'TBD'}</span>
                    </div>
                    <div className="pt-2 border-t border-red-200">
                        <p className="font-semibold mb-1">{location.name}</p>
                        <p className="text-xs">{location.address}</p>
                        <p className="text-xs">Tel: {location.phone}</p>
                    </div>
                </div>
            </div>

            {/* Purpose */}
            {appointmentDetails?.reasons?.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-sm font-bold uppercase mb-2 text-red-800">Purpose</h2>
                    <div className="text-sm">
                        {appointmentDetails.reasons.map((reasonId, index) => (
                            <div key={reasonId} className="mb-1">
                                • {reasonLabels[reasonId] || reasonId}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Instructions */}
            <div className="mb-4">
                <h2 className="text-sm font-bold uppercase mb-2 text-red-800">Important Instructions</h2>
                <div className="text-xs leading-relaxed">
                    <p className="mb-1">• Arrive 15 minutes before your appointment time</p>
                    <p className="mb-1">• Bring this printed letter and valid passport</p>
                    <p className="mb-1">• Carry all original documents from your application</p>
                    <p className="mb-1">• Electronic devices are not permitted inside</p>
                    <p className="mb-1">• Professional attire required</p>
                </div>
            </div>

            {/* Documents Required */}
            <div className="mb-4">
                <h2 className="text-sm font-bold uppercase mb-2 text-red-800">Required Documents</h2>
                <div className="text-xs grid grid-cols-2 gap-x-4">
                    <div>• Appointment letter (printed)</div>
                    <div>• Valid passport (original)</div>
                    <div>• DS-160 confirmation</div>
                    <div>• Visa fee receipt</div>
                    <div>• 2 passport photos</div>
                    <div>• Supporting documents</div>
                </div>
            </div>

            {/* Notice */}
            <div className="mb-4 p-3 bg-gray-100 border border-gray-400 text-xs italic">
                Appointment does not guarantee visa approval. Your application will be reviewed by a consular officer per U.S. immigration law.
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-gray-400 text-xs text-center text-gray-600">
                <p className="mb-1">For inquiries: consularsupport@state.gov | {location.phone}</p>
                <p className="text-xs text-gray-500">This is an official document. Please present it at your appointment.</p>
            </div>
        </div>
    );
});

AppointmentLetter.displayName = 'AppointmentLetter';

export default AppointmentLetter;