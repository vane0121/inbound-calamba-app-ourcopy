import IClientRequest from "../../Interface/ClientRequest.interface";
import { Client } from "../AxiosService";

const GetUserDesignationSelect = async () => {
  const request: IClientRequest = {
    method: "GET",
    url: "UserDesignation/GetUserDesignationSelect",
  };

  const response = Client(request);

  return response;
};

const UserDesignationService = {
  GetUserDesignationSelect,
};

export default UserDesignationService;
