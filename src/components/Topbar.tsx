import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Menu, ChevronDown, LogOut, User } from "lucide-react";
import { notifications } from "../data/mockData";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const unread = notifications.filter((n) => n.unread).length;
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    logout();
    navigate("/login", { replace: true });
  }

  const initials = (user?.name || "AD")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center gap-4">
      <button className="lg:hidden text-gray-500" onClick={onMenuClick}>
        <Menu size={22} />
      </button>

      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-[14.5px] outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-200 placeholder:text-gray-400"
        />
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-5 relative">
        <div className="relative">
          <button
            className="relative w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500"
            onClick={() => {
              setShowNotif((s) => !s);
              setShowProfile(false);
            }}
          >
            <Bell size={19} />
            {unread > 0 && (
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-30">
              <div className="px-4 py-2 text-sm font-semibold text-gray-800 border-b border-gray-50">
                Notifications
              </div>
              {notifications.map((n, i) => (
                <div key={i} className="px-4 py-3 hover:bg-gray-50 flex gap-3 items-start">
                  <span
                    className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                      n.unread ? "bg-brand-500" : "bg-gray-200"
                    }`}
                  />
                  <div>
                    <p className="text-[13.5px] text-gray-700 leading-snug">{n.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-2.5"
            onClick={() => {
              setShowProfile((s) => !s);
              setShowNotif(false);
            }}
          >
            <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold text-sm">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[13.5px] font-semibold text-gray-800 leading-tight">{user?.name || "Admin User"}</p>
              <p className="text-xs text-gray-400 leading-tight">{user?.role === "Employee" ? "Employee" : "HR Director"}</p>
            </div>
            <ChevronDown size={16} className="hidden sm:block text-gray-400" />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-30">
              <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-gray-600 hover:bg-gray-50">
                <User size={16} /> My Profile
              </button>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-red-500 hover:bg-gray-50"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
