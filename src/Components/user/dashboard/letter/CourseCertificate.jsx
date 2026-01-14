import React, { forwardRef } from 'react';
import { Award, CheckCircle, Calendar, ShieldCheck, Globe, Star } from 'lucide-react';
import { formatDateDDMMYYYY } from '../../../../util/dateFormat/dateFormatConvertion';

const CourseCertificate = forwardRef(({ userAuthData, course, certificateData }, ref) => {
    const fullName = `${userAuthData?.first_name || ''} ${userAuthData?.last_name || ''}`.trim() || userAuthData?.name || 'N/A';
    const completionDate = certificateData?.certificate_reg_date
        ? formatDateDDMMYYYY(certificateData.certificate_reg_date)
        : formatDateDDMMYYYY(new Date());

    return (
        <div className="w-full h-auto flex items-center justify-center p-0">
            <div
                ref={ref}
                className="bg-white text-gray-900 relative overflow-hidden w-full max-w-[1056px] shadow-2xl"
                style={{
                    fontFamily: 'Georgia, serif',
                    lineHeight: '1.6',
                    aspectRatio: '1056/816',
                    background: 'linear-gradient(to bottom right, #ffffff, rgba(239, 246, 255, 0.3), #ffffff)',
                    border: '1px solid #e2e8f0'
                }}
            >
                {/* Outer Decorative Border - Gold */}
                <div className="absolute inset-0 border-[20px] border-double pointer-events-none"
                    style={{ borderColor: '#B8860B' }}></div>

                {/* Inner Premium Border - Navy */}
                <div className="absolute inset-[28px] border-2 border-blue-950 pointer-events-none"
                    style={{ borderColor: '#172554' }}></div>

                {/* Accent Border - Gold */}
                <div className="absolute inset-[36px] border pointer-events-none"
                    style={{ borderColor: 'rgba(202, 138, 4, 0.4)' }}></div>

                {/* Corner Ornaments - Elegant Gold */}
                <div className="absolute top-[36px] left-[36px] w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: 'linear-gradient(to right, #ca8a04, transparent)' }}></div>
                    <div className="absolute top-0 left-0 h-full w-0.5" style={{ background: 'linear-gradient(to bottom, #ca8a04, transparent)' }}></div>
                    <Star className="absolute top-0 left-0 w-4 h-4 text-yellow-600 fill-yellow-600" style={{ color: '#ca8a04' }} />
                </div>
                <div className="absolute top-[36px] right-[36px] w-16 h-16">
                    <div className="absolute top-0 right-0 w-full h-0.5" style={{ background: 'linear-gradient(to left, #ca8a04, transparent)' }}></div>
                    <div className="absolute top-0 right-0 h-full w-0.5" style={{ background: 'linear-gradient(to bottom, #ca8a04, transparent)' }}></div>
                    <Star className="absolute top-0 right-0 w-4 h-4 text-yellow-600 fill-yellow-600" style={{ color: '#ca8a04' }} />
                </div>
                <div className="absolute bottom-[36px] left-[36px] w-16 h-16">
                    <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ background: 'linear-gradient(to right, #ca8a04, transparent)' }}></div>
                    <div className="absolute bottom-0 left-0 h-full w-0.5" style={{ background: 'linear-gradient(to top, #ca8a04, transparent)' }}></div>
                    <Star className="absolute bottom-0 left-0 w-4 h-4 text-yellow-600 fill-yellow-600" style={{ color: '#ca8a04' }} />
                </div>
                <div className="absolute bottom-[36px] right-[36px] w-16 h-16">
                    <div className="absolute bottom-0 right-0 w-full h-0.5" style={{ background: 'linear-gradient(to left, #ca8a04, transparent)' }}></div>
                    <div className="absolute bottom-0 right-0 h-full w-0.5" style={{ background: 'linear-gradient(to top, #ca8a04, transparent)' }}></div>
                    <Star className="absolute bottom-0 right-0 w-4 h-4 text-yellow-600 fill-yellow-600" style={{ color: '#ca8a04' }} />
                </div>

                {/* Subtle Background Watermark */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ opacity: 0.015 }}>
                    <Globe className="w-[650px] h-[650px] text-blue-950" style={{ color: '#172554' }} />
                </div>

                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #1e3a8a 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                        opacity: 0.02
                    }}></div>

                {/* Content Container */}
                <div className="relative p-16 h-full flex flex-col justify-between">

                    {/* Header Section */}
                    <div className="text-center">
                        {/* Premium Logo & Emblem */}
                        <div className="flex justify-center items-center gap-4 mb-7">
                            <div className="relative">
                                <div className="w-24 h-24 border-4 border-yellow-600 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 shadow-xl relative"
                                    style={{ borderColor: '#ca8a04', background: 'linear-gradient(to bottom right, #172554, #1e3a8a, #172554)' }}>
                                    <Globe className="w-12 h-12 text-yellow-500" strokeWidth={2.5} style={{ color: '#eab308' }} />
                                    <div className="absolute inset-0 rounded-full border-2 m-1" style={{ borderColor: 'rgba(250, 204, 21, 0.3)' }}></div>
                                </div>
                                {/* Laurel Accent */}
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full" style={{ backgroundColor: '#ca8a04' }}></div>
                                    <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full" style={{ backgroundColor: '#ca8a04' }}></div>
                                    <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full" style={{ backgroundColor: '#ca8a04' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <h1 className="text-2xl font-bold text-blue-950 uppercase tracking-[0.3em] mb-2" style={{ fontFamily: 'Palatino, serif', color: '#172554' }}>
                                Global Gateway
                            </h1>
                            <p className="text-xs text-yellow-700 uppercase tracking-[0.5em] font-semibold" style={{ color: '#a16207' }}>
                                International Services
                            </p>
                        </div>

                        {/* Elegant Divider */}
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, #ca8a04)' }}></div>
                            <div className="w-2 h-2 bg-yellow-600 rounded-full" style={{ backgroundColor: '#ca8a04' }}></div>
                            <div className="w-16 h-px" style={{ background: 'linear-gradient(to left, transparent, #ca8a04)' }}></div>
                        </div>

                        <h2 className="text-5xl font-serif font-bold text-blue-950 mb-2 uppercase tracking-[0.25em]" style={{ fontFamily: 'Palatino, serif', color: '#172554' }}>
                            Certificate
                        </h2>
                        <p className="text-xl font-light text-gray-600 uppercase tracking-[0.4em] mb-4" style={{ color: '#4b5563' }}>
                            of Completion
                        </p>

                        {/* Premium Underline */}
                        <div className="flex justify-center items-center gap-2">
                            <div className="w-24 h-px" style={{ background: 'linear-gradient(to right, transparent, #ca8a04)' }}></div>
                            <Award className="w-4 h-4 text-yellow-600" style={{ color: '#ca8a04' }} />
                            <div className="w-24 h-px" style={{ background: 'linear-gradient(to left, transparent, #ca8a04)' }}></div>
                        </div>
                    </div>

                    {/* Certificate Content */}
                    <div className="text-center flex-1 flex flex-col justify-center py-10">
                        <p className="text-2xl text-gray-600 mb-6" style={{ fontFamily: 'Palatino, serif', fontStyle: 'italic', color: '#4b5563' }}>
                            This certifies that
                        </p>

                        <div className="mb-8">
                            <h3 className="text-5xl font-bold text-blue-950 mb-3 capitalize" style={{ fontFamily: 'Palatino, serif', color: '#172554' }}>
                                {fullName}
                            </h3>
                            <div className="flex justify-center items-center gap-3 mt-3">
                                <div className="w-20 h-px" style={{ background: 'linear-gradient(to right, transparent, #9ca3af)' }}></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full" style={{ backgroundColor: '#9ca3af' }}></div>
                                <div className="w-20 h-px" style={{ background: 'linear-gradient(to left, transparent, #9ca3af)' }}></div>
                            </div>
                        </div>

                        <p className="text-2xl text-gray-600 mb-8" style={{ fontFamily: 'Palatino, serif', fontStyle: 'italic', color: '#4b5563' }}>
                            has successfully completed
                        </p>

                        <div className="py-6 px-8 mb-8 border-t border-b"
                            style={{
                                background: 'linear-gradient(to right, rgba(23, 37, 84, 0.05), rgba(30, 58, 138, 0.1), rgba(23, 37, 84, 0.05))',
                                borderColor: 'rgba(202, 138, 4, 0.2)'
                            }}>
                            <h4 className="text-4xl font-bold text-blue-900 uppercase tracking-wider leading-relaxed" style={{ fontFamily: 'Palatino, serif', color: '#1e3a8a' }}>
                                {course?.course_name || 'N/A'}
                            </h4>
                        </div>

                        <p className="text-lg text-gray-700 max-w-2xl mx-auto px-4 leading-relaxed" style={{ fontFamily: 'Palatino, serif', color: '#374151' }}>
                            demonstrating exceptional commitment and proficiency in all course modules,
                            assessments, and practical requirements established by Global Gateway International
                        </p>
                    </div>

                    {/* Verification Details - Premium Layout */}
                    <div className="py-8 mb-8" style={{ background: 'linear-gradient(to right, transparent, rgba(23, 37, 84, 0.05), transparent)' }}>
                        <div className="grid grid-cols-2 gap-12 max-w-4xl mx-auto px-4">
                            <div className="text-left flex items-start gap-4">
                                <div className="p-3 rounded-lg shadow-lg flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, #172554, #1e3a8a)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                    <Calendar className="w-6 h-6 text-yellow-400" strokeWidth={2} style={{ color: '#facc15' }} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs uppercase text-yellow-700 font-bold tracking-[0.2em] mb-1" style={{ color: '#a16207' }}>
                                        Completion Date
                                    </p>
                                    <p className="text-xl font-bold text-blue-950 truncate" style={{ fontFamily: 'Palatino, serif', color: '#172554' }}>
                                        {completionDate}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right flex items-start justify-end gap-4">
                                <div className="text-right min-w-0">
                                    <p className="text-xs uppercase text-yellow-700 font-bold tracking-[0.2em] mb-1" style={{ color: '#a16207' }}>
                                        Certificate ID
                                    </p>
                                    <p className="text-xl font-bold text-blue-950 font-mono truncate" style={{ color: '#172554' }}>
                                        GG-{certificateData?.id?.substring(0, 8).toUpperCase() || 'OFFICIAL'}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg shadow-lg flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, #172554, #1e3a8a)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                    <ShieldCheck className="w-6 h-6 text-yellow-400" strokeWidth={2} style={{ color: '#facc15' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Premium Accreditation Badges */}
                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        <div className="flex items-center gap-2 px-5 py-2 rounded-full border shadow-sm" style={{ background: 'linear-gradient(to right, #ecfdf5, #f0fdf4)', borderColor: '#a7f3d0' }}>
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={2.5} style={{ color: '#059669' }} />
                            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider whitespace-nowrap" style={{ color: '#065f46' }}>
                                Verified Curriculum
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-5 py-2 rounded-full border shadow-sm" style={{ background: 'linear-gradient(to right, #eff6ff, #eef2ff)', borderColor: '#bfdbfe' }}>
                            <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={2.5} style={{ color: '#2563eb' }} />
                            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider whitespace-nowrap" style={{ color: '#1e40af' }}>
                                Global Recognition
                            </span>
                        </div>
                    </div>

                    {/* Signature Section - Premium */}
                    <div className="grid grid-cols-3 gap-8 items-end border-t pt-8" style={{ borderTopColor: 'rgba(202, 138, 4, 0.2)' }}>
                        <div className="text-center">
                            <div className="h-20 flex items-center justify-center mb-3">
                                <p className="text-3xl text-blue-900 pointer-events-none select-none" style={{ fontFamily: 'Brush Script MT, cursive', color: '#1e3a8a' }}>
                                    Global Gateway
                                </p>
                            </div>
                            <div className="border-t-2 border-gray-300 pt-2" style={{ borderTopColor: '#d1d5db' }}>
                                <p className="text-[10px] font-bold uppercase text-gray-700 tracking-wider" style={{ color: '#374151' }}>
                                    Training Director
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="w-28 h-28 border-4 border-yellow-600 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 shadow-xl"
                                    style={{ borderColor: '#ca8a04', background: 'linear-gradient(to bottom right, #172554, #1e3a8a, #172554)' }}>
                                    <div className="text-xs font-bold text-yellow-400 leading-tight tracking-wider" style={{ color: '#facc15' }}>GG</div>
                                    <ShieldCheck className="w-8 h-8 text-yellow-400 my-1" strokeWidth={2.5} style={{ color: '#facc15' }} />
                                    <div className="text-[8px] font-bold text-yellow-400 uppercase tracking-wide" style={{ color: '#facc15' }}>Certified</div>
                                </div>
                                {/* Seal Accent */}
                                <div className="absolute inset-0 rounded-full border-2 m-1" style={{ borderColor: 'rgba(250, 204, 21, 0.3)' }}></div>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="h-20 flex items-center justify-center mb-3">
                                <p className="text-3xl text-blue-900 pointer-events-none select-none" style={{ fontFamily: 'Brush Script MT, cursive', color: '#1e3a8a' }}>
                                    Consular Services
                                </p>
                            </div>
                            <div className="border-t-2 border-gray-300 pt-2" style={{ borderTopColor: '#d1d5db' }}>
                                <p className="text-[10px] font-bold uppercase text-gray-700 tracking-wider" style={{ color: '#374151' }}>
                                    Authorized Signature
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Premium Footer */}
                    <div className="mt-14 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-20 h-px" style={{ background: 'linear-gradient(to right, transparent, #d1d5db)' }}></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full" style={{ backgroundColor: '#9ca3af' }}></div>
                            <div className="w-20 h-px" style={{ background: 'linear-gradient(to left, transparent, #d1d5db)' }}></div>
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-light" style={{ color: '#6b7280' }}>
                            Global Gateway International
                        </p>
                        <p className="text-[9px] text-gray-400 uppercase tracking-[0.25em] font-light mt-0.5" style={{ color: '#9ca3af' }}>
                            Professional Visa & Immigration Services
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

CourseCertificate.displayName = 'CourseCertificate';

export default CourseCertificate;