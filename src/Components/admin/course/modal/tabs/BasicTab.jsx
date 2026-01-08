import { useRef } from "react";
import FormInput from "./FormInput";
import { RotateCcw, Trash2, Upload } from "lucide-react";

export default function BasicTab({ register, errors, iconOptions, watch, setValue, isEdit }) {
    const fileInputRef = useRef(null);

    const handleThumbnailChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setValue("thumbnailFile", file, { shouldValidate: true });
        setValue("img_url", URL.createObjectURL(file), { shouldValidate: true });
    };

    const handleDeleteThumbnail = () => {
        setValue("thumbnailFile", null, { shouldValidate: true });
        setValue("img_url", "", { shouldValidate: true });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleReloadThumbnail = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    return (
        <div className="space-y-4">
            {/* Course Name */}
            <FormInput label="Course Name" name="course_name" register={register}
                rules={{ required: "Course name is required" }} disabled={isEdit}
                errors={errors} placeholder="Enter course name" required />

            {/* Short Description */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Short Description <span className="text-red-400">*</span>
                </label>
                <textarea
                    {...register("description", { required: "Description is required" })}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm"
                    placeholder="Brief course description for listing page"
                />
                {errors.description && (
                    <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>
                )}
            </div>

            {/* Skill Level, Language, Status */}
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Skill Level <span className="text-red-400">*</span>
                    </label>
                    <select
                        {...register("skillLevel", { required: true })}
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
                        {...register("language", { required: "Language is required" })}
                        className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                        placeholder="English"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Status <span className="text-red-400">*</span>
                    </label>
                    <select
                        {...register("status", { required: true })}
                        className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Draft</option>
                    </select>
                </div>
            </div>

            {/* Course Icon */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Course Icon <span className="text-red-400">*</span></label>
                <select
                    {...register("icon", { required: "Course icon is required" })}
                    className="w-full px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                >
                    {iconOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {errors.icon && (
                    <p className="mt-1 text-xs text-red-400">{errors.icon.message}</p>
                )}
            </div>

            {/* Course Thumbnail */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Course Thumbnail <span className="text-red-400">*</span></label>
                <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" id="courseThumbnail"
                    onChange={handleThumbnailChange} ref={fileInputRef} />
                <input type="hidden" {...register("img_url", { required: "Course thumbnail is required" })} />

                <div className="relative w-full h-44 rounded-xl border border-dashed border-slate-600 bg-slate-800/40 overflow-hidden">
                    {watch("img_url") ? (
                        <>
                            <img src={watch("img_url")} alt="Course Thumbnail" className="w-full h-full object-cover" />

                            <div className="absolute top-3 right-3 flex gap-2">
                                {/* Reload */}
                                <button
                                    type="button"
                                    onClick={handleReloadThumbnail}
                                    className="px-3 py-1.5 bg-white/10 text-white rounded-md text-xs font-medium hover:bg-blue-600 transition"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>

                                {/* Delete */}
                                <button
                                    type="button"
                                    onClick={handleDeleteThumbnail}
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

                {errors.img_url && (
                    <p className="mt-1 text-xs text-red-400">{errors.img_url.message}</p>
                )}
            </div>
        </div>
    );
}