import IClientRequest from "../../Interface/ClientRequest.interface";
import { Client } from "../AxiosService";

const GetDcSelect = async () => {
  const request: IClientRequest = {
    method: "GET",
    url: "dc/SelectDc",
  };

  const response = Client(request);

  return response;
};

const DcService = {
  GetDcSelect,
};

export default DcService;
