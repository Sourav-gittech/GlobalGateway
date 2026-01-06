import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { RotateCcw, Plus, Trash2, Video, FileText, Upload, X, Save } from 'lucide-react';

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

const CourseFormModal = ({ iconOptions, isOpen, onClose, course, onSave }) => {
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
    const [videoUploadProgress, setVideoUploadProgress] = useState(0);
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);

    const handleRemoveVideo = () => {
        setValue("video.file", null);
        setValue("video.preview", "");
        setVideoUploadProgress(0);
        setIsUploadingVideo(false);
    };

    const handleRemoveVideoThumbnail = () => {
        setValue("video.thumbnailFile", null);
        setValue("video.thumbnail", "");
    };

    const handleRemoveCourseThumbnail = () => {
        setValue("thumbnailFile", null);
        setValue("img_url", "");
    };

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

                                            {/* Overlay Actions */}
                                            <div className="absolute top-3 right-3 flex gap-2">
                                                {/* Replace */}
                                                <label
                                                    htmlFor="courseThumbnail"
                                                    className="px-3 py-1.5 bg-white/10 text-white rounded-md text-xs font-medium cursor-pointer hover:bg-blue-600 transition"
                                                >
                                                    <RotateCcw className="w-4 h-4" />
                                                </label>

                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveCourseThumbnail}
                                                    className="px-3 py-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-md text-xs font-medium transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <label
                                            htmlFor="courseThumbnail"
                                            className="flex flex-col items-center justify-center h-full cursor-pointer"
                                        >
                                            <Upload className="w-6 h-6 text-slate-400 mb-2" />
                                            <p className="text-sm text-slate-400">Upload course thumbnail</p>
                                            <p className="text-xs text-slate-500 mt-1">JPG, PNG, WebP</p>
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

                                        setIsUploadingVideo(true);
                                        setVideoUploadProgress(0);

                                        setValue("video.file", file);

                                        // 🔹 Simulated upload progress
                                        let progress = 0;
                                        const interval = setInterval(() => {
                                            progress += Math.random() * 12; // smooth random progress

                                            if (progress >= 100) {
                                                progress = 100;
                                                clearInterval(interval);

                                                setValue("video.preview", URL.createObjectURL(file));
                                                setIsUploadingVideo(false);
                                            }

                                            setVideoUploadProgress(Math.floor(progress));
                                        }, 200);
                                    }}

                                />

                                <div className="relative w-full h-56 rounded-xl border border-dashed border-slate-600 bg-slate-800/40 overflow-hidden">
                                    {/* Upload Progress */}
                                    {isUploadingVideo && (
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/10 backdrop-blur-sm">
                                            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 transition-all duration-300"
                                                    style={{ width: `${videoUploadProgress}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-300 mt-1 text-right">
                                                Uploading... {videoUploadProgress}%
                                            </p>
                                        </div>
                                    )}

                                    {watch("video.preview") ? (
                                        <>
                                            <video
                                                src={watch("video.preview")}
                                                controls
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Overlay Actions */}
                                            <div className="absolute top-3 right-3 flex gap-2">
                                                {/* Replace */}
                                                <label
                                                    htmlFor="videoUpload"
                                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition
      ${isUploadingVideo
                                                            ? "bg-white/10 cursor-not-allowed text-slate-300"
                                                            : "bg-white/10 text-white cursor-pointer hover:bg-blue-600"
                                                        }`}
                                                >
                                                    <RotateCcw className="w-4 h-4" />

                                                </label>

                                                {/* Delete */}
                                                {!isUploadingVideo && (
                                                    <button
                                                        type="button"
                                                        onClick={handleRemoveVideo}
                                                        className="px-3 mr-2 py-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-md text-xs font-medium transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
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

                                            {/* Overlay Actions */}
                                            <div className="absolute top-3 right-3 flex gap-2">
                                                {/* Replace */}
                                                <label
                                                    htmlFor="videoThumbnail"
                                                    className="px-3 py-1.5 bg-white/10 text-white rounded-md text-xs font-medium cursor-pointer hover:bg-blue-600 transition"
                                                >
                                                    <RotateCcw className="w-4 h-4" />
                                                </label>

                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveVideoThumbnail}
                                                    className="px-3 py-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-md text-xs font-medium transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <label
                                            htmlFor="videoThumbnail"
                                            className="flex flex-col items-center justify-center h-full cursor-pointer"
                                        >
                                            <Upload className="w-5 h-5 text-slate-400 mb-2" />
                                            <p className="text-sm text-slate-400">Upload video thumbnail</p>
                                            <p className="text-xs text-slate-500">JPG, PNG, WebP</p>
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
                                    onClick={() =>
                                        appendDocument({
                                            name: '',
                                            type: 'PDF',
                                            isFree: false,
                                            file: null,
                                            previewUrl: '',
                                            size: '',
                                        })
                                    }

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
                                        {/* Document Upload */}
                                        <div
                                            className="w-full rounded-xl border border-dashed border-slate-600 bg-slate-800/40 p-4 text-center"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                const file = e.dataTransfer.files?.[0];
                                                if (!file) return;

                                                setValue(`documents.${index}.file`, file);
                                                setValue(`documents.${index}.previewUrl`, URL.createObjectURL(file));
                                                setValue(`documents.${index}.size`, (file.size / (1024 * 1024)).toFixed(2) + " MB");
                                                setValue(`documents.${index}.name`, file.name);
                                                setValue(`documents.${index}.type`, file.name.split('.').pop().toUpperCase());
                                            }}
                                        >
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                                                className="hidden"
                                                id={`docUpload-${index}`}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    setValue(`documents.${index}.file`, file);
                                                    setValue(`documents.${index}.previewUrl`, URL.createObjectURL(file));
                                                    setValue(`documents.${index}.size`, (file.size / (1024 * 1024)).toFixed(2) + " MB");
                                                    setValue(`documents.${index}.name`, file.name);
                                                    setValue(`documents.${index}.type`, file.name.split('.').pop().toUpperCase());
                                                }}
                                            />

                                            {watch(`documents.${index}.file`) ? (
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="w-5 h-5 text-blue-400" />
                                                        <div className="text-left">
                                                            <p className="text-sm text-white font-medium">
                                                                {watch(`documents.${index}.name`)}
                                                            </p>
                                                            <p className="text-xs text-slate-400">
                                                                {watch(`documents.${index}.size`)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setValue(`documents.${index}.file`, null);
                                                            setValue(`documents.${index}.previewUrl`, '');
                                                            setValue(`documents.${index}.size`, '');
                                                        }}
                                                        className="p-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded hover:bg-red-500/30"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label
                                                    htmlFor={`docUpload-${index}`}
                                                    className="flex flex-col items-center justify-center cursor-pointer"
                                                >
                                                    <Upload className="w-5 h-5 text-slate-400 mb-2" />
                                                    <p className="text-sm text-slate-400">Drag & drop or click to upload</p>
                                                    <p className="text-xs text-slate-500">PDF, DOCX, XLSX</p>
                                                </label>
                                            )}
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

export default CourseFormModal