import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { decodeBase64Url } from "../../../../util/encodeDecode/base64";
import ApplicationViewHeader from "../../../../Components/embassy/dashboard/application-view/ApplicationViewHeader";
import StatusCard from "../../../../Components/embassy/dashboard/application-view/StatusCard";
import AppointmentModal from "../../../../Components/embassy/dashboard/application-view/application-modal/AppointmentModal";
import RejectModal from "../../../../Components/embassy/dashboard/application-view/application-modal/RejectModal";
import ApplicationViewTab from "../../../../Components/embassy/dashboard/application-view/application-view-details/ApplicationViewTab";
import PersonalInfo from "../../../../Components/embassy/dashboard/application-view/application-view-details/PersonalInfo";
import VisaDetails from "../../../../Components/embassy/dashboard/application-view/application-view-details/VisaDetails";
import Documents from "../../../../Components/embassy/dashboard/application-view/application-view-details/Documents";
import TimeLine from "../../../../Components/embassy/dashboard/application-view/application-view-details/TimeLine";
import { useVisaDetails } from "../../../../tanstack/query/getSpecificVisaDetails";
import { useFulfilledApplicationByUser } from "../../../../tanstack/query/getUserTravelHistory";
import { fetchFullApplicationDetailsById } from "../../../../tanstack/query/getFullApplicationDetails";

export default function ApplicationView() {
  const { application_id } = useParams();
  const applicationId = decodeBase64Url(application_id);

  const [activeTab, setActiveTab] = useState("personal");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointmentSet, setAppointmentSet] = useState(false);

  const {
    data: rawApplication,
    isLoading: applicationLoading,
  } = fetchFullApplicationDetailsById(applicationId);

  const { data: visaDetails } = useVisaDetails({
    country_id: rawApplication?.country_id,
    visa_id: rawApplication?.application_visa_details?.visaId,
  });

  const { data: travelHistoryDetails } =
    useFulfilledApplicationByUser(rawApplication?.user_id, "fulfilled");

  /**
   *  FINAL PRODUCTION FIX
   * Inject destinationCountry from visaDetails
   * (NO UI CHANGE, NO BREAKING CHANGE)
   */
  const application = useMemo(() => {
    if (!rawApplication) return null;

    const destinationCountry =
      visaDetails?.country_name ||
      visaDetails?.country?.name ||
      visaDetails?.country ||
      null;

    return {
      ...rawApplication,
      destinationCountry, // ✅ LocationSelection now works
    };
  }, [rawApplication, visaDetails]);

  if (applicationLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-transparent">
        <div className="w-18 h-18 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <span className="mt-5 text-black">Loading...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <ApplicationViewHeader application={application} />

      {/* Status Card */}
      <StatusCard
        application={application}
        setShowRejectModal={setShowRejectModal}
        setShowAppointmentModal={setShowAppointmentModal}
      />

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <ApplicationViewTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="p-6">
          {activeTab === "personal" && (
            <PersonalInfo application={application} />
          )}

          {activeTab === "visa" && (
            <VisaDetails
              application={application}
              visaDetails={visaDetails}
              travelHistoryDetails={travelHistoryDetails}
            />
          )}

          {activeTab === "documents" && (
            <Documents application={application} />
          )}

          {activeTab === "timeline" && (
            <TimeLine application={application} />
          )}
        </div>
      </div>

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
          <AppointmentModal
            application={application}
            visaDetails={visaDetails}
            setShowAppointmentModal={setShowAppointmentModal}
            setAppointmentSet={setAppointmentSet}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setCurrentMonth={setCurrentMonth}
            currentMonth={currentMonth}
          />
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
          <RejectModal
            application={application}
            setShowRejectModal={setShowRejectModal}
          />
        </div>
      )}
    </div>
  );
}