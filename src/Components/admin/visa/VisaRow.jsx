import React from 'react'
import { Calendar, ChevronDown, ChevronRight, Clock, Lock, Unlock } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { updateVisa } from '../../../Redux/Slice/visaSlice';
import hotToast from '../../../util/alert/hot-toast';
import getSweetAlert from '../../../util/alert/sweetAlert';
import { useAverageProcessingTime } from '../../../tanstack/query/getAvgVisaProcessingTime';
import { useAverageValidity } from '../../../tanstack/query/getAvgVisaValidity';
import { useVisaDetailsByVisaId } from '../../../tanstack/query/getVisaDetailsByVisaId';

const VisaRow = ({ expandedVisa, setExpandedVisa, visa }) => {

    const dispatch = useDispatch();

    const { data: avgProcessingTime, isLoading: processingTimeLoading } = useAverageProcessingTime(visa?.id);
    const { data: avgValidity, isLoading: validityLoading } = useAverageValidity(visa?.id);
    const { data: visaCountryList, isLoading: isVisaCountryLoading, isError, error } = useVisaDetailsByVisaId(visa?.id);

    const toggleVisaStatus = (visaId, visa) => {
        const updated_visa = {
            ...visa,
            status: visa?.status == 'active' ? 'inactive' : 'active'
        }

        dispatch(updateVisa({ id: visaId, updatedData: updated_visa }))
            .then(res => {
                // console.log('Response for updating status', res);

                if (res?.meta?.requestStatus == "fulfilled") {
                    hotToast(`Visa ${updated_visa?.status == 'active' ? 'activated' : 'de-activated'} successfully`, "success");
                }
                else {
                    getSweetAlert('Oops...', 'Something went wrong!', 'error');
                }
            })
            .catch(err => {
                console.log('Error occured', err);
                getSweetAlert('Oops...', 'Something went wrong!', 'error');
            })
    }

    const getBlockedCountries = (visa) => {
        const blocked = visa?.countryStatus?.filter(c => c.status === 'blocked').map(c => c.country);
        return blocked?.length > 0 ? blocked?.join(', ') : 'Open';
    }

    return (
        <tr className="border-b border-slate-600/30 hover:bg-slate-700/20 transition-colors">
            <td className="px-4 py-4">
                <button
                    onClick={() => setExpandedVisa(expandedVisa === visa.id ? null : visa.id)}
                    className="text-slate-400 hover:text-white transition-colors"
                >
                    {expandedVisa === visa.id ? (
                        <ChevronDown className="w-5 h-5 cursor-pointer" />
                    ) : (
                        <ChevronRight className="w-5 h-5 cursor-pointer" />
                    )}
                </button>
            </td>
            <td className="px-4 py-4">
                <div className="font-semibold text-white text-sm">{visa?.visa_type?.split(" ")?.map(type => type?.charAt(0)?.toUpperCase() + type?.slice(1)?.toLowerCase())?.join(" ")}</div>
            </td>
            <td className="px-4 py-4 text-slate-300 text-sm hidden lg:table-cell">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    {processingTimeLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : avgProcessingTime}
                </div>
            </td>
            <td className="px-4 py-4 text-slate-300 text-sm hidden xl:table-cell">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    {validityLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : avgValidity}
                </div>
            </td>
            <td className="px-6 py-4 hidden lg:table-cell">
                <div className="text-white font-semibold text-sm text-center">
                    00
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex justify-center">
                    {visa?.status === 'active' ? (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium whitespace-nowrap">
                            <Unlock className="w-3 h-3" />
                            Active
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-medium whitespace-nowrap">
                            <Lock className="w-3 h-3" />
                            In-active
                        </span>
                    )}
                </div>
            </td>
            <td className="px-6 py-4 hidden lg:table-cell">
                <div className="text-white font-semibold text-sm text-center">
                    {isVisaCountryLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : visaCountryList?.length}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex justify-center">
                    <button
                        onClick={() => toggleVisaStatus(visa?.id, visa)}
                        className={`p-2 hover:bg-slate-700/30 rounded-lg transition-colors cursor-pointer ${visa?.status === 'active' ? 'text-red-400 hover:text-red-300' : 'text-emerald-400 hover:text-emerald-300'
                            }`}
                        title={visa?.status === 'active' ? 'Block Visa Globally' : 'Activate Visa Globally'}
                    >
                        {visa?.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default VisaRow