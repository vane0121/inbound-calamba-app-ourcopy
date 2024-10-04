import { Maybe } from "yup";

export default interface ICreateUpdateTeams {
  TeamId?: Maybe<number | undefined>;
  Name: string;
  ColorCode: string;
  Area: string;
  LocationId: number;
  ScheduleDateId: number;
}
