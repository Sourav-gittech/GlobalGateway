import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProgressBar from "../../../../Components/user/apply-visa/application-form/ProgressBar";
import Step1PersonalInfo from "../../../../Components/user/apply-visa/application-form/form/Step1PersonalInfo";
import Step2PassportDetails from "../../../../Components/user/apply-visa/application-form/form/Step2PassportDetails";
import Step3VisaType from "../../../../Components/user/apply-visa/application-form/form/Step3SelectVisa";
import Step4UploadDocuments from "../../../../Components/user/apply-visa/application-form/form/Step4UploadDocuments";
import Step5Review from "../../../../Components/user/apply-visa/application-form/form/Step5Review";
import Payment from "../payment/PaymentInterface";
import { useNavigate, useParams } from "react-router-dom";
import { checkLoggedInUser } from "../../../../Redux/Slice/auth/checkAuthSlice";
import getSweetAlert from "../../../../util/alert/sweetAlert";
import { Loader2 } from "lucide-react";
import { useApplicationByUserAndCountry } from "../../../../tanstack/query/getApplicationByUserAndCountry";
import { useCountryWiseVisaDetails } from "../../../../tanstack/query/getCountryWiseVisaDetails";
import { decodeBase64Url } from "../../../../util/encodeDecode/base64";

export default function VisaApplicationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stepSetOnce = useRef(false);
  const { isuserLoading, userAuthData, userError } = useSelector(state => state.checkAuth);
  const [step, setStep] = useState(1);
  const [applicationId, setApplicationId] = useState(null);
  const { country_id } = useParams();

  const countryId = decodeBase64Url(country_id);
  const { data: application, isLoading: isApplicationLoading, isError: isApplicationError, error } = useApplicationByUserAndCountry(userAuthData?.id, countryId);
  const { data: countryWiseVisaDetails, isLoading: isCountryWiseVisaLoading, error: countryWiseVisaError } = useCountryWiseVisaDetails(countryId);
  const finalAppId = applicationId || application?.id;

  useEffect(() => {
    dispatch(checkLoggedInUser())
      .then(res => {
        // console.log('Response for fetching user profile', res);
      })
      .catch((err) => {
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
        console.log("Error occurred", err);
      });
  }, [dispatch]);

  useEffect(() => {
    if (!application) return;

    if (stepSetOnce.current) return;

    if (application && application.status === "processing" && application?.is_completed) {
      getSweetAlert('Oops...', 'Your visa request still processing', 'warning');
      navigate(-1);
    }

    if (application && application.status === "pending" && !application?.is_completed) {
      setStep(Number.parseInt(application?.current_step));
      stepSetOnce.current = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [application]);

  const next = () => setStep((s) => Math.min(6, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));
  const goToStep = (targetStep) => setStep(targetStep);

  // console.log('Pending applications', application);
  // console.log('Application Id',finalAppId);
  // console.log('Logged in user details', userAuthData);
  // console.log('Current form steps is', step);
  // console.log('Visa types', countryWiseVisaDetails);


  if (isuserLoading && isApplicationLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-18 h-18 text-red-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">

      {step !== 6 && (
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Visa Application</h1>
              <p className="text-sm text-gray-600 mt-1">
                Complete your application in {step < 7 ? "6 simple steps" : "a few minutes"}
              </p>
            </div>

            {step < 6 && (
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-500">Application Progress</p>
                <p className="text-2xl font-bold text-red-600">
                  {Math.round((Math.min(step - 1, 5) / 5) * 100)}%
                </p>
              </div>
            )}
          </div>
        </header>
      )}

      {/* Progress bar*/}
      {step !== 6 && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <ProgressBar step={Math.min(step, 6)} />
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className={`${step === 6 ? "w-full" : "max-w-6xl mx-auto px-4 py-8"}`}>
        <div
          className={`transition-all duration-300 ${step === 6
            ? ""
            : "bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            }`}
        >
          {step === 1 && <Step1PersonalInfo onNext={next} onApplicationCreated={(id) => setApplicationId(id)} country_id={countryId} application_id={finalAppId} user_data={userAuthData} />}
          {step === 2 && <Step2PassportDetails onNext={next} onBack={prev} user_id={userAuthData?.id} application_id={finalAppId} />}
          {step === 3 && <Step3VisaType onNext={next} onBack={prev} countryWiseVisaDetails={countryWiseVisaDetails} user_id={userAuthData?.id} application_id={finalAppId} />}
          {step === 4 && <Step4UploadDocuments onNext={next} onBack={prev} user_id={userAuthData?.id} application_id={finalAppId} />}
          {step === 5 && <Step5Review onNext={next} onBack={prev} onEdit={goToStep} user_id={userAuthData?.id} application_id={finalAppId} />}
          {step === 6 && <Payment onBack={prev} onSuccess={next} user_id={userAuthData?.id} countryWiseVisaDetails={countryWiseVisaDetails} application_id={finalAppId} />}
        </div>
      </div>

    </div>
  );
}