"use client";

import {createContext, useEffect, useState, useContext} from "react";

interface AuthContextType {
  accessToken: string | null;

  login: (
    access: string,
    refresh: string
  ) => void;

  logout: () => void;

  isAuthenticated: boolean;

  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({children}: {children: React.ReactNode;}) {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] =  useState(true);

  useEffect(() => {

    const token = localStorage.getItem("accessToken");

    if (token) {
// eslint-disable-next-line react-hooks/set-state-in-effect
      setAccessToken(token);
    }

    setLoading(false);
  }, []);

  function login( access: string, refresh: string) {

    localStorage.setItem("accessToken", access);

    localStorage.setItem("refreshToken", refresh);

    setAccessToken(access);
  }

  function logout() {

    localStorage.removeItem("accessToken");

    localStorage.removeItem("refreshToken");

    setAccessToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,

        login,

        logout,

        isAuthenticated: !!accessToken,
        
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}