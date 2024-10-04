import IClientRequest from "../../Interface/ClientRequest.interface";
import { Client } from "../AxiosService";

const GetSelectRoles = async () => {
  const request: IClientRequest = {
    method: "GET",
    url: "role/GetRolesCheckbox",
  };

  return await Client(request);
};

const RolesService = {
  GetSelectRoles,
};

export default RolesService;
