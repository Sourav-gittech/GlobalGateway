import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { 
  Globe,
  Flag,
  Image,
  MapPin,
  DollarSign,
  Save,
  RefreshCw,
  Check,
  Languages,
  Map,
  Users,
  Eye,
  FileText,
  Settings,
  Upload,
  Loader2
} from "lucide-react";

// Settings Section Component
function SettingsSection({ title, description, icon: Icon, children }) {
  return (
    <div className="p-5 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <div className="flex items-start gap-3 mb-4 sm:mb-5">
        <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{title}</h3>
          {description && <p className="text-sm text-slate-400">{description}</p>}
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

// Form Field Component
function FormField({ label, id, type = "text", placeholder, register, helper, error, rows, maxLength }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          rows={rows || 3}
          placeholder={placeholder}
          maxLength={maxLength}
          {...register}
          className={`w-full px-4 py-2.5 bg-slate-700/30 border ${
            error ? 'border-red-500/50' : 'border-slate-600/50'
          } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          {...register}
          className={`w-full px-4 py-2.5 bg-slate-700/30 border ${
            error ? 'border-red-500/50' : 'border-slate-600/50'
          } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm`}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
      {helper && <p className="mt-1 text-xs text-slate-400">{helper}</p>}
    </div>
  );
}

// Toggle Switch Component
function ToggleSwitch({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="text-sm font-medium text-white mb-1">{label}</div>
        {description && <div className="text-xs text-slate-400">{description}</div>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex-shrink-0 ${
          checked ? 'bg-blue-600' : 'bg-slate-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

// Select Field Component
function SelectField({ label, id, register, options, error }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <select
        id={id}
        {...register}
        className={`w-full px-4 py-2.5 bg-slate-700/30 border ${
          error ? 'border-red-500/50' : 'border-slate-600/50'
        } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    </div>
  );
}

// Image Preview Component
function ImagePreview({ url, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!url || error) return null;

  return (
    <div className="mt-2">
      <img
        src={url}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{ display: loaded ? 'block' : 'none' }}
      />
    </div>
  );
}

export default function AddCountry() {
  const [showSuccess, setShowSuccess] = useState(false);

  const { 
    register, 
    handleSubmit, 
    control,
    watch, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
      officialName: "",
      continent: "",
      region: "",
      capital: "",
      flagUrl: "",
      imageUrl: "",
      area: "",
      population: "",
      latitude: "",
      longitude: "",
      currency: "",
      currencySymbol: "",
      language: "",
      overview: "",
      description: "",
      availableVisas: "",
      visaRequired: true,
      isActive: true
    }
  });

  // Watch image URLs for preview
  const flagUrl = watch("flagUrl");
  const imageUrl = watch("imageUrl");

  // Options
  const continents = [
    { value: "Africa", label: "Africa" },
    { value: "Antarctica", label: "Antarctica" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "North America", label: "North America" },
    { value: "South America", label: "South America" },
    { value: "Oceania", label: "Oceania" }
  ];

  // Submit handler
  const onSubmit = async (data) => {
    // Prepare data for Supabase
    const countryData = {
      name: data.name,
      code: data.code.toUpperCase(),
      official_name: data.officialName,
      continent: data.continent,
      region: data.region,
      capital: data.capital,
      flag_url: data.flagUrl,
      image_url: data.imageUrl,
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
      created_at: new Date().toISOString()
    };

    // Simulate API call - Replace with actual Supabase insert
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Country data to save:", countryData);
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // TODO: Implement Supabase insert
    // const { data, error } = await supabase
    //   .from('countries')
    //   .insert([countryData]);
    // 
    // if (error) {
    //   console.error("Error:", error);
    // } else {
    //   setShowSuccess(true);
    //   setTimeout(() => setShowSuccess(false), 3000);
    //   reset(); // Reset form after successful submission
    // }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Add New Country</h1>
          <p className="text-slate-400">Add a new country to the immigration platform</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white text-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save Country</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-sm text-green-400">Country added successfully!</span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <SettingsSection
          title="Basic Information"
          description="Essential country details"
          icon={Globe}
        >
          <FormField
            label="Country Name *"
            id="name"
            placeholder="e.g., United Arab Emirates"
            register={register("name", { 
              required: "Country name is required" 
            })}
            error={errors.name}
          />
          <FormField
            label="Country Code *"
            id="code"
            placeholder="e.g., AE"
            register={register("code", { 
              required: "Country code is required",
              minLength: { value: 2, message: "Code must be 2 characters" },
              maxLength: { value: 2, message: "Code must be 2 characters" },
              onChange: (e) => e.target.value = e.target.value.toUpperCase()
            })}
            error={errors.code}
            maxLength={2}
            helper="2-letter ISO country code"
          />
          <FormField
            label="Official Name *"
            id="officialName"
            placeholder="e.g., United Arab Emirates"
            register={register("officialName", { 
              required: "Official name is required" 
            })}
            error={errors.officialName}
          />
          <SelectField
            label="Continent *"
            id="continent"
            register={register("continent", { 
              required: "Continent is required" 
            })}
            options={continents}
            error={errors.continent}
          />
          <FormField
            label="Region *"
            id="region"
            placeholder="e.g., Western Asia"
            register={register("region", { 
              required: "Region is required" 
            })}
            error={errors.region}
          />
          <FormField
            label="Capital *"
            id="capital"
            placeholder="e.g., Abu Dhabi"
            register={register("capital", { 
              required: "Capital is required" 
            })}
            error={errors.capital}
          />
        </SettingsSection>

        {/* Images & Media */}
        <SettingsSection
          title="Images & Media"
          description="Visual content for the country"
          icon={Image}
        >
          <FormField
            label="Flag URL *"
            id="flagUrl"
            placeholder="https://example.com/flag.png"
            register={register("flagUrl", { 
              required: "Flag URL is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Must be a valid URL"
              }
            })}
            error={errors.flagUrl}
            helper="Recommended: 320x240px, PNG or JPG"
          />
          {flagUrl && !errors.flagUrl && (
            <ImagePreview 
              url={flagUrl} 
              alt="Flag preview" 
              className="h-12 rounded border border-slate-600/50"
            />
          )}
          <FormField
            label="Country Image URL *"
            id="imageUrl"
            placeholder="https://example.com/country.jpg"
            register={register("imageUrl", { 
              required: "Image URL is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Must be a valid URL"
              }
            })}
            error={errors.imageUrl}
            helper="Recommended: 800x600px, high quality"
          />
          {imageUrl && !errors.imageUrl && (
            <ImagePreview 
              url={imageUrl} 
              alt="Country preview" 
              className="h-32 w-auto rounded-lg border border-slate-600/50"
            />
          )}
        </SettingsSection>

        {/* Geographic Details */}
        <SettingsSection
          title="Geographic Details"
          description="Location and area information"
          icon={MapPin}
        >
          <FormField
            label="Area *"
            id="area"
            placeholder="e.g., 83,600 sq km"
            register={register("area", { 
              required: "Area is required" 
            })}
            error={errors.area}
            helper="Total area in square kilometers"
          />
          <FormField
            label="Population *"
            id="population"
            placeholder="e.g., 11,294,243"
            register={register("population", { 
              required: "Population is required" 
            })}
            error={errors.population}
            helper="Current population estimate"
          />
          <FormField
            label="Latitude"
            id="latitude"
            placeholder="e.g., 23.4241"
            register={register("latitude", {
              pattern: {
                value: /^-?\d+\.?\d*$/,
                message: "Must be a valid number"
              }
            })}
            error={errors.latitude}
            helper="For map display (optional)"
          />
          <FormField
            label="Longitude"
            id="longitude"
            placeholder="e.g., 53.8478"
            register={register("longitude", {
              pattern: {
                value: /^-?\d+\.?\d*$/,
                message: "Must be a valid number"
              }
            })}
            error={errors.longitude}
            helper="For map display (optional)"
          />
        </SettingsSection>

        {/* Cultural & Financial */}
        <SettingsSection
          title="Cultural & Financial"
          description="Currency and language details"
          icon={DollarSign}
        >
          <FormField
            label="Currency *"
            id="currency"
            placeholder="e.g., United Arab Emirates dirham (د.إ)"
            register={register("currency", { 
              required: "Currency is required" 
            })}
            error={errors.currency}
            helper="Full currency name with symbol"
          />
          <FormField
            label="Currency Symbol"
            id="currencySymbol"
            placeholder="e.g., د.إ"
            register={register("currencySymbol")}
            helper="Currency symbol (optional)"
          />
          <FormField
            label="Primary Language(s) *"
            id="language"
            placeholder="e.g., Arabic, English"
            register={register("language", { 
              required: "Language is required" 
            })}
            error={errors.language}
            helper="Comma-separated if multiple"
          />
        </SettingsSection>

        {/* Content */}
        <SettingsSection
          title="Content"
          description="Descriptive text about the country"
          icon={FileText}
        >
          <FormField
            label="Overview *"
            id="overview"
            type="textarea"
            rows={4}
            placeholder="Detailed overview about the country..."
            register={register("overview", { 
              required: "Overview is required" 
            })}
            error={errors.overview}
            helper="Full description for detail page"
          />
          <FormField
            label="Short Description *"
            id="description"
            type="textarea"
            rows={2}
            placeholder="Brief description for card display..."
            register={register("description", { 
              required: "Description is required" 
            })}
            error={errors.description}
            helper="Brief summary for country cards"
          />
          <FormField
            label="Available Visas"
            id="availableVisas"
            placeholder="e.g., Tourist Visa, Business Visa, Work Visa"
            register={register("availableVisas")}
            helper="Comma-separated visa types (optional)"
          />
        </SettingsSection>

        {/* Settings */}
        <SettingsSection
          title="Settings"
          description="Country visibility and requirements"
          icon={Settings}
        >
          <Controller
            name="visaRequired"
            control={control}
            render={({ field }) => (
              <ToggleSwitch
                label="Visa Required"
                description="Indicates if visa is required for entry"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <ToggleSwitch
                label="Active Status"
                description="Show this country to users on the platform"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
            <div className="text-sm font-medium text-white mb-2">Preview Status</div>
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {watch("visaRequired") && (
                <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Visa Required
                </span>
              )}
              <span className={`px-2 py-1 rounded-full border ${
                watch("isActive")
                  ? "bg-green-500/20 text-green-400 border-green-500/30" 
                  : "bg-slate-500/20 text-slate-400 border-slate-500/30"
              }`}>
                {watch("isActive") ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </SettingsSection>
      </div>


    </form>
  );
}