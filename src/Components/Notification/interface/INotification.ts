import { AlertColor, SnackbarProps } from "@mui/material";

interface INotification extends SnackbarProps {
  IsSnackbarOpen: boolean;
  ErrorMessage: string;
  SuccessMessage: string;
  Severity: AlertColor;
  handleSnackbarClose: () => void;
}

export default INotification;
