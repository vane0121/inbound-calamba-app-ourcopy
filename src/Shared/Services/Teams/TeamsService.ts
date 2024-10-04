import { IPagination } from "../../../Components/ReusableTable/interface/IReusableTableProps.interface";
import ICreateUpdateTeams from "../../../Features/Teams/interface/CreateUpdateTeams.interface";
import IClientRequest from "../../Interface/ClientRequest.interface";
import { Client } from "../AxiosService";

const CreateTeamAsync = async (data: ICreateUpdateTeams) => {
  const request: IClientRequest = {
    method: "POST",
    url: "team/CreateTeamAsync",
    data: data,
  };

  return await Client(request);
};
const UpdateTeamAsync = async (data: ICreateUpdateTeams) => {
  const request: IClientRequest = {
    method: "PUT",
    url: "team/UpdateTeamAsync",
    data: data,
  };

  return await Client(request);
};
const GetTeamById = async (id: number) => {
  const request: IClientRequest = {
    method: "POST",
    url: `team/GetTeamById?id=${id}`,
  };

  return await Client(request);
};

const GetTeamsList = async (data: IPagination) => {
  const request: IClientRequest = {
    method: "POST",
    url: "team/GetTeamsList",
    data: data,
  };

  return await Client(request);
};

const DeleteTeamAsync = async (id: number) => {
  const request: IClientRequest = {
    method: "POST",
    url: "team/DeleteTeamAsync",
    data: id,
  };

  return await Client(request);
};

const IsDataExist = async (data: ICreateUpdateTeams) => {
  const request: IClientRequest = {
    method: "POST",
    url: "team/IsDataExist",
    data: data,
  };

  return await Client(request);
};

const GetSelectTeam = async () => {
  const request: IClientRequest = {
    method: "GET",
    url: `team/GetTeamSelect`,
  };

  const response = await Client(request);

  return response;
};

const TeamService = {
  CreateTeamAsync,
  GetTeamById,
  GetTeamsList,
  UpdateTeamAsync,
  DeleteTeamAsync,
  IsDataExist,
  GetSelectTeam,
};

export default TeamService;
