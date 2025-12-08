import React from 'react'

const CourseDetails = ({ course }) => {
    return (
        <div className="text-xs p-2 rounded bg-slate-700/30">
            <div className="flex justify-between items-center mb-1">
                <span className="text-white font-medium">{course.name}</span>
                <span className="text-white">₹{course.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="text-slate-400">{course.date} • {course.progress}% Complete</div>
        </div>
    )
}

export default CourseDetails