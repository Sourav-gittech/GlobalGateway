import React, { useEffect, useState } from 'react';
import { MapPin, CheckCircle2, Building2, Phone, Clock, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

const LocationSelection = ({ selectedLocation, currentCountry, setSelectedLocation, application, visaDetails }) => {
    const [embassyOffices, setEmbassyOffices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // User's location (where they live)
    const userCountry = application?.application_personal_info?.country;
    const userCity = application?.application_personal_info?.city;
    const userState = application?.application_personal_info?.state;

    /**
     * FIX: Extract destination country from visaDetails first, then fallback to application
     */
    const destinationCountry =
        visaDetails?.country_name ||
        visaDetails?.country?.name ||
        visaDetails?.country ||
        application?.destinationCountry ||
        currentCountry || null;

    useEffect(() => {
        console.log('=== LocationSelection Debug ===');
        console.log('Full Application:', application);
        console.log('Visa Details:', visaDetails);
        console.log('User Country:', userCountry);
        console.log('User City:', userCity);
        console.log('Destination Country:', destinationCountry);
    }, [application, visaDetails, destinationCountry]);

    const fetchEmbassies = async () => {
        if (!userCountry || !destinationCountry) {
            console.error('Missing required data:', { userCountry, destinationCountry });
            setError('Missing location information');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Step 1: Geocode user's country
            const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(userCountry)}&format=json&limit=1`;
            const geocodeResponse = await fetch(geocodeUrl, {
                headers: { 'User-Agent': 'VisaApplicationSystem/1.0' }
            });
            const geocodeData = await geocodeResponse.json();

            if (!geocodeData?.length) {
                throw new Error(`Cannot find location: ${userCountry}`);
            }

            const { lat, lon } = geocodeData[0];

            // Step 2: Search embassies via Overpass API
            const overpassQuery = `[out:json][timeout:25];
                (
                    node["amenity"="embassy"]["name"~"${destinationCountry}",i](around:2000000,${lat},${lon});
                    way["amenity"="embassy"]["name"~"${destinationCountry}",i](around:2000000,${lat},${lon});
                    node["office"="diplomatic"]["name"~"${destinationCountry}",i](around:2000000,${lat},${lon});
                    way["office"="diplomatic"]["name"~"${destinationCountry}",i](around:2000000,${lat},${lon});
                );
                out center;`;

            const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
            const overpassResponse = await fetch(overpassUrl);

            if (!overpassResponse.ok) throw new Error('Failed to fetch embassy data');

            const overpassData = await overpassResponse.json();

            if (!overpassData.elements?.length) {
                throw new Error(`No ${destinationCountry} embassies found in ${userCountry}`);
            }

            // Step 3: Process results
            const embassies = overpassData.elements
                .filter(place => {
                    const name = place.tags?.name?.toLowerCase() || '';
                    const dest = destinationCountry.toLowerCase();
                    return name.includes(dest) &&
                        (name.includes('embassy') || name.includes('consulate') ||
                            name.includes('high commission') || name.includes('diplomatic'));
                })
                .slice(0, 20)
                .map(place => {
                    const tags = place.tags || {};
                    const coords = place.center || { lat: place.lat, lon: place.lon };

                    const address = [
                        tags['addr:housenumber'],
                        tags['addr:street'] || tags.street,
                        tags['addr:city'],
                        tags['addr:state'],
                        tags['addr:postcode'],
                        userCountry
                    ].filter(Boolean).join(', ');

                    const nameLower = tags.name?.toLowerCase() || '';
                    let type = 'Embassy';
                    if (nameLower.includes('consulate')) type = 'Consulate';
                    else if (nameLower.includes('high commission')) type = 'High Commission';

                    return {
                        id: place.id,
                        name: tags.name || `${destinationCountry} Embassy`,
                        city: tags['addr:city'] || 'Not specified',
                        state: tags['addr:state'] || '',
                        address: address || 'Address not available',
                        phone: tags.phone || tags['contact:phone'] || 'Not available',
                        workingHours: tags.opening_hours || 'Contact embassy',
                        type,
                        coordinates: { lat: coords.lat, lng: coords.lon },
                        website: tags.website || tags['contact:website'] || null,
                        email: tags.email || tags['contact:email'] || null,
                        openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lon}#map=18/${coords.lat}/${coords.lon}`
                    };
                });

            const unique = embassies.filter((e, i, arr) =>
                i === arr.findIndex(x => x.name === e.name && x.city === e.city)
            );

            setEmbassyOffices(unique);

            if (unique.length && !selectedLocation) {
                setSelectedLocation(unique[0]);
            }
        } catch (err) {
            console.error('Embassy fetch error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userCountry && destinationCountry) {
            fetchEmbassies();
        }
    }, [userCountry, destinationCountry]);

    /* ================= UI (UNCHANGED) ================= */

    if (loading) {
        return (
            <div className="rounded-xl p-6 border border-gray-200 bg-white">
                <div className="flex items-center justify-center gap-3 py-8">
                    <Loader2 className="text-blue-600 animate-spin" size={24} />
                    <p className="text-gray-600">Finding {destinationCountry} embassies in {userCountry}...</p>
                </div>
            </div>
        );
    }

    if (!userCountry || !destinationCountry) {
        return (
            <div className="rounded-xl p-6 border border-amber-200 bg-amber-50">
                <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="text-amber-600" size={20} />
                    <h3 className="text-lg font-semibold text-gray-900">Location Info Required</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                    {!userCountry && "• User country information is missing"}
                    {!userCountry && <br />}
                    {!destinationCountry && "• Destination country information is missing"}
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl p-6 border border-red-200 bg-red-50">
                <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="text-red-600" size={20} />
                    <h3 className="text-lg font-semibold text-gray-900">Error Loading Embassies</h3>
                </div>
                <p className="text-sm text-red-700 mb-3">{error}</p>
            </div>
        );
    }


    return (
        <div className="rounded-xl p-6 border border-gray-200 bg-white">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Building2 className="text-blue-600" size={20} />
                    <h3 className="text-lg font-semibold text-gray-900">
                        Select Embassy Location <span className="text-red-500">*</span>
                    </h3>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">OpenStreetMap</span>
            </div>

            <p className="text-sm text-gray-600 mb-1">
                Choose the <strong>{destinationCountry}</strong> embassy in <strong>{userCountry}</strong> for the appointment
            </p>

            {selectedLocation && (
                <p className="text-xs text-blue-600 mb-4">
                    ✓ Found {embassyOffices.length} {destinationCountry} embassy location(s) in {userCountry}
                </p>
            )}

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {embassyOffices.map(office => {
                    const isSelected = selectedLocation?.id === office.id;

                    return (
                        <button
                            key={office.id}
                            onClick={() => setSelectedLocation(office)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${isSelected ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    {isSelected ? (
                                        <CheckCircle2 className="text-blue-500" size={24} />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h4 className={`font-semibold text-base mb-1 ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                                        {office.name}
                                    </h4>
                                    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded mb-2 ${office.type === 'Embassy' ? 'bg-purple-100 text-purple-700' :
                                            office.type === 'Consulate' ? 'bg-green-100 text-green-700' :
                                                'bg-blue-100 text-blue-700'
                                        }`}>
                                        {office.type}
                                    </span>

                                    <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                                        <MapPin className="flex-shrink-0 mt-0.5" size={16} />
                                        <span>{office.address}</span>
                                    </div>

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

                                    <div className="flex flex-wrap gap-3 mt-2">
                                        <a href={office.openStreetMapUrl} target="_blank" rel="noopener noreferrer"
                                            onClick={e => e.stopPropagation()}
                                            className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center gap-1">
                                            View on Map <ExternalLink size={12} />
                                        </a>
                                        {office.website && (
                                            <a href={office.website} target="_blank" rel="noopener noreferrer"
                                                onClick={e => e.stopPropagation()}
                                                className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center gap-1">
                                                Website <ExternalLink size={12} />
                                            </a>
                                        )}
                                        {office.email && (
                                            <a href={`mailto:${office.email}`} onClick={e => e.stopPropagation()}
                                                className="text-xs text-blue-600 hover:text-blue-800 underline">
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
                        {selectedLocation.city}{selectedLocation.state && `, ${selectedLocation.state}`}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LocationSelection;