import React, { useState } from "react";
import {  Search } from "lucide-react";
import CountryFormModal from "../../Components/admin/country/CountryFormModal";
import CountryHeader from "../../Components/admin/country/CountryHeader";
import CountryTable from "../../Components/admin/country/CountryTable";

export default function CountryAdminPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterContinent, setFilterContinent] = useState("");

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

  return (
    <div className="min-h-screen w-full bg-transparent">
      <div className="space-y-6">
        {/* Header */}
        <CountryHeader setSelectedCountry={setSelectedCountry} setIsModalOpen={setIsModalOpen} />

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
        <CountryTable searchQuery={searchQuery} filtered={filtered} countries={countries} filterContinent={filterContinent} />

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
