// import React from 'react'
// import { Lock, Save, X } from 'lucide-react'
// import RequiredDocs from './RequiredDocs'
// import AdditionalDocs from './AdditionalDocs'

// const EditVisaDetails = ({ editFormRef, currentCountryVisaTypes, selectedCountry, editingVisa, setFormData, formData, handleSaveVisa, resetForm, addArrayField, removeArrayField }) => {

//     return (
//         <div ref={editFormRef} className="bg-white rounded-xl border-2 border-blue-500 shadow-lg p-6 animate-slideIn">
//             <div className="flex items-center justify-between mb-6">
//                 <div>
//                     <h2 className="text-xl font-bold text-gray-900">
//                         {currentCountryVisaTypes.find(v => v.id === editingVisa)?.name}
//                     </h2>
//                     <p className="text-sm text-gray-600">Configure policy for {selectedCountry.name}</p>
//                 </div>
//                 <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
//                     <X className="w-6 h-6" />
//                 </button>
//             </div>

//             <div className="space-y-5">
//                 {/* Block Toggle */}
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                     <label className="flex items-center justify-between cursor-pointer">
//                         <div className="flex items-center gap-3">
//                             <Lock className="w-5 h-5 text-red-600" />
//                             <div>
//                                 <p className="font-semibold text-red-900">Block this visa type</p>
//                                 <p className="text-sm text-red-700">Citizens from {selectedCountry.name} cannot apply</p>
//                             </div>
//                         </div>
//                         <div className="relative">
//                             <input
//                                 type="checkbox"
//                                 checked={formData.blocked}
//                                 onChange={(e) => setFormData({ ...formData, blocked: e.target.checked, status: e.target.checked ? 'inactive' : formData.status })}
//                                 className="sr-only peer"
//                             />
//                             <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
//                         </div>
//                     </label>
//                 </div>

//                 {!formData.blocked && (
//                     <>
//                         <AdditionalDocs setFormData={setFormData} formData={formData} />

//                         <RequiredDocs formData={formData} addArrayField={addArrayField} removeArrayField={removeArrayField} />
//                     </>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex gap-3 pt-4">
//                     <button
//                         onClick={handleSaveVisa}
//                         className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm inline-flex items-center justify-center gap-2"
//                     >
//                         <Save className="w-5 h-5" />
//                         Save Policy
//                     </button>
//                     <button
//                         onClick={resetForm}
//                         className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default EditVisaDetails






import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Lock, Save, X } from 'lucide-react'
import RequiredDocs from './RequiredDocs'
import AdditionalDocs from './AdditionalDocs'
import hotToast from '../../../../../util/alert/hot-toast'
import { useDispatch } from 'react-redux'
import { addVisaDetail } from '../../../../../Redux/Slice/VisaDetailsSlice'
import getSweetAlert from '../../../../../util/alert/sweetAlert'

const EditVisaDetails = ({ currentCountryVisaTypes, countryDetails, selectedCountry, editingVisa, setEditingVisa }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, control, watch, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            blocked: false,
            processingTime: '',
            processingUnit: 'days',
            validityPeriod: '',
            validityUnit: 'days',
            applicationFees: '',
            status: 'active',
            requiredDocuments: ['']
        }
    })

    const blocked = watch('blocked')

    // Handle form submission
    const onSubmit = (data) => {
        // handleSaveVisa(data)
        // console.log(data);

        if (data?.applicationFees?.length == 0 || data?.processingTime?.length == 0 || data?.requiredDocuments?.length == 0 ||
            (data?.requiredDocuments?.length == 1 && data?.requiredDocuments?.[0]?.length == 0) || data?.validityPeriod?.length == 0) {
            hotToast('Please fill up all required fields', "error")
        }
        else {
            const policyObj = {
                country_id: countryDetails?.id,
                visa_id: editingVisa,
                visitor_country_id: selectedCountry?.id,
                status: data?.blocked ? 'inactive' : data?.status,
                visa_fees: data?.applicationFees,
                visa_processing_time: data?.processingTime + ' ' + data?.processingUnit + (Number(data?.processingTime) > 1 ? 's' : ''),
                visa_validity: data?.validityPeriod + ' ' + data?.validityUnit + (Number(data?.validityPeriod) > 1 ? 's' : ''),
                visa_documents: data?.requiredDocuments?.map(doc=>doc?.charAt(0)?.toUpperCase()+doc?.slice(1))
            }
            console.log('policy',policyObj);

            dispatch(addVisaDetail(policyObj))
                .then(res => {
                    console.log('Response for adding policy details', res);

                    if (res.meta.requestStatus === "fulfilled") {
                        hotToast("Visa policy added successfully", "success");
                        reset();
                        setEditingVisa(null);
                        // queryClient.invalidateQueries({
                        //     queryKey: ["countryVisa", countryDetails.id],
                        // });

                    } else {
                        getSweetAlert("Oops...", res.payload, "error");
                    }
                })
                .catch(() => {
                    getSweetAlert("Oops...", "Something went wrong!", "error");
                })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border-2 border-blue-500 shadow-lg p-6 animate-slideIn">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {currentCountryVisaTypes.find(v => v.id === editingVisa)?.name}
                    </h2>
                    <p className="text-sm text-gray-600">Configure policy for {selectedCountry.name}</p>
                </div>
                <button type="button" onClick={() => setEditingVisa(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="space-y-5">
                {/* Block Toggle */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5 text-red-600" />
                            <div>
                                <p className="font-semibold text-red-900">Block this visa type</p>
                                <p className="text-sm text-red-700">Citizens from {selectedCountry.name} cannot apply</p>
                            </div>
                        </div>
                        <div className="relative">
                            <Controller
                                name="blocked"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <input
                                            type="checkbox"
                                            {...field}
                                            className="sr-only peer"
                                        />
                                        <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
                                    </>
                                )}
                            />
                        </div>
                    </label>
                </div>

                {!blocked && (
                    <>
                        <AdditionalDocs register={register} errors={errors} control={control} />
                        <RequiredDocs control={control} />
                    </>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm inline-flex items-center justify-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        Save Policy
                    </button>
                    <button
                        type="button"
                        onClick={() => setEditingVisa(null)}
                        className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditVisaDetails
