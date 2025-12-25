import { AlertCircle } from 'lucide-react'
import React from 'react'

const AdditionalDocs = ({setFormData, formData}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Processing Time *</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        value={formData.processingTime}
                        onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
                        placeholder="45"
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                        value={formData.processingUnit}
                        onChange={(e) => setFormData({ ...formData, processingUnit: e.target.value })}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Validity Period *</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        value={formData.validityPeriod}
                        onChange={(e) => setFormData({ ...formData, validityPeriod: e.target.value })}
                        placeholder="1"
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                        value={formData.validityUnit}
                        onChange={(e) => setFormData({ ...formData, validityUnit: e.target.value })}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="days">Days</option>
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Fees (₹) *</label>
                <input
                    type="number"
                    value={formData.applicationFees}
                    onChange={(e) => setFormData({ ...formData, applicationFees: e.target.value })}
                    placeholder="10000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Enter 0 to make this visa free
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
        </div>
    )
}

export default AdditionalDocs