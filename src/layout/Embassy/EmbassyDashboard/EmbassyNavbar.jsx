import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, Settings, ChevronDown, Moon, Sun, X } from "lucide-react";
import { useSidebarStore } from "../../../util/useSidebarStore";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Redux/Slice/auth/checkAuthSlice";

// Constants
const NOTIFICATIONS = [
    { id: 1, title: "New visa application received", time: "5 min ago", unread: true },
    { id: 2, title: "Application #A45467 approved", time: "1 hour ago", unread: true },
    { id: 3, title: "Interview scheduled for tomorrow", time: "3 hours ago", unread: false },
];

export default function EmbassyNavbar({ embassyData, countryDetails }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const collapsed = useSidebarStore((s) => s.collapsed);

    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [unreadCount, setUnreadCount] = useState(2);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const notificationRef = useRef(null);
    const userMenuRef = useRef(null);

    // console.log('Embassy details', embassyData);
    // console.log('Country details', countryDetails);

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
            // Escape to close dropdowns
            if (e.key === "Escape") {
                setShowNotifications(false);
                setShowUserMenu(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleNotificationClick = useCallback((notificationId) => {
        console.log("Notification clicked:", notificationId);
        setShowNotifications(false);
    }, []);

    const handleLogout = async () => {
        await dispatch(logoutUser({ user_type: 'embassy', showAlert: true }));
        navigate('/embassy/');
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
        <header
            className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 bg-white border-b border-gray-200 ${collapsed ? "md:left-20" : "md:left-64"
                }`}
        >
            <div className="flex items-center justify-between px-4 h-16 md:h-18 lg:h-18 md:px-6">
                {/* Left Section - Logo & Title */}
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Title */}
                    <div className="flex items-center gap-2">
                        <div>
                            <h1 className="text-gray-900 text-sm sm:text-base md:text-base font-semibold">
                                Global Gateway
                            </h1>
                            <p className="text-gray-500 text-xs">Embassy Panel</p>
                        </div>
                    </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 md:p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                        aria-label="Toggle theme"
                        title="Toggle theme"
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Notifications */}
                    <div className="relative" ref={notificationRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 md:p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                            aria-label="Notifications"
                            title="Notifications"
                        >
                            <Bell size={18} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-blue-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
                                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                    <h3 className="text-gray-900 font-semibold text-sm">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
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
                                            className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${notification.unread ? "bg-blue-50" : ""
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                {notification.unread && (
                                                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-gray-900 text-sm font-medium truncate">
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-gray-500 text-xs mt-1">
                                                        {notification.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="p-3 border-t border-gray-200">
                                    <button
                                        onClick={() => {
                                            navigate("/embassy/dashboard/notifications");
                                            setShowNotifications(false);
                                        }}
                                        className="w-full text-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
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
                            className="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 pr-2 md:pr-3 rounded-lg bg-transparent hover:bg-gray-100 transition-all group"
                            aria-label="User menu"
                        >
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border border-blue-700 overflow-hidden">
                                <img src={countryDetails?.details?.flag_url} alt="E" className="w-full h-full object-cover rounded-full" />
                            </div>

                            <div className="hidden lg:block text-left">
                                <p className="text-gray-900 text-sm font-medium">{countryDetails?.name?.length > 15 ? countryDetails?.name?.slice(0, 16) + '...' : countryDetails?.name}</p>
                                <p className="text-gray-500 text-xs">{embassyData?.email || 'embassy@global.com'}</p>
                            </div>
                            <ChevronDown
                                className={`hidden md:block text-gray-500 transition-transform ${showUserMenu ? "rotate-180" : ""
                                    }`}
                                size={16}
                            />
                        </button>

                        {/* User Dropdown */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
                                <div className="p-4 border-b border-gray-200">
                                    <p className="text-gray-900 text-sm font-medium">Global Gateway Embassy</p>
                                    <p className="text-gray-500 text-xs mt-0.5">
                                        {embassyData?.email || 'embassy@global.com'}
                                    </p>
                                </div>

                                <div className="p-2">
                                    <button
                                        onClick={() => {
                                            navigate("/embassy/dashboard/settings");
                                            setShowUserMenu(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all text-sm"
                                    >
                                        <Settings size={16} />
                                        <span>Settings</span>
                                    </button>
                                </div>

                                <div className="p-2 border-t border-gray-200">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all text-sm cursor-pointer"
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
        </header>
    );
}