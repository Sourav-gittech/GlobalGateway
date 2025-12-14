import React, { useEffect } from 'react';
import { Box, Container, Typography, Button, Breadcrumbs, Link } from '@mui/material';
import { motion as Motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoggedInUser } from '../../../Redux/Slice/auth/checkAuthSlice';
import getSweetAlert from '../../../util/alert/sweetAlert';
import VisaProcessSteps from '../../../Components/user/apply-visa/VisaProcessSteps';
import { decodeBase64Url, encodeBase64Url } from '../../../util/encodeDecode/base64';

const VisaProcess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isuserLoading, userAuthData, userError } = useSelector(state => state.checkAuth);

  const { country_id } = useParams();

  const countryId = decodeBase64Url(country_id);
  useEffect(() => {
    dispatch(checkLoggedInUser())
      .then(res => {
        // console.log('Response for fetching user profile', res);
      })
      .catch((err) => {
        console.log("Error occurred", err);
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      });
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const handleContinueClick = () => {
    if (userAuthData) {
      navigate(`/policy/${encodeBase64Url(String(countryId))}`);
    } else {
      // toast.error('Please sign in first');
      navigate('/authentication');
    }
  };

  return (
    <>
      {/* Top Banner Section */}
      <Box
        sx={{
          height: '300px',
          backgroundImage: 'url(/PageBanner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          color: '#fff',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.7)',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            px: { xs: 2, md: 10 },
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            Visa Process
          </Typography>
          <Breadcrumbs sx={{ color: 'red', mt: 1 }} separator="›">
            <Link underline="hover" href="/" sx={{ color: 'red' }}>
              Home
            </Link>
            <Typography sx={{ color: 'red' }}>Visa Process</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Visa Process Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: '#f8f9fa',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Heading */}
            <Box textAlign="center" mb={{ xs: 6, md: 10 }}>
              <Motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    color: '#9ca3af',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    fontSize: '0.875rem',
                    mb: 2,
                    display: 'block',
                    textTransform: 'uppercase',

                  }}
                >
                  VISA APPLICATION PROCESS
                </Typography>
              </Motion.div>

              <Motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.75rem', lg: '4.5rem' },
                    fontWeight: 700,
                    color: '#1e293b',
                    lineHeight: 1.1,
                    maxWidth: '900px',
                    mx: 'auto'
                  }}
                >
                  Get your Visa Approved in{' '}
                  <Box component="span" sx={{ display: 'block' }}>
                    3 Simple Steps
                  </Box>
                </Typography>
              </Motion.div>
            </Box>

            {/* Dotted Line */}
            <Box
              sx={{
                position: 'absolute',
                top: '100px',
                left: '20%',
                right: '20%',
                height: '2px',
                background: `repeating-linear-gradient(
                  90deg,
                  #cbd5e0 0px,
                  #cbd5e0 6px,
                  transparent 6px,
                  transparent 14px
                )`,
                zIndex: 0,
                display: { xs: 'none', lg: 'block' }
              }}
            />

            {/* Steps */}
            <VisaProcessSteps />

            {/* Continue Button */}
            <Box mt={8} textAlign="center">
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#dc2626',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: '60px',
                  '&:hover': {
                    backgroundColor: '#991414'
                  }
                }}
                onClick={handleContinueClick}
              >
                Continue to Online Application Form
              </Button>
            </Box>
          </Motion.div>
        </Container>
      </Box>
    </>
  );
};

export default VisaProcess;
