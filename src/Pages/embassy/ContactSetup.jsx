import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ContactSetup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      phone: "",
      physicalAddress: "",
      website: "",
      establishedDate: "",
      workingHoursFrom: "",
      workingHoursTo: ""
    }
  });

  const handleContactSubmit = (data) => {
    setIsSubmitting(true);
    console.log("Form Data:", data);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Contact information submitted successfully!");
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 py-8"
      style={{
        backgroundImage: `url(/Slider1.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="w-full max-w-6xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden
        md:h-[650px]"
      >
        {/* LEFT VIDEO (TABLET + DESKTOP) */}
        <div className="hidden md:block md:w-1/2 relative bg-black/80">
          <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
            <source src="/signup.mp4" type="video/mp4" />
          </video>

          <div className="relative z-10 text-white h-full px-10 flex flex-col justify-center bg-black/50">
            <h4 className="text-3xl font-bold mb-4">
              Contact Setup
            </h4>
            <p className="text-base mb-6">
              Add your embassy contact details to help visitors reach you
            </p>

            <div className="flex items-center gap-2 text-sm text-white/70">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>One-time setup process</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM (ALL DEVICES) */}
        <div className="w-full md:w-1/2 bg-black/20 backdrop-blur-md text-white px-6 sm:px-8 md:px-12 py-6 md:py-8 flex flex-col overflow-y-auto">

          <div className="mb-6 text-center">
            <h4 className="text-2xl sm:text-3xl font-bold mb-2">
              Embassy Contact Details
            </h4>
            <p className="text-sm text-white/60">
              Provide accurate contact information for verification
            </p>
          </div>

          <div className="space-y-4 flex-1">
            {/* EMAIL ADDRESS */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="contact@embassy.com"
                className="w-full px-4 py-2.5 rounded-md bg-white/10 text-white placeholder-white/50
                border border-white/30 focus:border-white transition duration-300
                focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
              )}
            </div>

            {/* PHONE NUMBER */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phone", {
                  pattern: {
                    value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                    message: "Invalid phone number format"
                  }
                })}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2.5 rounded-md bg-white/10 text-white placeholder-white/50
                border border-white/30 focus:border-white transition duration-300
                focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>
              )}
            </div>

            {/* PHYSICAL ADDRESS */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Physical Address
              </label>
              <textarea
                rows={2}
                {...register("physicalAddress")}
                placeholder="123 Embassy Street, City, Country"
                className="w-full px-4 py-2.5 rounded-md bg-white/10 text-white placeholder-white/50
                border border-white/30 focus:border-white transition duration-300
                focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
              />
              {errors.physicalAddress && (
                <p className="text-red-400 text-xs mt-1.5">{errors.physicalAddress.message}</p>
              )}
            </div>

            {/* OFFICIAL WEBSITE */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Official Website
              </label>
              <input
                type="url"
                {...register("website", {
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
                    message: "Invalid website URL"
                  }
                })}
                placeholder="https://www.embassy.com"
                className="w-full px-4 py-2.5 rounded-md bg-white/10 text-white placeholder-white/50
                border border-white/30 focus:border-white transition duration-300
                focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              {errors.website && (
                <p className="text-red-400 text-xs mt-1.5">{errors.website.message}</p>
              )}
            </div>

            {/* ESTABLISHED DATE */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Established Date
              </label>
              <input
                type="date"
                {...register("establishedDate")}
                className="w-full px-4 py-2.5 rounded-md bg-white/10 text-white
                border border-white/30 focus:border-white transition duration-300
                focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              {errors.establishedDate && (
                <p className="text-red-400 text-xs mt-1.5">{errors.establishedDate.message}</p>
              )}
            </div>

            {/* WORKING HOURS */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Working Hours
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="time"
                    {...register("workingHoursFrom")}
                    className="w-full px-4 py-2.5 rounded-md bg-white/10 text-white
                    border border-white/30 focus:border-white transition duration-300
                    focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                  <p className="text-xs text-white/60 mt-1">From</p>
                </div>

                <div>
                  <input
                    type="time"
                    {...register("workingHoursTo")}
                    className="w-full px-4 py-2.5 rounded-md bg-white/10 text-white
                    border border-white/30 focus:border-white transition duration-300
                    focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                  <p className="text-xs text-white/60 mt-1">To</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            type="button"
            onClick={handleSubmit(handleContactSubmit)}
            disabled={isSubmitting}
            className={`w-full py-3 mt-6 rounded-md font-semibold text-white bg-black hover:bg-black/80 transition duration-300 ${isSubmitting ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
          >
            {isSubmitting ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSetup;