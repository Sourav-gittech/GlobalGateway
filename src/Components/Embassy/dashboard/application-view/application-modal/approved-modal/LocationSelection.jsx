import React from 'react';
import { MapPin, CheckCircle2, Building2, Phone, Clock } from 'lucide-react';

const LocationSelection = ({ selectedLocation, setSelectedLocation, application }) => {
   
    const embassyOffices = [
        {
            id: 'emb_new_delhi_01',
            name: 'US Embassy - New Delhi',
            city: 'New Delhi',
            state: 'Delhi',
            address: 'Shantipath, Chanakyapuri, New Delhi - 110021',
            phone: '+91 11 2419 8000',
            workingHours: 'Mon-Fri: 8:30 AM - 5:00 PM',
            type: 'Embassy',
            coordinates: { lat: 28.5984, lng: 77.1892 }
        },
        {
            id: 'emb_mumbai_01',
            name: 'US Embassy - Mumbai',
            city: 'Mumbai',
            state: 'Maharashtra',
            address: 'C-49, G-Block, Bandra Kurla Complex, Mumbai - 400051',
            phone: '+91 22 2672 4000',
            workingHours: 'Mon-Fri: 8:30 AM - 5:00 PM',
            type: 'Embassy',
            coordinates: { lat: 19.0625, lng: 72.8686 }
        },
        {
            id: 'emb_kolkata_01',
            name: 'US Embassy - Kolkata',
            city: 'Kolkata',
            state: 'West Bengal',
            address: '5/1 Ho Chi Minh Sarani, Kolkata - 700071',
            phone: '+91 33 3984 2400',
            workingHours: 'Mon-Fri: 8:30 AM - 5:00 PM',
            type: 'Embassy',
            coordinates: { lat: 22.5448, lng: 88.3426 }
        }
    ];

    const handleSelectLocation = (office) => {
        setSelectedLocation(office);
    };

    return (
        <div className="rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
                <Building2 className="text-blue-600" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">
                    Select Embassy Location <span className="text-red-500">*</span>
                </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
                Choose the embassy office where candidate will attend appointment
            </p>

            <div className="space-y-3">
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
                                            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded mt-1 bg-purple-100 text-purple-700">
                                                {office.type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                                        <MapPin className="flex-shrink-0 mt-0.5" size={16} />
                                        <span>{office.address}</span>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1.5">
                                            <Phone size={14} />
                                            <span>{office.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={14} />
                                            <span>{office.workingHours}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {selectedLocation && (
                <div className="mt-4 p-3 bg-green-600/20 border border-green-300 rounded-lg">
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