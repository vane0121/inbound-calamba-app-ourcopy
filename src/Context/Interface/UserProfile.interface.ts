export interface IUserProfile {
  jti: string;
  iat: string;
  Id: string;
  exp: number;

  UserId: string; // User's ID from the token
  DisplayName: string; // Display name (in this case, user's FirstName)
  FirstName: string; // First name of the user
  LastName: string; // Last name of the user
  EmployeeName: string; // Employee name (same as FirstName here)
  Username: string; // Username of the user
  DCName: string; // DC (Data Center) name
  Message: string; // Message indicating the status (e.g., "Login Successful")
  IsLogin: boolean; // Whether the user is logged in (true or false)
  EmployeeNumber: string; // Employee number
  Roles: string[]; // Array of roles associated with the user
}
