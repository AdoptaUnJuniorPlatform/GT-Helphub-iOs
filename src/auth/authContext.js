import { createContext, useContext, useEffect, useState } from "react";
import { saveToken, removeToken, getToken } from "./authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();
      if (token) setUserToken(token);
    };
    loadToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        "http://localhost:4002/api/helphub/auth/login-mobile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await response.json();
      if (response.ok && data.access_token) {
        await saveToken(data.access_token);
        setUserToken(data.access_token);
        console.log("Token saved successfully");
      } else {
        throw new Error("Authentification error");
      }
    } catch (error) {
      console.error(error);
      alert("Se ha producido un error, intenta de nuevo.");
    }
  };

  const logout = async () => {
    await removeToken();
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
