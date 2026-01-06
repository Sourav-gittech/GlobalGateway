import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  School, Scale, Globe, Hand, BookOpen, FileText, 
  Clock, Users, BarChart, CheckCircle, Star, ShoppingCart, X, ArrowLeft,
  Award, Calendar, Video, Lock, Play, ChevronDown, ChevronUp, Download, FileIcon
} from 'lucide-react';

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

const iconMap = { School, Globe, Balance: Scale, FrontHand: Hand, BookOpen, FileText };

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [cartDrawer, setCartDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isPurchased] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const foundCourse = staticCourses.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
    const savedCart = localStorage.getItem('courseCart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, [id]);

  const addToCart = () => {
    if (!course) return;
    const existing = cartItems.find(i => i.id === course.id);
    if (!existing) {
      const newCart = [...cartItems, course];
      setCartItems(newCart);
      localStorage.setItem('courseCart', JSON.stringify(newCart));
    }
    setCartDrawer(true);
  };

  const removeFromCart = (cid) => {
    const newCart = cartItems.filter(i => i.id !== cid);
    setCartItems(newCart);
    localStorage.setItem('courseCart', JSON.stringify(newCart));
  };

  const calculateTotal = () => cartItems.reduce((s, i) => s + parseInt(i.price), 0);

  const handleDocumentDownload = (doc) => {
    if (!doc.isFree && !isPurchased) {
      alert('Please purchase the course to download this document');
      return;
    }
    alert(`Downloading: ${doc.name}`);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF5252] mx-auto mb-4"/>
          <p className="text-gray-600 font-medium">Loading course details...</p>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[course.icon];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-700/80 via-[#4a5c6a] to-[#556b7a] text-white shadow-xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12">
            <button onClick={() => navigate('/coaching/course')} className="flex items-center text-white/80 hover:text-white mb-6 transition-colors font-medium text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />Back to Courses
            </button>

            <div className="grid lg:grid-cols-5  gap-8 items-start">
              <div className="lg:col-span-3 mt-20 space-y-6">
                {/* Badges */}
                <div className="flex items-center gap-3">
                  <span className="bg-[#FF5252] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                    {course.skillLevel}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{course.rating}</span>
                    <span className="text-white/70 text-sm">({course.reviews} reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  {course.course_name}
                </h1>

                {/* Description */}
                <p className="text-lg text-white/90 leading-relaxed">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#FF5252]" />
                    <span className="text-base">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-[#FF5252]" />
                    <span className="text-base">{course.lectures} lectures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#FF5252]" />
                    <span className="text-base">{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#FF5252]" />
                    <span className="text-base">{course.language}</span>
                  </div>
                </div>

                {/* Instructor */}
                <div>
                  <p className="text-sm text-white/70 mb-2">Instructor</p>
                  <p className="text-xl font-semibold">{course.instructor}</p>
                </div>
              </div>

              {/* Price Card */}
              <div className="lg:col-span-2">
               <div className=" bg-white/20 backdrop-blur-lg border border-white/50 rounded-2xl sticky top-4 shadow-lg overflow-hidden">

                  {/* Image with Icon */}
                  <div className="relative h-56">
                    <img src={course.img_url} alt={course.course_name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                  </div>
                  
                  <div className="p-6">
                    {/* Price */}
                    <div className="mb-5">
                      <p className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wider">Course Price</p>
                      <p className="text-5xl font-bold text-white">
                        ₹{parseInt(course.price).toLocaleString('en-IN')}
                      </p>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button 
                      onClick={addToCart} 
                      className="w-full bg-red-400 hover:bg-[#E63946] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-lg"
                    >
                      <ShoppingCart className="w-6 h-6" />
                      Add to Cart
                    </button>

                    {/* Features */}
                    <div className="mt-5 pt-5 border-t border-gray-200 space-y-3">
                      <div className="flex items-center text-green-500 text-sm font-medium">
                        <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span>30-day money-back guarantee</span>
                      </div>
                      <div className="flex items-center text-gray-700 text-sm">
                        <Award className="w-5 h-5 mr-3 flex-shrink-0 text-[#FF5252]" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center text-gray-700 text-sm">
                        <Calendar className="w-5 h-5 mr-3 flex-shrink-0 text-[#FF5252]" />
                        <span>Lifetime access</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="flex border-b border-gray-200 bg-gray-50">
                  {['overview', 'content', 'instructor'].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3.5 px-4 font-semibold capitalize transition-all text-sm ${activeTab === tab ? 'bg-white text-[#FF5252] border-b-2 border-[#FF5252] -mb-px' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div>
                      <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">About This Course</h2>
                      <p className="text-gray-700 leading-relaxed mb-6">{course.fullDescription}</p>
                      <h3 className="text-xl font-bold text-[#2C3E50] mb-4">What You'll Learn</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {course.features.map((f, i) => (
                          <div key={i} className="flex items-start bg-green-50 p-3 rounded-lg border border-green-100">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-800 text-sm font-medium">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'content' && (
                    <div>
                      <h2 className="text-2xl font-bold text-[#2C3E50] mb-5">Course Content</h2>
                      
                      {/* Video Section */}
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

                      {/* Documents Section */}
                      <div>
                        <h3 className="text-lg font-bold text-[#2C3E50] mb-3 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-[#FF5252]" />
                          Course Documents
                        </h3>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2" style={{scrollbarWidth: 'thin', scrollbarColor: '#FF5252 #f1f1f1'}}>
                          {course.documents.map((doc, idx) => (
                            <div 
                              key={idx}
                              className="border border-gray-200 rounded-lg p-4 hover:border-[#FF5252] transition-all bg-white hover:shadow-md"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    doc.isFree || isPurchased 
                                      ? 'bg-blue-100' 
                                      : 'bg-gray-100'
                                  }`}>
                                    <FileIcon className={`w-6 h-6 ${
                                      doc.isFree || isPurchased 
                                        ? 'text-blue-600' 
                                        : 'text-gray-400'
                                    }`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-semibold text-gray-900 text-sm truncate">{doc.name}</h4>
                                      {doc.isFree && (
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold uppercase flex-shrink-0">
                                          Free
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-600">
                                      <span className="font-medium">{doc.type}</span>
                                      <span>•</span>
                                      <span>{doc.size}</span>
                                      <span>•</span>
                                      <span>{doc.pages} pages</span>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDocumentDownload(doc)}
                                  disabled={!doc.isFree && !isPurchased}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all flex-shrink-0 ${
                                    doc.isFree || isPurchased
                                      ? 'bg-[#FF5252] hover:bg-[#E63946] text-white shadow-md hover:shadow-lg transform hover:scale-105'
                                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                  }`}
                                >
                                  {doc.isFree || isPurchased ? (
                                    <>
                                      <Download className="w-4 h-4" />
                                      <span>Download</span>
                                    </>
                                  ) : (
                                    <>
                                      <Lock className="w-4 h-4" />
                                      <span>Locked</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'instructor' && (
                    <div>
                      <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">About the Instructor</h2>
                      <div className="flex mt-10 items-center gap-4 mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF5252] to-[#E63946] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                          {course.instructor.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{course.instructor}</h3>
                          <p className="text-gray-600">{course.instructorTitle}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center"><Users className="w-4 h-4 mr-1" />{course.students}+ students</span>
                            <span className="flex items-center"><Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />{course.rating} rating</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">With over 15 years of experience in immigration consulting, our instructor has helped thousands of students achieve their dreams of studying and working abroad. Certified by multiple immigration boards, they bring real-world expertise and proven strategies to every course.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-4 border border-gray-100">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Course Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-3 text-[#FF5252]" />
                      <span>Duration</span>
                    </div>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-700">
                      <Video className="w-5 h-5 mr-3 text-[#FF5252]" />
                      <span>Video</span>
                    </div>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-700">
                      <FileText className="w-5 h-5 mr-3 text-[#FF5252]" />
                      <span>Documents</span>
                    </div>
                    <span className="font-semibold">{course.documents.length}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-700">
                      <BarChart className="w-5 h-5 mr-3 text-[#FF5252]" />
                      <span>Level</span>
                    </div>
                    <span className="font-semibold">{course.skillLevel}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-700">
                      <Globe className="w-5 h-5 mr-3 text-[#FF5252]" />
                      <span>Language</span>
                    </div>
                    <span className="font-semibold">{course.language}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-700">
                      <Award className="w-5 h-5 mr-3 text-[#FF5252]" />
                      <span>Certificate</span>
                    </div>
                    <span className="font-semibold">Yes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-3 text-[#FF5252]" />
                      <span>Access</span>
                    </div>
                    <span className="font-semibold">Lifetime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      {cartDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={() => setCartDrawer(false)} />
          
          <div className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 flex flex-col border-l border-white/20">
            <div className="bg-gradient-to-r from-[#FF5252] to-[#E63946] px-6 py-5 flex items-center justify-between text-white">
              <div>
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <p className="text-white/90 text-sm mt-1">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
              </div>
              <button onClick={() => setCartDrawer(false)} className="hover:bg-white/20 rounded-full p-2 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-20 h-20 text-gray-300 mb-4" />
                  <p className="text-gray-600 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-2">Add courses to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[#FF5252] transition-all shadow-sm">
                      <div className="flex gap-4">
                        <img src={item.img_url} alt={item.course_name} className="w-24 h-24 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.course_name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.duration} • {item.lectures} lectures</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-[#FF5252]">₹{parseInt(item.price).toLocaleString('en-IN')}</span>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition-colors p-1">
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-5">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}):</span>
                  <span className="text-xl font-bold text-gray-900">₹{calculateTotal().toLocaleString('en-IN')}</span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-lg font-bold mb-1">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-[#FF5252] text-2xl">₹{calculateTotal().toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button onClick={() => navigate('/coaching/cart')} className="w-full bg-gradient-to-r from-[#FF5252] to-[#E63946] hover:from-[#E63946] hover:to-[#FF5252] text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mb-3 transform hover:scale-105">
                  Go to Cart<ShoppingCart className="w-5 h-5" />
                </button>

                <button onClick={() => setCartDrawer(false)} className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:border-[#FF5252] hover:text-[#FF5252] transition-all">
                  Continue Shopping
                </button>

                <div className="flex items-center justify-center gap-2 text-green-600 text-sm mt-4">
                  <CheckCircle className="w-4 h-4" /><span>Secure checkout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;