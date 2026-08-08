import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Roles from "./pages/Roles";
import Departments from "./pages/Departments";
import Attendance from "./pages/Attendance";
import Shift from "./pages/Shift";
import LeaveTracking from "./pages/LeaveTracking";
import AllowanceDeduction from "./pages/AllowanceDeduction";
import EventsSchedule from "./pages/EventsSchedule";
import Payroll from "./pages/Payroll";
import Reports from "./pages/Reports";
import Performance from "./pages/Performance";
import SettingsPage from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/shift" element={<Shift />} />
              <Route path="/leave-tracking" element={<LeaveTracking />} />
              <Route path="/allowance-deduction" element={<AllowanceDeduction />} />
              <Route path="/events-schedule" element={<EventsSchedule />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
