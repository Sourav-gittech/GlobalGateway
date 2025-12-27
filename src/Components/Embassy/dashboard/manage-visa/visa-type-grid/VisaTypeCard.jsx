import React from 'react'
import { Briefcase } from 'lucide-react';
import VisaCardHeader from './VisaCardHeader';
import VisaCardActiveBody from './VisaCardActiveBody';
import VisaCardFooter from './VisaCardFooter';
import VisaCardConfigBtn from './VisaCardConfigBtn';
import { useVisaDetailsViaId } from '../../../../../tanstack/query/getVisaDetailsViaId';
import { useVisaDetailsForCountry } from '../../../../../tanstack/query/getVisaDetailsForCountry';
import { useVisaDetails } from '../../../../../tanstack/query/getVisaDetails';

const VisaTypeCard = ({ visaType, getVisaPolicy, country_id, expandedVisa, iconMapping, handleDeleteVisaType, handleEditVisa, dragOverItem, index, draggedItem, selectedCountry,
    handleBlockVisa, handleDeleteVisa, handleDragStart, handleDragEnd, handleDragOver, handleDragEnter, handleDrop, setExpandedVisa }) => {

    const { data: visaData, isLoading: isVisaDataLoading } = useVisaDetailsViaId(Object.keys(visaType)[0]);
    const { data: specificVisaDetails, isLoading: isSpecificVisaDetails } = useVisaDetails({countryId:country_id, visitorCountryId:selectedCountry?.id, visaId:Object.keys(visaType)[0]});

    // console.log(Object.keys(visaType)[0],selectedCountry?.id,country_id);

    const policy = getVisaPolicy(visaType.id);
    const { data: visaDetails, isLoading: isVisaDetailsLoading, isError } = useVisaDetailsForCountry({ countryId: country_id, visitorCountryId: selectedCountry?.id, visaId: Object.keys(visaType)[0] });
    const isConfigured = !!policy;
    const Icon = iconMapping[Object.values(visaType)[0]];
    // console.log(visaDetails);

    if (isVisaDataLoading || isVisaDetailsLoading || isSpecificVisaDetails) {
        return (
            <div className="flex flex-col h-screen items-center justify-center bg-transparent">
                <div className="w-18 h-18 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span className="mt-5 text-black">Loading...</span>
            </div>
        );
    }
    return (
        <div
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all cursor-move ${policy?.blocked ? 'border-red-300' : 'border-gray-200'
                } ${dragOverItem === index ? 'border-blue-500 border-2 scale-105' : ''} ${draggedItem === index ? 'opacity-50' : ''
                }`}
        >
            <div className="p-5">
                {/* Drag Handle */}
                <VisaCardHeader policy={policy} iconMapping={iconMapping} visaType={visaType} visaData={visaData} isConfigured={isConfigured} Icon={Icon} />

                {visaDetails ? (
                    <div className="space-y-3">
                        {!policy?.blocked && (
                            <VisaCardActiveBody specificVisaDetails={specificVisaDetails} expandedVisa={expandedVisa} visaType={visaType} setExpandedVisa={setExpandedVisa} />
                        )}

                        {policy?.blocked && (
                            <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                <p className="text-sm text-red-800 font-medium">Blocked for {selectedCountry.name}</p>
                            </div>
                        )}

                        <VisaCardFooter handleEditVisa={handleEditVisa} handleBlockVisa={handleBlockVisa} handleDeleteVisa={handleDeleteVisa} visaType={visaType} policy={policy} />
                    </div>
                ) : (
                    <VisaCardConfigBtn handleEditVisa={handleEditVisa} handleDeleteVisaType={handleDeleteVisaType} visaType={visaType} />
                )}
            </div>
        </div>
    );
}

export default VisaTypeCard