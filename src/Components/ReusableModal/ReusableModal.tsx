import {
  Box,
  Divider,
  IconButton,
  Modal,
  Slide,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IReusableModalProps from "./interface/IReusableModalProps";

function ReusableModal({
  open,
  onClose,
  children,
  title,
  sm,
  xs,
  md,
  xl,
}: IReusableModalProps) {
  return (
    <>
      <Box>
        <Modal
          closeAfterTransition
          open={open}
          onClose={(_event, reason) => {
            if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
              onClose();
            }
          }}
        >
          {/* Wrapper for modal content to apply positioning */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Horizontal centering only (if needed)
              alignItems: "flex-start", // Align items to the top
              height: "100vh", // Take up the full height of the viewport
              paddingTop: {
                xs: "58px", // Small padding for extra small screens
                sm: "65px", // Slightly more padding for small screens
                md: "80px", // Medium padding for medium screens
                lg: "75px", // Larger padding for large screens
                xl: "4.1%", // Use percentage for extra large screens
              }, // Add the top margin (or padding) you want
            }}
          >
            {/* Slide animation from top */}
            <Slide direction="down" in={open} mountOnEnter unmountOnExit>
              <Box
                sx={{
                  width: { xs: xs, sm: sm, md: md, xl: xl },
                  transform: "translateX(-50%)",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                  border: "0px solid #000",
                  borderRadius: "30px",
                  boxShadow: 24,
                  p: 4,
                  position: "relative",
                }}
              >
                {/* Modal Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    color="primary.main"
                    fontWeight="bold"
                  >
                    {title}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={onClose}
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "primary.main",
                      },
                      mb: 1,
                    }}
                    aria-label="close"
                    color="info"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ mb: 2, mt: 1 }} />

                {/* Modal Content */}
                {children}
              </Box>
            </Slide>
          </Box>
        </Modal>
      </Box>
    </>
  );
}

export default ReusableModal;
