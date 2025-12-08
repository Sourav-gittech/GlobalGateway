import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSidebarStore } from "../../util/useSidebarStore";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
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
  Loader2,
} from "lucide-react";
import { logoutUser } from "../../Redux/Slice/auth/checkAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/Slice/userSlice";

const NavItem = ({ to, icon: Icon, children, collapsed, onClick, badge }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-sm font-medium relative group
      ${isActive ? "bg-white/10 text-white shadow-lg" : "text-gray-300 hover:bg-white/5 hover:text-white"}`
    }
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
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { getUserData, isUserLoading, isUserError } = useSelector(state => state.userProfile);
  // console.log('All users data', getUserData);

  useEffect(() => {
    dispatch(getAllUsers())
      .then(res => {
        // console.log('Response after fetching all user', res);
      })
      .catch(err => {
        console.log('Error occured', err);
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      })
  }, []);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [navigate]);

  const handleLogout = async () => {
    await dispatch(logoutUser('admin'));
    navigate('/admin/');
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: Home },
    { to: "/admin/dashboard/users", label: "Users", icon: Users, badge: isUserLoading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : getUserData?.length },
    { to: "/admin/dashboard/payments", label: "Payments", icon: CreditCard },
    { to: "/admin/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    { to: "/admin/dashboard/settings", label: "Settings", icon: Settings },
    { to: "/admin/dashboard/contact", label: "Messages", icon: Bell },
    { to: "/admin/dashboard/country", label: "Countries", icon: Users },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        role="navigation"
        aria-label="Main navigation"
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 
          bg-gradient-to-b from-black/4 via-transparent to-black backdrop-blur-md border-r border-white/5 
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ boxShadow: "inset 0 0 40px rgba(255,255,255,0.02)" }}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0 transition-all border border-white/10 ${collapsed ? "scale-95" : "scale-100"
                }`}
            >
              <FlightTakeoffIcon fontSize="small" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h1 className="text-white font-semibold text-base truncate">
                  Global Gateway
                </h1>
                <p className="text-gray-400 text-xs">Admin Panel</p>
              </div>
            )}
          </div>

          {/* Desktop toggle button - Always visible */}
          {!collapsed && (
            <button
              onClick={toggle}
              className="hidden md:flex p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Profile Section */}
        {!collapsed && (
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer group border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-semibold flex-shrink-0 border border-white/10">
                <User size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Admin User</p>
                <p className="text-gray-400 text-xs truncate">{adminData?.email || 'admin@global.com'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {/* Toggle button when collapsed - at top of nav */}
          {collapsed && (
            <button
              onClick={toggle}
              className="w-full flex items-center justify-center p-3 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white mb-2"
              aria-label="Expand sidebar"
              title="Expand sidebar"
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

        {/* Footer Section */}
        <div className="p-4 border-t border-white/5 space-y-3">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center justify-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all
              ${isLoggingOut
                ? "bg-white/5 text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:bg-red-500/10 hover:text-red-400"
              }`}
            aria-label="Logout"
          >
            <LogOut size={18} className={isLoggingOut ? "animate-spin" : ""} />
            {!collapsed && (
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            )}
          </button>

          {!collapsed && (
            <div className="text-xs text-gray-500 text-center pt-2">
              © {new Date().getFullYear()} Global Gateway

            </div>
          )}
        </div>
      </aside>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-30 p-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-lg md:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar offset for main content */}
      <div
        className={`hidden md:block transition-all duration-300 ${collapsed ? "md:w-20" : "md:w-64"
          }`}
        aria-hidden="true"
      />
    </>
  );
}