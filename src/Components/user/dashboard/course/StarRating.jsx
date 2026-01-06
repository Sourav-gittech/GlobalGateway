import { Check, Star } from 'lucide-react';
import React, { useState } from 'react'

const StarRating = ({ courseId, submittedRatings,setSubmittedRatings }) => {

    const [tempRatings, setTempRatings] = useState({});
    const [hoveredRatings, setHoveredRatings] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState({});

    const isSubmitted = submittedRatings[courseId] !== undefined;
    const submittedRating = submittedRatings[courseId] || 0;
    const currentTempRating = tempRatings[courseId] || 0;
    const hoverRating = hoveredRatings[courseId] || 0;

    const displayRating = isSubmitted ? submittedRating : (hoverRating || currentTempRating);

    const handleStarClick = (courseId, rating) => {
        // Only allow rating if not already submitted
        if (!submittedRatings[courseId]) {
            setTempRatings(prev => ({
                ...prev,
                [courseId]: rating
            }));
        }
    };

    const handleStarHover = (courseId, rating) => {
        // Only show hover effect if not already submitted
        if (!submittedRatings[courseId]) {
            setHoveredRatings(prev => ({
                ...prev,
                [courseId]: rating
            }));
        }
    };

    const handleStarLeave = (courseId) => {
        setHoveredRatings(prev => ({
            ...prev,
            [courseId]: 0
        }));
    };

    const handleSubmitRating = (courseId) => {
        const rating = tempRatings[courseId];
        if (rating && rating > 0) {
            // Save the rating permanently
            setSubmittedRatings(prev => ({
                ...prev,
                [courseId]: rating
            }));

            // Show success message
            setShowSuccessMessage(prev => ({
                ...prev,
                [courseId]: true
            }));

            // Here you would typically call an API to save the rating
            console.log(`Course ${courseId} rating submitted: ${rating} stars`);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccessMessage(prev => ({
                    ...prev,
                    [courseId]: false
                }));
            }, 3000);
        }
    };

    return (
        <div className="flex items-center gap-4 flex-wrap">
            {/* Stars and Rating Display */}
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => handleStarClick(courseId, star)}
                        onMouseEnter={() => handleStarHover(courseId, star)}
                        onMouseLeave={() => handleStarLeave(courseId)}
                        disabled={isSubmitted}
                        className={`transition-all transform focus:outline-none ${isSubmitted
                            ? 'cursor-not-allowed'
                            : 'hover:scale-110 cursor-pointer'
                            }`}
                    >
                        <Star
                            className={`w-5 h-5 transition-colors ${star <= displayRating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-slate-300'
                                }`}
                        />
                    </button>
                ))}
                <span className="text-sm text-slate-600 ml-2">
                    {isSubmitted
                        ? `${submittedRating}/5`
                        : currentTempRating > 0
                            ? `${currentTempRating}/5`
                            : 'Rate this course'}
                </span>
            </div>

            {/* Submit Text Link or Success Message */}
            {!isSubmitted && currentTempRating > 0 && (
                <button
                    onClick={() => handleSubmitRating(courseId)}
                    className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors underline"
                >
                    Submit
                </button>
            )}

            {isSubmitted && showSuccessMessage[courseId] && (
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Submitted!
                </div>
            )}

            {isSubmitted && !showSuccessMessage[courseId] && (
                <span className="text-slate-400 text-sm">
                    Submitted
                </span>
            )}
        </div>
    );
};

export default StarRating