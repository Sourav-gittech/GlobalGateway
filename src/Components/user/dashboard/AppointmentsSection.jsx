import React, { useState, useRef } from 'react';
import { Calendar, Eye, X, Printer } from 'lucide-react';
import AppointmentLetter from '../../../Components/Embassy/dashboard/application-view/application-modal/AppointmentLetter';

const AppointmentsSection = ({ appointments = [], getStatusColor, getStatusIcon }) => {

  console.log('All appointments',appointments);
  
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const letterRef = useRef(null);

  const printStyles = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Arial, sans-serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    @page { size: A4; margin: 14mm; }
    .bg-white { background-color: white; }
    .bg-red-50 { background-color: #fef2f2; }
    .bg-gray-100 { background-color: #f3f4f6; }
    .text-gray-900 { color: #111827; }
    .text-gray-700 { color: #374151; }
    .text-gray-600 { color: #4b5563; }
    .text-gray-500 { color: #6b7280; }
    .text-red-800 { color: #991b1b; }
    .border-red-800 { border-color: #991b1b; }
    .border-gray-300 { border-color: #d1d5db; }
    .border-gray-400 { border-color: #9ca3af; }
    .border-red-200 { border-color: #fecaca; }
    .border-l-4 { border-left-width: 4px; }
    .border-b-2 { border-bottom-width: 2px; }
    .border-b { border-bottom-width: 1px; }
    .border-t { border-top-width: 1px; }
    .border { border-width: 1px; }
    .border-3 { border-width: 3px; }
    .rounded-full { border-radius: 9999px; }
    .uppercase { text-transform: uppercase; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .font-mono { font-family: monospace; }
    .italic { font-style: italic; }
    .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
    .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
    .text-xs { font-size: 0.75rem; line-height: 1rem; }
    .tracking-wide { letter-spacing: 0.025em; }
    .p-8 { padding: 2rem; }
    .p-4 { padding: 1rem; }
    .p-3 { padding: 0.75rem; }
    .pb-4 { padding-bottom: 1rem; }
    .pb-3 { padding-bottom: 0.75rem; }
    .pt-2 { padding-top: 0.5rem; }
    .pt-3 { padding-top: 0.75rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-3 { margin-bottom: 0.75rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-1 { margin-bottom: 0.25rem; }
    .ml-2 { margin-left: 0.5rem; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .max-w-3xl { max-width: 48rem; }
    .w-16 { width: 4rem; }
    .h-16 { height: 4rem; }
    .w-32 { width: 8rem; }
    .w-24 { width: 6rem; }
    .flex { display: flex; }
    .grid { display: grid; }
    .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .gap-x-4 { column-gap: 1rem; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .leading-relaxed { line-height: 1.625; }
  `;

  const handlePrint = (appointment) => {
    const printContainer = document.createElement('div');
    printContainer.style.position = 'absolute';
    printContainer.style.left = '-9999px';
    document.body.appendChild(printContainer);

    import('react-dom/client').then(({ createRoot }) => {
      const root = createRoot(printContainer);
      
      root.render(
        React.createElement(AppointmentLetter, {
          application: appointment.application,
          appointmentDetails: appointment.appointmentDetails
        })
      );

      setTimeout(() => {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Appointment Letter</title>
              <style>${printStyles}</style>
            </head>
            <body>${printContainer.innerHTML}</body>
          </html>
        `);
        doc.close();

        setTimeout(() => {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
          setTimeout(() => {
            document.body.removeChild(iframe);
            document.body.removeChild(printContainer);
            root.unmount();
          }, 100);
        }, 500);
      }, 300);
    });
  };

  const handleViewLetter = (appointment) => {
    setSelectedAppointment(appointment);
    setShowLetterModal(true);
  };

  const handleCloseModal = () => {
    setShowLetterModal(false);
    setSelectedAppointment(null);
  };

  if (appointments.length === 0) {
    return (
      <div className="py-12 px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
            <Calendar className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-gray-600 text-lg">No appointments available</p>
          <p className="text-gray-400 text-sm mt-1">
            Your upcoming appointments will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {appointment.country}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{appointment.title}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      <span className="font-semibold">Application #:</span>{' '}
                      {appointment.application?.application_id || 'N/A'}
                    </span>
                    <span className="text-gray-600">
                      <span className="font-semibold">Applied:</span>{' '}
                      {appointment.application?.applied_date || 'N/A'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Expected:</span>{' '}
                    {appointment.application?.expected_date || 'N/A'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleViewLetter(appointment)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="View Appointment Letter"
                >
                  <Eye className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => handlePrint(appointment)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Print Appointment Letter"
                >
                  <Printer className="w-5 h-5 text-gray-600" />
                </button>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {getStatusIcon(appointment.status)}
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showLetterModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Appointment Letter
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
              <AppointmentLetter
                ref={letterRef}
                application={selectedAppointment.application}
                appointmentDetails={selectedAppointment.appointmentDetails}
              />
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentsSection;