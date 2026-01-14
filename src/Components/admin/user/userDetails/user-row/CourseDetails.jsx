import React from 'react'
import { formatDate } from '../../../../../util/dateFormat/dateFormatConvertion';

const CourseDetails = ({ purchaseCourse }) => {

    return (
        <div className="space-y-2">
            {purchaseCourse?.map((course, idx) => {

                return (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-700/30">
                        <div>
                            <div className="text-sm text-white font-medium">{(course?.course_name?.length > 60 ? course?.course_name + '...' : course?.course_name) ?? 'N/A'}
                                <span className={`absolute text-[10px] ml-1 ${course?.skill_level=='Advanced'?'text-red-400':course?.skill_level=='Intermediate'?'text-orange-400':'text-blue-500'}`}>{course?.skill_level}</span>
                            </div>
                            <div className="text-xs text-slate-400">{formatDate(course?.order_created_at) ?? 'N/A'}</div>
                        </div>

                        <div className="text-right">
                            <div className="text-sm font-semibold text-white">
                                ₹{course?.pricing?.toLocaleString('en-IN')}
                            </div>
                            <div className="text-xs text-green-400 mt-3">{course?.skill_level}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CourseDetails