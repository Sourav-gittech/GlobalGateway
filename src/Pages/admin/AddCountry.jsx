import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Globe,
  Image,
  MapPin,
  DollarSign,
  Save,
  RefreshCw,
  Check,
  FileText,
  Settings,
  Loader2,
  Plus,
  X,
  Edit,
  Trash2,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ----------- ALL YOUR EXISTING COMPONENTS (UNCHANGED) ----------- */
const SettingsSection = ({ title, description, icon: Icon, children }) => (
  <div className="p-5 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
    <div className="flex items-start gap-3 mb-4 sm:mb-5">
      <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-slate-400">{description}</p>
        )}
      </div>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  helper,
  error,
  rows,
  maxLength,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-slate-300 mb-2"
    >
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
          error ? "border-red-500/50" : "border-slate-600/50"
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
          error ? "border-red-500/50" : "border-slate-600/50"
        } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm`}
      />
    )}

    {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    {helper && <p className="mt-1 text-xs text-slate-400">{helper}</p>}
  </div>
);

const ToggleSwitch = ({ label, description, checked, onChange }) => (
  <div className="flex items-start justify-between gap-4">
    <div className="flex-1">
      <div className="text-sm font-medium text-white mb-1">{label}</div>
      {description && (
        <div className="text-xs text-slate-400">{description}</div>
      )}
    </div>

    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex-shrink-0 ${
        checked ? "bg-blue-600" : "bg-slate-700"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </div>
);

const SelectField = ({ label, id, register, options, error }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-slate-300 mb-2"
    >
      {label}
    </label>

    <select
      id={id}
      {...register}
      className={`w-full px-4 py-2.5 bg-slate-700/30 border ${
        error ? "border-red-500/50" : "border-slate-600/50"
      } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer`}
    >
      <option value="">Select {label}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>

    {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
  </div>
);

const ImagePreview = ({ url, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return !url || error ? null : (
    <div className="mt-2">
      <img
        src={url}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{ display: loaded ? "block" : "none" }}
      />
    </div>
  );
};

/* ------------------ BASIC COUNTRY FORM MODAL ------------------ */
const CountryFormModal = ({ isOpen, onClose, country, onSave }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: country || {
      id: null,
      name: "",
      code: "",
      official_name: "",
      continent: "",
      region: "",
      capital: "",
      flag_url: "",
      image_url: "",
      area: "",
      population: "",
      currency: "",
      language: "",
      visa_required: false,
      is_active: true,
      overview: "",
      description: "",
      available_visas: "",
    },
  });

  React.useEffect(() => {
    reset(country || {});
  }, [country, reset]);

  const submit = (data) => {
    if (!data.id) data.id = Date.now();
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-slate-800/80 border border-slate-700/60 rounded-lg p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {country ? "Edit Country" : "Add Country"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-700/40 text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              label="Name"
              id="name"
              placeholder="Country name"
              register={register("name")}
            />
            <FormField
              label="Code"
              id="code"
              placeholder="ISO code"
              register={register("code")}
            />
            <FormField
              label="Official Name"
              id="official_name"
              placeholder="Official Country Name"
              register={register("official_name")}
            />
            <FormField
              label="Continent"
              id="continent"
              placeholder="Continent"
              register={register("continent")}
            />
            <FormField
              label="Capital"
              id="capital"
              placeholder="Capital city"
              register={register("capital")}
            />
            <FormField
              label="Currency"
              id="currency"
              placeholder="Currency"
              register={register("currency")}
            />
            <FormField
              label="Flag URL"
              id="flag_url"
              placeholder="https://..."
              register={register("flag_url")}
            />
            <FormField
              label="Cover Image URL"
              id="image_url"
              placeholder="https://..."
              register={register("image_url")}
            />
          </div>

          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-slate-700/40 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------- */
/* ---------------------- MAIN COMPONENT ---------------------- */
/* ----------------------------------------------------------- */

export default function CountryAdminPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterContinent, setFilterContinent] = useState("");

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const [countries, setCountries] = useState([
    {
      id: 1,
      name: "United Arab Emirates",
      code: "AE",
      official_name: "United Arab Emirates",
      continent: "Asia",
      region: "Western Asia",
      capital: "Abu Dhabi",
      flag_url: "https://flagcdn.com/w320/ae.png",
      image_url:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
      area: "83,600 sq km",
      population: "11,294,243",
      currency: "UAE dirham (د.إ)",
      language: "Arabic, English",
      visa_required: true,
      is_active: true,
      created_at: "2024-01-15T10:30:00Z",
      overview:
        "The United Arab Emirates is a federation of seven emirates, notable for rapid modernization and tall skyscrapers.",
      description:
        "A wealthy Gulf nation known for Dubai and Abu Dhabi; modern infrastructure and large expatriate population.",
    },
    {
      id: 2,
      name: "United Kingdom",
      code: "GB",
      official_name: "UK of Great Britain",
      continent: "Europe",
      region: "Northern Europe",
      capital: "London",
      flag_url: "https://flagcdn.com/w320/gb.png",
      image_url:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
      area: "242,495 sq km",
      population: "67,886,011",
      currency: "Pound Sterling (£)",
      language: "English",
      visa_required: true,
      is_active: true,
      created_at: "2024-01-16T14:20:00Z",
      overview:
        "The United Kingdom is a constitutional monarchy with a long history, major global cultural and economic influence.",
    },
    {
      id: 3,
      name: "Canada",
      code: "CA",
      official_name: "Canada",
      continent: "North America",
      region: "Northern America",
      capital: "Ottawa",
      flag_url: "https://flagcdn.com/w320/ca.png",
      image_url:
        "https://images.unsplash.com/photo-1503614472-8c93d56e92ce",
      area: "9,984,670 sq km",
      population: "38,005,238",
      currency: "Canadian Dollar ($)",
      language: "English, French",
      visa_required: true,
      is_active: true,
      created_at: "2024-01-17T09:15:00Z",
      overview: "Canada is known for vast landscapes and polite multicultural society.",
    },
  ]);

  const handleSave = (data) =>
    setCountries((prev) => {
      if (prev.some((c) => c.id === data.id)) {
        return prev.map((c) => (c.id === data.id ? { ...c, ...data } : c));
      }
      return [...prev, data];
    });

  const filtered = countries.filter(
    (c) =>
      (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.capital.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!filterContinent || c.continent === filterContinent)
  );

  const continents = [
    "Africa",
    "Antarctica",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
  ];

  /* --------------- HERE IS THE FIX WRAPPING YOUR WHOLE COMPONENT --------------- */
  return (
    <div className="min-h-screen w-full bg-slate-900">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Manage Countries
            </h1>
            <p className="text-slate-400">Manage and Add new countries</p>
          </div>

          <button
            onClick={() => {
              setSelectedCountry(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white text-sm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Country</span>
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
            />
          </div>

          <select
            value={filterContinent}
            onChange={(e) => setFilterContinent(e.target.value)}
            className="px-4 py-2.5 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer min-w-[160px]"
          >
            <option value="">All Continents</option>
            {continents.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden max-h-[600px] flex flex-col">
          <div className="overflow-x-auto overflow-y-auto flex-1">
            <table className="w-full">
              <thead className="sticky top-0 bg-slate-800/90 backdrop-blur-sm z-10">
                <tr className="border-b border-slate-700/50">
                  {[
                    "Country",
                    "Code",
                    "Continent",
                    "Region",
                    "Capital",
                    "Currency",
                    "Language",
                    "Status",
                    "Update/Delete",
                    "More",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left p-4 text-sm font-semibold text-slate-300"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.map((c) => (
                  <React.Fragment key={c.id}>
                    {/* MAIN ROW */}
                    <tr className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-6 rounded overflow-hidden bg-slate-700 flex items-center justify-center flex-shrink-0">
                            {c.flag_url ? (
                              <img
                                src={c.flag_url}
                                alt={`${c.name} flag`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Globe className="w-4 h-4 text-slate-400" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="text-sm font-medium text-white truncate">
                              {c.name}
                            </div>
                            <div className="text-xs text-slate-400 truncate">
                              {c.official_name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="text-sm text-slate-300 font-mono">
                          {c.code}
                        </span>
                      </td>

                      <td className="p-4 text-sm text-slate-300">{c.continent}</td>
                      <td className="p-4 text-sm text-slate-300">{c.region}</td>
                      <td className="p-4 text-sm text-slate-300">{c.capital}</td>
                      <td className="p-4 text-sm text-slate-300">{c.currency}</td>
                      <td className="p-4 text-sm text-slate-300">{c.language}</td>

                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          {c.visa_required && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs inline-block w-fit whitespace-nowrap">
                              Visa Required
                            </span>
                          )}
                          <span
                            className={`px-2 py-0.5 rounded-full border text-xs inline-block w-fit whitespace-nowrap ${
                              c.is_active
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                            }`}
                          >
                            {c.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsModalOpen(true);
                            }}
                            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() =>
                              confirm("Delete this country?") &&
                              setCountries(countries.filter((x) => x.id !== c.id))
                            }
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                      {/* DROPDOWN */}
                      <td className="p-4">
                        <button
                          onClick={() => toggleDropdown(c.id)}
                          className="p-2 rounded-lg bg-slate-700/40 hover:bg-slate-600/40 text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                        >
                          {openDropdownId === c.id ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              <span className="hidden sm:inline text-xs">
                                Less
                              </span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              <span className="hidden sm:inline text-xs">
                                More
                              </span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* EXPANDED ROW */}
                    {openDropdownId === c.id && (
                      <tr className="border-b border-slate-700/40 bg-slate-900/40">
                        <td colSpan={10} className="p-0">
                          <div className="relative w-full h-56 md:h-72 overflow-hidden">
                            <img
                              src={c.image_url}
                              alt={c.name}
                              className="w-full h-full object-cover opacity-90"
                            />

                            <div className="absolute bottom-4 left-4 flex items-center gap-3">
                              <img
                                src={c.flag_url}
                                alt="flag"
                                className="h-10 w-14 object-cover rounded shadow-md border border-slate-600"
                              />
                              <div>
                                <h2 className="text-xl font-semibold text-white">
                                  {c.name}
                                </h2>
                                <p className="text-slate-300 text-sm">
                                  {c.official_name}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-6 space-y-10 bg-slate-900/60">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                  Basic Information
                                </h3>
                                <div className="text-slate-300 text-sm space-y-2">
                                  <p>
                                    <b>Continent:</b> {c.continent}
                                  </p>
                                  <p>
                                    <b>Region:</b> {c.region}
                                  </p>
                                  <p>
                                    <b>Capital:</b> {c.capital}
                                  </p>
                                  <p>
                                    <b>Area:</b> {c.area}
                                  </p>
                                  <p>
                                    <b>Population:</b> {c.population}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                  Cultural & Financial
                                </h3>
                                <div className="text-slate-300 text-sm space-y-2">
                                  <p>
                                    <b>Currency:</b> {c.currency}
                                  </p>
                                  <p>
                                    <b>Language:</b> {c.language}
                                  </p>
                                  <p>
                                    <b>Visa Required:</b>{" "}
                                    {c.visa_required ? "Yes" : "No"}
                                  </p>
                                  <p>
                                    <b>Status:</b> {c.is_active ? "Active" : "Inactive"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {c.overview && (
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                  Overview
                                </h3>
                                <p className="text-slate-300 text-sm">
                                  {c.overview}
                                </p>
                              </div>
                            )}

                            {c.description && (
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                  Description
                                </h3>
                                <p className="text-slate-300 text-sm">
                                  {c.description}
                                </p>
                              </div>
                            )}

                            {c.available_visas && (
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                  Available Visas
                                </h3>
                                <p className="text-slate-300 text-sm">
                                  {c.available_visas}
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          {filtered.length === 0 && (
            <div className="p-12 text-center">
              <Globe className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-400 mb-2">
                {searchQuery || filterContinent
                  ? "No countries found"
                  : "No countries yet"}
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                {searchQuery || filterContinent
                  ? "Try adjusting your search"
                  : "Add your first country"}
              </p>

              {!searchQuery && !filterContinent && (
                <button
                  onClick={() => {
                    setSelectedCountry(null);
                    setIsModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white text-sm transition-all inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Country
                </button>
              )}
            </div>
          )}

          {filtered.length > 0 && (
            <div className="p-4 border-t border-slate-700/50 text-sm text-slate-400 text-center">
              Showing {filtered.length} of {countries.length} countries
            </div>
          )}
        </div>

        <CountryFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCountry(null);
          }}
          country={selectedCountry}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
