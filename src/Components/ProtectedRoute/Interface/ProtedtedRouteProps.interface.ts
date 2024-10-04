import Roles from "../../../Shared/Enum/Roles.enum";

export default interface IProtectedRouteProps {
  Element: JSX.Element;
  AllowedRoles: Roles[];
}
