import axios from "axios";
import IClientRequest from "../Interface/ClientRequest.interface";

export async function Client(request: IClientRequest) {
  const api = import.meta.env.VITE_API_ENDPOINT;
  console.log(api, "this is api");
  try {
    const response = await axios({
      method: request.method,
      url: `${api}/${request.url}`,
      data: request.data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API call error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}
