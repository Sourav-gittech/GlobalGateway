import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, LogOut, Settings, ChevronDown, Moon, Sun, Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import { logoutUser } from "../../Redux/Slice/auth/checkAuthSlice";
import { useDispatch } from "react-redux";

// Constants
const NOTIFICATIONS = [
  { id: 1, title: "New user registered", time: "2 min ago", unread: true },
  { id: 2, title: "Payment received", time: "1 hour ago", unread: true },
  { id: 3, title: "System update completed", time: "3 hours ago", unread: false },
];

export default function Navbar({ adminData }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const searchInputRef = useRef(null);

  // console.log('Admin Data',adminData);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Escape to close dropdowns
      if (e.key === "Escape") {
        setShowNotifications(false);
        setShowUserMenu(false);
        setShowMobileSidebar(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (showMobileSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileSidebar]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }, [searchQuery, navigate]);

  const handleNotificationClick = useCallback((notificationId) => {
    console.log("Notification clicked:", notificationId);
    setShowNotifications(false);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutUser('admin'));
    navigate('/admin/');
  };

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }, []);

  const markAllAsRead = useCallback(() => {
    setUnreadCount(0);
    console.log("Marked all notifications as read");
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black/10 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 md:h-18 lg:h-18 md:px-6 py-3 md:py-4">
          {/* Left Section - Logo & Mobile Menu Button */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                aria-label="Toggle menu"
              >
                {showMobileSidebar ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}

            {/* Logo */}
            <div className="flex items-center gap-2">

              <div className="">
                <h1 className="text-white text-sm sm:text-base md:text-base font-semibold">Global Gateway</h1>
                <p className="text-gray-400 text-xs">Admin Console</p>
              </div>
            </div>
          </div>

          {/* Center Section - Search Bar (Hidden on small mobile) */}
          <div className="hidden sm:flex flex-1 max-w-md lg:max-w-2xl mx-4">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e);
                  }
                }}
                placeholder="Search"
                className="w-full pl-9 pr-4 py-2 md:py-2.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Button (Mobile Only) */}
            {isMobile && (
              <button
                onClick={() => searchInputRef.current?.focus()}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all sm:hidden"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 md:p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 md:p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                aria-label="Notifications"
                title="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-white/20 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h3 className="text-white font-semibold text-sm">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {NOTIFICATIONS.map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`w-full p-4 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0 ${notification.unread ? "bg-blue-500/5" : ""
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              {notification.title}
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="p-3 border-t border-white/10">
                    <button
                      onClick={() => {
                        navigate("/notifications");
                        setShowNotifications(false);
                      }}
                      className="w-full text-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 pr-2 md:pr-3 rounded-lg bg-transparent hover:bg-white/10 transition-all group"
                aria-label="User menu"
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-white/20 to-white/50 flex items-center justify-center text-white font-semibold text-xs md:text-xs border border-white">
                  {adminData?.name?.charAt(0) || 'A'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-white text-sm font-medium">Admin</p>
                  <p className="text-gray-400 text-xs">{adminData?.email || 'admin@global.com'}</p>
                </div>
                <ChevronDown
                  className={`hidden md:block text-gray-400 transition-transform ${showUserMenu ? "rotate-180" : ""
                    }`}
                  size={16}
                />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <p className="text-white text-sm font-medium">Global Gateway Admin</p>
                    <p className="text-gray-400 text-xs mt-0.5">{adminData?.email || 'admin@global.com'}</p>
                  </div>

                  <div className="p-2">


                    <button
                      onClick={() => {
                        navigate("/admin/dashboard/settings");
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-all text-sm"
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                  </div>

                  <div className="p-2 border-t border-white/10">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-sm"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobile && (
          <div className="px-4 pb-3 sm:hidden">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e);
                  }
                }}
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sidebar Overlay & Container */}
      {isMobile && showMobileSidebar && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setShowMobileSidebar(false)}
          />

          {/* Sidebar Wrapper */}
          <div
            className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out ${showMobileSidebar ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <Sidebar onNavigate={() => setShowMobileSidebar(false)} />
          </div>
        </>
      )}
    </>
  );
}