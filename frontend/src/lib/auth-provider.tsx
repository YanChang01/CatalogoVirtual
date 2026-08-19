import { useState, type ReactNode } from "react";
import { client } from "@/lib/api/client.gen";
import { routes } from "@/config/routes";
import { AuthContext } from "@/lib/auth-context";

function getInitialToken(): string | null {
  return localStorage.getItem("token_jwt");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialToken = getInitialToken();

  if (initialToken) {
    client.setConfig({
      headers: {
        Authorization: `Bearer ${initialToken}`,
      },
    });
  }

  const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken);
  const [isLoading] = useState(false);

  const login = async (credentials: { username: string; password: string }) => {
    const response = await fetch("http://127.0.0.1:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: credentials.username,
        password: credentials.password,
        grant_type: "password",
      }),
    });

    const data = await response.json();

    console.log("Login response:", data);

    if (!response.ok) {
      throw new Error((data as { detail?: string }).detail || "Login failed");
    }

    const accessToken = (data as { access_token?: string; token?: string; accessToken?: string }).access_token 
      ?? (data as { access_token?: string; token?: string; accessToken?: string }).token
      ?? (data as { access_token?: string; token?: string; accessToken?: string }).accessToken;

    if (!accessToken) {
      throw new Error("No access_token in login response: " + JSON.stringify(data));
    }

    localStorage.setItem("token_jwt", accessToken);
    client.setConfig({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token_jwt");
    client.setConfig({ headers: {} });
    setIsAuthenticated(false);
    window.location.href = routes.auth.login.path;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}