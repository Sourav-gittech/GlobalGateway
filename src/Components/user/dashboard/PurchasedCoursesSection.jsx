import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PurchaseCourseCard from './course/PurchaseCourseCard';
import NoAvailableCourse from './course/NoAvailableCourse';

const PurchasedCoursesSection = ({ purchasedCourses = [], onNavigate }) => {

  const [submittedRatings, setSubmittedRatings] = useState({});

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

  const coursesToDisplay = purchasedCourses.length > 0 ? purchasedCourses : mockPurchasedCourses;

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

  const handleBrowseCourses = () => {
    if (onNavigate) {
      onNavigate('/course');
    }
  };

  if (purchasedCourses?.length === 0) {
    return (
      <NoAvailableCourse handleBrowseCourses={handleBrowseCourses} />
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
          className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
        >
          Browse More Courses
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Course Cards */}
      <div className="grid gap-6">
        {purchasedCourses?.map(course => (
          <PurchaseCourseCard key={course.id} course={course} submittedRatings={submittedRatings} setSubmittedRatings={setSubmittedRatings} />
        ))}
      </div>
    </div>
  );
};

export default PurchasedCoursesSection;