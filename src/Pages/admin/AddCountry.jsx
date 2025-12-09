import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Globe, Image, MapPin, DollarSign, Save, RefreshCw, Check, FileText, Settings, Loader2, Plus, X, Edit, Trash2, Search, ChevronDown, ChevronUp, Calendar, Users, TrendingUp } from "lucide-react";

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

const CountryFormModal = ({ isOpen, onClose, country, onSave }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { register, handleSubmit, control, watch, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: { name: "", code: "", officialName: "", continent: "", region: "", capital: "", flagUrl: "", imageUrl: "", area: "", population: "", latitude: "", longitude: "", currency: "", currencySymbol: "", language: "", overview: "", description: "", availableVisas: "", visaRequired: true, isActive: true } });

  useEffect(() => {
    country ? reset({ name: country.name || "", code: country.code || "", officialName: country.official_name || "", continent: country.continent || "", region: country.region || "", capital: country.capital || "", flagUrl: country.flag_url || "", imageUrl: country.image_url || "", area: country.area || "", population: country.population || "", latitude: country.latitude || "", longitude: country.longitude || "", currency: country.currency || "", currencySymbol: country.currency_symbol || "", language: country.language || "", overview: country.overview || "", description: country.description || "", availableVisas: country.available_visas || "", visaRequired: country.visa_required !== undefined ? country.visa_required : true, isActive: country.is_active !== undefined ? country.is_active : true }) : reset({ name: "", code: "", officialName: "", continent: "", region: "", capital: "", flagUrl: "", imageUrl: "", area: "", population: "", latitude: "", longitude: "", currency: "", currencySymbol: "", language: "", overview: "", description: "", availableVisas: "", visaRequired: true, isActive: true });
  }, [country, reset]);

  const flagUrl = watch("flagUrl"), imageUrl = watch("imageUrl");
  const continents = [{ value: "Africa", label: "Africa" }, { value: "Antarctica", label: "Antarctica" }, { value: "Asia", label: "Asia" }, { value: "Europe", label: "Europe" }, { value: "North America", label: "North America" }, { value: "South America", label: "South America" }, { value: "Oceania", label: "Oceania" }];

  const onSubmit = async (data) => {
    const countryData = { id: country ? country.id : Date.now(), name: data.name, code: data.code.toUpperCase(), official_name: data.officialName, continent: data.continent, region: data.region, capital: data.capital, flag_url: data.flagUrl, image_url: data.imageUrl, area: data.area, population: data.population, latitude: data.latitude || null, longitude: data.longitude || null, currency: data.currency, currency_symbol: data.currencySymbol || null, language: data.language, overview: data.overview, description: data.description, available_visas: data.availableVisas || null, visa_required: data.visaRequired, is_active: data.isActive, created_at: country ? country.created_at : new Date().toISOString(), updated_at: new Date().toISOString() };
    await new Promise(r => setTimeout(r, 1000));
    console.log("Save:", countryData);
    setShowSuccess(true);
    setTimeout(() => { setShowSuccess(false); onSave(countryData); reset(); onClose(); }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-white">{country ? 'Edit Country' : 'Add New Country'}</h2>
            <p className="text-sm text-slate-400 mt-1">{country ? 'Update country information' : 'Add a new country to the platform'}</p>
          </div>
          <button onClick={onClose} type="button" className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {showSuccess && <div className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center gap-3"><Check className="w-5 h-5 text-green-400 flex-shrink-0" /><span className="text-sm text-green-400">Country {country ? 'updated' : 'added'} successfully!</span></div>}
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
              <FormField label="Country Image URL *" id="imageUrl" placeholder="https://example.com/country.jpg" register={register("imageUrl", { required: "Image URL is required", pattern: { value: /^https?:\/\/.+/, message: "Must be a valid URL" } })} error={errors.imageUrl} helper="Recommended: 800x600px" />
              {imageUrl && !errors.imageUrl && <ImagePreview url={imageUrl} alt="Country" className="h-32 w-auto rounded-lg border border-slate-600/50" />}
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
          <button type="button" onClick={() => reset()} disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all flex items-center gap-2 disabled:opacity-50 justify-center sm:justify-start"><RefreshCw className="w-4 h-4" /><span className="hidden sm:inline">Reset</span></button>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-white text-sm transition-all disabled:opacity-50">Cancel</button>
            <button type="button" onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /><span className="hidden sm:inline">Saving...</span></> : <><Save className="w-4 h-4" /><span className="hidden sm:inline">{country ? 'Update' : 'Save'} Country</span></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CountryRow = ({ country, onEdit, onDelete, isExpanded, onToggleExpand }) => {
  return (
    <>
      <tr className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
        <td className="p-4">
          <button 
            onClick={() => onToggleExpand(country.id)}
            className="p-1 hover:bg-slate-600/50 rounded transition-colors"
          >
            {isExpanded ? 
              <ChevronUp className="w-4 h-4 text-slate-400" /> : 
              <ChevronDown className="w-4 h-4 text-slate-400" />
            }
          </button>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-6 rounded overflow-hidden bg-slate-700 flex items-center justify-center flex-shrink-0">
              {country.flag_url ? <img src={country.flag_url} alt={`${country.name} flag`} className="w-full h-full object-cover" /> : <Globe className="w-4 h-4 text-slate-400" />}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-white truncate">{country.name}</div>
              <div className="text-xs text-slate-400 truncate">{country.official_name}</div>
            </div>
          </div>
        </td>
        <td className="p-4"><span className="text-sm text-slate-300 font-mono">{country.code}</span></td>
        <td className="p-4 text-sm text-slate-300">{country.continent}</td>
        <td className="p-4 text-sm text-slate-300">{country.capital}</td>
        <td className="p-4">
          <div className="flex flex-col gap-1">
            {country.visa_required && <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs inline-block w-fit whitespace-nowrap">Visa Required</span>}
            <span className={`px-2 py-0.5 rounded-full border text-xs inline-block w-fit whitespace-nowrap ${country.is_active ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-slate-500/20 text-slate-400 border-slate-500/30"}`}>{country.is_active ? "Active" : "Inactive"}</span>
          </div>
        </td>
        <td className="p-4">
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => onEdit(country)} className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
            <button onClick={() => confirm('Delete this country?') && onDelete(country.id)} className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-slate-800/30 border-b border-slate-700/30">
          <td colSpan="7" className="p-0">
            <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Country Image */}
              {country.image_url && (
                <div className="rounded-lg overflow-hidden border border-slate-700/50">
                  <img src={country.image_url} alt={country.name} className="w-full h-48 object-cover" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Geographic Information */}
                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <h4 className="text-sm font-semibold text-white">Geographic Details</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Region:</span>
                      <span className="text-slate-300">{country.region}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Area:</span>
                      <span className="text-slate-300">{country.area}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Population:</span>
                      <span className="text-slate-300">{country.population}</span>
                    </div>
                    {country.latitude && country.longitude && (
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Coordinates:</span>
                        <span className="text-slate-300">{country.latitude}, {country.longitude}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cultural & Financial */}
                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <h4 className="text-sm font-semibold text-white">Cultural & Financial</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Currency:</span>
                      <span className="text-slate-300">{country.currency}</span>
                    </div>
                    {country.currency_symbol && (
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Symbol:</span>
                        <span className="text-slate-300">{country.currency_symbol}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Language:</span>
                      <span className="text-slate-300">{country.language}</span>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <h4 className="text-sm font-semibold text-white">Metadata</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Created:</span>
                      <span className="text-slate-300">{new Date(country.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Updated:</span>
                      <span className="text-slate-300">{new Date(country.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description & Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-semibold text-white">Description</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{country.description}</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <h4 className="text-sm font-semibold text-white">Overview</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">{country.overview}</p>
                </div>
              </div>

              {/* Available Visas */}
              {country.available_visas && (
                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-orange-400" />
                    <h4 className="text-sm font-semibold text-white">Available Visas</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {country.available_visas.split(',').map((visa, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs">
                        {visa.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default function CountryAdminPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterContinent, setFilterContinent] = useState("");
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [countries, setCountries] = useState([
    { id: 1, name: "United Arab Emirates", code: "AE", official_name: "United Arab Emirates", continent: "Asia", region: "Western Asia", capital: "Abu Dhabi", flag_url: "https://flagcdn.com/w320/ae.png", image_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c", area: "83,600 sq km", population: "11,294,243", latitude: "23.4241", longitude: "53.8478", currency: "UAE dirham (د.إ)", currency_symbol: "د.إ", language: "Arabic, English", overview: "The United Arab Emirates is a federation of seven emirates on the eastern side of the Arabian peninsula, at the entrance to the Persian Gulf. It has coastlines on the Gulf of Oman and the Persian Gulf, with Saudi Arabia to the west and southwest, and Oman to the southeast as well as maritime borders with Qatar and Iran.", description: "A modern desert nation known for luxury shopping, ultramodern architecture and a lively nightlife scene.", available_visas: "Tourist Visa, Business Visa, Work Visa, Student Visa", visa_required: true, is_active: true, created_at: "2024-01-15T10:30:00Z", updated_at: "2024-12-01T14:20:00Z" },
    { id: 2, name: "United Kingdom", code: "GB", official_name: "UK of Great Britain", continent: "Europe", region: "Northern Europe", capital: "London", flag_url: "https://flagcdn.com/w320/gb.png", image_url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad", area: "242,495 sq km", population: "67,886,011", latitude: "55.3781", longitude: "-3.4360", currency: "Pound Sterling (£)", currency_symbol: "£", language: "English", overview: "The United Kingdom of Great Britain and Northern Ireland, commonly known as the United Kingdom or Britain, is a sovereign country in Europe, off the north-western coast of the continental mainland. It comprises England, Scotland, Wales and Northern Ireland.", description: "A European nation with a rich history, iconic landmarks, and diverse cultural heritage.", available_visas: "Tourist Visa, Student Visa, Work Visa, Business Visa, Family Visa", visa_required: true, is_active: true, created_at: "2024-01-16T14:20:00Z", updated_at: "2024-12-02T10:15:00Z" },
    { id: 3, name: "Canada", code: "CA", official_name: "Canada", continent: "North America", region: "Northern America", capital: "Ottawa", flag_url: "https://flagcdn.com/w320/ca.png", image_url: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce", area: "9,984,670 sq km", population: "38,005,238", latitude: "56.1304", longitude: "-106.3468", currency: "Canadian Dollar ($)", currency_symbol: "C$", language: "English, French", overview: "Canada is a country in North America. Its ten provinces and three territories extend from the Atlantic Ocean to the Pacific Ocean and northward into the Arctic Ocean, making it the world's second-largest country by total area.", description: "Known for its vast wilderness, multicultural cities, and high quality of life.", available_visas: "Tourist Visa, Student Visa, Work Permit, Express Entry, Family Sponsorship", visa_required: true, is_active: true, created_at: "2024-01-17T09:15:00Z", updated_at: "2024-12-03T16:45:00Z" },
    { id: 4, name: "Australia", code: "AU", official_name: "Commonwealth of Australia", continent: "Oceania", region: "Australia and New Zealand", capital: "Canberra", flag_url: "https://flagcdn.com/w320/au.png", image_url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be", area: "7,692,024 sq km", population: "25,687,041", latitude: "-25.2744", longitude: "133.7751", currency: "Australian Dollar ($)", currency_symbol: "A$", language: "English", overview: "Australia is a sovereign country comprising the mainland of the Australian continent, the island of Tasmania, and numerous smaller islands. Australia is the largest country by area in Oceania and the world's sixth-largest country.", description: "Famous for its natural wonders, beaches, deserts, and unique wildlife.", available_visas: "Tourist Visa, Student Visa, Skilled Worker Visa, Working Holiday Visa", visa_required: true, is_active: true, created_at: "2024-01-18T11:30:00Z", updated_at: "2024-12-04T08:20:00Z" }
  ]);

  const handleSave = (data) => setCountries(selectedCountry ? countries.map(c => c.id === selectedCountry.id ? data : c) : [...countries, data]);
  
  const handleDelete = (id) => setCountries(countries.filter(c => c.id !== id));
  
  const handleEdit = (country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };
  
  const toggleRowExpansion = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };
  
  const filtered = countries.filter(c => (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase()) || c.capital.toLowerCase().includes(searchQuery.toLowerCase())) && (!filterContinent || c.continent === filterContinent));
  const continents = ["Africa", "Antarctica", "Asia", "Europe", "North America", "South America", "Oceania"];

  return (
    <div className="min-h-screen bg-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Countries</h1>
            <p className="text-slate-400">Manage and add new countries to the platform</p>
          </div>
          <button onClick={() => { setSelectedCountry(null); setIsModalOpen(true); }} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <Plus className="w-4 h-4" />
            <span>Add Country</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Countries</p>
                <p className="text-2xl font-bold text-white">{countries.length}</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20 border border-green-500/30">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Active Countries</p>
                <p className="text-2xl font-bold text-white">{countries.filter(c => c.is_active).length}</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Continents</p>
                <p className="text-2xl font-bold text-white">{new Set(countries.map(c => c.continent)).size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search countries..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm" />
          </div>
          <select value={filterContinent} onChange={(e) => setFilterContinent(e.target.value)} className="px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer min-w-[160px]">
            <option value="">All Continents</option>
            {continents.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/90 backdrop-blur-sm sticky top-0 z-10">
                <tr className="border-b border-slate-700/50">
                  <th className="text-left p-4 text-sm font-semibold text-slate-300 w-12"></th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-300">Country</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-300">Code</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-300">Continent</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-300">Capital</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-300">Status</th>
                  <th className="text-right p-4 text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-12 text-center">
                      <Globe className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-400 mb-2">
                        {searchQuery || filterContinent ? 'No countries found' : 'No countries yet'}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4">
                        {searchQuery || filterContinent ? 'Try adjusting your search' : 'Add your first country'}
                      </p>
                      {!searchQuery && !filterContinent && (
                        <button onClick={() => { setSelectedCountry(null); setIsModalOpen(true); }} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition-all inline-flex items-center gap-2">
                          <Plus className="w-4 h-4" />Add Country
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filtered.map(c => (
                    <CountryRow 
                      key={c.id} 
                      country={c} 
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      isExpanded={expandedRows.has(c.id)}
                      onToggleExpand={toggleRowExpansion}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="p-4 border-t border-slate-700/50 text-sm text-slate-400 text-center bg-slate-800/30">
              Showing {filtered.length} of {countries.length} countries
            </div>
          )}
        </div>
      </div>
      
      <CountryFormModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedCountry(null); }} country={selectedCountry} onSave={handleSave} />
    </div>
  );
}