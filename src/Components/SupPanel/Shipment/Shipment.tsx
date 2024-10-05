import { Box, Button, Typography } from "@mui/material";
import theme from "../../../Theme/Theme";

export default function Shipment() {
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
            mt: 2,
        }}
    >
        <Box
            sx={{
                width: { xs: "100%", sm: "100%", md: "40%", xl: "40%" },
                padding: 2,
            }}
        >
            <Box mt={1}>
                <Typography
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeightRegular,
                    }}
                >
                    <strong>Inbound Shipment No.</strong>
                </Typography>
                <Typography
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeightRegular,
                    }}
                >
                    <strong>ASNPAPERTECH23102</strong>
                </Typography>
                <Typography
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeightRegular,
                    }}
                >
                    <strong>PC Weight: .0000283495 KG</strong>
                </Typography>
                <Typography
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeightRegular,
                    }}
                >
                    <strong>Case Weight: 12.5544984 KGG</strong>
                </Typography>
            </Box>
        </Box>

        {/* KAREILA MANAGEMENT CORPORATION Info */}
        <Box
            sx={{
                width: { xs: "100%", sm: "100%", md: "40%", xl: "40%" },
                padding: 2,
                mt: { xs: 2, sm: 0 },
            }}
        >
            <Typography
                sx={{
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightRegular,
                }}
            >
                <strong>KAREILA MANAGEMENT CORPORATION</strong>
            </Typography>
            <Typography
                sx={{
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightRegular,
                }}
            >
                <strong>Pallet Configuration Report</strong>
            </Typography>
            <Typography
                sx={{
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightRegular,
                }}
            >
                <strong>DC Calamba</strong>
            </Typography>
            <Typography
                sx={{
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightRegular,
                }}
            >
                <strong>IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII</strong>
            </Typography>

        </Box>

        {/* Date, Time, Mixed Y/N */}
        <Box
            sx={{
                width: { xs: "100%", sm: "100%", md: "20%", xl: "20%" },
                padding: 2,
                mt: { xs: 2, sm: 0 },
            }}
        >
            <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "column", md: "column" }}
                justifyContent="center"
                alignItems="center"
            >
                <Typography
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeightRegular,
                        width: "100%",
                    }}
                >
                    <strong>Date: 09/04/2024</strong>
                </Typography>
                <Typography
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeightRegular,
                        width: "100%",
                    }}
                >
                    <strong>Time: 10:19:12 AM</strong>
                </Typography>
                <Typography
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeightRegular,
                        width: "100%",
                    }}
                >
                    <strong>Mixed:</strong>
                </Typography>
                <Box
                    mt={2}
                    display="flex"
                    justifyContent="space-between"
                    gap={2}
                    sx={{ width: "100%" }}
                >
                    <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
                        <Button variant="contained" color="primary" fullWidth
                            sx={{
                                fontSize: { xs: "16px", sm: "20px", md: "20px" },
                                fontWeight: 700, display: "flex",
                                backgroundColor: "green",
                            }}
                        >
                            Y
                        </Button>
                        <Box sx={{ width: "10px" }} />
                        <Button variant="contained" color="primary" fullWidth
                            sx={{
                                fontSize: { xs: "16px", sm: "20px", md: "20px" },
                                fontWeight: 700, display: "flex",
                                backgroundColor: "gray",
                            }}
                        >
                            N
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}