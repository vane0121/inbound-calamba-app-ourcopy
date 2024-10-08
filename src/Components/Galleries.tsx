import {
  Box,
  Modal,
  Slide,
  Typography,
  Button,
  Divider,
  IconButton,
  DialogProps,
} from "@mui/material";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";

interface IGalleriesModalProps extends DialogProps {
  onClose?: () => void;
  open: boolean;
  md?: number;
  sm?: number;
  xs?: number;
  xl?: number;
  // imageList: IImage[];
  title: string;
}

function Galleries({
  open,
  onClose,
  sm,
  xs,
  md,
  xl,
  title,
}: IGalleriesModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click if it exists
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      // Do something with the selected file, like upload or preview
      console.log("Selected file:", file);
    }
  };

  return (
    <>
      <Box>
        <Modal
          closeAfterTransition
          open={true}
          onClose={(_event, reason) => {
            if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
              onClose();
            }
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Horizontal centering only (if needed)
              alignItems: "center", // Align items to the top
              height: "100vh", // Take up the full height of the viewport
            }}
          >
            <Slide direction="down" in={open} mountOnEnter unmountOnExit>
              <Box
                sx={{
                  width: { xs: xs, sm: sm, md: md, xl: xl },
                  transform: "translateX(-50%)",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                  border: "0px solid #000",
                  borderRadius: "30px",
                  boxShadow: 50,
                  pb: 1,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    pl: 5,
                    pt: 3,
                  }}
                >
                  {/* Left line */}
                  <Box
                    sx={{
                      flexGrow: 1, // Allow the left line to grow
                      height: "6px",
                      backgroundColor: "white",
                      borderRadius: "50px",
                      ml: 3.5, // Margin to separate the oval from the title
                      mr: 2, // Margin to separate the oval from the title
                    }}
                  />

                  {/* Title */}
                  <Typography
                    variant="h5"
                    color={"primary.main"}
                    fontWeight="700"
                    sx={{
                      textAlign: "center",
                      whiteSpace: "nowrap", // Prevent title wrapping
                      flexShrink: 0, // Prevent the title from shrinking
                      mx: 2, // Margin to give space on left and right
                      zIndex: 1, // Ensure the title is above the lines
                    }}
                  >
                    {title}
                  </Typography>

                  {/* Right line */}
                  <Box
                    sx={{
                      flexGrow: 1, // Allow the right line to grow
                      height: "6px",
                      backgroundColor: "white",
                      borderRadius: "50px",
                      ml: 2,
                      mr: 8, // Margin to separate the line from the title
                    }}
                  />

                  {/* Close button */}
                  <IconButton
                    size="small"
                    onClick={onClose}
                    sx={{
                      color: "black",
                      position: "absolute",
                      right: 16,
                      top: 16,
                      "&:hover": {
                        backgroundColor: "white",
                        color: "primary.main",
                      },
                      borderRadius: "80px",
                      mb: 1,
                    }}
                    aria-label="close"
                    color="info"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Divider
                  sx={{
                    width: "90%",
                    mt: 1,
                    mx: "auto",
                  }}
                />
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center" // This ensures it takes up the full viewport height for vertical centering
                >
                  {/* <ImageList
                    sx={{
                      width: 600,
                      gap: 20,
                      height: "38vh", // Set a fixed height for the container
                      overflowY: imageList.length > 0 ? "auto" : "hidden", // Enable vertical scrolling
                      padding: 2,
                    }}
                    cols={imageList.length > 0 ? 3 : 1}
                    rowHeight={164}
                  > */}
                    <></>
                    {/* {{imageList && imageList.length > 0 ? (
                      imageList.map((item, index) => (
                        <ImageListItem
                          key={index}
                          sx={{
                            border: "3px solid #515151", // Subtle border around the image card
                            m: 1,
                            borderRadius: "12px", // Rounded corners
                            overflow: "hidden", // Makes sure the image stays contained
                            boxShadow: "0px 4px 10px #515151", // Shadow with more depth for better effect
                            position: "relative", // Ensure positioning is relative for child elements
                            transition:
                              "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition effect
                            "&:hover": {
                              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Increased shadow on hover
                            },
                            "&:hover img": {
                              transform: "scale(1.05)", // Subtle zoom on image hover to prevent excessive overflow
                            },
                          }}
                        >

                        <Box
                            style={{ position: "relative", overflow: "hidden" }}
                          >
                            <img
                              src={item.ImageName}
                              alt={"test"}
                              loading="lazy"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </Box>

                          <Box
                            sx={{
                              borderRadius: "10px", // Make the title box oval
                              backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
                              padding: "5px", // Add padding to the title
                              textAlign: "center",
                              mt: 1, // Margin above the title to create space between the image and title
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: "primary.main",
                                fontWeight: 500,
                                fontFamily: "Roboto, sans-serif",
                              }}
                            >
                              {item.ImageType}
                            </Typography>
                          </Box>
                        </ImageListItem>
                      ))
                    ) : (
                      <Box
                        sx={{
                          display: "flex", // Enables flexbox
                          flexDirection: "column", // Align items vertically (image and text)
                          justifyContent: "center", // Center the content horizontally
                          alignItems: "center", // Center the content vertically
                          height: "40vh", // Set the height to full viewport for proper centering
                        }}
                      >
                        <img
                          src={placeholderImage} // Replace with your placeholder image path
                          alt="Placeholder"
                          style={{
                            width: "50%", // Scale it down to half the screen width
                            height: "auto", // Maintain aspect ratio
                            maxWidth: "500px", // Ensure it doesn't get too big
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "primary.main",
                            fontWeight: 700,
                            marginTop: 2,
                            textAlign: "center", // Ensure the text is centered
                          }}
                        >
                          No Image Available
                        </Typography>
                      </Box>
                    )} */}
                  {/* </ImageList> */}
                </Box>
                <Box display="flex" justifyContent="right" paddingRight={5}>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment" // Use this to open the camera by default on mobile
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      borderRadius: 7,
                      marginTop: 3,
                      mb: 2,
                      background: "primary.main",
                      fontWeight: "bold",
                      letterSpacing: 2,
                      width: "33%", // Keep this if you want the button to take 50% width of the container
                      height: "40px",
                    }}
                    onClick={handleButtonClick}
                  >
                    <AddAPhotoIcon sx={{ mr: 1 }} />{" "}
                    {/* Add margin-right to the icon */}
                    Upload Photos
                  </Button>
                </Box>
              </Box>
            </Slide>
          </Box>
        </Modal>
      </Box>
    </>
  );
}

export default Galleries;
