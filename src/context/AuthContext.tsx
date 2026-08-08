import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Role = "Admin User" | "Employee";

type AuthUser = {
  name: string;
  role: Role;
  email: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, role: Role) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "siegecode_hrm_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    } finally {
      setLoaded(true);
    }
  }, []);

  function login(email: string, role: Role) {
    const name = role === "Admin User" ? "Admin User" : email.split("@")[0] || "Employee";
    const nextUser: AuthUser = {
      name,
      role,
      email: email || (role === "Admin User" ? "admin@siegecode.com" : "employee@siegecode.com"),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  if (!loaded) return null;

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
