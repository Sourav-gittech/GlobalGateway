import React from "react";
import { Outlet } from "react-router-dom";
import EmbassySidebar from "./EmbassySidebar";
import EmbassyNavbar from "./EmbassyNavbar";
import { useSidebarStore } from "../../../util/useSidebarStore";

const EmbassyDashboardLayout = ({ embassyData }) => {
  const collapsed = useSidebarStore((s) => s.collapsed);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Fixed position with high z-index */}
      <EmbassySidebar embassyData={embassyData} />

      {/* Main Content Area */}
      <div 
        className={`transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* Navbar - Fixed at top with proper z-index */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <EmbassyNavbar embassyData={embassyData} />
        </div>

        {/* Page Content */}
        <main className="min-h-screen bg-gray-50">
          <div className="p-4 mt-15 md:p-6 lg:p-10 ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmbassyDashboardLayout;