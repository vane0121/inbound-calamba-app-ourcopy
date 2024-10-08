import { Box, Typography } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

export default function SkuScan() {
  return (
    <>
        <Box
            sx={{
                width: { xs: "100%", sm: "100%", md: "100%", xl: "50%" },
                padding: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: 'solid 0px #000'
            }}
        >
            {/* 3rd column, 3rd row, 2nd column */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="auto"
                bgcolor="gray"
                p={1}
                borderRadius={4}
                sx={{
                        width:{ sm: "100%", xl: "50%" },
                        border:'solid 0px green'
                }}
            >
                <QrCodeScannerIcon
                    sx={{
                        fontSize: { xs: "16px", sm: "20px", md: "40px" },
                        color: "white",
                        mr: 1,
                    }}
                />
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{

                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { xs: "16px", sm: "20px", md: "20px" },
                        }}
                        color="white"
                        fontWeight={700}
                    >
                        Scan SKU
                    </Typography>

                </Box>
            </Box>
        </Box>
    </>
  )
}