
import { createContext, useState, useEffect } from "react";
import { loginUser } from "../api/userApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Sayfa yenilenince user kaybolmasın
  useEffect(() => {
    const token = localStorage.getItem("access");
    const username = localStorage.getItem("username");

    if (token && username) {
      setUser({ username });
    }
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    localStorage.setItem("username", res.data.username);

    setUser({
      username: res.data.username,
      email: res.data.email,
    });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}