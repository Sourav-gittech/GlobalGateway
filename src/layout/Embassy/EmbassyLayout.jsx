import { Outlet, useLocation } from "react-router-dom";

// Embassy layout components (same folder)
import Navbar from "./Navbar";
import Footer from "./Footer";

const EmbassyLayout = () => {
  const location = useLocation();

  // 🔹 Hide navbar & footer on embassy auth pages
  const hideLayout = location.pathname.startsWith("/embassy/auth");

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
