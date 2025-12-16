import React, { useState } from "react";

/* ---------- INPUT FIELD (UNCHANGED UI) ---------- */
const InputField = ({ label, name, value, onChange }) => (
  <div className="relative">
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="w-full px-4 py-3 rounded-md bg-transparent text-white placeholder-white/70
      border border-white/50 focus:border-white transition duration-300 focus:outline-none peer"
    />
    <label
      className="absolute left-3 transition-all duration-300 pointer-events-none
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/70
      peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-black/50 peer-focus:px-1 peer-focus:text-white
      peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs
      peer-[:not(:placeholder-shown)]:bg-black/50 peer-[:not(:placeholder-shown)]:px-1"
    >
      {label}
    </label>
  </div>
);

/* ---------- COUNTRY SETUP ---------- */
const CountrySetup = () => {
  const [country, setCountry] = useState("Australia");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) setImage(e.dataTransfer.files[0]);
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
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="/signup.mp4" type="video/mp4" />
          </video>

          <div className="relative z-10 text-white h-full px-10 flex flex-col justify-center bg-black/50">
            <h4 className="text-3xl font-bold mb-4">
              Country Setup
            </h4>
            <p className="text-base mb-6">
              Add your embassy country details to continue verification
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
        <div
          className="w-full md:w-1/2 bg-black/20 backdrop-blur-md text-white
          px-6 sm:px-8 md:px-12 py-8 flex flex-col justify-center gap-6"
        >
          <h4 className="text-2xl sm:text-3xl font-bold">
            Embassy Country Details
          </h4>

          <p className="text-sm text-white/60">
            This information will be reviewed by admin before approval
          </p>

          <InputField
            label="Country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          {/* DESCRIPTION */}
          <div className="relative">
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
              className="w-full px-4 py-3 rounded-md bg-transparent text-white placeholder-white/70
              border border-white/50 focus:border-white transition duration-300
              focus:outline-none peer resize-none"
            />
            <label
              className="absolute left-3 transition-all duration-300 pointer-events-none
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/70
              peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-black/50 peer-focus:px-1 peer-focus:text-white
              peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs
              peer-[:not(:placeholder-shown)]:bg-black/50 peer-[:not(:placeholder-shown)]:px-1"
            >
              Country Description
            </label>
          </div>

          {/* IMAGE UPLOAD */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
              ${dragActive ? "border-white bg-white/10" : "border-white/40"}`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="countryImage"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="countryImage" className="cursor-pointer">
              {image ? (
                <p className="text-sm text-white truncate">{image.name}</p>
              ) : (
                <p className="text-sm text-white/70">
                  Drag & drop country image or{" "}
                  <span className="underline">browse</span>
                </p>
              )}
            </label>
          </div>

          <button
            className="py-3 mt-2 rounded-md font-semibold text-white
            bg-black hover:bg-black/80 transition duration-300"
          >
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountrySetup;
