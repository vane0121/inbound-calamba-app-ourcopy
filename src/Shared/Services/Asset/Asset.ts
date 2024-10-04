import { IPagination } from "../../../Components/ReusableTable/interface/IReusableTableProps.interface";
import ICreateUpdateAssets from "../../../Features/Asset/interface/ICreateUpdateAssets";
import IClientRequest from "../../Interface/ClientRequest.interface";
import { Client } from "../AxiosService";

const GetEquipmentTypesAsync = async () => {
  const request: IClientRequest = {
    method: "GET",
    url: "equipmentTypes/GetEquipmentTypesAsync",
  };

  return await Client(request);
};

const GetEquipmentList = async (data: IPagination) => {
  const request: IClientRequest = {
    method: "POST",
    url: "equipment/GetEquipmentList",
    data: data,
  };

  return await Client(request);
};

const CreateEquipmentAsync = async (data: ICreateUpdateAssets) => {
  const request: IClientRequest = {
    method: "POST",
    url: "equipment/CreateEquipmentAsync",
    data: data,
  };

  return await Client(request);
};

const UpdateEquipmentAsync = async (id: number, data: ICreateUpdateAssets) => {
  const request: IClientRequest = {
    method: "PUT",
    url: `equipment/UpdateEquipmentAsync?id=${id}`,
    data: data,
  };

  return await Client(request);
};

const GetEquipmentAsync = async (id: number) => {
  const request: IClientRequest = {
    method: "POST",
    url: `equipment/GetEquipmentAsync?id=${id}`,
  };

  return await Client(request);
};

const DeleteEquipmentAsync = async (id: number) => {
  const request: IClientRequest = {
    method: "DELETE",
    url: `equipment/DeleteEquipmentAsync?id=${id}`,
  };

  return await Client(request);
};
const IsDataExist = async (data: ICreateUpdateAssets) => {
  const request: IClientRequest = {
    method: "POST",
    url: "equipment/IsDataExist",
    data: data,
  };

  return await Client(request);
};

const equipmentService = {
  GetEquipmentTypesAsync,
  CreateEquipmentAsync,
  UpdateEquipmentAsync,
  GetEquipmentList,
  GetEquipmentAsync,
  DeleteEquipmentAsync,
  IsDataExist,
};
export { equipmentService };
