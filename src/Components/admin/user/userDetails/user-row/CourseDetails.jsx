import React from 'react'

const CourseDetails = ({user}) => {
    console.log(user);
    
    return (
        <div className="space-y-2">
            {user.coursePurchases.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-700/30">
                    <div>
                        <div className="text-sm text-white font-medium">{course?.name}</div>
                        <div className="text-xs text-slate-400">{course?.date}</div>
                    </div>

                    <div className="text-right">
                        <div className="text-sm font-semibold text-white">
                            ₹{course?.price?.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs text-green-400">{course?.progress}% Complete</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CourseDetails