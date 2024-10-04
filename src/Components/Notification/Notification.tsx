import { Alert, Fade, Snackbar, styled } from "@mui/material";
import INotification from "./interface/INotification";

const WhiteAlert = styled(Alert)(({ theme }) => ({
  color: theme.palette.common.white,
}));

function Notification({
  ErrorMessage,
  IsSnackbarOpen,
  Severity,
  SuccessMessage,
  handleSnackbarClose,
}: INotification) {
  return (
    <>
      <Snackbar
        open={IsSnackbarOpen}
        autoHideDuration={3500}
        onClose={handleSnackbarClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <WhiteAlert
          variant="filled"
          onClose={handleSnackbarClose}
          severity={Severity}
          sx={{ width: "100%" }}
        >
          {Severity === "success" ? SuccessMessage : ErrorMessage}
        </WhiteAlert>
      </Snackbar>
    </>
  );
}

export default Notification;
