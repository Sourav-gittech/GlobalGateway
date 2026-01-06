import React from 'react';
import { School, Scale, Globe, Hand, BookOpen, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  School: <School className="w-10 h-10 text-[#FF5252]" />,
  Language: <Globe className="w-10 h-10 text-[#FF5252]" />,
  Balance: <Scale className="w-10 h-10 text-[#FF5252]" />,
  FrontHand: <Hand className="w-10 h-10 text-[#FF5252]" />,
  BookOpen: <BookOpen className="w-10 h-10 text-[#FF5252]" />,
  FileText: <FileText className="w-10 h-10 text-[#FF5252]" />,
};

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

const ArrowIcon = () => (
  <span className="inline-block ml-2 animate-bounce-x">
    →
  </span>
);

const CourseList = () => {
  const navigate = useNavigate();

 const handleViewCourse = (courseId) => {
  navigate(`/coaching/course/${courseId}`);
};
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Top Banner */}
      <div
        className="relative h-[250px] sm:h-[300px] bg-cover bg-center"
        style={{ backgroundImage: 'url(/PageBanner.jpg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center max-w-7xl">
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] mb-2">
            Immigration Courses
          </h1>
          <nav className="flex items-center space-x-2 text-[#FF5252] mt-1 text-sm sm:text-base">
            {/* ✅ FIXED SPA NAVIGATION */}
            <button
              onClick={() => navigate('/')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Home
            </button>
            <span>›</span>
            <span>Courses</span>
          </nav>
        </div>
      </div>

      {/* Course Cards Section */}
      <div className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {staticCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col relative"
              >
                <div className="absolute top-4 right-4 bg-[#FF5252] text-white rounded-[20px] px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold z-10">
                  ₹{parseInt(course.price).toLocaleString('en-IN')}
                </div>

                <div className="h-[180px] sm:h-[200px] w-full overflow-hidden relative">
                  <img
                    src={course.img_url}
                    alt={course.course_name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 flex flex-col p-4 sm:p-6">
                  <div className="flex justify-center mb-2 sm:mb-3">
                    {iconMap[course.icon]}
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-[#2C3E50] text-center mb-2 min-h-[3rem] flex items-center justify-center">
                    {course.course_name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#7f8c8d] text-center mb-4 flex-grow line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex justify-center mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewCourse(course.id)}
                      className="flex items-center border border-[#E0E0E0] text-[#666] px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium hover:border-[#FF5252] hover:text-[#FF5252] hover:bg-[rgba(255,82,82,0.04)] transition-all duration-200"
                    >
                      View Course
                      <ArrowIcon />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
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
