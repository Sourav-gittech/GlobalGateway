import React from 'react'
import { Globe, ImageIcon, Loader2 } from 'lucide-react';
import { useCountryMainDetails } from '../../../../tanstack/query/getCountryDetails';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateCountry } from '../../../../Redux/Slice/countrySlice';
import getSweetAlert from '../../../../util/alert/sweetAlert';
import hotToast from '../../../../util/alert/hot-toast';
import { fetchAllEmbassy, updateEmbassyStatus } from '../../../../Redux/Slice/embassySlice';

const NewCountrySection = ({ embassy }) => {

    const dispatch = useDispatch();
    const { isAllCountryListLoading } = useSelector(state => state?.allCountry);

    const addCountry = (embassy) => {
        // console.log(countryData);

        const country_obj = {
            ...countryData,
            is_approved: 'fulfilled',

            code: null,
            official_name: null,
            capital: null,
            continents: null,
            latlng: null,
            zoom: 5,
            area: null,
            population: null,
            flag_url: null,
            languages: null,
            currency: { "name": null, "symbol": null, "code": null },

            user_type: 'admin'
        }

        const embassy_obj = {
            id: embassy?.id, status: embassy?.is_approved, is_blocked: embassy?.is_blocked, is_country_listed: true
        }

        dispatch(addOrUpdateCountry(country_obj))
            .then(res => {
                // console.log('Response for adding new country', res);

                if (res?.meta?.requestStatus == "fulfilled") {

                    dispatch(updateEmbassyStatus(embassy_obj))
                        .then(res => {
                            // console.log('Response from embassy status', res);

                            if (res?.meta?.requestStatus == "fulfilled") {

                                hotToast('Country added successfully!', "success");
                                dispatch(fetchAllEmbassy());
                            }
                            else {
                                getSweetAlert('Oops...', res?.payload, 'error');
                            }
                        })
                        .catch(err => {
                            console.log('Error occured', err);
                            getSweetAlert('Oops...', 'Something went wrong!', 'error');
                        })
                }
                else {
                    getSweetAlert('Oops...', res?.payload, 'error');
                }
            })
            .catch(err => {
                console.log('Error occured', err);
                getSweetAlert('Oops...', 'Something went wrong!', 'error');
            });
    }

    const { data: countryData, isLoading: isCountryDataLoading } = useCountryMainDetails(embassy?.country_id);

    if (isCountryDataLoading) {
        return (
            <div className="text-center py-12">
                <Loader2 className="w-6 h-6 text-white animate-spin mx-auto" />
                <p className="text-slate-400 text-lg">Loading...</p>
            </div>
        )
    }

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
                            src={countryData?.image_url}
                            alt={embassy?.country_name}
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
                    <span className='flex w-full justify-between'>
                        <div>
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Country Name</p>
                            <p className="text-white font-semibold text-lg">{embassy?.country_name ?? 'N/A'}</p>
                        </div>
                        <button onClick={() => addCountry(embassy)} className={`font-medium text-sm px-2 py-1 text-green-400 rounded-lg flex justify-center items-center gap-2 ${isAllCountryListLoading ? 'bg-green-500/30 cursor-not-allowed' : 'bg-green-500/20 hover:bg-green-500/30 cursor-pointer'}`}>
                            {isAllCountryListLoading && (
                                <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                            )}
                            Add Country
                        </button>
                    </span>
                    <div>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Country Description</p>
                        <p className="text-slate-300 text-sm leading-relaxed">{countryData?.description ?? 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewCountrySection