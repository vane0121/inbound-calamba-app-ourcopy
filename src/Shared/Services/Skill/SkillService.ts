import IClientRequest from "../../Interface/ClientRequest.interface";
import { Client } from "../AxiosService";

const GetSkillSelect = async () => {
  const request: IClientRequest = {
    method: "GET",
    url: "Skill/GetSkillSelect",
  };

  return await Client(request);
};

const SkillService = {
  GetSkillSelect,
};

export default SkillService;
