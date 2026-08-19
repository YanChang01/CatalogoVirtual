import type { IniciarSessionUsersLoginPostResponse } from "@/lib/api/types.gen";
import { client } from "@/lib/api/client.gen";

type Credentials = {
  username: string;
  password: string;
};

export interface AuthUser {
  token: string | null;
}

export const useAuth = () => {
  const getToken = (): string | null => {
    const token = localStorage.getItem("token_jwt");
    return token || null;
  };

  const user: AuthUser = {
    token: getToken(),
  };

  const login = async (credentials: Credentials) => {
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

    const data =
      (await response.json()) as IniciarSessionUsersLoginPostResponse;

    if (!response.ok) {
      const errorMessage = (data.detail as string) || "Login failed";
      throw new Error(errorMessage);
    }

    localStorage.setItem("token_jwt", data.access_token as string);

    // Set default auth headers on the API client
    client.setConfig({
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token_jwt");
    client.setConfig({ headers: {} });
    window.location.href = "/login";
  };

  return { user, login, logout };
};

export default useAuth;
