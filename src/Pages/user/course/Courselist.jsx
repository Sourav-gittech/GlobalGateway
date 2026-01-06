import React from 'react';
import CourseBanner from '../../../Components/user/course/CourseBanner';
import CourseCard from '../../../Components/user/course/CourseCard';

// Static course data - Replace with your API call later
export const staticCourses = [
  {
    id: 1,
    course_name: "Study Visa Consultation",
    description: "Complete guidance for international study visa applications with expert support",
    price: "15000",
    img_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    icon: "School",
    fullDescription: "Our Study Visa Consultation course provides comprehensive guidance for students aspiring to study abroad. Learn about visa requirements, application processes, documentation, and interview preparation. Expert consultants will guide you through every step of your study visa journey.",
    duration: "10 hours",
    lectures: 15,
    students: 50,
    skillLevel: "Advanced",
    language: "English",
  },
  {
    id: 2,
    course_name: "Language Proficiency Training",
    description: "IELTS, TOEFL, and PTE preparation courses with certified trainers",
    price: "12000",
    img_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",
    icon: "Language",
    fullDescription: "Master English language proficiency tests with our comprehensive training program. Our certified trainers provide expert guidance for IELTS, TOEFL, and PTE examinations with proven strategies and practice materials.",
    duration: "8 hours",
    lectures: 12,
    students: 65,
    skillLevel: "Intermediate",
    language: "English",
  },
  {
    id: 3,
    course_name: "Legal Documentation Support",
    description: "Professional assistance with visa documentation and legal requirements",
    price: "10000",
    img_url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    icon: "Balance",
    fullDescription: "Get professional support for all your visa documentation needs. Our legal experts help you prepare, review, and submit all required documents with accuracy and compliance to immigration laws.",
    duration: "6 hours",
    lectures: 10,
    students: 45,
    skillLevel: "Beginner",
    language: "English",
  },
  {
    id: 4,
    course_name: "Work Permit Assistance",
    description: "Expert guidance for work visa applications and employment authorization",
    price: "18000",
    img_url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
    icon: "FrontHand",
    fullDescription: "Navigate the complex work visa process with our expert assistance. Learn about employment authorization, work permit requirements, and employer sponsorship processes for various countries.",
    duration: "12 hours",
    lectures: 18,
    students: 40,
    skillLevel: "Advanced",
    language: "English",
  },
  {
    id: 5,
    course_name: "Immigration Process Training",
    description: "Comprehensive training on immigration procedures and requirements",
    price: "14000",
    img_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    icon: "BookOpen",
    fullDescription: "Understand the complete immigration process with our in-depth training program. From initial application to final approval, learn every aspect of immigration procedures and requirements.",
    duration: "10 hours",
    lectures: 16,
    students: 55,
    skillLevel: "Intermediate",
    language: "English",
  },
  {
    id: 6,
    course_name: "Visa Application Review",
    description: "Professional review and optimization of your visa application documents",
    price: "8000",
    img_url: "https://images.unsplash.com/photo-1554224311-beee460c201f?w=800&h=600&fit=crop",
    icon: "FileText",
    fullDescription: "Get your visa application professionally reviewed and optimized by our experts. We identify potential issues, suggest improvements, and ensure your application stands out.",
    duration: "5 hours",
    lectures: 8,
    students: 30,
    skillLevel: "Beginner",
    language: "English",
  }
];

const CourseList = () => {

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Top Banner */}
      <CourseBanner />

      {/* Course Cards Section */}
      <div className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {staticCourses.map((course, index) => (
              <CourseCard key={course.id} index={index} course={course} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-x {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }
        .animate-bounce-x {
          animation: bounce-x 1.5s infinite;
        }
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </div>
  );
};

export default CourseList;
