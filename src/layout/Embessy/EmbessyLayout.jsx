import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const EmbessyLayout = () => {
  const location = useLocation();

  // Hide navbar & footer on auth page
  const hideLayout = location.pathname.startsWith("/embessy/auth");

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Embessy Navbar */}
      {!hideLayout && <Navbar />}

      {/* Page Content */}
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* Embessy Footer */}
      {!hideLayout && <Footer />}
    </div>
  );
};

export default EmbessyLayout;
