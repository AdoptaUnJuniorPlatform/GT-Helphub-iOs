import { createContext, useContext, useEffect, useState } from "react";
import { saveToken, removeToken, getToken } from "./authService";
import apiClient from "../api/apiClient";

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
      const response = await apiClient.post("/auth/login-mobile", {
        email,
        password,
      });
      const { access_token } = response.data;

      if (access_token) {
        await saveToken(access_token);
        setUserToken(access_token);
        console.log("Token saved successfully:", access_token);
      } else {
        console.error("Login failed: No access token in response");
        throw new Error("Authentication error");
      }
    } catch (error) {
      console.error("Login error:", error);
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
