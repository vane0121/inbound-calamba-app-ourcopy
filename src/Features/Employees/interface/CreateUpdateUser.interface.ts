export default interface ICreateUpdateUser {
  userId: number;
  employeeNumber: string;
  employmentStatus: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  designationId: number | null;
  locationId: number;
  roleIds: number[];
  teamId: number;
  skillIds: number[];
}
