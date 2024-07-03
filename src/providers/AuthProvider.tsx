import React, { createContext, useState, useEffect, useContext } from "react";

import { server } from "@/supabase/client";
import { User } from "@supabase/supabase-js";

type TypeOfLogins = "github" | "google";

type UserParser = {
  id: string;
  email: string;
  username: string;
  avatar: string;
};

export type IAuthContext = {
  isAuth: boolean;
  login: (type: TypeOfLogins) => Promise<void>;
  logout: () => Promise<void>;
  user: UserParser | null;
};

const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  login: async () => {},
  logout: async () => {},
  user: null,
});

export const userParser = (user: User): UserParser => {
  return {
    id: user.id!,
    email: user.email!,
    username: user.user_metadata.full_name!,
    avatar: user.user_metadata.avatar_url!,
  };
};

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserParser | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const handleLogin = async (type: TypeOfLogins) => {
    try {
      const { data, error } = await server.auth.signInWithOAuth({
        provider: type,
      });

      console.log(error);

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

      setIsAuth(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    setIsAuth(!!user);
  }, [user]);

  useEffect(() => {
    server.auth.onAuthStateChange((_event, info) => {
      if (info?.user) {
        setUser(userParser(info.user));

        if (info) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      }
    });
  }, []);

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
