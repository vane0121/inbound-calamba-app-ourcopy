import { jwtDecode } from "jwt-decode";
import { IUserProfile } from "../../../Context/Interface/UserProfile.interface";
import LocationStorageKey from "../../Enum/LocationStorageKey.enum";

const getToken = (): string | null => {
  const token = localStorage.getItem(LocationStorageKey.TOKEN);
  return token;
};

export default async function GetUserPayload() {
  try {
    const userPayload = getToken();

    if (userPayload) {
      const user = jwtDecode<IUserProfile>(userPayload);
      return user;
    }
    return null;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}
