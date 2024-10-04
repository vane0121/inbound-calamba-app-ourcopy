import { IPagination } from "../../../Components/ReusableTable/interface/IReusableTableProps.interface";
import IClientRequest from "../../Interface/ClientRequest.interface";
import { Client } from "../AxiosService";
import IUserDuplicateDto from "./interface/UserDuplicateDto.interface";

async function IsDataExist(data: IUserDuplicateDto) {
  const request: IClientRequest = {
    method: "POST",
    url: "User/IsDataExist",
    data: data,
  };

  return await Client(request);
}

async function CreateAsync(data: IUserDuplicateDto) {
  const request: IClientRequest = {
    method: "POST",
    url: "User/Enrollement",
    data: data,
  };

  return await Client(request);
}

async function UpdateAsync(data: IUserDuplicateDto) {
  const request: IClientRequest = {
    method: "POST",
    url: "User/UpdateUserAsync",
    data: data,
  };

  return await Client(request);
}

const GetUsersAsync = async (date: IPagination) => {
  const request: IClientRequest = {
    method: "POST",
    url: "User/GetUsersList",
    data: date,
  };

  return await Client(request);
};

const GetUserById = async (int: number) => {
  const request: IClientRequest = {
    method: "POST",
    url: "User/GetUserUpdateDto",
    data: int,
  };

  return await Client(request);
};

const UsageCheck = async (int: number) => {
  const request: IClientRequest = {
    method: "POST",
    url: "User/UsageCheck",
    data: int,
  };

  return await Client(request);
};

const DeleteUserAsync = async (int: number) => {
  const request: IClientRequest = {
    method: "POST",
    url: "User/DeleteUserAsync",
    data: int,
  };

  return await Client(request);
};

const UserService = {
  GetUsersAsync,
  IsDataExist,
  CreateAsync,
  UpdateAsync,
  GetUserById,
  UsageCheck,
  DeleteUserAsync,
};

export { UserService };
