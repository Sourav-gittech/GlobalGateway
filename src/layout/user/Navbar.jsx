import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button, Typography, IconButton, Drawer, Menu, MenuItem, Avatar, Badge, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { checkLoggedInUser, logoutUser } from '../../Redux/Slice/auth/checkAuthSlice';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Countries', to: '/country' },
  { label: 'Courses', to: '/course' },
  { label: 'Get in Touch', to: '/contact' },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rightClickedLink, setRightClickedLink] = useState(null);
  const [clickedLink, setClickedLink] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isuserLoading, userAuthData, userError } = useSelector(state => state.checkAuth);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (label) => {
    setOpenDropdown(prev => (prev === label ? null : label));
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(prev => !prev);
    setOpenDropdown(null);
  };

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

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

  const handleLogout = async () => {
    await dispatch(logoutUser({ user_type: 'user', showAlert: true }))
      .then(res => {
        // console.log('Response for log out', res);
      })
      .catch(err => {
        console.log('Error occured', err);
      });
    handleClose();
    navigate('/');
  };

  const handleRightClick = (e, label) => {
    e.preventDefault();
    setRightClickedLink(label);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled ? 'rgba(0,0,0,0.6)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'background-color 0.4s ease',
          px: 4,
          py: 1,
          boxShadow: 'none',
          color: 'white',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FlightTakeoffIcon sx={{ fontSize: '30px', color: 'white' }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '25px', letterSpacing: 1 }}>
              Global Gateway
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              {navLinks.map((link) =>
                link.children ? (
                  <Box key={link.label} sx={{ position: 'relative' }}>
                    <Button
                      onClick={() => {
                        setClickedLink(link.label);
                        handleDropdownToggle(link.label);
                      }}
                      onContextMenu={(e) => handleRightClick(e, link.label)}
                      sx={{
                        color:
                          clickedLink === link.label || rightClickedLink === link.label
                            ? 'red'
                            : 'white',
                        fontWeight: 500,
                        fontSize: '15px',
                        textTransform: 'none',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: 0,
                          height: '2px',
                          bottom: 0,
                          left: 0,
                          backgroundColor: 'red',
                          transition: 'width 0.3s ease',
                        },
                        '&:hover::after': {
                          width: '100%',
                        },
                      }}
                    >
                      {link.label} {openDropdown === link.label ? <ExpandLess /> : <ExpandMore />}
                    </Button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <Motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            minWidth: '160px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            zIndex: 20,
                            borderRadius: '6px',
                          }}
                        >
                          {link.children.map((sub) => (
                            <Button
                              key={sub.label}
                              component={RouterLink}
                              to={sub.to}
                              fullWidth
                              onClick={() => setOpenDropdown(null)}
                              sx={{
                                justifyContent: 'flex-start',
                                px: 2,
                                py: 1,
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: 500,
                              }}
                            >
                              {sub.label}
                            </Button>
                          ))}
                        </Motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                ) : (
                  <Button
                    key={link.label}
                    component={RouterLink}
                    to={link.to}
                    onClick={() => setClickedLink(link.label)}
                    onContextMenu={(e) => handleRightClick(e, link.label)}
                    sx={{
                      color:
                        clickedLink === link.label || rightClickedLink === link.label ? 'red' : 'white',
                      fontWeight: 500,
                      fontSize: '15px',
                      textTransform: 'none',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: 0,
                        height: '2px',
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'red',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}>
                    {link.label}
                  </Button>
                )
              )}

              {/* Cart Icon - Only show when user is logged in */}
              {userAuthData && (
                <Link
                  color="inherit"
                  to='/cart'
                  sx={{
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <Badge
                    // badgeContent={cartCount}
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.75rem',
                        height: '18px',
                        minWidth: '18px',
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </Link>
              )}

              {userAuthData ? (
                <>
                  <IconButton onClick={handleMenu}>
                    <Avatar src={userAuthData?.avatar_url || '/demo-user.png'} alt="Profile" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        minWidth: 150,
                      }
                    }}
                  >
                    <MenuItem component={RouterLink} to="/dashboard" onClick={handleClose}>
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                  </Menu>

                </>
              ) : (
                <Button component={RouterLink} to="/authentication" sx={{ color: 'white' }}>
                  Get Started
                </Button>
              )}
            </Box>
          )}

          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Mobile Cart Icon - Only show when user is logged in */}
              {userAuthData && (
                <IconButton
                  color="inherit"
                  // onClick={() => dispatch(openCartDrawer())}
                  sx={{
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <Badge
                    // badgeContent={cartCount}
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.75rem',
                        height: '18px',
                        minWidth: '18px',
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              )}

              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'red',
          },
        }}>
        <Box sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Global Gateway
          </Typography>
          {navLinks.map((link) => (
            <Box key={link.label} sx={{ mb: 1 }}>
              {link.children ? (
                <Box>
                  <Button
                    fullWidth
                    onClick={() => handleDropdownToggle(link.label)}
                    sx={{
                      justifyContent: 'space-between',
                      textTransform: 'none',
                      color: 'white',
                    }}>
                    {link.label}
                    {openDropdown === link.label ? <ExpandLess /> : <ExpandMore />}
                  </Button>
                  {openDropdown === link.label && (
                    <Box sx={{ pl: 2 }}>
                      {link.children.map((sub) => (
                        <Button
                          key={sub.label}
                          component={RouterLink}
                          to={sub.to}
                          fullWidth
                          onClick={handleDrawerToggle}
                          sx={{
                            justifyContent: 'flex-start',
                            textTransform: 'none',
                            color: 'white',
                          }}>
                          {sub.label}
                        </Button>
                      ))}
                    </Box>
                  )}
                </Box>
              ) : (
                <Button
                  component={RouterLink}
                  to={link.to}
                  fullWidth
                  onClick={handleDrawerToggle}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    color: 'white',
                  }}>
                  {link.label}
                </Button>
              )}
            </Box>
          ))}

          {userAuthData ? (
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
              <Button
                component={RouterLink}
                to='/dashboard'
                fullWidth
                onClick={handleDrawerToggle}
                sx={{ mb: 1, justifyContent: 'flex-start', textTransform: 'none', color: 'white' }}
              >
                Dashboard
              </Button>
              <Button
                component={RouterLink}
                to="/cart"
                fullWidth
                onClick={handleDrawerToggle}
                sx={{ mb: 1, justifyContent: 'flex-start', textTransform: 'none', color: 'white' }}
              >
                My Cart
              </Button>
              <Button
                onClick={() => {
                  handleLogout();
                  handleDrawerToggle();
                }}
                fullWidth
                sx={{
                  mt: 2,
                  textTransform: "none",
                  backgroundColor: "#e53935",
                  color: "white",
                  borderRadius: "8px",
                  py: 1.2,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#c62828",
                  },
                }}
              >
                Logout
              </Button>

            </Box>
          ) : (
            <Button
              component={RouterLink}
              to="/authentication"
              fullWidth
              onClick={handleDrawerToggle}
              sx={{
                mt: 2,
                textTransform: "none",
                backgroundColor: "#e53935",
                color: "#fff",
                fontWeight: 600,
                py: 1.2,
                borderRadius: "10px",
                boxShadow: "0 4px 14px rgba(229,57,53,0.3)",
                "&:hover": {
                  backgroundColor: "#c62828",
                  boxShadow: "0 6px 18px rgba(229,57,53,0.4)",
                },
              }}>
              Get Started
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;