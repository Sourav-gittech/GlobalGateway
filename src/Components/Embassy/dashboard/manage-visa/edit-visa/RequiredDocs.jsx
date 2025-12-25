import React from 'react'
import { Plus, Trash2 } from 'lucide-react'

const RequiredDocs = ({ formData, addArrayField, removeArrayField }) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Required Documents *</label>
                <button
                    onClick={() => addArrayField('requiredDocuments')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    <Plus className='inline h-4 mb-1' /> Add Document
                </button>
            </div>
            <div className="space-y-2">
                {formData.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex gap-2">
                        <input
                            type="text"
                            value={doc}
                            onChange={(e) => updateArrayField('requiredDocuments', idx, e.target.value)}
                            placeholder="e.g., Passport copy"
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.requiredDocuments.length > 1 && (
                            <button
                                onClick={() => removeArrayField('requiredDocuments', idx)}
                                className="px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RequiredDocs