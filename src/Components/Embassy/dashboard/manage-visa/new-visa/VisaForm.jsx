import React, { useState } from 'react'
import { Plus } from 'lucide-react';

const VisaForm = ({ setIsAddingVisaType, iconMapping }) => {

    const [selectedIconKey, setSelectedIconKey] = useState("");

    const SelectedIcon = iconMapping[selectedIconKey];

    return (
        <form className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visa Type Name *</label>
                <input
                    type="text"
                    placeholder="e.g., Medical Visa, Transit Visa, etc."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Icon *
                </label>

                <div className="w-full flex items-center justify-center gap-4">
                    <div className="grid grid-cols-6 gap-3">
                        {Object.entries(iconMapping).map(([name, Icon]) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => setSelectedIconKey(name)}
                                className={`border rounded-lg p-3 flex flex-col items-center gap-1 ${selectedIconKey === name
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-300"
                                    }`}
                            >
                                <Icon className="w-6 h-6 text-blue-600" />
                                <span className="text-xs">{name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Icon Preview */}
                    <div className="w-18 h-18 border rounded-lg flex items-center justify-center bg-gray-50">
                        {SelectedIcon ? (
                            <SelectedIcon className="w-6 h-6 text-blue-600" />
                        ) : (
                            <span className="text-xs text-gray-400">Icon</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm inline-flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Visa Type
                </button>
                <button
                    onClick={() => {
                        setIsAddingVisaType(false);
                    }}
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default VisaForm