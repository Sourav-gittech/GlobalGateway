import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const EmbassyLayout = () => {
  const location = useLocation();

  // 🔹 Routes where Navbar & Footer should be hidden
  const hideLayout =
    location.pathname.startsWith("/embassy/auth") ||
    location.pathname.startsWith("/embassy/dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      
      {/* Embassy Navbar */}
      {!hideLayout && <Navbar />}

      {/* Page Content */}
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* Embassy Footer */}
      {!hideLayout && <Footer />}

    </div>
  );
};

export default EmbassyLayout;
