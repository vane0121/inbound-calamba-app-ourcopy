import IClientRequest from "../../Interface/ClientRequest.interface";
import { Client } from "../AxiosService";

async function GetSelectDesignation(edit: boolean, id: number) {
  const request: IClientRequest = {
    method: "GET",
    url: `designation/SelectDesignation?status?=${edit}&id=${id}`,
  };

  const response = await Client(request);

  return response;
}

const DesignationService = {
  GetSelectDesignation,
};

export default DesignationService;
