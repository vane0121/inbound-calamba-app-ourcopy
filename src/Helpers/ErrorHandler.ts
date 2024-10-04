import axios from "axios";

export function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const err = error.response;

    if (Array.isArray(err?.data.errors)) {
      for (const val of err.data.errors) {
        console.log(val.description);
      }
    } else if (typeof err?.data.errors == "object") {
      for (const e in err?.data.errors) {
        console.log(err?.data.errors[e][0]);
      }
    } else if (err?.data) {
      console.log(err?.data);
    } else if (err?.status == 401) {
      console.log("please login");
      window.history.pushState({}, "LoginPage", "/Login");
    } else if (err) {
      console.log(err?.data);
    }
  }
}
