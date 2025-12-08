import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../../Redux/Slice/auth/authSlice';
import getSweetAlert from '../../../util/alert/sweetAlert';
import hotToast from '../../../util/alert/hot-toast';
import toastifyAlert from '../../../util/alert/toastify';
import { useNavigate } from 'react-router-dom';
import { updateLastSignInAt } from '../../../Redux/Slice/userSlice';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch(),
    { isUserAuthLoading, userAuthData, userAuthError } = useSelector(state => state.auth);

  const { register, handleSubmit, watch, formState: { errors }, reset, clearErrors } = useForm();
  const navigate = useNavigate();
  const passwordValue = watch("password");

  const onSubmit = (data) => {
    // console.log("FORM SUBMITTED:", data);
    // console.log(isLogin);

    let auth_obj;
    if (isLogin) {
      auth_obj = {
        email: data.email,
        password: data.password,
        role: 'user'
      }

      dispatch(loginUser(auth_obj))
        .then(res => {
          // console.log('Response for login', res);

          if (res.meta.requestStatus === "fulfilled") {

            dispatch(updateLastSignInAt(res?.payload?.user?.id))
              .then(res => {
                // console.log('Response for  update login time', res);

                toastifyAlert.success('Logged In Successfully');
                sessionStorage.setItem('user_token', res.payload.accessToken);
                navigate('/dashboard');
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
    else {
      auth_obj = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        avatar: data.avatar,
        password: data.password,
        is_verified: "pending",
        is_blocked: false,
        last_sign_in_at: data.last_sign_in_at,
        role: "user",
      }

      dispatch(registerUser(auth_obj))
        .then(res => {
          // console.log('Response for register', res);

          if (res.meta.requestStatus === "fulfilled") {
            hotToast('Registration successfull. Please verify your email', "success");
            reset();
            setIsLogin(!isLogin);
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

  const textFieldStyles = {
    width: '100%',
    '& label': { color: 'white' },
    '& label.Mui-focused': { color: 'white' },
    '& .MuiInputBase-root': { color: 'white' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
      '&:hover fieldset': { borderColor: 'white' },
      '&.Mui-focused fieldset': { borderColor: 'white' },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(/Slider1.jpg)`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          mt: 3,
          mb: 3,
          width: '100%',
          maxWidth: 1100,
          height: 650,
          display: 'flex',
          boxShadow: 10,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {/* LEFT VIDEO SECTION */}
        <Box
          sx={{
            width: '50%',
            position: 'relative',
            bgcolor: '#000000cc',
          }}
        >
          <video autoPlay loop muted playsInline
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              top: 0,
              left: 0,
            }}>
            <source src="/signup.mp4" type="video/mp4" />
          </video>

          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              color: '#fff',
              height: '100%',
              px: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.5)',
            }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
              {isLogin ? 'Hello, Traveller!' : 'Welcome Back!'}
            </Typography>

            <Typography variant="body1" mb={3}>
              {isLogin
                ? 'Enter your details to access your account'
                : 'Create your account to start your journey with us'}
            </Typography>

            <Button
              onClick={() => {
                setIsLogin(!isLogin);
                reset();
                clearErrors();
              }}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            >
              {isLogin ? 'SIGN UP' : 'SIGN IN'}
            </Button>
          </Box>
        </Box>

        {/* RIGHT FORM SECTION */}
        <Box
          sx={{
            width: '50%',
            backgroundColor: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            px: 5,
            py: 2,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
            {isLogin ? 'Sign in' : 'Create Account'}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={3}
            display="flex"
            flexDirection="column"
            gap={2}>
            {/* NAME */}
            {!isLogin && (
              <>
                <TextField
                  sx={textFieldStyles}
                  label="Full Name"
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />

                <TextField
                  sx={textFieldStyles}
                  label="Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Enter a valid phone number",
                    }
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />

                <input
                  type="file"
                  accept="image/*"
                  {...register("avatar", {
                    required: "Profile image is required",
                    validate: {
                      fileType: (value) => {
                        if (!value || !value[0]) return "File is required";

                        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                        return allowedTypes.includes(value[0].type)
                          ? true
                          : "Only JPG, JPEG, or PNG files are allowed";
                      },
                      fileSize: (value) =>
                        value && value[0]?.size < 200 * 1024
                          ? true
                          : "Maximum file size is 200KB",
                    }
                  })}
                  style={{
                    marginTop: "2px",
                    color: `${!errors.avatar ? 'white' : 'red'}`,
                    border: `1px solid ${!errors.avatar ? 'rgba(255,255,255,0.5)' : 'red'}`,
                    padding: "14px",
                    borderRadius: "4px",
                    width: "100%",
                  }}
                />

                {errors.avatar && (
                  <Typography color="error" fontSize={12} mt={-1.2} ml={2}>
                    {errors.avatar.message}
                  </Typography>
                )}
              </>
            )}

            {/* EMAIL */}
            <TextField
              sx={textFieldStyles}
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-zA-Z.]{2,}$/,
                  message: "Enter a valid email",
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            {/* PASSWORD */}
            <TextField
              sx={textFieldStyles}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              {...register("password", {
                required: "Password is required",
                ...(!isLogin && {
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                    message:
                      "Password must contain 8+ characters, uppercase, lowercase, number & special character",
                  }
                })
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ color: 'white' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            {!isLogin && (
              <>
                {/* CONFIRM PASSWORD */}
                <TextField
                  sx={textFieldStyles}
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register("confirm_password", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === passwordValue || "Passwords do not match",
                  })}
                  error={!!errors.confirm_password}
                  helperText={errors.confirm_password?.message}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        sx={{ color: 'white' }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{
                paddingBottom: '12px',
                paddingTop: '12px',
                backgroundColor: `${isUserAuthLoading ? 'rgba(0,0,0,0.4)' : 'black'}`,
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                alignItems: 'center',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
              }}
            >
              {isUserAuthLoading && (
                <div className="w-3 h-3 border-1 border-white border-t-transparent rounded-full animate-spin" />
              )}

              {isLogin ? "SIGN IN" : "SIGN UP"}
            </Button>
          </Box>

          {isLogin && (
            <Typography
              fontSize={12}
              mt={1}
              sx={{
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                '&:hover': { color: 'white' },
              }}
            >
              Forgot your password?
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthForm;
