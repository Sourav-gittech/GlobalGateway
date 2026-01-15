import React from 'react';
import { ArrowRight } from 'lucide-react';
import PurchaseCourseCard from './course/PurchaseCourseCard';
import NoAvailableCourse from './course/NoAvailableCourse';

const PurchasedCoursesSection = ({ purchasedCourses = [], certificates = [], onNavigate, userId }) => {

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
        {/* Static Mock Course for Demo */}
        <PurchaseCourseCard
          key="mock-course-completed"
          course={{
            id: 'mock-1',
            course_name: 'Immigration Process Training (Demo)',
            description: 'This is a demo course to showcase the certificate feature.',
            img_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
            purchase_date: new Date().toISOString(),
            skill_level: 'Advanced'
          }}
          userId={userId}
          certificates={[{
            course_id: 'mock-1',
            certificate_available: true,
            progress: '100',
            certificate_reg_date: new Date().toISOString(),
            id: 'MOCK-CERT-12345'
          }]}
        />

        {purchasedCourses?.map(course => (
          <PurchaseCourseCard key={course.id} course={course} userId={userId} certificates={certificates} />
        ))}
      </div>
    </div>
  );
};

export default PurchasedCoursesSection;