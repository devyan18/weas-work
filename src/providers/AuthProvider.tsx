import React, { createContext, useState, useEffect, useContext } from "react";

import { server } from "@/supabase/client";

type UserInfo = {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
};

type TypeOfLogins = "github" | "google";

export type IAuthContext = {
  isAuth: boolean;
  login: (type: TypeOfLogins) => Promise<void>;
  logout: () => Promise<void>;
  user: UserInfo | null;
};

const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  login: async () => {},
  logout: async () => {},
  user: null,
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const handleLogin = async (type: TypeOfLogins) => {
    try {
      const { data, error } = await server.auth.signInWithOAuth({
        provider: type,
      });

      if (error) {
        throw error;
      }

      console.log(data);
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await server.auth.signOut();

      if (error) {
        throw error;
      }

      console.log(error);

      setIsAuth(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    if (user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [user]);

  useEffect(() => {
    server.auth.onAuthStateChange((_event, info) => {
      if (info) {
        const data = {
          id: info.user.id as string,
          fullName: info.user.user_metadata.full_name as string,
          email: info.user.email as string,
          avatar: info.user.user_metadata.avatar_url as string,
        };
        setUser(data);

        if (data) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
