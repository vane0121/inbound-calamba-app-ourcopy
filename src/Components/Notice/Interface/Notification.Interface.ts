import { AlertColor, SnackbarProps } from "@mui/material";

interface IAlert extends SnackbarProps {
  IsSnackbarOpen: boolean;
  ErrorMessage: string;
  SuccessMessage: string;
  Severity: AlertColor;
  handleSnackbarClose: () => void;
}

export default IAlert;
