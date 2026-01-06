import React, { useState } from 'react';
import { BookOpen, Clock, Video, FileText, ArrowRight, Star, Check } from 'lucide-react';

const PurchasedCoursesSection = ({ purchasedCourses = [], onNavigate }) => {
  // State to manage ratings for each course
  const [tempRatings, setTempRatings] = useState({});
  const [hoveredRatings, setHoveredRatings] = useState({});
  const [submittedRatings, setSubmittedRatings] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState({});

  // Mock purchased courses data (replace with Redux data later)
  const mockPurchasedCourses = [
    {
      id: 1,
      course_name: "Study Visa Consultation",
      description: "Complete guidance for international study visa applications",
      img_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
      purchaseDate: "2024-12-15",
      lastAccessed: "2 days ago",
      userRating: null, // null means not rated yet
      hasSubmittedRating: false
    },
    {
      id: 4,
      course_name: "Work Permit Assistance",
      description: "Expert guidance for work visa applications and employment authorization",
      img_url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
      purchaseDate: "2024-11-20",
      lastAccessed: "1 week ago",
      userRating: 4,
      hasSubmittedRating: true
    },
    {
      id: 2,
      course_name: "Language Proficiency Training",
      description: "IELTS, TOEFL, and PTE preparation with certified trainers",
      img_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",
      purchaseDate: "2025-01-02",
      lastAccessed: "Today",
      userRating: null,
      hasSubmittedRating: false
    }
  ];

  const coursesToDisplay =
    purchasedCourses.length > 0 ? purchasedCourses : mockPurchasedCourses;

  // Initialize submitted ratings from course data
  React.useEffect(() => {
    const initialSubmitted = {};
    coursesToDisplay.forEach(course => {
      if (course.hasSubmittedRating && course.userRating) {
        initialSubmitted[course.id] = course.userRating;
      }
    });
    setSubmittedRatings(initialSubmitted);
  }, []);

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

  const handleGoToCourse = (courseId) => {
    if (onNavigate) {
      onNavigate(`/coaching/course/${courseId}`);
    }
  };

  const handleBrowseCourses = () => {
    if (onNavigate) {
      onNavigate('/coaching/course');
    }
  };

  const StarRating = ({ courseId }) => {
    const isSubmitted = submittedRatings[courseId] !== undefined;
    const submittedRating = submittedRatings[courseId] || 0;
    const currentTempRating = tempRatings[courseId] || 0;
    const hoverRating = hoveredRatings[courseId] || 0;
    
    const displayRating = isSubmitted 
      ? submittedRating 
      : (hoverRating || currentTempRating);

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
              className={`transition-all transform focus:outline-none ${
                isSubmitted 
                  ? 'cursor-not-allowed' 
                  : 'hover:scale-110 cursor-pointer'
              }`}
            >
              <Star
                className={`w-5 h-5 transition-colors ${
                  star <= displayRating
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

  if (coursesToDisplay.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mb-6">
          <BookOpen className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-3">
          No Courses Purchased Yet
        </h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          Start your learning journey by purchasing courses from our catalog
        </p>
        <button
          onClick={handleBrowseCourses}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Browse Courses
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Courses</h2>
          <p className="text-slate-600 mt-1">
            Access your free lectures and course materials
          </p>
        </div>
        <button
          onClick={handleBrowseCourses}
          className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-2 transition-colors"
        >
          Browse More Courses
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Course Cards */}
      <div className="grid gap-6">
        {coursesToDisplay.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl border border-slate-200 hover:border-red-300 hover:shadow-lg transition-all overflow-hidden group"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative sm:w-72 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                <img
                  src={course.img_url}
                  alt={course.course_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                    {course.course_name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
                    <span>
                      Purchased:{' '}
                      {new Date(course.purchaseDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span>•</span>
                    <span>Last accessed: {course.lastAccessed}</span>
                  </div>

                  {/* Star Rating */}
                  <div className="mb-4">
                    <StarRating courseId={course.id} />
                  </div>
                </div>

                {/* Action */}
                <div>
                  <button
                    onClick={() => handleGoToCourse(course.id)}
                    className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <BookOpen className="w-4 h-4" />
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedCoursesSection;