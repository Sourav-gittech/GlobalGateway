import { Outlet, useLocation } from "react-router-dom";

const EmbassyLayout = () => {
  const location = useLocation();

  // Hide navbar & footer on auth page
  const hideLayout = location.pathname.startsWith("/embassy/auth");

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">

      {/* Page Content */}
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>

    </div>
  );
};

export default EmbassyLayout;
