import React, { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from '../layout/user/Navbar.jsx';
import Footer from '../layout/user/Footer.jsx';
import Home from '../Pages/user/home/Home';
import AboutSection from '../Pages/user/about/AboutPage';
import CountryGrid from '../Pages/user/countries/Country';
import ContactUs from '../Pages/user/get-in-touch/ContactUs';
import EmailVerification from '../Pages/user/auth/EmailVerificationPage';
import VisaProcess from '../Pages/user/apply-visa/VisaProcess';
import Dashboard from '../Pages/user/dashboard/Dashboard'
import CountryDetails from '../Pages/user/countries/country-details/CountryDetails.jsx';
import VisaPolicies from '../Pages/user/apply-visa/policy/VisaPolicy.jsx';
import VisaApplicationForm from '../Pages/user/apply-visa/application-form/VisaApplicationForm.jsx';
import PaymentPreview from '../Pages/user/apply-visa/payment/PaymentPreview.jsx';
import PaymentStatus from '../Pages/user/apply-visa/payment/PaymentStatus.jsx';
import ScrollToTop from '../Components/ScrollToTop.jsx';
import AdminLayout from "../layout/admin/AdminLayout";
import AdminDashboard from "../Pages/admin/AdminDashboard.jsx";
import Users from "../Pages/admin/Users";
import Payments from "../Pages/admin/Payments";
import Settings from "../Pages/admin/Settings";
import Analytics from "../Pages/admin/Analytics";
import ContactMessages from '../Pages/admin/UserContact.jsx';
import CountryManagement from "../Pages/admin/AddCountry";
import AdminLoginForm from "../Pages/admin/auth/AdminLoginForm";
import Error_404 from '../Pages/Error_404.jsx';

const AuthForm = lazy(() => import('../Pages/user/auth/Authentication'));

const Routing = () => {

  const location = useLocation();

  const hideLayoutRoutes = [
    "/authentication",
    "/dashboard",
    "/country/:country_id",
    "/policy/:country_id",
    "/application-form/:country_id",
    "/payment-preview",
    "/payment-status",
    "/admin"
  ];

  const hideLayout =
    hideLayoutRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/country/") ||
    location.pathname.startsWith("/policy/") ||
    location.pathname.startsWith("/application-form/") ||
    location.pathname.startsWith("/admin/");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Suspense fallback={<h3 className='mt-5 text-center'>Loading...</h3>}>
        <ScrollToTop />
        <Routes>

          {/* user routes  */}
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<AboutSection />} />
          <Route path='/country' element={<CountryGrid />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/authentication' element={<AuthForm />} />
          <Route path='/verification/:email/:user_type' element={<EmailVerification />} />

          <Route path='/visaprocess/:country_id' element={<VisaProcess />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/country/:country_id" element={<CountryDetails />} />
          <Route path="/policy/:country_id" element={<VisaPolicies />} />
          <Route path="/application-form/:country_id" element={<VisaApplicationForm />} />
          <Route path="/payment-preview" element={<PaymentPreview />} />
          <Route path="/payment-status" element={<PaymentStatus />} />

          {/* admin routes  */}
          <Route path="/admin" element={<AdminLoginForm />} />
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<Settings />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="contact" element={<ContactMessages />} />
            <Route path="country" element={<CountryManagement />} />

          </Route>

          <Route path='*' element={<Error_404 />} />
        </Routes>
      </Suspense>

      {!hideLayout && <Footer />}
    </>
  );
};

export default Routing;
