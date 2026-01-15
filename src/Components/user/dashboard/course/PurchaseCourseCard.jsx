import React from 'react'
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { encodeBase64Url } from '../../../../util/encodeDecode/base64';
import StarRating from './StarRating';
import { formatDate } from '../../../../util/dateFormat/dateFormatConvertion';

const PurchaseCourseCard = ({ course, userId }) => {

    return (
        <div className="bg-white rounded-xl border border-slate-200 hover:border-red-300 hover:shadow-lg transition-all overflow-hidden group"
        >
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
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                            {course?.description ?? 'N/A'}
                        </p>

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
                    <div>
                        <Link to={`/course/${encodeBase64Url(String(course?.id))}`}
                            className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <BookOpen className="w-4 h-4" />
                            Continue Learning
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseCourseCard