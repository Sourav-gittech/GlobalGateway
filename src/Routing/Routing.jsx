import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

/* ---------- Layouts ---------- */
import UserLayout from "../layout/user";
import AdminLayout from "../layout/admin/AdminLayout";
import EmbassyLayout from "../layout/embassy/EmbassyLayout";
import EmbassyDashboardLayout from "../layout/embassy/EmbassyDashboard/EmbassyDashboardLayout";

/* ---------- Utils ---------- */
import ScrollToTop from "../Components/ScrollToTop";

/* ---------- User Pages ---------- */
import Home from "../Pages/user/home/Home";
import AboutSection from "../Pages/user/about/AboutPage";
import CountryGrid from "../Pages/user/countries/Country";
import CountryDetails from "../Pages/user/countries/country-details/CountryDetails";
import ContactUs from "../Pages/user/get-in-touch/ContactUs";
import Dashboard from "../Pages/user/dashboard/Dashboard";
import VisaProcess from "../Pages/user/apply-visa/VisaProcess";
import VisaPolicies from "../Pages/user/apply-visa/policy/VisaPolicy";
import VisaApplicationForm from "../Pages/user/apply-visa/application-form/VisaApplicationForm";
import PaymentPreview from "../Pages/user/apply-visa/payment/PaymentPreview";
import PaymentStatus from "../Pages/user/apply-visa/payment/PaymentStatus";
import Courselist from "../Pages/user/coaching/Courselist";
import CourseDetails from "../Pages/user/coaching/CourseDetails";
import Cart from "../Pages/user/coaching/Cart";

/* ---------- Auth ---------- */
const AuthForm = lazy(() => import("../Pages/user/auth/Authentication"));
import EmailVerification from "../Pages/verification/EmailVerificationPage";

/* ---------- Admin Pages ---------- */
import AdminLoginForm from "../Pages/admin/auth/AdminLoginForm";
import AdminDashboard from "../Pages/admin/AdminDashboard";
import Users from "../Pages/admin/Users";
import Payments from "../Pages/admin/Payments";
import Settings from "../Pages/admin/Settings";
import Analytics from "../Pages/admin/Analytics";
import ContactMessages from "../Pages/admin/UserContact";
import CountryManagement from "../Pages/admin/ManageCountry";
import EmbassyManage from "../Pages/admin/ManageEmbassy";
import ViewApplications from "../Pages/admin/ViewApplications";
import CourseManage from "../Pages/admin/CourseManage";
import AddAdmin from "../Pages/admin/ManageAdmin";
import VisaManage from "../Pages/admin/ManageVisa";
import AdminProfile from "../Pages/admin/AdminProfile";

/* ---------- Embassy ---------- */
import EmbassyHome from "../Pages/embassy/Home";
import EmbassyAbout from "../Pages/embassy/About";
import EmbassyContact from "../Pages/embassy/Contact";
import EmbassyAuth from "../Pages/embassy/auth/Auth";
import EmbassyDashboard from "../Pages/embassy/Dashboard/EmbassyDashboard";
import EmbassyProfile from "../Pages/embassy/Dashboard/Profile";
import EmbassyApplications from "../Pages/embassy/Dashboard/Applications/Applications";
import EmbassyApplicationView from "../Pages/embassy/Dashboard/Applications/ApplicationView";
import VisaPolicyManage from "../Pages/embassy/dashboard/VisaPolicyManage";
import EmbassyAnalytics from "../Pages/embassy/Dashboard/EmbassyAnalytics";
import Review from "../Pages/embassy/status/Review";
import Rejected from "../Pages/embassy/status/Rejected";
import Approved from "../Pages/embassy/status/Approved";
import CountrySetup from "../Pages/embassy/requirement-form/CountrySetup";
import ContactSetup from "../Pages/embassy/requirement-form/ContactSetup";

/* ---------- Misc ---------- */
import Error_404 from "../Pages/Error_404";

const Routing = () => {
  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<h3 className="mt-5 text-center">Loading...</h3>}>
        <Routes>

          {/* ================= USER ================= */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/country" element={<CountryGrid />} />
            <Route path="/country/:country_id" element={<CountryDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/visaprocess/:country_id" element={<VisaProcess />} />
            <Route path="/policy/:country_id" element={<VisaPolicies />} />
            <Route path="/application-form/:country_id" element={<VisaApplicationForm />} />
            <Route path="/payment-preview" element={<PaymentPreview />} />
            <Route path="/payment-status" element={<PaymentStatus />} />

            {/* Coaching */}
            <Route path="/coaching/course" element={<Courselist />} />
            <Route path="/coaching/course/:id" element={<CourseDetails />} />
            <Route path="/coaching/cart" element={<Cart />} />
          </Route>

          {/* ================= AUTH (NO LAYOUT) ================= */}
          <Route path="/authentication" element={<AuthForm />} />
          <Route path="/verification/:email/:user_type" element={<EmailVerification />} />

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
            <Route path="embassyManage" element={<EmbassyManage />} />
            <Route path="viewApplications" element={<ViewApplications />} />
            <Route path="courseManage" element={<CourseManage />} />
            <Route path="admin" element={<AddAdmin />} />
            <Route path="visaManage" element={<VisaManage />} />
            <Route path="adminProfile" element={<AdminProfile />} />
          </Route>

          {/* ================= EMBASSY PUBLIC ================= */}
          <Route path="/embassy" element={<EmbassyLayout />}>
            <Route index element={<EmbassyHome />} />
            <Route path="about" element={<EmbassyAbout />} />
            <Route path="contact" element={<EmbassyContact />} />
          </Route>

          {/* ================= EMBASSY AUTH ================= */}
          <Route path="/embassy/auth" element={<EmbassyAuth />} />
          <Route path="/embassy/contact-setup/:embassyEmail/:redirectPath" element={<ContactSetup />} />
          <Route path="/embassy/country-setup" element={<CountrySetup />} />
          <Route path="/embassy/review" element={<Review />} />
          <Route path="/embassy/reject" element={<Rejected />} />
          <Route path="/embassy/approved" element={<Approved />} />

          {/* ================= EMBASSY DASHBOARD ================= */}
          <Route path="/embassy/dashboard" element={<EmbassyDashboardLayout />}>
            <Route index element={<EmbassyDashboard />} />
            <Route path="profile" element={<EmbassyProfile />} />
            <Route path="applications" element={<EmbassyApplications />} />
            <Route path="applications/:application_id" element={<EmbassyApplicationView />} />
            <Route path="visa-policy-manage" element={<VisaPolicyManage />} />
            <Route path="analytics" element={<EmbassyAnalytics />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Error_404 />} />

        </Routes>
      </Suspense>
    </>
  );
};

export default Routing;
