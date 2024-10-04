import IClientRequest from "../../Interface/ClientRequest.interface";
import { Client } from "../AxiosService";

const GetLocationsAsync = async () => {
  const request: IClientRequest = {
    method: "GET",
    url: "location/GetLocationsAsync",
  };

  return await Client(request);
};

const locationService = {
  GetLocationsAsync,
};

export { locationService };
