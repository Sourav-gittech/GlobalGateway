import React from 'react';
import { BookOpen, Clock, Video, FileText, ArrowRight } from 'lucide-react';

const PurchasedCoursesSection = ({ purchasedCourses = [], onNavigate }) => {
  // Mock purchased courses data (replace with Redux data later)
  const mockPurchasedCourses = [
    {
      id: 1,
      course_name: "Study Visa Consultation",
      description: "Complete guidance for international study visa applications",
      img_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
      purchaseDate: "2024-12-15",
      
      lastAccessed: "2 days ago"
    },
    {
      id: 4,
      course_name: "Work Permit Assistance",
      description: "Expert guidance for work visa applications and employment authorization",
      img_url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
      purchaseDate: "2024-11-20",
    
      lastAccessed: "1 week ago"
    },
    {
      id: 2,
      course_name: "Language Proficiency Training",
      description: "IELTS, TOEFL, and PTE preparation with certified trainers",
      img_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",
      purchaseDate: "2025-01-02",
      
      lastAccessed: "Today"
    }
  ];

  const coursesToDisplay =
    purchasedCourses.length > 0 ? purchasedCourses : mockPurchasedCourses;

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
