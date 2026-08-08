import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    const role = email.toLowerCase().includes("employee") ? "Employee" : "Admin User";
    login(email.trim(), role);
    navigate("/", { replace: true });
  }

  function quickAccess(role: "Admin User" | "Employee") {
    login(role === "Admin User" ? "admin@siegecode.com" : "employee@siegecode.com", role);
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 bg-brand-600 text-white flex flex-col items-center justify-center px-8 py-16 text-center relative overflow-hidden">
        <ShieldCheck size={64} className="mb-8 opacity-90" strokeWidth={1.5} />
        <h1 className="text-4xl font-bold mb-4">Secure HR Management</h1>
        <p className="text-white/80 max-w-md text-[15px] leading-relaxed">
          Your data is protected with enterprise-grade security. Sign in to manage your workforce efficiently.
        </p>
      </div>

      <div className="lg:w-1/2 flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-sm">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center mb-6">
            <ShieldCheck size={26} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 text-[14px] mt-1 mb-8">Please enter your details to sign in</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-500 text-[13px] px-3.5 py-2.5 rounded-xl mb-5">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[13px] font-medium text-gray-700">Email Address</label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-medium text-gray-700">Password</label>
                <a className="text-[12.5px] text-brand-600 font-medium cursor-pointer">Forgot Password?</a>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-xl font-semibold text-[14.5px] flex items-center justify-center gap-2"
            >
              Sign In →
            </button>
          </form>

          <p className="text-center text-[12px] uppercase tracking-wide text-gray-400 mt-8 mb-3">Quick Access Demo</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => quickAccess("Admin User")}
              className="border-2 border-brand-100 bg-brand-50 rounded-xl py-4 flex flex-col items-center gap-2"
            >
              <ShieldCheck size={20} className="text-brand-600" />
              <span className="text-[13px] font-semibold text-brand-600">Admin User</span>
            </button>
            <button
              onClick={() => quickAccess("Employee")}
              className="border border-gray-200 rounded-xl py-4 flex flex-col items-center gap-2"
            >
              <Mail size={20} className="text-gray-400" />
              <span className="text-[13px] font-semibold text-gray-600">Employee</span>
            </button>
          </div>

          <p className="text-center text-[13px] text-gray-500 mt-8">
            Don't have an account? <span className="text-brand-600 font-semibold cursor-pointer">Contact HR</span>
          </p>
        </div>
      </div>
    </div>
  );
}
