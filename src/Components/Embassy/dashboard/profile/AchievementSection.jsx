import React from 'react'

const AchievementSection = ({achievements}) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements & Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement, idx) => (
                    <div key={idx} className={`${achievement.bgColor} rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200`}>
                        <div className={`w-12 h-12 rounded-lg ${achievement.iconColor} flex items-center justify-center mb-4`}>
                            <achievement.icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AchievementSection