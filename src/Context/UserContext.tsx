import { createContext, ReactNode, useEffect, useState } from "react";
import ILoginRequest from "../Shared/Services/Auth/Interface/LoginRequest.interface";
import { IUserProfile } from "./Interface/UserProfile.interface";
import LocationStorageKey from "../Shared/Enum/LocationStorageKey.enum";
import GetUserPayload from "../Shared/Services/Jwt/jwtService";
import AuthService from "../Shared/Services/Auth/AuthService";
import React from "react";

type UserContextType = {
  user: IUserProfile | null;
  token: string | null;
  message: string;
  LoginUser: (data: ILoginRequest) => void;
  Logout: () => void;
  IsLoggedIn: () => boolean;
  isReady: boolean;
  roles: string[]
};

type Pros = { children: ReactNode }

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({ children }: Pros) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [roles, setRoles] = useState<string[]>([] as string[]);
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState("");

  const getToken = async (): Promise<string | null> => {
    const value = localStorage.getItem(LocationStorageKey.TOKEN);
    return value;
  };

  const initialize = async () => {
    const userPayload = await GetUserPayload();
    const token = await getToken();

    if (userPayload != null) {
      setUser(userPayload as IUserProfile);
      setToken(token);
      setRoles(userPayload.Roles);
    }
    setIsReady(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  const LoginUser = async ({ Password, Username }: ILoginRequest) => {
    try {
      const res = await AuthService.Login({
        Password,
        Username,
      });

      if (res?.data) {
        if (res?.data.Message === 'Login Successfull') {
          localStorage.setItem(LocationStorageKey.TOKEN, `Bearer ${res?.data.Token}`);
          localStorage.setItem(LocationStorageKey.USER, `${res?.data.Token}`);
        }

        const userPayload = await GetUserPayload();
        setUser(userPayload as IUserProfile);
        setToken(res?.data.Token);

        if (userPayload == null) {
          setMessage(res?.data.Message);
        } else {
          setMessage("Successfully Logged In");
          localStorage.setItem(LocationStorageKey.ROLE, userPayload?.Roles[0])
        }
      }

      if (!res) {
        setMessage("Invalid Credentials")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const IsLoggedIn = () => {
    return localStorage.getItem(LocationStorageKey.TOKEN) != null
  };

  const Logout = async () => {
    try {
      const login: ILoginRequest = {
        Username: user != null ? user.Username : "",
        Password: ""
      };

      await AuthService.LogOut(login);
      localStorage.clear();
      initialize();
      setUser(null);
      setToken("");
      location.replace("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return <UserContext.Provider value={{ LoginUser, user, token, IsLoggedIn, Logout, message, isReady, roles }}>
    {isReady ? children : null}
  </UserContext.Provider>
}

export const useAuth = () => React.useContext(UserContext)