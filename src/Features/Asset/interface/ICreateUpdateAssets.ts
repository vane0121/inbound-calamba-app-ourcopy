import { Maybe } from "yup";

export default interface ICreateUpdateAssets {
  EquipmentId?: Maybe<number | undefined>;
  Name: string;
  Code: string;
  EquipmentTypeId: number;
  BuildingId: number;
  EquipmentStatus: string;
  PurchaseDate: string;
}
