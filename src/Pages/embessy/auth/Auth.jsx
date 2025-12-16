import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";

/* ---------------- INPUT FIELD (UNCHANGED UI) ---------------- */
const InputField = ({
  label,
  type = "text",
  register,
  errors,
  name,
  setShowPassword,
  showPassword,
}) => {
  const isPassword = name === "password";

  const baseClasses =
    "w-full px-4 py-3 rounded-md bg-transparent text-white placeholder-white/70 border transition duration-300 focus:outline-none";
  const borderClasses = errors[name]
    ? "border-red-500"
    : "border-white/50 focus:border-white";

  return (
    <div className="relative">
      <input
        id={name}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder=" "
        className={`${baseClasses} ${borderClasses} peer`}
        {...register(name, {
          required: `${label} is required`,
          ...(name === "email" && {
            pattern: {
              value: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-zA-Z.]{2,}$/,
              message: "Enter a valid email",
            },
          }),
        })}
      />

      <label
        htmlFor={name}
        className={`absolute left-3 transition-all duration-300 pointer-events-none 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/70
        peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-black/50 peer-focus:px-1 peer-focus:text-white
        peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-black/50 peer-[:not(:placeholder-shown)]:px-1
        ${errors[name] ? "text-red-500 -top-2 left-3 text-xs bg-black/50 px-1" : ""}`}
      >
        {label}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition duration-200"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </button>
      )}

      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 ml-2">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

/* ---------------- EMBASSY AUTH (UI IDENTICAL) ---------------- */
const EmbessyAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Embassy Auth Data:", data);
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
      <div className="w-full max-w-6xl h-[650px] flex shadow-2xl rounded-xl overflow-hidden">
        {/* LEFT VIDEO SECTION */}
        <div className="hidden md:block w-1/2 relative bg-black/80">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover top-0 left-0"
          >
            <source src="/signup.mp4" type="video/mp4" />
          </video>

          <div className="relative z-10 text-white h-full px-10 flex flex-col justify-center bg-black/50">
            <h4 className="text-3xl font-bold mb-4">
              Embassy Portal
            </h4>

            <p className="text-base mb-6">
              {isSignup
                ? "Register your embassy to begin visa operations"
                : "Access your embassy dashboard securely"}
            </p>

            <div className="flex items-center gap-2 text-sm text-white/70">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Secure Embassy Access Only</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-full md:w-1/2 bg-black/20 backdrop-blur-md text-white px-12 py-8 flex flex-col justify-center">
          <h4 className="text-3xl font-bold text-white mb-2">
            {isSignup ? "Embassy Sign Up" : "Embassy Sign In"}
          </h4>

          <p className="text-sm text-white/60 mb-8">
            {isSignup
              ? "Create your embassy account"
              : "Enter your credentials to continue"}
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {isSignup && (
              <InputField
                label="Country"
                name="country"
                register={register}
                errors={errors}
              />
            )}

            <InputField
              label="Email"
              type="email"
              name="email"
              register={register}
              errors={errors}
            />

            <InputField
              label="Password"
              name="password"
              register={register}
              errors={errors}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
            />

            <button
              type="submit"
              className="py-3 mt-2 rounded-md font-semibold text-white bg-black hover:bg-black/80 transition duration-300"
            >
              {isSignup ? "SIGN UP" : "SIGN IN"}
            </button>
          </form>

          <p
            className="text-xs mt-4 text-white/70 cursor-pointer hover:text-white transition duration-200"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Sign In"
              : "New Embassy? Sign Up"}
          </p>

          {/* MOBILE SECURITY NOTICE (UNCHANGED) */}
          <div className="md:hidden mt-8 pt-6 border-t border-white/20">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Secure Embassy Access Only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbessyAuth;
