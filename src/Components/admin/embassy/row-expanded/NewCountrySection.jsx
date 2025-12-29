import React from 'react'
import { Globe, ImageIcon } from 'lucide-react';

const NewCountrySection = ({embassy}) => {
    return (
        <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50">
            <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-400" />
                Country Setup Information
            </h5>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Country Image */}
                <div className="lg:col-span-1">
                    <div className="aspect-video rounded-lg overflow-hidden border border-slate-600/50">
                        <img
                            src={embassy.countryImage}
                            alt={embassy.country}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x300?text=Country+Image';
                            }}
                        />
                    </div>
                    <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        Country Image
                    </div>
                </div>

                {/* Country Info */}
                <div className="lg:col-span-2 space-y-3">
                    <div>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Country Name</p>
                        <p className="text-white font-semibold text-lg">{embassy.country}</p>
                    </div>

                    <div>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Country Description</p>
                        <p className="text-slate-300 text-sm leading-relaxed">{embassy.countryDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewCountrySection