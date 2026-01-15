import React from 'react'
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { encodeBase64Url } from '../../../../util/encodeDecode/base64';
import StarRating from './StarRating';
import { formatDate } from '../../../../util/dateFormat/dateFormatConvertion';
import { Eye, Download, X, Award } from 'lucide-react';
import CourseCertificate from '../letter/CourseCertificate';
import { handleDownloadCertificate } from '../../../../util/pdfUtils.jsx';
import { useSelector } from 'react-redux';

const PurchaseCourseCard = ({ course, userId, certificates = [] }) => {
    const { userAuthData } = useSelector(state => state.checkAuth);
    const [showCertificateModal, setShowCertificateModal] = React.useState(false);
    const certificateRef = React.useRef(null);

    const certificate = certificates.find(c => c.course_id === course.id);
    const isCompleted = certificate?.certificate_available || certificate?.progress === '100';
    const progress = parseInt(certificate?.progress || '0');

    return (
        <div className="bg-white rounded-xl border border-slate-200 hover:border-red-300 hover:shadow-lg transition-all overflow-hidden group relative">
            <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative sm:w-72 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                    <img
                        src={course?.img_url}
                        alt={course?.course_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                            {course?.course_name ?? 'N/A'}
                        </h3>
                        {isCompleted && (
                            <div className="absolute top-6 right-6 flex items-center gap-2">
                                <button
                                    onClick={() => setShowCertificateModal(true)}
                                    className="p-1.5 rounded-full text-blue-600 hover:bg-blue-50 border border-blue-200 transition-colors flex-shrink-0 cursor-pointer"
                                    title="View Certificate"
                                    type="button"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDownloadCertificate(userAuthData, course, certificate)}
                                    className="p-1.5 rounded-full text-purple-600 hover:bg-purple-50 border border-purple-200 transition-colors flex-shrink-0 cursor-pointer"
                                    title="Download Certificate"
                                    type="button"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                            {course?.description ?? 'N/A'}
                        </p>

                        {!isCompleted && progress > 0 && (
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-semibold text-slate-500">Learning Progress</span>
                                    <span className="text-xs font-bold text-red-600">{progress}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className="bg-red-600 h-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {isCompleted && (
                            <div className="mb-4 flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg w-fit">
                                <Award className="w-4 h-4 text-emerald-600" />
                                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Course Completed</span>
                            </div>
                        )}

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
                            <span>
                                Purchased:{' '}
                                {formatDate(course?.purchase_date) ?? 'N/A'}
                            </span>
                            <span>•</span>
                            <span>Skill Level: {course?.skill_level ?? 'N/A'}</span>
                        </div>

                        {/* Star Rating */}
                        <div className="mb-4">
                            <StarRating courseId={course?.id} userId={userId} />
                        </div>
                    </div>

                    {/* Action */}
                    <div className="flex flex-wrap items-center gap-3 mt-auto">
                        <Link to={`/course/${encodeBase64Url(String(course?.id))}`}
                            className="flex-1 sm:flex-none bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <BookOpen className="w-4 h-4" />
                            {progress > 0 ? 'Continue Learning' : 'Start Learning'}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            {showCertificateModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Course Certificate</h2>
                                <p className="text-sm text-slate-500 font-medium">{course?.course_name}</p>
                            </div>
                            <button
                                onClick={() => setShowCertificateModal(false)}
                                className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all group"
                                type="button"
                            >
                                <X className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors cursor-pointer" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto bg-slate-100/50 p-8 glass-scrollbar">
                            <div className="shadow-2xl">
                                <CourseCertificate
                                    ref={certificateRef}
                                    userAuthData={userAuthData}
                                    course={course}
                                    certificateData={certificate}
                                />
                            </div>
                        </div>

                        <div className="px-8 py-5 border-t border-slate-100 bg-white flex justify-end gap-4">
                            <button
                                onClick={() => setShowCertificateModal(false)}
                                className="px-6 py-2.5 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => handleDownloadCertificate(userAuthData, course, certificate)}
                                className="px-8 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2 cursor-pointer"
                            >
                                <Download className="w-4 h-4" />
                                Download Certificate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PurchaseCourseCard