import React from 'react'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addContactMessage } from '../../../Redux/Slice/contactSlice';
import getSweetAlert from '../../../util/alert/sweetAlert';
import { MdArrowOutward } from 'react-icons/md';

const ContactForm = ({ setShowToast }) => {
    const dispatch = useDispatch();

    const form = useForm();
    const { register, handleSubmit, reset, formState } = form;
    const { errors, isSubmitting } = formState;

    const { contactLoading, contactData, contactError } = useSelector(state => state.contact);

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
    }

    return (
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
    )
}

export default ContactForm