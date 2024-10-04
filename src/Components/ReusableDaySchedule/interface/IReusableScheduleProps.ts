interface Day {
  name: string;
  timeIn: string;
  timeOut: string;
}

interface IReusableScheduleProps {
  daysOfWeek: Day[];
  height: number;
}
export default IReusableScheduleProps;
