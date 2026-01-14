import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';
import CourseCertificate from '../Components/user/dashboard/letter/CourseCertificate';
import toast from 'react-hot-toast';

export const handleDownloadCertificate = async (userAuthData, course, certificateData) => {
    console.log('Starting direct certificate download...', { courseId: course?.id });
    const toastId = toast.loading('Generating your certificate PDF...');

    let printContainer = null;
    try {
        printContainer = document.createElement('div');
        printContainer.id = 'pdf-gen-container';
        // Position it off-screen effectively
        printContainer.style.position = 'fixed';
        printContainer.style.left = '-2000px';
        printContainer.style.top = '0';
        printContainer.style.width = '1056px'; // Landscape A4 at 96 DPI
        printContainer.style.background = 'white';
        document.body.appendChild(printContainer);

        const { createRoot } = await import('react-dom/client');
        const root = createRoot(printContainer);

        root.render(
            <div style={{ width: '1056px', backgroundColor: 'white', padding: '0', margin: '0' }}>
                <CourseCertificate
                    userAuthData={userAuthData}
                    course={course}
                    certificateData={certificateData}
                />
            </div>
        );

        // Wait significantly for rendering and any images/fonts
        await new Promise(resolve => setTimeout(resolve, 2000));

        const canvas = await html2canvas(printContainer, {
            scale: 3, // Very high quality
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: 1056,
            height: 816,
            onclone: (clonedDoc) => {
                // Final check to handle any remaining oklab in clone
                const elements = clonedDoc.getElementsByTagName('*');
                for (let i = 0; i < elements.length; i++) {
                    const style = window.getComputedStyle(elements[i]);
                    if (style.color.includes('oklch') || style.backgroundColor.includes('oklch')) {
                        // Safe fallback for parsing errors
                        elements[i].style.color = 'black';
                    }
                }
            }
        });

        console.log('Direct download canvas ready');

        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [1056, 816]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, 1056, 816);
        const fileName = `Certificate_${course?.course_name?.replace(/\s+/g, '_')}.pdf`;
        pdf.save(fileName);

        // Cleanup
        root.unmount();
        document.body.removeChild(printContainer);
        toast.success('Certificate downloaded successfully!', { id: toastId });
    } catch (error) {
        console.error('Direct PDF download failed:', error);
        if (printContainer && printContainer.parentNode) {
            document.body.removeChild(printContainer);
        }
        toast.error('Failed to generate PDF. Please try again.', { id: toastId });
    }
};
