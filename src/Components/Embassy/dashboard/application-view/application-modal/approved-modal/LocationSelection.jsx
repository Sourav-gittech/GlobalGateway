import React, { useEffect, useState } from 'react';
import { MapPin, CheckCircle2, Building2, Phone, Clock, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

const LocationSelection = ({ selectedLocation, setSelectedLocation, application }) => {
    const [embassyOffices, setEmbassyOffices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get user's country and location
    const userCountry = application?.application_personal_info?.country;
    const userCity = application?.application_personal_info?.city;
    const userState = application?.application_personal_info?.state;

    // Fetch embassies using OpenStreetMap Nominatim API (FREE)
    const fetchEmbassies = async () => {
        if (!userCountry || !userCity) {
            setError('User location information is incomplete');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Step 1: Get coordinates for user's city using Nominatim Geocoding (FREE)
            const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                `${userCity}, ${userState}, ${userCountry}`
            )}&format=json&limit=1`;

            const geocodeResponse = await fetch(geocodeUrl, {
                headers: {
                    'User-Agent': 'VisaApplicationSystem/1.0' // Required by Nominatim
                }
            });
            const geocodeData = await geocodeResponse.json();

            if (!geocodeData || geocodeData.length === 0) {
                throw new Error('Unable to find user location');
            }

            const userLocation = geocodeData[0];
            const { lat, lon } = userLocation;

            // Step 2: Search for embassies using Overpass API (OpenStreetMap)
            // This searches for nodes/ways tagged as embassy or consulate
            const overpassQuery = `[out:json][timeout:25];(node["amenity"="embassy"](around:500000,${lat},${lon});node["office"="diplomatic"](around:500000,${lat},${lon});way["amenity"="embassy"](around:500000,${lat},${lon});way["office"="diplomatic"](around:500000,${lat},${lon}););out center;`;

            const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
            const overpassResponse = await fetch(overpassUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!overpassResponse.ok) {
                throw new Error('Failed to fetch embassy data from OpenStreetMap');
            }

            const overpassData = await overpassResponse.json();

            if (!overpassData.elements || overpassData.elements.length === 0) {
                throw new Error('No embassy locations found in this area');
            }

            // Step 3: Format embassy data
            const embassies = overpassData.elements
                .filter(place => {
                    const name = place.tags?.name?.toLowerCase() || '';
                    return name && (
                        name.includes('embassy') || 
                        name.includes('consulate') ||
                        name.includes('diplomatic')
                    );
                })
                .slice(0, 15) // Limit to 15 results
                .map((place) => {
                    const tags = place.tags || {};
                    
                    // Determine coordinates
                    const coords = place.center || { lat: place.lat, lon: place.lon };
                    
                    // Extract address components
                    const street = tags['addr:street'] || tags.street || '';
                    const houseNumber = tags['addr:housenumber'] || '';
                    const city = tags['addr:city'] || userCity;
                    const state = tags['addr:state'] || userState;
                    const postcode = tags['addr:postcode'] || '';
                    
                    const fullAddress = [
                        houseNumber,
                        street,
                        city,
                        state,
                        postcode,
                        userCountry
                    ].filter(Boolean).join(', ');

                    // Determine embassy type
                    const embassyType = tags.name?.toLowerCase().includes('consulate')
                        ? 'Consulate'
                        : 'Embassy';

                    return {
                        id: place.id,
                        name: tags.name || 'Embassy',
                        city: city,
                        state: state,
                        address: fullAddress || 'Address details not available',
                        phone: tags.phone || tags['contact:phone'] || 'Not available',
                        workingHours: tags.opening_hours || 'Contact embassy for hours',
                        type: embassyType,
                        coordinates: {
                            lat: coords.lat,
                            lng: coords.lon
                        },
                        website: tags.website || tags['contact:website'] || null,
                        email: tags.email || tags['contact:email'] || null,
                        openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lon}#map=18/${coords.lat}/${coords.lon}`
                    };
                });

            // Remove duplicates by name
            const uniqueEmbassies = embassies.filter((embassy, index, self) =>
                index === self.findIndex((e) => e.name === embassy.name)
            );

            setEmbassyOffices(uniqueEmbassies);

            // Auto-select nearest embassy
            if (uniqueEmbassies.length > 0 && !selectedLocation) {
                const nearest = findNearestEmbassy(uniqueEmbassies);
                if (nearest) {
                    setSelectedLocation(nearest);
                }
            }
        } catch (err) {
            console.error('Error fetching embassies:', err);
            setError(err.message || 'Failed to fetch embassy locations');
        } finally {
            setLoading(false);
        }
    };

    // Function to find nearest embassy based on city/state match
    const findNearestEmbassy = (embassies) => {
        if (!embassies.length || !userCity) return null;

        // First, try exact city match
        const cityMatch = embassies.find(
            office => office.city?.toLowerCase().includes(userCity.toLowerCase())
        );
        if (cityMatch) return cityMatch;

        // Then, try state match
        const stateMatch = embassies.find(
            office => office.state?.toLowerCase().includes(userState?.toLowerCase())
        );
        if (stateMatch) return stateMatch;

        // If no match, return the first embassy
        return embassies[0];
    };

    // Fetch embassies when component mounts or user location changes
    useEffect(() => {
        if (userCountry && userCity) {
            fetchEmbassies();
        }
    }, [userCountry, userCity, userState]);

    const handleSelectLocation = (office) => {
        setSelectedLocation(office);
    };

    // Loading state
    if (loading) {
        return (
            <div className="rounded-xl p-6 border border-gray-200 bg-white">
                <div className="flex items-center justify-center gap-3 py-8">
                    <Loader2 className="text-blue-600 animate-spin" size={24} />
                    <p className="text-gray-600">Searching for embassy locations near you...</p>
                </div>
            </div>
        );
    }

    // Handle missing user country
    if (!userCountry) {
        return (
            <div className="rounded-xl p-6 border border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="text-amber-600" size={20} />
                    <h3 className="text-lg font-semibold text-gray-900">
                        Location Information Required
                    </h3>
                </div>
                <p className="text-sm text-gray-600">
                    User country information is not available. Please ensure personal details are completed.
                </p>
            </div>
        );
    }

    // Handle errors
    if (error) {
        return (
            <div className="rounded-xl p-6 border border-red-200 bg-red-50">
                <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="text-red-600" size={20} />
                    <h3 className="text-lg font-semibold text-gray-900">
                        Error Loading Embassy Locations
                    </h3>
                </div>
                <p className="text-sm text-red-700 mb-3">{error}</p>
                <button
                    onClick={fetchEmbassies}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Handle no results
    if (embassyOffices.length === 0) {
        return (
            <div className="rounded-xl p-6 border border-amber-200 bg-amber-50">
                <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="text-amber-600" size={20} />
                    <h3 className="text-lg font-semibold text-gray-900">
                        No Embassy Locations Found
                    </h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                    We couldn't find any embassy locations near <strong>{userCity}, {userCountry}</strong> in OpenStreetMap data.
                </p>
                <p className="text-xs text-gray-600 mb-3">
                    This might happen if the area has limited OpenStreetMap coverage or embassies aren't tagged yet.
                </p>
                <button
                    onClick={fetchEmbassies}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
                >
                    Search Again
                </button>
            </div>
        );
    }

    return (
        <div className="rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Building2 className="text-blue-600" size={20} />
                    <h3 className="text-lg font-semibold text-gray-900">
                        Select Embassy Location <span className="text-red-500">*</span>
                    </h3>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Powered by OpenStreetMap
                </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
                Choose the embassy office where candidate will attend appointment
            </p>
            {selectedLocation && (
                <p className="text-xs text-blue-600 mb-4">
                    ✓ Found {embassyOffices.length} embassy location(s) in {userCountry}
                </p>
            )}

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {embassyOffices.map((office) => {
                    const isSelected = selectedLocation?.id === office.id;
                    
                    return (
                        <button
                            key={office.id}
                            onClick={() => handleSelectLocation(office)}
                            className={`
                                w-full text-left p-4 rounded-lg border-2 transition-all
                                ${isSelected 
                                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                }
                            `}
                        >
                            <div className="flex items-start gap-3">
                                {/* Selection Indicator */}
                                <div className="mt-0.5">
                                    {isSelected ? (
                                        <CheckCircle2 className="text-blue-500" size={24} />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                                    )}
                                </div>

                                {/* Office Details */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div>
                                            <h4 className={`font-semibold text-base ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                                                {office.name}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                                                    office.type === 'Embassy' 
                                                        ? 'bg-purple-100 text-purple-700' 
                                                        : 'bg-green-100 text-green-700'
                                                }`}>
                                                    {office.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                                        <MapPin className="flex-shrink-0 mt-0.5" size={16} />
                                        <span>{office.address}</span>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-2">
                                        <div className="flex items-center gap-1.5">
                                            <Phone size={14} />
                                            <span>{office.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={14} />
                                            <span>{office.workingHours}</span>
                                        </div>
                                    </div>

                                    {/* Additional Links */}
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        <a
                                            href={office.openStreetMapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                                        >
                                            View on OpenStreetMap <ExternalLink size={12} />
                                        </a>
                                        {office.website && (
                                            <a
                                                href={office.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                                            >
                                                Website <ExternalLink size={12} />
                                            </a>
                                        )}
                                        {office.email && (
                                            <a
                                                href={`mailto:${office.email}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-xs text-blue-600 hover:text-blue-800 underline"
                                            >
                                                {office.email}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {selectedLocation && (
                <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded-lg">
                    <p className="text-sm font-medium text-green-900">
                        ✓ Selected: {selectedLocation.name}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                        {selectedLocation.city}, {selectedLocation.state}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LocationSelection;