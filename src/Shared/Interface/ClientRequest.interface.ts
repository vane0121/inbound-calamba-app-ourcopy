import { Method } from "axios";

interface IClientRequest {
  method: Method;
  url: string;
  data?: unknown;
}

export default IClientRequest;
