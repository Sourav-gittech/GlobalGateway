import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Phone, Mail, Loader2, ClipboardList } from "lucide-react";
import { useParams } from "react-router-dom";
import { useFullCountryDetails } from "../../../../tanstack/query/getCountryDetails";
import CountryDescription from "../../../../Components/user/country/country-details/CountryDescription";
import KeyInformation from "../../../../Components/user/country/country-details/KeyInformation";
import CountryMap from "../../../../Components/user/country/country-details/CountryMap";
import { Link } from "react-router-dom";
import { useCountryWiseVisaDetails } from "../../../../tanstack/query/getCountryWiseVisaDetails";

const CountryDetails = () => {
  const { country_id } = useParams();

  const { data: countryData, isLoading: countryLoading, error: countryError } = useFullCountryDetails(country_id);
  const { data: countryWiseVisaDetails, isLoading: isCountryWiseVisaLoading, error: countryWiseVisaError } = useCountryWiseVisaDetails(country_id);

  // console.log("Country details", countryData);
  // console.log("Country wise visa details", countryWiseVisaDetails);

  const handleContinue = () => {
    alert("Continue without Applying clicked - would navigate to /coachingcards");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (countryLoading || isCountryWiseVisaLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-18 h-18 text-red-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading country details...</p>
        </div>
      </div>
    );
  }

  if (countryError) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl font-bold">!</span>
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-2">Unable to Load Country</h2>
          <p className="text-gray-600 mb-6">{countryError}</p>
          {/* <button
            onClick={fetchCountryData}
            className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Try Again
          </button> */}
        </div>
      </div>
    );
  }

  if (!countryData) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Country not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Simple Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 lg:pt-8">
        <Link to='/country'
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm">Back</span>
        </Link>
      </div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">

        {/* Section 1: Image + Description */}
        <CountryDescription image_url={countryData?.image_url} name={countryData?.name} description={countryData?.description} flag_url={countryData?.details?.flag_url} />

        {/* Section 2: Key Information + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-24">

          {/* Left: Key Information */}
          <KeyInformation officialName={countryData?.details?.official_name} capital={countryData?.details?.capital} region={countryData?.details?.region} population={countryData?.details?.population} currency={countryData?.details?.currency} languages={countryData?.details?.languages} available_visa={countryWiseVisaDetails} area={countryData?.details?.area} />

          {/* Right: Map */}
          <CountryMap lat={countryData?.details?.latlng[0]} lng={countryData?.details?.latlng[1]} zoom={countryData?.details?.zoom} name={countryData?.name} />
        </div>

        {/* Section 3: CTA and Disclaimer */}
        <motion.div variants={itemVariants} className="pt-12 lg:pt-16">

          {/* CTA Section */}
          <div className="mb-8 lg:mb-12 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-3">Ready to begin your journey?</h3>
            <p className="text-gray-600 font-light text-base lg:text-lg">Apply for your visa or explore our coaching services to ensure a smooth transition.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to={`/visaprocess/${countryData?.id}`}
              className="flex-1 px-6 sm:px-8 py-4 sm:py-5 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-3 group"
            >
              <FileText className="w-5 h-5 group-hover:rotate-6 transition-transform" />
              <span className="text-sm tracking-wide uppercase">Apply for Visa</span>
            </Link>

            <button
              onClick={handleContinue}
              className="flex-1 px-6 sm:px-8 py-4 sm:py-5 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
            >
              <ClipboardList className="w-5 h-5 group-hover:rotate-6 transition-transform" />
              <span className="text-sm tracking-wide uppercase">Check Visa Courses</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-6 sm:py-8">
            <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+1 (234) 567-890</span>
            </a>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <a href="mailto:info@visaconsult.com" className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">info@visaconsult.com</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 mt-8">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-6 h-6 rounded-full bg-white border-2 border-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-500 text-xs font-bold">!</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2 text-sm uppercase tracking-wide">Important Notice</h4>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  Visa requirements and immigration regulations are subject to change without notice. We strongly recommend consulting with our certified visa specialists for the most current and accurate information pertaining to your specific situation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CountryDetails;