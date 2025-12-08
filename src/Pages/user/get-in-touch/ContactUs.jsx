// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Breadcrumbs,
//   Link,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Container,
//   Paper,
//   CircularProgress
// } from '@mui/material';
// import PhoneIcon from '@mui/icons-material/AddIcCall';
// import EmailIcon from '@mui/icons-material/Email';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import DescriptionIcon from '@mui/icons-material/Description';
// import { motion } from 'framer-motion';

// const contactItems = [
//   {
//     icon: <PhoneIcon sx={{ fontSize: 28, color: '#fff' }} />,
//     title: 'Have any question?',
//     content: 'Free +91-8976564530',
//   },
//   {
//     icon: <EmailIcon sx={{ fontSize: 28, color: '#fff' }} />,
//     title: 'Write email',
//     content: 'needhelp@globalgateway.com',
//   },
//   {
//     icon: <LocationOnIcon sx={{ fontSize: 28, color: '#fff' }} />,
//     title: 'Visit anytime',
//     content: 'Sector V, Bidhannagar, Kolkata, West Bengal',
//   },
// ];

// const faqs = [
//   {
//     question: "How to get free immigration?",
//     answer: "Sed rhoncus facilisis purus, at accumsan purus sagittis vitae. Nullam acelit at eros imperdiet. Pellentesque sit."
//   },
//   {
//     question: "Which country is good for residents?",
//     answer: "Canada, Australia, and New Zealand are popular destinations for permanent residency due to their immigration-friendly policies, quality of life, and opportunities for skilled workers."
//   },
//   {
//     question: "Canada study visa requirements?",
//     answer: "To obtain a Canadian study visa, you need an acceptance letter from a designated learning institution, proof of financial support, no criminal record, and may need to complete a medical exam."
//   }
// ];

// const Contact = () => {
//   const [expanded, setExpanded] = useState('panel0');
//   const [mapLoaded, setMapLoaded] = useState(true);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <Box>
//       {/* Top Banner */}
//       <Box
//         sx={{
//           height: { xs: '250px', md: '300px' },
//           backgroundImage: 'url(/PageBanner.jpg)',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           display: 'flex',
//           alignItems: 'center',
//           color: '#fff',
//           position: 'relative',
//         }}
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             bgcolor: 'rgba(0, 0, 0, 0.7)',
//           }}
//         />
//         <Box
//           sx={{
//             position: 'relative',
//             zIndex: 1,
//             width: '100%',
//             px: { xs: 2, sm: 4, md: 6, lg: 10 },
//             maxWidth: '1400px',
//             mx: 'auto',
//           }}
//         >
//           <Typography 
//             variant="h3" 
//             fontWeight="bold"
//             sx={{
//               fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3rem' }
//             }}
//           >
//             Contact Us
//           </Typography>
//           <Breadcrumbs sx={{ color: '#FF5252', mt: 1 }} separator="›">
//             <Link 
//               underline="hover" 
//               href="/" 
//               sx={{ 
//                 color: '#FF5252', 
//                 '&:hover': { color: '#fff' },
//                 fontSize: { xs: '0.9rem', md: '1rem' }
//               }}
//             >
//               Home
//             </Link>
//             <Typography 
//               sx={{ 
//                 color: '#FF5252',
//                 fontSize: { xs: '0.9rem', md: '1rem' }
//               }}
//             >
//               Contact
//             </Typography>
//           </Breadcrumbs>
//         </Box>
//       </Box>

//       {/* Contact Section - White Background */}
//       <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#ffffff' }}>
//         <Container 
//           maxWidth="xl" 
//           sx={{ 
//             maxWidth: '1400px',
//             px: { xs: 2, sm: 4, md: 6, lg: 10 }
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: { xs: 'column', lg: 'row' },
//               justifyContent: 'space-between',
//               alignItems: 'stretch', 
//               gap: { xs: 4, md: 6, lg: 8 },
//             }}
//           >
//             {/* Left Content */}
//             <Box
//               sx={{
//                 flex: '0 0 45%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'flex-start',
//               }}
//             >
//               <Typography
//                 variant="h4"
//                 sx={{
//                   fontWeight: 700,
//                   mt: 1,
//                   color: '#0f172a',
//                   fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem', lg: '2.2rem' }
//                 }}
//               >
//                 Get in touch with us
//               </Typography>
//               <Typography 
//                 variant="body1" 
//                 sx={{ 
//                   mt: 2, 
//                   color: '#64748b',
//                   fontSize: { xs: '0.9rem', md: '1rem' },
//                   lineHeight: 1.6
//                 }}
//               >
//                 Lorem ipsum is simply free text available dolor sit amet, consectetur notted
//                 adipisicing elit sed do eiusmod tempor incididunt simply free ut labore et
//                 dolore magna aliqua.
//               </Typography>

//               {/* Contact Items */}
//               <Box sx={{ mt: { xs: 3, md: 4 } }}>
//                 {contactItems.map((item, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.2, duration: 0.5 }}
//                   >
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         mb: { xs: 2.5, md: 3 },
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           bgcolor: 'rgba(50, 132, 209, 1)',
//                           width: { xs: 60, md: 70 },
//                           height: { xs: 60, md: 70 },
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           borderRadius: 1,
//                           mr: { xs: 1.5, md: 2 },
//                           flexShrink: 0,
//                         }}
//                       >
//                         {React.cloneElement(item.icon, {
//                           sx: { fontSize: { xs: 24, md: 28 }, color: '#fff' }
//                         })}
//                       </Box>
//                       <Box sx={{ minWidth: 0 }}>
//                         <Typography 
//                           sx={{ 
//                             fontWeight: 700,
//                             fontSize: { xs: '0.9rem', md: '1rem' }
//                           }}
//                         >
//                           {item.title}
//                         </Typography>
//                         <Typography 
//                           sx={{ 
//                             color: '#475569',
//                             fontSize: { xs: '0.85rem', md: '0.95rem' },
//                             wordBreak: 'break-word'
//                           }}
//                         >
//                           {item.content}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </motion.div>
//                 ))}
//               </Box>
//             </Box>

//             {/* Right Map */}
//             <Box
//               sx={{
//                 flex: '0 0 50%',
//                 display: 'flex',
//                 alignItems: 'stretch',
//                 minHeight: { xs: '300px', md: '400px' },
//                 position: 'relative',
//               }}
//             >
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 style={{ flex: 1 }}
//               >
//                 {!mapLoaded && (
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       top: '50%',
//                       left: '50%',
//                       transform: 'translate(-50%, -50%)',
//                       zIndex: 2,
//                     }}
//                   >
//                     <CircularProgress />
//                   </Box>
//                 )}

//                 <Box
//                   component="iframe"
//                   onLoad={() => setMapLoaded(true)}
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14736.29367479413!2d88.42368325334073!3d22.576357221821645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b020703c0d%3A0xece6f8e0fc2e1613!2sSector%20V%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1754492538178!5m2!1sen!2sin"
//                   width="100%"
//                   height="100%"
//                   style={{
//                     border: 0,
//                     borderRadius: 8,
//                     display: mapLoaded ? 'block' : 'none',
//                   }}
//                   allowFullScreen=""
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                 />
//               </motion.div>
//             </Box>
//           </Box>
//         </Container>
//       </Box>

//       {/* FAQ Section */}
//       <Box sx={{ bgcolor: '#ffffff', py: { xs: 6, md: 10 } }}>
//         <Container 
//           maxWidth="xl" 
//           sx={{ 
//             maxWidth: '1400px',
//             px: { xs: 2, sm: 4, md: 6, lg: 10 }
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: { xs: 'column', lg: 'row' },
//               gap: { xs: 4, md: 6, lg: 8 },
//               alignItems: 'stretch'
//             }}
//           >
//             {/* Left Side - FAQ */}
//             <Box 
//               sx={{ 
//                 flex: '0 0 50%',
//                 minWidth: 0,
//                 display: 'flex',
//                 flexDirection: 'column'
//               }}
//             >
//               <Typography
//                 variant="h2"
//                 sx={{
//                   fontWeight: 'bold',
//                   fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem', lg: '2.5rem' },
//                   lineHeight: 1.2,
//                   color: '#2c3e50',
//                   mb: { xs: 2, md: 3 }
//                 }}
//               >
//                 Frequently Asked Questions
//               </Typography>

//               <Typography
//                 sx={{
//                   color: '#6c757d',
//                   fontSize: { xs: '0.9rem', md: '1rem' },
//                   lineHeight: 1.6,
//                   mb: { xs: 3, md: 4 }
//                 }}
//               >
//                 Sed rhoncus facilisis purus, at accumsan purus sagittis vitae. Nullam acelit at eros.
//               </Typography>

//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                 {faqs.map((faq, index) => (
//                   <Accordion
//                     key={index}
//                     expanded={expanded === `panel${index}`}
//                     onChange={handleChange(`panel${index}`)}
//                     sx={{
//                       boxShadow: 'none',
//                       bgcolor: expanded === `panel${index}` ? 'white' : '#f8f9fa',
//                       borderRadius: '8px !important',
//                       border: '1px solid #e9ecef',
//                       '&:before': { display: 'none' },
//                       '&.Mui-expanded': {
//                         margin: '0 0 16px 0',
//                       }
//                     }}
//                   >
//                     <AccordionSummary
//                       expandIcon={
//                         expanded === `panel${index}` ? (
//                           <ExpandMoreIcon sx={{ color: '#ef4444', fontSize: { xs: 24, md: 28 } }} />
//                         ) : (
//                           <KeyboardArrowRightIcon sx={{ color: '#6c757d', fontSize: { xs: 24, md: 28 } }} />
//                         )
//                       }
//                       sx={{
//                         py: { xs: 1.5, md: 2 },
//                         px: { xs: 2, md: 3 },
//                         minHeight: { xs: '60px', md: '70px' },
//                         '& .MuiAccordionSummary-content': {
//                           alignItems: 'center',
//                         }
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           fontWeight: 600,
//                           fontSize: { xs: '1rem', md: '1.1rem' },
//                           color: '#2c3e50',
//                           pr: 1
//                         }}
//                       >
//                         {faq.question}
//                       </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
//                       <Typography
//                         sx={{
//                           color: '#6c757d',
//                           fontSize: { xs: '0.9rem', md: '0.95rem' },
//                           lineHeight: 1.6
//                         }}
//                       >
//                         {faq.answer}
//                       </Typography>
//                     </AccordionDetails>
//                   </Accordion>
//                 ))}
//               </Box>
//             </Box>

//             {/* Right Side - Cards */}
//             <Box 
//               sx={{ 
//                 flex: '0 0 45%',
//                 minWidth: 0,
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 gap: { xs: 3, md: 4 }
//               }}
//             >
//               {/* Red Banner */}
//               <Paper
//                 elevation={0}
//                 sx={{
//                   bgcolor: 'rgba(50, 132, 209, 1)',
//                   borderRadius: '12px',
//                   p: { xs: 3, md: 4 },
//                   color: 'white',
//                   position: 'relative',
//                   overflow: 'hidden',
//                   minHeight: { xs: '160px', md: '200px' },
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center'
//                 }}
//               >
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     top: { xs: 15, md: 20 },
//                     left: { xs: 20, md: 30 },
//                     opacity: 0.3
//                   }}
//                 >
//                   <DescriptionIcon sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }} />
//                 </Box>

//                 <Typography
//                   variant="h4"
//                   sx={{
//                     fontWeight: 'bold',
//                     fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem' },
//                     lineHeight: 1.3,
//                     position: 'relative',
//                     zIndex: 1
//                   }}
//                 >
//                   Have 30+ Years Immigration Experience for Give you Visa Approval
//                 </Typography>
//               </Paper>

//               {/* Image with Text Overlay */}
//               <Box
//                 sx={{
//                   position: 'relative',
//                   borderRadius: '12px',
//                   overflow: 'hidden',
//                   height: { xs: '250px', md: '300px' }
//                 }}
//               >
//                 <Box
//                   component="img"
//                   src="/Faq2.jpg"
//                   alt="Immigration Consultant Agency"
//                   sx={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover'
//                   }}
//                 />

//                 <Paper
//                   elevation={0}
//                   sx={{
//                     position: 'absolute',
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     bgcolor: 'rgba(255, 255, 255, 0.95)',
//                     backdropFilter: 'blur(10px)',
//                     p: { xs: 2.5, md: 3 }
//                   }}
//                 >
//                   <Typography
//                     variant="h5"
//                     sx={{
//                       fontWeight: 'bold',
//                       color: '#2c3e50',
//                       fontSize: { xs: '1.1rem', md: '1.3rem', lg: '1.4rem' },
//                       lineHeight: 1.3
//                     }}
//                   >
//                     Global Gateway - Visa Consultant Agency
//                   </Typography>
//                 </Paper>
//               </Box>
//             </Box>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Contact;





























import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Paper,
  CircularProgress
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DescriptionIcon from '@mui/icons-material/Description';
import { MdArrowOutward, MdCheckCircle } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addContactMessage } from '../../../Redux/Slice/contactSlice';
import getSweetAlert from '../../../util/alert/sweetAlert';

const contactItems = [
  {
    icon: <PhoneIcon sx={{ fontSize: 28, color: '#fff' }} />,
    title: 'Have any question?',
    content: 'Free +91-8976564530',
  },
  {
    icon: <EmailIcon sx={{ fontSize: 28, color: '#fff' }} />,
    title: 'Write email',
    content: 'needhelp@globalgateway.com',
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 28, color: '#fff' }} />,
    title: 'Visit anytime',
    content: 'Sector V, Bidhannagar, Kolkata, West Bengal',
  },
];

const faqs = [
  {
    question: "How to get free immigration?",
    answer: "Sed rhoncus facilisis purus, at accumsan purus sagittis vitae. Nullam acelit at eros imperdiet. Pellentesque sit."
  },
  {
    question: "Which country is good for residents?",
    answer: "Canada, Australia, and New Zealand are popular destinations for permanent residency due to their immigration-friendly policies, quality of life, and opportunities for skilled workers."
  },
  {
    question: "Canada study visa requirements?",
    answer: "To obtain a Canadian study visa, you need an acceptance letter from a designated learning institution, proof of financial support, no criminal record, and may need to complete a medical exam."
  }
];

const Contact = () => {
  const [expanded, setExpanded] = useState('panel0');
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const form = useForm();
  const { register, handleSubmit, reset, formState } = form;
  const { errors, isSubmitting } = formState;

  const { contactLoading, contactData, contactError } = useSelector(state => state.contact);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSubmit = async (data) => {
    // console.log('Contact message details', data);

    try {
      const msg_obj = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: "pending",
        reply: null
      }
      await new Promise(resolve => setTimeout(resolve, 1500));
      dispatch(addContactMessage(msg_obj))
        .then(res => {
          // console.log('Response for adding contact message', res);

          if (res.meta.requestStatus === "fulfilled") {
            setShowToast(true);
            reset();
          }
          else {
            getSweetAlert('Oops...', 'Something went wrong!', 'info');
          }
        })
        .catch(err => {
          console.log('Error occured', err);
          getSweetAlert('Oops...', 'Something went wrong!', 'error');
        })

      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box>
      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          background: 'linear-gradient(to right, rgb(34, 197, 94), rgb(5, 150, 105))',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          maxWidth: '28rem'
        }}>
          <MdCheckCircle style={{ fontSize: '24px', flexShrink: 0 }} />
          <p style={{ fontSize: '14px', fontWeight: 500, margin: 0 }}>
            Message sent successfully! We'll get back to you soon.
          </p>
        </div>
      )}

      {/* Top Banner */}
      <Box
        sx={{
          height: { xs: '250px', md: '300px' },
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
            px: { xs: 2, sm: 4, md: 6, lg: 10 },
            maxWidth: '1400px',
            mx: 'auto',
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3rem' }
            }}
          >
            Contact Us
          </Typography>
          <Breadcrumbs sx={{ color: '#FF5252', mt: 1 }} separator="›">
            <Link
              underline="hover"
              href="/"
              sx={{
                color: '#FF5252',
                '&:hover': { color: '#fff' },
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              Home
            </Link>
            <Typography
              sx={{
                color: '#FF5252',
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              Contact
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Contact Section - White Background */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#ffffff' }}>
        <Container
          maxWidth="xl"
          sx={{
            maxWidth: '1400px',
            px: { xs: 2, sm: 4, md: 6, lg: 10 }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              justifyContent: 'space-between',
              alignItems: 'stretch',
              gap: { xs: 4, md: 6, lg: 8 },
            }}
          >
            {/* Left Content */}
            <Box
              sx={{
                flex: '0 0 45%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mt: 1,
                  color: '#0f172a',
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem', lg: '2.2rem' }
                }}
              >
                Get in touch with us
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: '#64748b',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  lineHeight: 1.6
                }}
              >
                Lorem ipsum is simply free text available dolor sit amet, consectetur notted
                adipisicing elit sed do eiusmod tempor incididunt simply free ut labore et
                dolore magna aliqua.
              </Typography>

              {/* Contact Items */}
              <Box sx={{ mt: { xs: 3, md: 4 } }}>
                {contactItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: { xs: 2.5, md: 3 },
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: 'rgba(50, 132, 209, 1)',
                          width: { xs: 60, md: 70 },
                          height: { xs: 60, md: 70 },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 1,
                          mr: { xs: 1.5, md: 2 },
                          flexShrink: 0,
                        }}
                      >
                        {React.cloneElement(item.icon, {
                          sx: { fontSize: { xs: 24, md: 28 }, color: '#fff' }
                        })}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: '0.9rem', md: '1rem' }
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#475569',
                            fontSize: { xs: '0.85rem', md: '0.95rem' },
                            wordBreak: 'break-word'
                          }}
                        >
                          {item.content}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* Right Contact Form */}
            <Box
              sx={{
                flex: '0 0 50%',
                display: 'flex',
                alignItems: 'stretch',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                style={{ width: '100%' }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, rgba(50, 132, 209, 0.95), rgba(50, 132, 209, 0.8))',
                    border: '1px solid rgba(50, 132, 209, 0.3)',
                    p: { xs: 4, sm: 5, md: 6 },
                    borderRadius: '24px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    width: '100%',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: 'white',
                      textAlign: 'center',
                      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                    }}
                  >
                    Send Us Message
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      mb: { xs: 4, md: 5 },
                      textAlign: 'center',
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    Let us know how we can help by filling out the form below.
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
                      <Box sx={{ flex: 1 }}>
                        <Box
                          component="input"
                          type="text"
                          placeholder="Your Name"
                          autoComplete="name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          sx={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(12px)',
                            border: errors.name ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                            outline: 'none',
                            color: 'white',
                            fontSize: '0.95rem',
                            transition: 'all 0.3s',
                            '&::placeholder': {
                              color: 'rgba(255, 255, 255, 0.6)'
                            },
                            '&:focus': {
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)'
                            }
                          }}
                        />
                        {errors.name && (
                          <Typography sx={{ color: '#fecaca', fontSize: '0.75rem', mt: 0.5 }}>
                            {errors.name.message}
                          </Typography>
                        )}
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Box
                          component="input"
                          type="email"
                          placeholder="Your Email"
                          autoComplete="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-zA-Z.]{2,}$/,
                              message: "Enter a valid email",
                            },
                          })}
                          sx={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(12px)',
                            border: errors.email ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                            outline: 'none',
                            color: 'white',
                            fontSize: '0.95rem',
                            transition: 'all 0.3s',
                            '&::placeholder': {
                              color: 'rgba(255, 255, 255, 0.6)'
                            },
                            '&:focus': {
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)'
                            }
                          }}
                        />
                        {errors.email && (
                          <Typography sx={{ color: '#fecaca', fontSize: '0.75rem', mt: 0.5 }}>
                            {errors.email.message}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Box
                        component="input"
                        type="text"
                        placeholder="Your Subject"
                        {...register("subject", {
                          required: "Subject is required"
                        })}
                        sx={{
                          width: '100%',
                          padding: '14px 16px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(12px)',
                          border: errors.subject ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                          outline: 'none',
                          color: 'white',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s',
                          '&::placeholder': {
                            color: 'rgba(255, 255, 255, 0.6)'
                          },
                          '&:focus': {
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)'
                          }
                        }}
                      />
                      {errors.subject && (
                        <Typography sx={{ color: '#fecaca', fontSize: '0.75rem', mt: 0.5 }}>
                          {errors.subject.message}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ mb: 4 }}>
                      <Box
                        component="textarea"
                        rows={5}
                        placeholder="Your Message"
                        {...register("message", {
                          required: "Message is required",
                          maxLength: {
                            value: 150,
                            message: "Message should under 150 characters"
                          }
                        })}
                        sx={{
                          width: '100%',
                          padding: '14px 16px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(12px)',
                          border: errors.message ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                          outline: 'none',
                          color: 'white',
                          fontSize: '0.95rem',
                          resize: 'none',
                          transition: 'all 0.3s',
                          fontFamily: 'inherit',
                          '&::placeholder': {
                            color: 'rgba(255, 255, 255, 0.6)'
                          },
                          '&:focus': {
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)'
                          }
                        }}
                      />
                      {errors.message && (
                        <Typography sx={{ color: '#fecaca', fontSize: '0.75rem', mt: 0.5 }}>
                          {errors.message.message}
                        </Typography>
                      )}
                    </Box>

                    <Box
                      component="button"
                      type="submit"
                      disabled={isSubmitting}
                      sx={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '14px 32px',
                        borderRadius: '9999px',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.5 : 1,
                        transition: 'all 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        '&:hover': {
                          background: isSubmitting ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.25)',
                          transform: isSubmitting ? 'none' : 'translateY(-2px)',
                          boxShadow: isSubmitting ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <MdArrowOutward style={{ fontSize: '18px' }} />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: '#ffffff', py: { xs: 6, md: 10 } }}>
        <Container
          maxWidth="xl"
          sx={{
            maxWidth: '1400px',
            px: { xs: 2, sm: 4, md: 6, lg: 10 }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: { xs: 4, md: 6, lg: 8 },
              alignItems: 'stretch'
            }}
          >
            {/* Left Side - FAQ */}
            <Box
              sx={{
                flex: '0 0 50%',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem', lg: '2.5rem' },
                  lineHeight: 1.2,
                  color: '#2c3e50',
                  mb: { xs: 2, md: 3 }
                }}
              >
                Frequently Asked Questions
              </Typography>

              <Typography
                sx={{
                  color: '#6c757d',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  lineHeight: 1.6,
                  mb: { xs: 3, md: 4 }
                }}
              >
                Sed rhoncus facilisis purus, at accumsan purus sagittis vitae. Nullam acelit at eros.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {faqs.map((faq, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                    sx={{
                      boxShadow: 'none',
                      bgcolor: expanded === `panel${index}` ? 'white' : '#f8f9fa',
                      borderRadius: '8px !important',
                      border: '1px solid #e9ecef',
                      '&:before': { display: 'none' },
                      '&.Mui-expanded': {
                        margin: '0 0 16px 0',
                      }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === `panel${index}` ? (
                          <ExpandMoreIcon sx={{ color: '#ef4444', fontSize: { xs: 24, md: 28 } }} />
                        ) : (
                          <KeyboardArrowRightIcon sx={{ color: '#6c757d', fontSize: { xs: 24, md: 28 } }} />
                        )
                      }
                      sx={{
                        py: { xs: 1.5, md: 2 },
                        px: { xs: 2, md: 3 },
                        minHeight: { xs: '60px', md: '70px' },
                        '& .MuiAccordionSummary-content': {
                          alignItems: 'center',
                        }
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          color: '#2c3e50',
                          pr: 1
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
                      <Typography
                        sx={{
                          color: '#6c757d',
                          fontSize: { xs: '0.9rem', md: '0.95rem' },
                          lineHeight: 1.6
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>

            {/* Right Side - Cards */}
            <Box
              sx={{
                flex: '0 0 45%',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 3, md: 4 }
              }}
            >
              {/* Blue Banner */}
              <Paper
                elevation={0}
                sx={{
                  bgcolor: 'rgba(50, 132, 209, 1)',
                  borderRadius: '12px',
                  p: { xs: 3, md: 4 },
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: { xs: '160px', md: '200px' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 15, md: 20 },
                    left: { xs: 20, md: 30 },
                    opacity: 0.3
                  }}
                >
                  <DescriptionIcon sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }} />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem' },
                    lineHeight: 1.3,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  Have 30+ Years Immigration Experience for Give you Visa Approval
                </Typography>
              </Paper>

              {/* Image with Text Overlay */}
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  height: { xs: '250px', md: '300px' }
                }}
              >
                <Box
                  component="img"
                  src="/Faq2.jpg"
                  alt="Immigration Consultant Agency"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                <Paper
                  elevation={0}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    p: { xs: 2.5, md: 3 }
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      color: '#2c3e50',
                      fontSize: { xs: '1.1rem', md: '1.3rem', lg: '1.4rem' },
                      lineHeight: 1.3
                    }}
                  >
                    Global Gateway - Visa Consultant Agency
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Full Width Map Section */}
      <Box sx={{ width: '100%', height: { xs: '350px', md: '450px' }, position: 'relative', bgcolor: '#f8f9fa' }}>
        <Box
          component="iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14736.29367479413!2d88.42368325334073!3d22.576357221821645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b020703c0d%3A0xece6f8e0fc2e1613!2sSector%20V%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1754492538178!5m2!1sen!2sin"
          sx={{
            width: '100%',
            height: '100%',
            border: 0,
          }}
          allowFullScreen=""
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
    </Box>
  );
};

export default Contact;