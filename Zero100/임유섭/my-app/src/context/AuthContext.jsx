import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { saveAuth, loadAuth, clearAuth } from "../utils/storage";
import { login as apiLogin, register as apiRegister } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => loadAuth()); // { user, token } | null
  const isAuthed = !!auth?.user;

  useEffect(() => {
    if (auth) saveAuth(auth);
  }, [auth]);

  const actions = useMemo(() => ({
    async login({ username, password }) {
      const res = await apiLogin({ username, password });
      if (!res.ok) return res;
      setAuth({ user: res.user, token: res.token });
      return { ok: true };
    },
    async register({ username, password, name }) {
      const res = await apiRegister({ username, password, name });
      return res;
    },
    logout() {
      setAuth(null);
      clearAuth();
    }
  }), []);

  return (
    <AuthContext.Provider value={{ auth, isAuthed, ...actions }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
