import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/auth/me").then(({ data }) => setUser(data)).catch(() => setUser(false)).finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    async login(payload) { const { data } = await api.post("/auth/login", payload); setUser(data); return data; },
    async register(payload) { const { data } = await api.post("/auth/register", payload); setUser(data); return data; },
    async logout() { await api.post("/auth/logout"); setUser(false); },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
