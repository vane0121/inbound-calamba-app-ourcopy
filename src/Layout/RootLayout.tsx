import { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import { useAuth } from "../Context/UserContext";
import { AlertColor } from "@mui/material";
import Login from "../Features/Login/Login";
import Notice from "../Components/Notice/Notice";

export default function RootLayout() {
  const { IsLoggedIn, message } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>();

  useEffect(() => {
    if (IsLoggedIn() && message != "") {
      setSeverity("success");
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 700);
    }
  }, [IsLoggedIn]);

  return (
    <>
      {IsLoggedIn() ? <Header /> : <Login />}

      <Notice
        ErrorMessage={message}
        Severity={severity ?? "info"}
        IsSnackbarOpen={isOpen}
        SuccessMessage={message}
        handleSnackbarClose={() => setIsOpen(false)}
      />
    </>
  );
}
