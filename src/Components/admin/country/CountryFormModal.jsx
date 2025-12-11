import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Globe, Image, MapPin, DollarSign, Save, RefreshCw, Check, FileText, Settings, Loader2, Plus, X, Edit, Trash2, Search, ChevronDown, ChevronUp, Calendar, Users, TrendingUp, Upload } from "lucide-react";

const SettingsSection = ({ title, description, icon: Icon, children }) => (
    <div className="p-5 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
        <div className="flex items-start gap-3 mb-4 sm:mb-5">
            <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30"><Icon className="w-5 h-5 text-blue-400" /></div>
            <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{title}</h3>
                {description && <p className="text-sm text-slate-400">{description}</p>}
            </div>
        </div>
        <div className="space-y-4">{children}</div>
    </div>
);

const FormField = ({ label, id, type = "text", placeholder, register, helper, error, rows, maxLength }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        {type === "textarea" ? (
            <textarea id={id} rows={rows || 3} placeholder={placeholder} maxLength={maxLength} {...register} className={`w-full px-4 py-2.5 bg-slate-700/30 border ${error ? 'border-red-500/50' : 'border-slate-600/50'} rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm resize-none`} />
        ) : (
            <input id={id} type={type} placeholder={placeholder} maxLength={maxLength} {...register} className={`w-full px-4 py-2.5 bg-slate-700/30 border ${error ? 'border-red-500/50' : 'border-slate-600/50'} rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm`} />
        )}
        {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
        {helper && <p className="mt-1 text-xs text-slate-400">{helper}</p>}
    </div>
);

const ImageUploadField = ({ label, id, helper, error, currentImageUrl, onImageSelect, uploading }) => {
    const [previewUrl, setPreviewUrl] = useState(currentImageUrl);

    useEffect(() => {
        setPreviewUrl(currentImageUrl);
    }, [currentImageUrl]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            
            // Pass file to parent
            onImageSelect(file);
        }
    };

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
            <div className="space-y-3">
                <div className="relative">
                    <input
                        id={id}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="hidden"
                    />
                    <label
                        htmlFor={id}
                        className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-slate-700/30 border ${error ? 'border-red-500/50' : 'border-slate-600/50'} rounded-lg text-white hover:bg-slate-700/50 transition-colors cursor-pointer text-sm ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                <span>Choose Image</span>
                            </>
                        )}
                    </label>
                </div>
                {previewUrl && (
                    <div className="relative">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-32 w-auto rounded-lg border border-slate-600/50"
                        />
                        {!uploading && (
                            <button
                                type="button"
                                onClick={() => {
                                    setPreviewUrl(null);
                                    onImageSelect(null);
                                }}
                                className="absolute top-2 right-2 p-1 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
            {helper && <p className="mt-1 text-xs text-slate-400">{helper}</p>}
        </div>
    );
};

const ToggleSwitch = ({ label, description, checked, onChange }) => (
    <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
            <div className="text-sm font-medium text-white mb-1">{label}</div>
            {description && <div className="text-xs text-slate-400">{description}</div>}
        </div>
        <button type="button" onClick={() => onChange(!checked)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex-shrink-0 ${checked ? 'bg-blue-600' : 'bg-slate-700'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

const SelectField = ({ label, id, register, options, error }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        <select id={id} {...register} className={`w-full px-4 py-2.5 bg-slate-700/30 border ${error ? 'border-red-500/50' : 'border-slate-600/50'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer`}>
            <option value="">Select {label}</option>
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    </div>
);

const ImagePreview = ({ url, alt, className }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    return !url || error ? null : <div className="mt-2"><img src={url} alt={alt} className={className} onLoad={() => setLoaded(true)} onError={() => setError(true)} style={{ display: loaded ? 'block' : 'none' }} /></div>;
};

const CountryFormModal = ({ isOpen, onClose, country, onSave, supabaseClient }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    
    const { register, handleSubmit, control, watch, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: { name: "", code: "", officialName: "", continent: "", region: "", capital: "", flagUrl: "", imageUrl: "", area: "", population: "", latitude: "", longitude: "", currency: "", currencySymbol: "", language: "", overview: "", description: "", availableVisas: "", visaRequired: true, isActive: true } });

    useEffect(() => {
        country ? reset({ name: country.name || "", code: country.code || "", officialName: country.official_name || "", continent: country.continent || "", region: country.region || "", capital: country.capital || "", flagUrl: country.flag_url || "", imageUrl: country.image_url || "", area: country.area || "", population: country.population || "", latitude: country.latitude || "", longitude: country.longitude || "", currency: country.currency || "", currencySymbol: country.currency_symbol || "", language: country.language || "", overview: country.overview || "", description: country.description || "", availableVisas: country.available_visas || "", visaRequired: country.visa_required !== undefined ? country.visa_required : true, isActive: country.is_active !== undefined ? country.is_active : true }) : reset({ name: "", code: "", officialName: "", continent: "", region: "", capital: "", flagUrl: "", imageUrl: "", area: "", population: "", latitude: "", longitude: "", currency: "", currencySymbol: "", language: "", overview: "", description: "", availableVisas: "", visaRequired: true, isActive: true });
        setImageFile(null);
        setUploadError(null);
    }, [country, reset]);

    const flagUrl = watch("flagUrl"), imageUrl = watch("imageUrl");
    const continents = [{ value: "Africa", label: "Africa" }, { value: "Antarctica", label: "Antarctica" }, { value: "Asia", label: "Asia" }, { value: "Europe", label: "Europe" }, { value: "North America", label: "North America" }, { value: "South America", label: "South America" }, { value: "Oceania", label: "Oceania" }];

    const uploadImageToSupabase = async (file, countryCode) => {
        if (!supabaseClient) {
            throw new Error("Supabase client not provided");
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${countryCode}-${Date.now()}.${fileExt}`;
        const filePath = `country-images/${fileName}`;

        const { data, error } = await supabaseClient.storage
            .from('countries')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            throw error;
        }

        const { data: urlData } = supabaseClient.storage
            .from('countries')
            .getPublicUrl(filePath);

        return urlData.publicUrl;
    };

    const onSubmit = async (data) => {
        try {
            setUploadError(null);
            let finalImageUrl = data.imageUrl;

            // Upload image if a new file was selected
            if (imageFile) {
                setUploading(true);
                finalImageUrl = await uploadImageToSupabase(imageFile, data.code.toUpperCase());
            }

            const countryData = { 
                id: country ? country.id : Date.now(), 
                name: data.name, 
                code: data.code.toUpperCase(), 
                official_name: data.officialName, 
                continent: data.continent, 
                region: data.region, 
                capital: data.capital, 
                flag_url: data.flagUrl, 
                image_url: finalImageUrl, 
                area: data.area, 
                population: data.population, 
                latitude: data.latitude || null, 
                longitude: data.longitude || null, 
                currency: data.currency, 
                currency_symbol: data.currencySymbol || null, 
                language: data.language, 
                overview: data.overview, 
                description: data.description, 
                available_visas: data.availableVisas || null, 
                visa_required: data.visaRequired, 
                is_active: data.isActive, 
                created_at: country ? country.created_at : new Date().toISOString(), 
                updated_at: new Date().toISOString() 
            };
            
            await new Promise(r => setTimeout(r, 500));
            console.log("Save:", countryData);
            setShowSuccess(true);
            setTimeout(() => { 
                setShowSuccess(false); 
                onSave(countryData); 
                reset(); 
                setImageFile(null);
                onClose(); 
            }, 1500);
        } catch (error) {
            console.error("Error saving country:", error);
            setUploadError(error.message || "Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-black/60 rounded-2xl border border-slate-700 w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-slate-700/50 flex-shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{country ? 'Edit Country' : 'Register New Country'}</h2>
                        <p className="text-sm text-slate-400 mt-1">{country ? 'Update country information' : 'Add a new country to Global Gateway'}</p>
                    </div>
                    <button onClick={onClose} type="button" className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                </div>

                <div className="scroll-bar flex-1 overflow-y-auto p-6">
                    {showSuccess && <div className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center gap-3"><Check className="w-5 h-5 text-green-400 flex-shrink-0" /><span className="text-sm text-green-400">Country {country ? 'updated' : 'added'} successfully!</span></div>}
                    {uploadError && <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center gap-3"><X className="w-5 h-5 text-red-400 flex-shrink-0" /><span className="text-sm text-red-400">{uploadError}</span></div>}
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <SettingsSection title="Basic Information" description="Essential country details" icon={Globe}>
                            <FormField label="Country Name *" id="name" placeholder="e.g., United Arab Emirates" register={register("name", { required: "Country name is required" })} error={errors.name} />
                            <FormField label="Country Code *" id="code" placeholder="e.g., AE" register={register("code", { required: "Country code is required", minLength: { value: 2, message: "Code must be 2 characters" }, maxLength: { value: 2, message: "Code must be 2 characters" } })} error={errors.code} maxLength={2} helper="2-letter ISO country code" />
                            <FormField label="Official Name *" id="officialName" placeholder="e.g., United Arab Emirates" register={register("officialName", { required: "Official name is required" })} error={errors.officialName} />
                            <SelectField label="Continent *" id="continent" register={register("continent", { required: "Continent is required" })} options={continents} error={errors.continent} />
                            <FormField label="Region *" id="region" placeholder="e.g., Western Asia" register={register("region", { required: "Region is required" })} error={errors.region} />
                            <FormField label="Capital *" id="capital" placeholder="e.g., Abu Dhabi" register={register("capital", { required: "Capital is required" })} error={errors.capital} />
                        </SettingsSection>

                        <SettingsSection title="Images & Media" description="Visual content" icon={Image}>
                            <FormField label="Flag URL *" id="flagUrl" placeholder="https://example.com/flag.png" register={register("flagUrl", { required: "Flag URL is required", pattern: { value: /^https?:\/\/.+/, message: "Must be a valid URL" } })} error={errors.flagUrl} helper="Recommended: 320x240px" />
                            {flagUrl && !errors.flagUrl && <ImagePreview url={flagUrl} alt="Flag" className="h-12 rounded border border-slate-600/50" />}
                            
                            <ImageUploadField
                                label="Country Image *"
                                id="countryImage"
                                helper="Upload an image (recommended: 800x600px)"
                                currentImageUrl={imageUrl}
                                onImageSelect={setImageFile}
                                uploading={uploading}
                                error={!imageFile && !imageUrl ? { message: "Image is required" } : null}
                            />
                        </SettingsSection>

                        <SettingsSection title="Geographic Details" description="Location and area" icon={MapPin}>
                            <FormField label="Area *" id="area" placeholder="e.g., 83,600 sq km" register={register("area", { required: "Area is required" })} error={errors.area} helper="Total area in sq km" />
                            <FormField label="Population *" id="population" placeholder="e.g., 11,294,243" register={register("population", { required: "Population is required" })} error={errors.population} helper="Current population" />
                            <FormField label="Latitude" id="latitude" placeholder="e.g., 23.4241" register={register("latitude", { pattern: { value: /^-?\d+\.?\d*$/, message: "Must be valid number" } })} error={errors.latitude} helper="For map (optional)" />
                            <FormField label="Longitude" id="longitude" placeholder="e.g., 53.8478" register={register("longitude", { pattern: { value: /^-?\d+\.?\d*$/, message: "Must be valid number" } })} error={errors.longitude} helper="For map (optional)" />
                        </SettingsSection>

                        <SettingsSection title="Cultural & Financial" description="Currency and language" icon={DollarSign}>
                            <FormField label="Currency *" id="currency" placeholder="e.g., UAE dirham (د.إ)" register={register("currency", { required: "Currency is required" })} error={errors.currency} helper="Full currency name" />
                            <FormField label="Currency Symbol" id="currencySymbol" placeholder="e.g., د.إ" register={register("currencySymbol")} helper="Symbol (optional)" />
                            <FormField label="Primary Language(s) *" id="language" placeholder="e.g., Arabic, English" register={register("language", { required: "Language is required" })} error={errors.language} helper="Comma-separated" />
                        </SettingsSection>

                        <SettingsSection title="Content" description="Descriptive text" icon={FileText}>
                            <FormField label="Overview *" id="overview" type="textarea" rows={4} placeholder="Detailed overview..." register={register("overview", { required: "Overview is required" })} error={errors.overview} helper="Full description" />
                            <FormField label="Short Description *" id="description" type="textarea" rows={2} placeholder="Brief description..." register={register("description", { required: "Description is required" })} error={errors.description} helper="Brief summary" />
                            <FormField label="Available Visas" id="availableVisas" placeholder="e.g., Tourist, Business" register={register("availableVisas")} helper="Comma-separated" />
                        </SettingsSection>

                        <SettingsSection title="Settings" description="Visibility and requirements" icon={Settings}>
                            <Controller name="visaRequired" control={control} render={({ field }) => <ToggleSwitch label="Visa Required" description="Visa required for entry" checked={field.value} onChange={field.onChange} />} />
                            <Controller name="isActive" control={control} render={({ field }) => <ToggleSwitch label="Active Status" description="Show to users" checked={field.value} onChange={field.onChange} />} />
                            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                                <div className="text-sm font-medium text-white mb-2">Preview Status</div>
                                <div className="flex items-center gap-2 flex-wrap text-xs">
                                    {watch("visaRequired") && <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Visa Required</span>}
                                    <span className={`px-2 py-1 rounded-full border ${watch("isActive") ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-slate-500/20 text-slate-400 border-slate-500/30"}`}>{watch("isActive") ? "Active" : "Inactive"}</span>
                                </div>
                            </div>
                        </SettingsSection>
                        
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-6 border-t border-slate-700/50 flex-shrink-0">
                    <button type="button" onClick={() => { reset(); setImageFile(null); }} disabled={isSubmitting || uploading} className="px-4 py-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all flex items-center gap-2 disabled:opacity-50 justify-center sm:justify-start"><RefreshCw className="w-4 h-4" /><span className="hidden sm:inline">Reset</span></button>
                    <div className="flex gap-2">
                        <button type="button" onClick={onClose} disabled={isSubmitting || uploading} className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all disabled:opacity-50">Cancel</button>
                        <button type="button" onClick={handleSubmit(onSubmit)} disabled={isSubmitting || uploading} className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                            {(isSubmitting || uploading) ? <><Loader2 className="w-4 h-4 animate-spin" /><span className="hidden sm:inline">Saving...</span></> : <><Save className="w-4 h-4" /><span className="hidden sm:inline">{country ? 'Update' : 'Save'} Country</span></>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryFormModal;