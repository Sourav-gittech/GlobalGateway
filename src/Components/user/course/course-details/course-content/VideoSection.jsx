import React, { useState } from 'react'
import { Lock, Play, Video } from 'lucide-react';

const VideoSection = ({ isPurchased, course }) => {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <div className="mb-6">
            <h3 className="text-lg font-bold text-[#2C3E50] mb-3 flex items-center">
                <Video className="w-5 h-5 mr-2 text-[#FF5252]" />
                Video Lecture
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#FF5252] transition-colors">
                <div className="relative group">
                    {showVideo && (course.video.isFree || isPurchased) ? (
                        <div className="aspect-video bg-black">
                            <iframe
                                className="w-full h-full"
                                src={course.video.url}
                                title={course.video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div
                            className="relative aspect-video cursor-pointer"
                            onClick={() => {
                                if (course.video.isFree || isPurchased) {
                                    setShowVideo(true);
                                } else {
                                    alert('Please purchase the course to watch this video');
                                }
                            }}
                        >
                            <img
                                src={course.video.thumbnail}
                                alt={course.video.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                {course.video.isFree || isPurchased ? (
                                    <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                                        <Play className="w-10 h-10 text-[#FF5252] ml-1" fill="#FF5252" />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-xl">
                                        <Lock className="w-10 h-10 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            {course.video.isFree && (
                                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                                    Free Preview
                                </div>
                            )}
                            <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-md text-sm font-semibold">
                                {course.video.duration}
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-1">{course.video.title}</h4>
                    <p className="text-sm text-gray-600">Duration: {course.video.duration}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoSection