import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from "../../../Redux/Slice/auth/authSlice";
import getSweetAlert from "../../../util/alert/sweetAlert";
import { updateLastSignInAt } from "../../../Redux/Slice/userSlice";
import toastifyAlert from "../../../util/alert/toastify";
import { useDispatch, useSelector } from "react-redux";
import { EmbassyAuthInputField } from "../../../Components/Embassy/auth/EmbassyAuthInputField";
import hotToast from "../../../util/alert/hot-toast";
import { useNavigate } from "react-router-dom";


const EmbassyAuth = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    { isUserAuthLoading, userAuthData, userAuthError } = useSelector(state => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      country: "",
    },
  });

  const onSubmit = (data) => {
    // console.log("Embassy Auth Data:", data);

    let auth_obj;
    if (isSignup) {

      auth_obj = {
        country_name: data.country.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
        country_id: null,
        email: data.email,
        password: data.password,
        is_verified: "pending",
        is_country_available: false,
        is_blocked: false,
        is_approved: 'pending',
        last_sign_in_at: null,
        providers: null,
        role: 'embassy'
      }

      dispatch(registerUser(auth_obj))
        .then(res => {
          // console.log('Response for register embassy', res);

          if (res.meta.requestStatus === "fulfilled") {
            hotToast('Registration successfull. Please verify email ID', "success");
            reset();
            setIsSignup(!isSignup);
          }
          else {
            getSweetAlert('Oops...', res.payload, 'error');
          }
        })
        .catch(err => {
          console.log('Error occured', err);
          getSweetAlert('Oops...', 'Something went wrong!', 'error');
        })
    }
    else {

      auth_obj = {
        email: data.email,
        password: data.password,
        role: 'embassy'
      }

      dispatch(loginUser(auth_obj))
        .then(res => {
          // console.log('Response for login', res);

          if (res.meta.requestStatus === "fulfilled") {

            dispatch(updateLastSignInAt({ id: res?.payload?.user?.id, user_type: 'embassy' }))
              .then(res => {
                // console.log('Response for  update login time', res);

                //toastifyAlert.success('Logged In Successfully');
                sessionStorage.setItem('embassy_token', res.payload.accessToken);

                if (!res?.payload[0]?.is_country_available) {
                  navigate('/embassy/country-setup');
                }
                else if (res?.payload[0]?.is_approved == "pending") {
                  navigate('/embassy/review');
                }
                else {
                  navigate('/embassy/dashboard');
                }
              })
              .catch(err => {
                console.log('Error occured', err);
                getSweetAlert('Oops...', 'Something went wrong!', 'error');
              })
          }
          else {
            getSweetAlert('Oops...', res.payload, 'info');
          }
        })
        .catch(err => {
          console.log('Error occured', err);
          getSweetAlert('Oops...', 'Something went wrong!', 'error');
        })
    }
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

          <form onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {isSignup && (
              <EmbassyAuthInputField
                label="Country"
                {...register("country", { required: "Country is required" })}
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            )}

            <EmbassyAuthInputField
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-zA-Z.]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <EmbassyAuthInputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                  message:
                    "Password must contain 8+ characters, uppercase, lowercase, number & special character",
                },
              })}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <button
              type="submit"
              className={`py-3 mt-2 rounded-md font-semibold text-white bg-black hover:bg-black/80 transition duration-300 ${isUserAuthLoading ? 'cursor-not-allowed bg-black/80' : 'cursor-pointer'}`}
            >
              {isUserAuthLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />
              )}
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

export default EmbassyAuth;
