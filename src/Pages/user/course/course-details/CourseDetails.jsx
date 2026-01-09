import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CourseDetailsHeader from '../../../../Components/user/course/course-details/CourseDetailsHeader';
import PricingCard from '../../../../Components/user/course/course-details/PricingCard';
import CourseContent from '../../../../Components/user/course/course-details/CourseContent';
import CartDrawer from '../../../../Components/user/course/course-details/CartDrawer';
import { decodeBase64Url } from '../../../../util/encodeDecode/base64';
import getSweetAlert from '../../../../util/alert/sweetAlert';
import { fetchCourseById } from '../../../../Redux/Slice/courseSlice';
import { useDispatch, useSelector } from 'react-redux';

const staticCourses = [
  {
    id: 1,
    course_name: "Study Visa Consultation",
    description: "Complete guidance for international study visa applications with expert support",
    price: "15000",
    img_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    icon: "School",
    fullDescription: "Our Study Visa Consultation course provides comprehensive guidance for students aspiring to study abroad. Learn about visa requirements, application processes, documentation, and interview preparation. Expert consultants will guide you through every step of your study visa journey with personalized support and proven strategies.",
    duration: "10 hours",
    lectures: 15,
    students: 50,
    skillLevel: "Advanced",
    language: "English",
    rating: 4.8,
    reviews: 124,
    instructor: "Dr. Sarah Johnson",
    instructorTitle: "Senior Immigration Consultant",
    features: [
      "Comprehensive visa application guidance",
      "Document preparation assistance",
      "Mock interview sessions",
      "Country-specific requirements",
      "Post-visa travel preparation",
      "Lifetime access to materials"
    ],
    video: {
      title: "Complete Study Visa Application Guide",
      duration: "45:30",
      thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop",
      isFree: true,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    documents: [
      {
        name: "Visa Application Checklist",
        type: "PDF",
        size: "2.5 MB",
        pages: 12,
        isFree: false
      },
      {
        name: "Sample SOP Templates",
        type: "DOCX",
        size: "850 KB",
        pages: 8,
        isFree: false
      },
      {
        name: "Financial Documentation Guide",
        type: "PDF",
        size: "1.8 MB",
        pages: 15,
        isFree: false
      },
      {
        name: "Interview Questions & Answers",
        type: "PDF",
        size: "1.2 MB",
        pages: 10,
        isFree: true
      }
    ]
  },
  {
    id: 2,
    course_name: "Language Proficiency Training",
    description: "IELTS, TOEFL, and PTE preparation with certified trainers",
    price: "12000",
    img_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",
    icon: "Globe",
    fullDescription: "Master English language proficiency tests with our comprehensive training program. Our certified trainers provide expert guidance for IELTS, TOEFL, and PTE examinations with proven strategies and practice materials.",
    duration: "8 hours",
    lectures: 12,
    students: 65,
    skillLevel: "Intermediate",
    language: "English",
    rating: 4.9,
    reviews: 98,
    instructor: "Prof. Michael Chen",
    instructorTitle: "Certified Language Trainer",
    features: [
      "IELTS, TOEFL & PTE prep",
      "Speaking practice sessions",
      "Writing feedback",
      "Mock tests with analysis",
      "Grammar enhancement",
      "Exam strategies"
    ],
    video: {
      title: "Language Test Preparation Masterclass",
      duration: "38:15",
      thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=450&fit=crop",
      isFree: true,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    documents: [
      {
        name: "IELTS Study Material",
        type: "PDF",
        size: "3.2 MB",
        pages: 25,
        isFree: false
      },
      {
        name: "Speaking Topics Collection",
        type: "PDF",
        size: "1.5 MB",
        pages: 18,
        isFree: false
      },
      {
        name: "Writing Task Examples",
        type: "DOCX",
        size: "920 KB",
        pages: 12,
        isFree: true
      },
      {
        name: "Vocabulary Builder",
        type: "PDF",
        size: "2.1 MB",
        pages: 20,
        isFree: false
      }
    ]
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
    rating: 4.7,
    reviews: 76,
    instructor: "Adv. Robert Williams",
    instructorTitle: "Immigration Legal Advisor",
    features: [
      "Document verification checklist",
      "Legal compliance guidance",
      "Affidavit preparation",
      "Notarization support",
      "Translation services info",
      "Document organization"
    ],
    video: {
      title: "Legal Documentation Essentials",
      duration: "32:45",
      thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop",
      isFree: true,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    documents: [
      {
        name: "Document Checklist Template",
        type: "PDF",
        size: "1.1 MB",
        pages: 8,
        isFree: true
      },
      {
        name: "Affidavit Samples",
        type: "DOCX",
        size: "650 KB",
        pages: 6,
        isFree: false
      },
      {
        name: "Legal Requirements Guide",
        type: "PDF",
        size: "2.3 MB",
        pages: 16,
        isFree: false
      },
      {
        name: "Notarization Process",
        type: "PDF",
        size: "980 KB",
        pages: 7,
        isFree: false
      }
    ]
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
    rating: 4.8,
    reviews: 112,
    instructor: "Emma Thompson",
    instructorTitle: "Work Visa Specialist",
    features: [
      "Work visa categories explained",
      "Employer sponsorship guidance",
      "Job offer letter requirements",
      "Labor market assessment",
      "Post-arrival procedures",
      "Family sponsorship options"
    ],
    video: {
      title: "Work Permit Application Complete Guide",
      duration: "52:20",
      thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=450&fit=crop",
      isFree: true,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    documents: [
      {
        name: "Work Visa Categories Overview",
        type: "PDF",
        size: "2.8 MB",
        pages: 22,
        isFree: false
      },
      {
        name: "Employer Sponsorship Guide",
        type: "PDF",
        size: "1.9 MB",
        pages: 14,
        isFree: false
      },
      {
        name: "Job Offer Letter Template",
        type: "DOCX",
        size: "720 KB",
        pages: 4,
        isFree: true
      },
      {
        name: "Application Timeline Planner",
        type: "PDF",
        size: "1.4 MB",
        pages: 9,
        isFree: false
      }
    ]
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
    rating: 4.6,
    reviews: 89,
    instructor: "David Kumar",
    instructorTitle: "Immigration Process Expert",
    features: [
      "Immigration pathways overview",
      "Points-based system explained",
      "Express entry guidance",
      "Provincial nomination programs",
      "Settlement planning",
      "Rights and responsibilities"
    ],
    video: {
      title: "Immigration Process Complete Training",
      duration: "48:10",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop",
      isFree: true,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    documents: [
      {
        name: "Immigration Pathways Guide",
        type: "PDF",
        size: "3.5 MB",
        pages: 28,
        isFree: false
      },
      {
        name: "Points Calculator Sheet",
        type: "XLSX",
        size: "450 KB",
        pages: 5,
        isFree: true
      },
      {
        name: "Document Requirements List",
        type: "PDF",
        size: "1.7 MB",
        pages: 13,
        isFree: false
      },
      {
        name: "Settlement Guide",
        type: "PDF",
        size: "2.2 MB",
        pages: 18,
        isFree: false
      }
    ]
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
    rating: 4.9,
    reviews: 67,
    instructor: "Lisa Anderson",
    instructorTitle: "Application Review Specialist",
    features: [
      "Complete application review",
      "Document quality assessment",
      "Error identification",
      "Improvement recommendations",
      "Submission checklist",
      "One-on-one consultation"
    ],
    video: {
      title: "Application Review Best Practices",
      duration: "28:40",
      thumbnail: "https://images.unsplash.com/photo-1554224311-beee460c201f?w=800&h=450&fit=crop",
      isFree: true,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    documents: [
      {
        name: "Application Review Checklist",
        type: "PDF",
        size: "1.3 MB",
        pages: 10,
        isFree: true
      },
      {
        name: "Common Mistakes Guide",
        type: "PDF",
        size: "1.6 MB",
        pages: 12,
        isFree: false
      },
      {
        name: "Optimization Tips",
        type: "DOCX",
        size: "780 KB",
        pages: 8,
        isFree: false
      },
      {
        name: "Final Submission Checklist",
        type: "PDF",
        size: "920 KB",
        pages: 6,
        isFree: false
      }
    ]
  }
];

const CourseDetails = () => {
  const { course_id } = useParams();
  const id = decodeBase64Url(course_id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cartDrawer, setCartDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isPurchased, setIsPurchased] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const { isCourseLoading, currentCourse:course, hasCourseError } = useSelector(state => state?.course);

  useEffect(() => {
    // const foundCourse = staticCourses.find(c => c.id === parseInt(id));
    // setCourse(foundCourse);
    // const savedCart = localStorage.getItem('courseCart');
    // if (savedCart) setCartItems(JSON.parse(savedCart));


    // const mockPurchasedCourseIds = [1, 2, 4];
    // const purchased = mockPurchasedCourseIds.includes(parseInt(id));
    // setIsPurchased(purchased);

    dispatch(fetchCourseById(id))
      .then(res => {
        console.log('Response for fetching specific details', res);
      })
      .catch(err => {
        console.log('Error occured', err);
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      })
  }, [id]);

  console.log('current course details', course);

  if (isCourseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF5252] mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-[#556b7a] text-white shadow-2xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12">
            <button onClick={() => navigate('/course')} className="flex items-center text-white/80 hover:text-white mb-6 transition-colors font-medium text-sm cursor-pointer">
              <ArrowLeft className="w-4 h-4 mr-2" />Back to Courses
            </button>

            <div className="grid lg:grid-cols-5  gap-8 items-start">
              <CourseDetailsHeader isPurchased={isPurchased} course={course} />
              {/* Price Card */}
              <PricingCard isPurchased={isPurchased} course={course} cartItems={cartItems} setCartItems={setCartItems} setCartDrawer={setCartDrawer} setActiveTab={setActiveTab} />
            </div>
          </div>
        </div>

        {/* Course Content */}
        <CourseContent isPurchased={isPurchased} course={course} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Cart Drawer */}
      {cartDrawer && (
        <CartDrawer cartItems={cartItems} setCartItems={setCartItems} setCartDrawer={setCartDrawer} />
      )}
    </>
  );
};

export default CourseDetails;