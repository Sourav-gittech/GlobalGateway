import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

/* ---------- Global Layout ---------- */
import Navbar from "../layout/user/Navbar.jsx";
import Footer from "../layout/user/Footer.jsx";

/* ---------- Global Utils ---------- */
import ScrollToTop from "../Components/ScrollToTop.jsx";

/* ---------- User Pages ---------- */
import Home from "../Pages/user/home/Home";
import AboutSection from "../Pages/user/about/AboutPage";
import CountryGrid from "../Pages/user/countries/Country";
import ContactUs from "../Pages/user/get-in-touch/ContactUs";
import EmailVerification from "../Pages/verification/EmailVerificationPage";
import VisaProcess from "../Pages/user/apply-visa/VisaProcess";
import Dashboard from "../Pages/user/dashboard/Dashboard";
import CountryDetails from "../Pages/user/countries/country-details/CountryDetails.jsx";
import VisaPolicies from "../Pages/user/apply-visa/policy/VisaPolicy.jsx";
import VisaApplicationForm from "../Pages/user/apply-visa/application-form/VisaApplicationForm.jsx";
import PaymentPreview from "../Pages/user/apply-visa/payment/PaymentPreview.jsx";
import PaymentStatus from "../Pages/user/apply-visa/payment/PaymentStatus.jsx";

/* ---------- Admin ---------- */
import AdminLayout from "../layout/admin/AdminLayout";
import AdminDashboard from "../Pages/admin/AdminDashboard.jsx";
import Users from "../Pages/admin/Users";
import Payments from "../Pages/admin/Payments";
import Settings from "../Pages/admin/Settings";
import Analytics from "../Pages/admin/Analytics";
import ContactMessages from "../Pages/admin/UserContact.jsx";
import CountryManagement from "../Pages/admin/ManageCountry.jsx";
import AdminLoginForm from "../Pages/admin/auth/AdminLoginForm";
import AmbessyManage from "../Pages/admin/ManageAmbessy.jsx";
import CourseManage from "../Pages/admin/CourseManage.jsx";
import AddAdmin from "../Pages/admin/ManageAdmin.jsx";
import VisaManage from "../Pages/admin/ManageVisa.jsx";
import AdminProfile from "../Pages/admin/AdminProfile.jsx";

/* ---------- Embassy ---------- */
import EmbassyLayout from "../layout/Embassy/EmbassyLayout";

import EmbassyHome from "../Pages/embassy/Home";
import EmbassyAbout from "../Pages/embassy/About";
import EmbassyContact from "../Pages/embassy/Contact";
import EmbassyAuth from "../Pages/embassy/auth/Auth.jsx";
import EmbassyDashboard from "../Pages/embassy/Dashboard";
import CountrySetUp from "../Pages/embassy/CountrySetup";
import Review from "../Pages/embassy/Review";
import Approved from "../Pages/embassy/Approved";
import Rejected from "../Pages/embassy/Rejected";

/* ---------- Misc ---------- */
import Error_404 from "../Pages/Error_404.jsx";

const AuthForm = lazy(() => import("../Pages/user/auth/Authentication"));

const Routing = () => {
  const location = useLocation();

  /* ---------- FIXED LAYOUT VISIBILITY LOGIC ---------- */
  const hideLayout =
    location.pathname === "/authentication" ||
    location.pathname.startsWith("/verification") ||
    location.pathname.startsWith("/country/") ||
    location.pathname.startsWith("/policy/") ||
    location.pathname.startsWith("/application-form/") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/payment") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/embassy") ||
    location.pathname.startsWith("/embassy/auth") ||
    location.pathname.startsWith("/embassy/country-setup") ||
    location.pathname.startsWith("/embassy/review") ||
    location.pathname.startsWith("/auth");

  return (
    <>
      {/* GLOBAL SCROLL */}
      <ScrollToTop />

      {/* USER NAVBAR */}
      {!hideLayout && <Navbar />}

      <Suspense fallback={<h3 className="mt-5 text-center">Loading...</h3>}>
        <Routes>
          {/* ================= USER ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/country" element={<CountryGrid />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/authentication" element={<AuthForm />} />
          <Route path="/verification/:email/:user_type" element={<EmailVerification />}/>

          <Route path="/visaprocess/:country_id" element={<VisaProcess />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/country/:country_id" element={<CountryDetails />} />
          <Route path="/policy/:country_id" element={<VisaPolicies />} />
          <Route path="/application-form/:country_id" element={<VisaApplicationForm />} />
          <Route path="/payment-preview" element={<PaymentPreview />} />
          <Route path="/payment-status" element={<PaymentStatus />} />

          {/* ================= ADMIN ================= */}
          <Route path="/admin" element={<AdminLoginForm />} />
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<Settings />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="contact" element={<ContactMessages />} />
            <Route path="country" element={<CountryManagement />} />
            <Route path="ambessyManage" element={<AmbessyManage />} />
            <Route path="courseManage" element={<CourseManage />} />
            <Route path="admin" element={<AddAdmin />} />
            <Route path="visaManage" element={<VisaManage />} />
            <Route path="adminProfile" element={<AdminProfile />} />
          </Route>

          {/* ================= EMBASSY ================= */}
          <Route path="/embassy" element={<EmbassyLayout />}>
            <Route index element={<EmbassyHome />} />
            <Route path="about" element={<EmbassyAbout />} />
            <Route path="contact" element={<EmbassyContact />} />
            <Route path="auth" element={<EmbassyAuth />} />
            <Route path="dashboard" element={<EmbassyDashboard />} />
            <Route path="country-setup" element={<CountrySetUp />} />
            <Route path="review" element={<Review />} />
            <Route path="approved" element={<Approved />} />
            <Route path="rejected" element={<Rejected />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Error_404 />} />
        </Routes>
      </Suspense>

      {/* USER FOOTER */}
      {!hideLayout && <Footer />}
    </>
  );
};

export default Routing;
