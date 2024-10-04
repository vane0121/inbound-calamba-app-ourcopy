export default interface IUserDuplicateDto {
  UserId: number;
  EmployeeNumber: string;
  FirstName: string;
  LastName: string;
  MiddleName?: string | null;
}
