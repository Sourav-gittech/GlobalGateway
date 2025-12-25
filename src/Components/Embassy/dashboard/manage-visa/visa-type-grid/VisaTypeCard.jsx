import React from 'react'
import { Briefcase, Calendar, CheckCircle, ChevronDown, ChevronUp, Clock, Edit2, IndianRupee, Lock, Plus, Trash2, Unlock } from 'lucide-react';
import VisaCardHeader from './VisaCardHeader';
import VisaCardActiveBody from './VisaCardActiveBody';
import VisaCardFooter from './VisaCardFooter';
import VisaCardConfigBtn from './VisaCardConfigBtn';

const VisaTypeCard = ({ visaType, getVisaPolicy, expandedVisa, iconMapping, handleDeleteVisaType, handleEditVisa, dragOverItem, index, draggedItem, selectedCountry,
    handleBlockVisa, handleDeleteVisa, handleDragStart, handleDragEnd, handleDragOver, handleDragEnter, handleDrop, setExpandedVisa }) => {

    const policy = getVisaPolicy(visaType.id);
    const isConfigured = !!policy;
    const Icon = iconMapping[visaType.icon] || Briefcase;

    return (
        <div
            key={visaType.id}
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
                <VisaCardHeader policy={policy} visaType={visaType} isConfigured={isConfigured} Icon={Icon} />

                {isConfigured ? (
                    <div className="space-y-3">
                        {!policy.blocked && (
                            <VisaCardActiveBody policy={policy} expandedVisa={expandedVisa} visaType={visaType} setExpandedVisa={setExpandedVisa} />
                        )}

                        {policy.blocked && (
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