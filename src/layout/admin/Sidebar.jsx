import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom"; // ⬅ Added useLocation
import { useSidebarStore } from "../../util/useSidebarStore";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import "../../../src/app.css"
import {
  Home,
  Users,
  CreditCard,
  Settings,
  Bell,
  BarChart2,
  Menu,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  ShieldCheck,
  Landmark,
  Globe,
  Library,
  Loader2,
} from "lucide-react";
import { logoutUser } from "../../Redux/Slice/auth/checkAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/Slice/userSlice";

const NavItem = ({ to, icon: Icon, children, collapsed, onClick, badge }) => (
  <NavLink
    to={to}
    end
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-sm font-medium relative group
      ${isActive ? "bg-white/10 text-white shadow-lg" : "text-gray-300 hover:bg-white/5 hover:text-white"}` }
  >
    <div className="flex items-center justify-center w-6 flex-shrink-0">
      <Icon size={18} />
    </div>

    {!collapsed && (
      <>
        <span className="truncate flex-1">{children}</span>
        {badge && (
          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
            {badge}
          </span>
        )}
      </>
    )}

    {collapsed && (
      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-white/10">
        {children}
        {badge && <span className="ml-2 text-blue-400">({badge})</span>}
      </div>
    )}
  </NavLink>
);

export default function Sidebar({ adminData }) {
  const collapsed = useSidebarStore((s) => s.collapsed);
  const toggle = useSidebarStore((s) => s.toggle);
  const navigate = useNavigate();
  const location = useLocation(); // ⬅ NEW
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { getUserData, isUserLoading } = useSelector(state => state.userProfile);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // Close sidebar on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Lock scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  // ⬅ FIXED: Correct route change sidebar closing 
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await dispatch(logoutUser("admin"));
    navigate("/admin/");
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: Home },
    {
      to: "/admin/dashboard/users",
      label: "Users",
      icon: Users,
      badge: isUserLoading ? (
        <Loader2 className="w-4 h-4 text-white animate-spin" />
      ) : (
        getUserData?.length
      ),
    },
    { to: "/admin/dashboard/contact", label: "Messages", icon: Bell },
    { to: "/admin/dashboard/payments", label: "Payments", icon: CreditCard },
    { to: "/admin/dashboard/country", label: "Manage Countries", icon: Globe },
    { to: "/admin/dashboard/ambessyManage", label: "Manage Ambessy", icon: Landmark },
    { to: "/admin/dashboard/ambessyManage", label: "Manage Courses", icon: Library },
    { to: "/admin/dashboard/settings", label: "Manage Admin", icon: ShieldCheck },
    { to: "/admin/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    { to: "/admin/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300
          bg-gradient-to-b from-black/4 via-transparent to-black backdrop-blur-md
          border-r border-white/5 
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ boxShadow: "inset 0 0 40px rgba(255,255,255,0.02)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg shadow-lg border border-white/10">
              <FlightTakeoffIcon fontSize="small" />
            </div>

            {!collapsed && (
              <h1 className="text-white font-semibold text-lg truncate">
                Global Gateway
              </h1>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={toggle}
              className="hidden md:flex p-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* User profile */}
        {!collapsed && (
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <div>
                <p className="text-white text-sm font-medium truncate">Admin User</p>
                <p className="text-gray-400 text-xs truncate">
                  {adminData?.email || "admin@global.com"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="glass-scrollbar flex-1 p-4 space-y-1 overflow-y-auto">
          {collapsed && (
            <button
              onClick={toggle}
              className="w-full flex items-center justify-center p-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white mb-2"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              collapsed={collapsed}
              onClick={() => setMobileOpen(false)}
              badge={item.badge}
            >
              {item.label}
            </NavItem>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 space-y-3">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-3 px-3 py-3 rounded-lg bg-white/10 text-gray-300 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} className={isLoggingOut ? "animate-spin" : ""} />
            {!collapsed && <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>}
          </button>

          {!collapsed && (
            <div className="text-xs text-gray-500 text-center pt-2">
              © {new Date().getFullYear()} Global Gateway
            </div>
          )}
        </div>
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-30 p-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 md:hidden shadow-lg"
      >
        <Menu size={20} />
      </button>

      <div className={`hidden md:block transition-all duration-300 ${collapsed ? "md:w-20" : "md:w-64"}`} />
    </>
  );
}
