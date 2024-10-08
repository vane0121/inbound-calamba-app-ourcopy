import { Box, Button, IconButton, Typography } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useContext, useState } from "react";
import { InboundContext } from "../../../Features/SupervisorControlPanel/SupervisorControlPanel";
import Galleries from "../../Galleries";
import theme from "../../../Theme/Theme";
import { red } from "@mui/material/colors";

export default function SkuScan() {
const context = useContext(InboundContext)

if (!context) {
    throw new Error("ChildComponent must be used within an ExDataProvider");
}

const {takePhoto} = context

const [isPhotoOpen, setIsPhotoOpen] = useState(false)

const call=()=>{
    const newValue = true//!isPhotoOpen
    takePhoto(newValue)
    setIsPhotoOpen(newValue)
}

  return (
    <>
        <Box
            sx={{
                width: { xs: "100%", sm: "100%", md: "100%", xl: "50%" },
                padding: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: 'solid 0px #000',
                cursor:'pointer'
            }}
            
        >
            {/* 3rd column, 3rd row, 2nd column */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="auto"
                p={1}
                borderRadius={4}
                sx={{
                        width:{ sm: "100%", xl: "50%" },
                        border:'solid 0px green'
                }}
            >
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={call}
                >
                    <QrCodeScannerIcon
                        sx={{
                            fontSize: { xs: "16px", sm: "20px", md: "40px" },
                            color: "white",
                            mr: 1,
                        }}
                        
                    />
                    <Typography
                            sx={{
                                fontSize: { xs: "16px", sm: "20px", md: "20px" },
                            }}
                            color="white"
                            fontWeight={700}
                        >
                            Scan SKU
                        </Typography>
                </Button>
            </Box>
        </Box>
        {/* <Galleries title={'Upload Photos'} open={false} onClose={()=> setIsPhotoOpen(false)}/> */}
    </>
  )
}