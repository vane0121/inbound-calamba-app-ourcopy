import { Box, Button, Typography } from "@mui/material";
import theme from "../../../Theme/Theme";
import BarCode from "../../BarCode/BarCode";
import TimeClock from "../../TimeClock/TimeClock";

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
                border:'solid 0px red'
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
                border:'solid 0px red'
            }}
        >
            <Typography textAlign={'center'}
                sx={{
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightRegular,
                }}
            >
                <strong>KAREILA MANAGEMENT CORPORATION</strong>
            </Typography>
            <Typography textAlign={'center'}
                sx={{
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightRegular,
                }}
            >
                <strong>Pallet Configuration Report</strong>
            </Typography>
            <Typography textAlign={'center'}
                sx={{
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightRegular,
                }}
            >
                <strong>DC Calamba</strong>
            </Typography>
            <BarCode codeValue="878979798789" width={2} height={10} showDigits={false} alignBarcode="center"/>

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
                alignItems="center"
                sx={{border:'solid 0px grey'}}
            >
                <Typography textAlign={'right'}
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeightRegular,
                        width: "100%",
                    }}
                >
                    <strong>Date: 09/04/2024</strong>
                </Typography>
                <Box display={'flex'} flexDirection={'row'} justifyItems={'flex-end'}
                    sx={{
                        width:'100%',
                        border:'solid 0px blue'
                    }}
                >
                    <Typography textAlign={'right'}
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightRegular,
                            width: "100%",
                        }}
                    >
                        <strong>Time: </strong>
                    </Typography>
                    <TimeClock/>
                </Box>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} alignItems={'center'}    
                    sx={{
                        gap: '5px',
                        width:'100%',
                        border:'solid 0px red'
                        }}
                    >
                    <Typography
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightRegular,
                            border:'solid 0px red'
                        }}
                    >
                        <strong>Mixed:</strong>
                    </Typography>
                    <Button variant="contained" color="primary" 
                        sx={{
                            fontSize: { xs: "16px", sm: "20px", md: "20px" },
                            fontWeight: 700, display: "flex",
                            backgroundColor: "green",
                            width:{ xs: "100%", sm: "100%", md: "20%", xl: "20%" },
                        }}
                    >
                        Y
                    </Button>
                    <Button variant="contained" color="primary"
                    
                        sx={{
                            fontSize: { xs: "16px", sm: "20px", md: "20px" },
                            fontWeight: 700, display: "flex",
                            backgroundColor: "gray",
                            width:{ xs: "100%", sm: "100%", md: "20%", xl: "20%" },
                        }}
                    >
                        N
                    </Button>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}