import axios from "axios";
import ILoginRequest from "./Interface/LoginRequest.interface";
import { handleError } from "../../../Helpers/ErrorHandler";

const api = import.meta.env.VITE_API_ENDPOINT;

async function Login(data: ILoginRequest) {
  try {
    const res = await axios.post(`${api}/Login/Login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    handleError(error);
  }
}

async function LogOut(data: ILoginRequest) {
  try {
    const res = await axios.post(`${api}/Login/Logout`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    handleError(error);
  }
}

const AuthService = {
  Login,
  LogOut,
};

export default AuthService;
