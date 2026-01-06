// EmbassyNotifications.jsx - Light Theme Matching Embassy UI
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Filter, 
  Search, 
  Trash2, 
  Clock,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  X
} from "lucide-react";
import { fetchNotifications, markNotificationRead } from "../../../Redux/Slice/notificationSlice";
import getSweetAlert from "../../../util/alert/sweetAlert";

export default function EmbassyNotifications() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isNotificationLoading, notificationList, hasNotificationError } = useSelector(state => state?.notification);
  const { userAuthData } = useSelector(state => state?.checkAuth);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Fetch notifications on mount
  useEffect(() => {
    dispatch(fetchNotifications({ 
      receiver_type: 'embassy', 
      receiver_country_id: userAuthData?.country_id 
    }))
      .catch(() => {
        getSweetAlert("Oops...", "Something went wrong!", "error");
      });
  }, [dispatch, userAuthData]);

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-600" size={20} />;
      case "error":
        return <XCircle className="text-red-600" size={20} />;
      case "warning":
        return <AlertCircle className="text-yellow-600" size={20} />;
      case "info":
      default:
        return <Info className="text-blue-600" size={20} />;
    }
  };

  // Filter notifications
  const filteredNotifications = (notificationList || []).filter(notification => {
    const matchesSearch = notification?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification?.message?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || 
                         (filterType === "unread" && !notification?.mark_read) ||
                         (filterType === "read" && notification?.mark_read);
    return matchesSearch && matchesFilter;
  });

  const unreadCount = (notificationList || []).filter(n => !n?.mark_read).length;

  // Handle notification click
  const handleNotificationClick = (notification) => {
    if (!notification?.mark_read) {
      dispatch(markNotificationRead({ 
        id: notification.id, 
        receiver_type: 'embassy', 
        receiver_id: userAuthData?.country_id 
      }))
        .then(() => {
          dispatch(fetchNotifications({ 
            receiver_type: 'embassy', 
            receiver_country_id: userAuthData?.country_id 
          }));
        })
        .catch(() => {
          getSweetAlert('Oops...', 'Something went wrong!', 'error');
        });
    }
  };

  // Handle select notification
  const handleSelectNotification = (id) => {
    setSelectedNotifications(prev => 
      prev.includes(id) ? prev.filter(nId => nId !== id) : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  // Mark selected as read
  const markSelectedAsRead = () => {
    const promises = selectedNotifications.map(id =>
      dispatch(markNotificationRead({ 
        id, 
        receiver_type: 'embassy', 
        receiver_id: userAuthData?.country_id 
      }))
    );
    
    Promise.all(promises)
      .then(() => {
        dispatch(fetchNotifications({ 
          receiver_type: 'embassy', 
          receiver_country_id: userAuthData?.country_id 
        }));
        setSelectedNotifications([]);
        getSweetAlert('Success!', 'Notifications marked as read', 'success');
      })
      .catch(() => {
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      });
  };

  // Delete selected
  const deleteSelected = () => {
    getSweetAlert('Info', 'Delete functionality to be implemented', 'info');
    setSelectedNotifications([]);
  };

  // Mark all as read
  const markAllAsRead = () => {
    dispatch(markNotificationRead({ 
      id: null, 
      receiver_type: 'embassy', 
      receiver_id: userAuthData?.country_id 
    }))
      .then(() => {
        dispatch(fetchNotifications({ 
          receiver_type: 'embassy', 
          receiver_country_id: userAuthData?.country_id 
        }));
        getSweetAlert('Success!', 'All notifications marked as read', 'success');
      })
      .catch(() => {
        getSweetAlert('Oops...', 'Something went wrong!', 'error');
      });
  };

  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showFilterMenu && !e.target.closest('.filter-dropdown')) {
        setShowFilterMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilterMenu]);

  return (
    <div className="w-full space-y-6">
      {/* Header - Light Theme */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 text-sm mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="self-start sm:self-auto px-4 py-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all text-sm font-medium flex items-center gap-2 border border-blue-200"
          >
            <CheckCheck size={16} />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Main Content Card - Light Theme */}
      <div className="rounded-xl">
        {/* Search and Filter Bar */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Dropdown */}
            <div className="relative filter-dropdown">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="w-full sm:w-auto px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-between sm:justify-start gap-2 text-sm text-gray-900"
              >
                <Filter size={16} />
                <span className="capitalize">{filterType}</span>
              </button>

              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-20">
                  {["all", "unread", "read"].map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilterType(type);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-all text-sm ${
                        filterType === type ? "text-blue-600 bg-blue-50" : "text-gray-700"
                      }`}
                    >
                      <span className="capitalize">{type}</span>
                      {type === "unread" && unreadCount > 0 && (
                        <span className="ml-2 text-xs text-gray-500">({unreadCount})</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm text-gray-700">
                {selectedNotifications.length} selected
              </span>
              <div className="flex gap-2 sm:ml-auto">
                <button
                  onClick={markSelectedAsRead}
                  className="flex-1 sm:flex-none px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-sm flex items-center justify-center gap-2 transition-all text-gray-700"
                >
                  <Check size={14} />
                  <span>Mark as read</span>
                </button>
                <button
                  onClick={deleteSelected}
                  className="flex-1 sm:flex-none px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm flex items-center justify-center gap-2 transition-all border border-red-200"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications List */}
        {isNotificationLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : hasNotificationError ? (
          <div className="text-center py-20">
            <AlertCircle className="mx-auto text-red-600 mb-4" size={48} />
            <p className="text-gray-600">Failed to load notifications</p>
            <button
              onClick={() => dispatch(fetchNotifications({ 
                receiver_type: 'embassy', 
                receiver_country_id: userAuthData?.country_id 
              }))}
              className="mt-4 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all text-sm"
            >
              Try Again
            </button>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-600 text-lg mb-2">
              {searchQuery || filterType !== "all" 
                ? "No notifications found" 
                : "No notifications yet"}
            </p>
            {(searchQuery || filterType !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterType("all");
                }}
                className="mt-4 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all text-sm"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {/* Select All */}
            {filteredNotifications.length > 0 && (
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg mb-4">
                <input
                  type="checkbox"
                  checked={selectedNotifications.length === filteredNotifications.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600">
                  {selectedNotifications.length === filteredNotifications.length 
                    ? "Deselect all" 
                    : "Select all"}
                </span>
              </div>
            )}

            {/* Notification Items */}
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`group relative bg-white border rounded-lg hover:bg-gray-50 transition-all ${
                  !notification.mark_read ? "bg-blue-50 border-blue-200" : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4 p-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => handleSelectNotification(notification.id)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div 
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-gray-900 font-medium text-sm sm:text-base">
                        {notification.title}
                        {notification?.application_id && (
                          <span className="text-gray-500 ml-1">
                            {notification.application_id.slice(0, 16) + '######'}
                          </span>
                        )}
                      </h3>
                      {!notification.mark_read && (
                        <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{formatDate(notification.created_at)}</span>
                      </div>
                      
                      {/* Mark as Read Button - Shows only for unread notifications */}
                      {!notification.mark_read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNotificationClick(notification);
                          }}
                          className="px-2 py-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 rounded flex items-center gap-1 transition-all border border-blue-200"
                        >
                          <Check size={12} />
                          <span>Mark read</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}