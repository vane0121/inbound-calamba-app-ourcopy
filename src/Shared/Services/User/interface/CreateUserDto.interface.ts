import { ValidationSchemaType } from "../../../../Features/Employees/Employees";

export default interface ICreateUserDto extends ValidationSchemaType {
  UserId: number;
  SkillIds: number[];
  RoleIds: number[];
}
