import { Alert, Fade, Snackbar, styled } from '@mui/material';
import IAlert from './Interface/Notification.Interface';

const WhiteAlert = styled(Alert)(({ theme }) => ({
  color: theme.palette.common.white,
}));


function Notice({ ErrorMessage, IsSnackbarOpen, Severity, SuccessMessage, handleSnackbarClose }: IAlert) {

  return (
    <>
      <Snackbar
        open={IsSnackbarOpen}
        autoHideDuration={3500}
        onClose={handleSnackbarClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <WhiteAlert variant="filled" onClose={handleSnackbarClose} severity={Severity} sx={{ width: '100%' }}>
          {Severity === "success" ? SuccessMessage : ErrorMessage}
        </WhiteAlert>
      </Snackbar>
    </>
  )
}

export default Notice
