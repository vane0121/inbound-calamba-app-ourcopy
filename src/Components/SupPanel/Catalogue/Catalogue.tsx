import { Box, Button, Typography } from '@mui/material'
import theme from '../../../Theme/Theme'
import { PhotoCamera } from '@mui/icons-material'
import GalleriesLogo from "../../../assets/GalleriesIcon.png";


export interface ICatalogue {
    disabledOpen: boolean
    openShipment: ()=> void
    openGallery?: ()=> void
}

export default function Catalogue({disabledOpen, openShipment}: ICatalogue) {

    const readytoOpenLabel = disabledOpen ? "Opened" : "Ready to Open"
  return (
    <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "column", md: "row" }}
        alignItems="center"
        sx={{
            backgroundColor: "#f5f5f5",
            padding: 2,
            borderRadius: 2,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
    >
        <Box
            sx={{
                width: { xs: "100%", sm: "100%", md: "30%", xl: "50%" },
                padding: 2,
            }}
        >
            <Box mt={1}>
                <Box display="flex" justifyContent="space-between">
                    <Typography
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        <strong>Door:</strong>
                    </Typography>

                    <Typography
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        <strong>1</strong>
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        <strong>Staging Area:</strong>
                    </Typography>
                    <Typography
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        <strong>1</strong>
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        <strong>Container Number:</strong>
                    </Typography>

                    <Typography
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        <strong>NQS619</strong>
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        <strong>Seal Number:</strong>
                    </Typography>

                    <Typography
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        <strong>SEA-L875</strong>
                    </Typography>
                </Box>
            </Box>
        </Box>
        {/* button Opened and Upload Photos */}
        <Box
            sx={{
                width: { xs: "100%", sm: "100%", md: "60%", xl: "40%" },
                padding: 2,
                mt: { xs: 2, sm: 0 },
            }}
        >
            <Button
                // disabled={disabledOpen}
                onClick={openShipment}
                variant="contained"
                sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: { xs: "16px", sm: "20px", md: "20px" },
                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                    color: "white",
                    width: { xs: "100%", sm: "100%", md: "50%", xl: "50%" },
                    mx: "auto",
                }}
            >
                { readytoOpenLabel }
            </Button>
            <Box display="flex" justifyContent="center" mt={1} gap={2}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PhotoCamera />}
                    sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: { xs: "16px", sm: "20px", md: "20px" },
                        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                        width: { xs: "100%", sm: "100%", md: "50%", xl: "50%" },
                    }}
                >
                    Upload Photos
                </Button>
            </Box>
        </Box>
        {/* Galleries clickable typography */}
        <Box
            sx={{
                width: { xs: "100%", sm: "100%", md: "10%", xl: "10%" },
                padding: 2,
                mt: { xs: 2, sm: 0 },
            }}
        >
            <Box textAlign="center">
                <Typography
                    sx={{
                        fontSize: { xs: "16px", sm: "20px", md: "20px" },
                        color: "#0070C0",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: theme.typography.fontWeightRegular,
                    }}
                >
                    <strong>Galleries</strong>
                    <img
                        src={GalleriesLogo}
                        alt="Galleries Icon"
                        style={{ marginLeft: "8px", width: "24px", height: "24px" }}
                    />
                </Typography>
            </Box>
        </Box>
    </Box>
  )
}