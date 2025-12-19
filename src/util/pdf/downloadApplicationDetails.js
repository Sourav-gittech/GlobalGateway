import { formatDateTimeMeridian } from "../dateFormat/dateFormatConvertion"

const handleDownload = (application) => {
    const content = `
VISA APPLICATION DETAILS
========================

Application ID: ${application?.id??'N/A'}
Status: ${application?.status??'N/A'}
Submitted: ${formatDateTimeMeridian(application.submittedDate)}

PERSONAL INFORMATION
-------------------
Name: ${application?.personal?.firstName} ${application?.personal?.lastName}
Date of Birth: ${formatDateTimeMeridian(application.personal?.dateOfBirth)}
Gender: ${application?.personal?.gender}
Nationality: ${application?.personal?.nationality}
Email: ${application?.personal?.email}
Phone: ${application?.personal?.phone}
Marital Status: ${application?.personal?.maritalStatus}

ADDRESS
-------
${application?.address?.street}
${application?.address?.city}, ${application?.address?.state} ${application?.address?.zipCode}
${application?.address?.country}

PASSPORT INFORMATION
------------------
Passport Number: ${application?.passport?.number}
Issue Date: ${formatDateTimeMeridian(application?.passport?.issueDate)}
Expiry Date: ${formatDateTimeMeridian(application?.passport?.expiryDate)}
Issue Place: ${application?.passport?.issuePlace}

VISA INFORMATION
--------------
Type: ${application?.visa.type}
Purpose: ${application?.visa?.purpose}
Duration: ${application?.visa?.duration}
Entry Type: ${application?.visa?.entryType}
Travel Date: ${formatDateTimeMeridian(application?.visa?.travelDate)}
Return Date: ${formatDateTimeMeridian(application?.visa?.returnDate)}

EMPLOYMENT
---------
Status: ${application?.employment?.status}
Occupation: ${application?.employment?.occupation}
Company: ${application?.employment?.company}
Monthly Income: ${application?.employment?.monthlyIncome}

${application?.staus && appointmentDetails ? `
APPOINTMENT DETAILS
-----------------
Date: ${appointmentDetails?.date}
Time: ${appointmentDetails?.time}
Status: Approved
` : ''}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Application-${application.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};

export default handleDownload;