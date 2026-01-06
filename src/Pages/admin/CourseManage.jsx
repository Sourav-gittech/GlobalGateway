import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  BookOpen, Plus, Search, Edit2, Trash2, Eye, DollarSign,
  Clock, Users, Video, FileText, Star, Globe, BarChart,
  Upload, X, Save, Lock, Unlock, Award, Calendar, School, Scale, Hand
} from 'lucide-react';

// Mock initial courses data
const initialCourses = [
  {
    id: 1,
    course_name: "Study Visa Consultation",
    description: "Complete guidance for international study visa applications with expert support",
    price: "15000",
    img_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    icon: "School",
    fullDescription: "Our Study Visa Consultation course provides comprehensive guidance for students aspiring to study abroad. Learn about visa requirements, application processes, documentation, and interview preparation.",
    duration: "10 hours",
    lectures: 15,
    students: 50,
    skillLevel: "Advanced",
    language: "English",
    rating: 4.8,
    reviews: 124,
    instructor: "Dr. Sarah Johnson",
    instructorTitle: "Senior Immigration Consultant",
    status: "active",
    features: [
      "Comprehensive visa application guidance",
      "Document preparation assistance",
      "Mock interview sessions",
      "Country-specific requirements"
    ],
    pricing: {
      basePrice: "12711.86",
      cgst: 9,
      sgst: 9,
      additionalCharges: []
    },
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
    fullDescription: "Master English language proficiency tests with our comprehensive training program.",
    duration: "8 hours",
    lectures: 12,
    students: 65,
    skillLevel: "Intermediate",
    language: "English",
    rating: 4.9,
    reviews: 98,
    instructor: "Prof. Michael Chen",
    instructorTitle: "Certified Language Trainer",
    status: "active",
    features: [
      "IELTS, TOEFL & PTE prep",
      "Speaking practice sessions"
    ],
    pricing: {
      basePrice: "10169.49",
      cgst: 9,
      sgst: 9,
      additionalCharges: []
    },
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
      }
    ]
  }
];

// Icon mapping
const iconOptions = [
  { value: 'School', label: 'School', Icon: School },
  { value: 'Globe', label: 'Globe', Icon: Globe },
  { value: 'Balance', label: 'Balance', Icon: Scale },
  { value: 'FrontHand', label: 'Hand', Icon: Hand },
  { value: 'BookOpen', label: 'Book', Icon: BookOpen },
  { value: 'FileText', label: 'File', Icon: FileText }
];

// Header Component
function CoursesHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Manage Courses</h1>
        <p className="text-sm text-slate-400">Create and manage immigration courses</p>
      </div>
    </div>
  );
}

// Settings Section Component
function SettingsSection({ title, description, icon: Icon, children, className = "" }) {
  return (
    <div className={`flex flex-col p-5 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 ${className}`}>
      <div className="flex items-start gap-3 mb-4 sm:mb-5 flex-shrink-0">
        <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 flex-shrink-0">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{title}</h3>
          {description && <p className="text-sm text-slate-400">{description}</p>}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        {children}
      </div>
    </div>
  );
}

// Course Card Component
function CourseCard({ course, onEdit, onDelete, onView }) {
  const IconComponent = iconOptions.find(i => i.value === course.icon)?.Icon || BookOpen;

  return (
    <div className="group relative bg-slate-800/30 border border-slate-700/50 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={course.img_url}
          alt={course.course_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${course.status === 'active'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
            }`}>
            {course.status === 'active' ? 'Active' : 'Draft'}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 bg-blue-500/90 text-white px-2 py-1 rounded text-xs font-bold">
          ₹{parseInt(course.price).toLocaleString('en-IN')}
        </div>

      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold mb-2 line-clamp-1">{course.course_name}</h3>
        <p className="text-slate-400 text-sm mb-3 line-clamp-2">{course.description}</p>

        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 flex-wrap">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Video className="w-3 h-3" />
            {course.lectures}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {course.students}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onView(course)}
            className="flex-1 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 text-slate-300 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => onEdit(course)}
            className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(course)}
            className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Form Input Component
function FormInput({ label, name, register, errors, type = "text", placeholder, required = false, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        {...register(name, { required: required ? `${label} is required` : false })}
        className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-400">{errors[name].message}</p>
      )}
    </div>
  );
}

// Add/Edit Course Modal
function CourseModal({ isOpen, onClose, course, onSave }) {
  const { register, control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: course || {
      course_name: '',
      description: '',
      fullDescription: '',
      price: '',
      duration: '',
      lectures: '',
      students: 0,
      skillLevel: 'Beginner',
      language: 'English',
      icon: 'School',
      rating: 0,
      reviews: 0,
      instructor: '',
      instructorTitle: '',
      status: 'active',
      img_url: '',
      features: [''],
      video: {
        title: '',
        duration: '',
        thumbnail: '',
        isFree: true,
        url: ''
      },
      documents: [],
      pricing: {
        basePrice: '',
        cgst: 9,
        sgst: 9,
        additionalCharges: []
      }
    }
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: "features"
  });

  const { fields: documentFields, append: appendDocument, remove: removeDocument } = useFieldArray({
    control,
    name: "documents"
  });

  const { fields: chargeFields, append: appendCharge, remove: removeCharge } = useFieldArray({
    control,
    name: "pricing.additionalCharges"
  });

  const [activeTab, setActiveTab] = useState('basic');

  // Watch pricing fields for calculation
  const watchPrice = watch('pricing.basePrice');
  const watchCGST = watch('pricing.cgst');
  const watchSGST = watch('pricing.sgst');
  const watchCharges = watch('pricing.additionalCharges');

  // Calculate total price
  const calculateTotal = () => {
    const base = parseFloat(watchPrice) || 0;
    const cgst = parseFloat(watchCGST) || 0;
    const sgst = parseFloat(watchSGST) || 0;
    const gstAmount = base * ((cgst + sgst) / 100);

    let additionalTotal = 0;
    if (watchCharges && Array.isArray(watchCharges)) {
      additionalTotal = watchCharges.reduce((sum, charge) => {
        return sum + (parseFloat(charge.amount) || 0);
      }, 0);
    }

    return base + gstAmount + additionalTotal;
  };

  React.useEffect(() => {
    if (course) {
      reset(course);
    }
  }, [course, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    // Calculate and set the final price
    const basePrice = parseFloat(data.pricing?.basePrice) || 0;
    const cgst = parseFloat(data.pricing?.cgst) || 0;
    const sgst = parseFloat(data.pricing?.sgst) || 0;
    const gstAmount = basePrice * ((cgst + sgst) / 100);

    let additionalTotal = 0;
    if (data.pricing?.additionalCharges) {
      additionalTotal = data.pricing.additionalCharges.reduce((sum, charge) => {
        return sum + (parseFloat(charge.amount) || 0);
      }, 0);
    }

    const totalPrice = basePrice + gstAmount + additionalTotal;

    const courseData = {
      ...data,
      price: totalPrice.toString()
    };

    onSave(courseData);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-6xl max-h-[90vh] bg-slate-800 border border-slate-700/50 rounded-xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div>
            <h2 className="text-xl font-bold text-white">
              {course ? 'Edit Course' : 'Add New Course'}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {course ? 'Update course information' : 'Create a new immigration course'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="relative">
          {/* Bottom border */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-slate-700/50" />

          <div className="flex gap-6 px-6">
            {[
              'basic',
              'details',
              'instructor',
              'features',
              'video',
              'documents',
              'pricing'
            ].map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
            relative py-4 text-sm font-medium whitespace-nowrap transition-colors
            ${isActive
                      ? 'text-blue-400'
                      : 'text-slate-400 hover:text-slate-300'}
          `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}

                  {/* Active underline */}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6">
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <FormInput
                label="Course Name"
                name="course_name"
                register={register}
                errors={errors}
                placeholder="Enter course name"
                required
              />

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Short Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm"
                  placeholder="Brief course description for listing page"
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>
                )}
              </div>



              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Skill Level <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('skillLevel', { required: true })}
                    className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Language <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('language', { required: true })}
                    className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                    placeholder="English"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Status <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('status', { required: true })}
                    className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Course Icon
                </label>
                <select
                  {...register('icon')}
                  className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                >
                  {iconOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

            <div>
  <label className="block text-sm font-medium text-slate-300 mb-2">
    Course Thumbnail
  </label>

  <input
    type="file"
    accept="image/png,image/jpeg,image/webp"
    className="hidden"
    id="courseThumbnail"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setValue("thumbnailFile", file);
      setValue("img_url", URL.createObjectURL(file));
    }}
  />

  <div className="relative w-full h-44 rounded-xl border border-dashed border-slate-600 bg-slate-800/40 overflow-hidden">
    {watch("img_url") ? (
      <>
        <img
          src={watch("img_url")}
          alt="Course Thumbnail"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center">
          <label
            htmlFor="courseThumbnail"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-600 transition"
          >
            Re-upload Thumbnail
          </label>
        </div>
      </>
    ) : (
      <label
        htmlFor="courseThumbnail"
        className="flex flex-col items-center justify-center h-full cursor-pointer"
      >
        <Upload className="w-6 h-6 text-slate-400 mb-2" />
        <p className="text-sm text-slate-400">
          Upload course thumbnail
        </p>
        <p className="text-xs text-slate-500 mt-1">
          JPG, PNG, WebP
        </p>
      </label>
    )}
  </div>
</div>



            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  {...register('fullDescription', { required: 'Full description is required' })}
                  rows={6}
                  className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm"
                  placeholder="Detailed course description for details page"
                />
                {errors.fullDescription && (
                  <p className="mt-1 text-xs text-red-400">{errors.fullDescription.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Current Students"
                  name="students"
                  register={register}
                  errors={errors}
                  type="number"
                  placeholder="50"
                />

                <FormInput
                  label="Rating (0-5)"
                  name="rating"
                  register={register}
                  errors={errors}
                  type="number"
                  placeholder="4.8"
                />
              </div>


            </div>
          )}

          {activeTab === 'instructor' && (
            <div className="space-y-4">
              <FormInput
                label="Instructor Name"
                name="instructor"
                register={register}
                errors={errors}
                placeholder="Dr. Sarah Johnson"
                required
              />

              <FormInput
                label="Instructor Title"
                name="instructorTitle"
                register={register}
                errors={errors}
                placeholder="Senior Immigration Consultant"
                required
              />
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-300">What You'll Learn</h3>
                <button
                  type="button"
                  onClick={() => appendFeature('')}
                  className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {featureFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input
                      {...register(`features.${index}`)}
                      className="flex-1 px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                      placeholder="Enter a feature or learning outcome"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-3 py-2.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="space-y-6">
              {/* Video Title */}
              <FormInput
                label="Video Title"
                name="video.title"
                register={register}
                errors={errors}
                placeholder="Complete Study Visa Application Guide"
                required
              />

             <div>
  <label className="block text-sm font-medium text-slate-300 mb-2">
    Course Video
  </label>

  <input
    type="file"
    accept="video/*"
    className="hidden"
    id="videoUpload"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setValue("video.file", file);
      setValue("video.preview", URL.createObjectURL(file));
    }}
  />

  <div className="relative w-full h-56 rounded-xl border border-dashed border-slate-600 bg-slate-800/40 overflow-hidden">
    {watch("video.preview") ? (
      <>
        <video
          src={watch("video.preview")}
          controls
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute top-3 right-3">
          <label
            htmlFor="videoUpload"
            className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-xs font-medium cursor-pointer hover:bg-blue-600 transition"
          >
            Replace Video
          </label>
        </div>
      </>
    ) : (
      <label
        htmlFor="videoUpload"
        className="flex flex-col items-center justify-center h-full cursor-pointer"
      >
        <Video className="w-6 h-6 text-slate-400 mb-2" />
        <p className="text-sm text-slate-400">
          Upload course video
        </p>
        <p className="text-xs text-slate-500 mt-1">
          MP4, WebM, MOV
        </p>
      </label>
    )}
  </div>
</div>


             <div>
  <label className="block text-sm font-medium text-slate-300 mb-2">
    Video Thumbnail
  </label>

  <input
    type="file"
    accept="image/png,image/jpeg,image/webp"
    className="hidden"
    id="videoThumbnail"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setValue("video.thumbnailFile", file);
      setValue("video.thumbnail", URL.createObjectURL(file));
    }}
  />

  <div className="relative w-full h-40 rounded-xl border border-dashed border-slate-600 bg-slate-800/40 overflow-hidden">
    {watch("video.thumbnail") ? (
      <>
        <img
          src={watch("video.thumbnail")}
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center">
          <label
            htmlFor="videoThumbnail"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-600 transition"
          >
            Re-upload Thumbnail
          </label>
        </div>
      </>
    ) : (
      <label
        htmlFor="videoThumbnail"
        className="flex flex-col items-center justify-center h-full cursor-pointer"
      >
        <Upload className="w-5 h-5 text-slate-400 mb-2" />
        <p className="text-sm text-slate-400">
          Upload video thumbnail
        </p>
      </label>
    )}
  </div>
</div>


            </div>
          )}


          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-300">Course Documents</h3>
                <button
                  type="button"
                  onClick={() => appendDocument({ name: '', type: 'PDF', isFree: false })}
                  className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Document
                </button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {documentFields.map((field, index) => (
                  <div key={field.id} className="p-4 bg-slate-700/20 border border-slate-600/50 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-slate-300">Document {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="p-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        {...register(`documents.${index}.name`)}
                        className="col-span-2 px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                        placeholder="Document Name"
                      />

                      <select
                        {...register(`documents.${index}.type`)}
                        className="px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                      >
                        <option value="PDF">PDF</option>
                        <option value="DOCX">DOCX</option>
                        <option value="XLSX">XLSX</option>
                      </select>




                      <select
                        {...register(`documents.${index}.isFree`)}
                        className="px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                      >
                        <option value="false">Paid Only</option>
                        <option value="true">Free</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <FormInput
                label="Base Price (₹)"
                name="pricing.basePrice"
                register={register}
                errors={errors}
                type="number"
                placeholder="15000"
                required
              />

              <div>
                <h3 className="text-sm font-medium text-slate-300 mb-3">GST Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      CGST (%) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('pricing.cgst', { required: 'CGST is required', min: 0, max: 100 })}
                      className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                      placeholder="9"
                    />
                    {errors.pricing?.cgst && (
                      <p className="mt-1 text-xs text-red-400">{errors.pricing.cgst.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      SGST (%) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('pricing.sgst', { required: 'SGST is required', min: 0, max: 100 })}
                      className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                      placeholder="9"
                    />
                    {errors.pricing?.sgst && (
                      <p className="mt-1 text-xs text-red-400">{errors.pricing.sgst.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-400">
                    Total GST: <span className="font-semibold">{(parseFloat(watchCGST) || 0) + (parseFloat(watchSGST) || 0)}%</span>
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-slate-300">Additional Charges</h3>
                  <button
                    type="button"
                    onClick={() => appendCharge({ name: '', amount: '', description: '' })}
                    className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Charge
                  </button>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {chargeFields.map((field, index) => (
                    <div key={field.id} className="p-4 bg-slate-700/20 border border-slate-600/50 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-slate-300">Charge {index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeCharge(index)}
                          className="p-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          {...register(`pricing.additionalCharges.${index}.name`)}
                          className="px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                          placeholder="Charge Name (e.g., Platform Fee)"
                        />

                        <input
                          {...register(`pricing.additionalCharges.${index}.amount`)}
                          type="number"
                          step="0.01"
                          className="px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                          placeholder="Amount (₹)"
                        />

                        <input
                          {...register(`pricing.additionalCharges.${index}.description`)}
                          className="col-span-2 px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                          placeholder="Description (optional)"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg space-y-3">
                <h3 className="text-sm font-medium text-white mb-3">Price Breakdown</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Price:</span>
                    <span className="font-medium">₹{(parseFloat(watchPrice) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>CGST ({watchCGST || 0}%):</span>
                    <span className="font-medium">₹{((parseFloat(watchPrice) || 0) * ((parseFloat(watchCGST) || 0) / 100)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>SGST ({watchSGST || 0}%):</span>
                    <span className="font-medium">₹{((parseFloat(watchPrice) || 0) * ((parseFloat(watchSGST) || 0) / 100)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  {watchCharges && watchCharges.length > 0 && watchCharges.some(c => c.name || c.amount) && (
                    <>
                      <div className="border-t border-slate-600/50 my-2"></div>
                      {watchCharges.map((charge, index) => {
                        if (charge.name || charge.amount) {
                          return (
                            <div key={index} className="flex justify-between text-slate-300">
                              <span>{charge.name || `Charge ${index + 1}`}:</span>
                              <span className="font-medium">₹{(parseFloat(charge.amount) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </>
                  )}

                  <div className="border-t border-slate-600/50 my-2"></div>

                  <div className="flex justify-between text-white text-lg font-bold">
                    <span>Total Price:</span>
                    <span className="text-green-400">₹{calculateTotal().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-400 mb-2">
                  <strong>Note:</strong> Price configuration
                </p>
                <ul className="text-xs text-blue-300 space-y-1">
                  <li>• GST rates (CGST & SGST) are customizable per course</li>
                  <li>• Additional charges can include platform fees, processing charges, etc.</li>
                  <li>• Students see the final price including all charges at checkout</li>
                  <li>• Price breakdown is shown transparently to students</li>
                </ul>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-700/50 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 text-slate-300 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {course ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Course Details Modal
function CourseDetailsModal({ isOpen, onClose, course }) {
  if (!isOpen || !course) return null;

  const IconComponent = iconOptions.find(i => i.value === course.icon)?.Icon || BookOpen;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-800 border border-slate-700/50 rounded-xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <IconComponent className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{course.course_name}</h2>
              <p className="text-sm text-slate-400 mt-1">{course.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Course Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-xs text-slate-400">Price</span>
              </div>
              <p className="text-lg font-bold text-white">₹{parseInt(course.price).toLocaleString('en-IN')}</p>
            </div>

            <div className="p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-slate-400">Duration</span>
              </div>
              <p className="text-lg font-bold text-white">{course.duration}</p>
            </div>

            <div className="p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-slate-400">Students</span>
              </div>
              <p className="text-lg font-bold text-white">{course.students}</p>
            </div>

            <div className="p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-slate-400">Rating</span>
              </div>
              <p className="text-lg font-bold text-white">{course.rating} ({course.reviews})</p>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">About This Course</h3>
            <p className="text-slate-300 leading-relaxed">{course.fullDescription}</p>
          </div>

          {/* Course Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-2">Skill Level</h4>
              <p className="text-white">{course.skillLevel}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-2">Language</h4>
              <p className="text-white">{course.language}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-2">Lectures</h4>
              <p className="text-white">{course.lectures} lectures</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-2">Status</h4>
              <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${course.status === 'active'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                }`}>
                {course.status === 'active' ? 'Active' : 'Draft'}
              </span>
            </div>
          </div>

          {/* Instructor */}
          <div className="p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Instructor</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold">{course.instructor}</p>
                <p className="text-sm text-slate-400">{course.instructorTitle}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          {course.features && course.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">What You'll Learn</h3>
              <div className="grid gap-2">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Details */}
          {course.pricing && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Pricing Details</h3>
              <div className="p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Price:</span>
                    <span className="font-medium">₹{parseFloat(course.pricing.basePrice || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>CGST ({course.pricing.cgst || 0}%):</span>
                    <span className="font-medium">₹{(parseFloat(course.pricing.basePrice || 0) * ((course.pricing.cgst || 0) / 100)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>SGST ({course.pricing.sgst || 0}%):</span>
                    <span className="font-medium">₹{(parseFloat(course.pricing.basePrice || 0) * ((course.pricing.sgst || 0) / 100)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>

                  {course.pricing.additionalCharges && course.pricing.additionalCharges.length > 0 && (
                    <>
                      <div className="border-t border-slate-600/50 my-2"></div>
                      {course.pricing.additionalCharges.map((charge, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-slate-300">
                            <span>{charge.name}:</span>
                            <span className="font-medium">₹{parseFloat(charge.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                          </div>
                          {charge.description && (
                            <p className="text-xs text-slate-500 mt-1">{charge.description}</p>
                          )}
                        </div>
                      ))}
                    </>
                  )}

                  <div className="border-t border-slate-600/50 my-2"></div>

                  <div className="flex justify-between text-white text-base font-bold">
                    <span>Total Price:</span>
                    <span className="text-green-400">₹{parseInt(course.price).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}



          {/* Documents */}
          {course.documents && course.documents.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Course Documents</h3>
              <div className="space-y-2">
                {course.documents.map((doc, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">{doc.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-400">{doc.type}</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-400">{doc.size}</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-400">{doc.pages} pages</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${doc.isFree
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                      }`}>
                      {doc.isFree ? 'Free' : 'Paid'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function CourseManagement() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);

  const filteredCourses = courses.filter(course =>
    course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (course) => {
    if (window.confirm(`Are you sure you want to delete "${course.course_name}"?`)) {
      setCourses(courses.filter(c => c.id !== course.id));
    }
  };

  const handleViewCourse = (course) => {
    setViewCourse(course);
    setIsDetailsOpen(true);
  };

  const handleSaveCourse = (data) => {
    if (selectedCourse) {
      // Update existing course
      setCourses(courses.map(c => c.id === selectedCourse.id ? { ...data, id: c.id } : c));
    } else {
      // Add new course
      const newCourse = {
        ...data,
        id: Math.max(...courses.map(c => c.id)) + 1
      };
      setCourses([...courses, newCourse]);
    }
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <CoursesHeader />

        {/* Search and Add */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <button
            onClick={handleAddCourse}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Course
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{courses.length}</p>
                <p className="text-sm text-slate-400">Total Courses</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Users className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {courses.reduce((sum, c) => sum + (c.students || 0), 0)}
                </p>
                <p className="text-sm text-slate-400">Total Students</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <BarChart className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {courses.filter(c => c.status === 'active').length}
                </p>
                <p className="text-sm text-slate-400">Active Courses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <SettingsSection
          title="All Courses"
          description="Manage your immigration courses"
          icon={BookOpen}
        >
          {filteredCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-16 h-16 text-slate-600 mb-4" />
              <p className="text-slate-400 text-lg mb-2">No courses found</p>
              <p className="text-slate-500 text-sm">
                {searchTerm ? 'Try a different search term' : 'Create your first course to get started'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEdit={handleEditCourse}
                  onDelete={handleDeleteCourse}
                  onView={handleViewCourse}
                />
              ))}
            </div>
          )}
        </SettingsSection>

        {/* Modals */}
        <CourseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCourse(null);
          }}
          course={selectedCourse}
          onSave={handleSaveCourse}
        />

        <CourseDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setViewCourse(null);
          }}
          course={viewCourse}
        />
      </div>
    </div>
  );
}