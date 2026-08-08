import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  ShieldCheck,
  Building2,
  ClipboardCheck,
  Clock,
  CalendarDays,
  Wallet,
  CalendarClock,
  Banknote,
  FileBarChart2,
  BarChart3,
  Settings as SettingsIcon,
  X,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/employees", label: "Employees", icon: Users },
  { to: "/roles", label: "Roles", icon: ShieldCheck },
  { to: "/departments", label: "Departments", icon: Building2 },
  { to: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/shift", label: "Shift", icon: Clock },
  { to: "/leave-tracking", label: "Leave Tracking", icon: CalendarDays },
  { to: "/allowance-deduction", label: "Allowance & Deduction", icon: Wallet },
  { to: "/events-schedule", label: "Events & Schedule", icon: CalendarClock },
  { to: "/payroll", label: "Payroll", icon: Banknote },
  { to: "/reports", label: "Reports", icon: FileBarChart2 },
  { to: "/performance", label: "Performance", icon: BarChart3 },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-[260px] bg-white border-r border-gray-100 flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
              SH
            </div>
            <span className="font-semibold text-gray-900 text-[17px]">Siegecode HRM</span>
          </div>
          <button className="lg:hidden text-gray-400" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14.5px] font-medium transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`
              }
            >
              <item.icon size={18} strokeWidth={2} />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-5 pt-2 border-t border-gray-100">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14.5px] font-medium transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`
            }
          >
            <SettingsIcon size={18} />
            Settings
          </NavLink>
        </div>
      </aside>
    </>
  );
}
