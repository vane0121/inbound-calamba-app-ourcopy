import {
    Badge,
    badgeClasses,
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import theme from "../../Theme/Theme";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useState } from "react";
import IFootprintData from "./Interface/Footprint.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import SkuPanel from "../../Components/SupPanel/SkuPanel/SkuPanel";
import Catalogue from "../../Components/SupPanel/Catalogue/Catalogue";
import Shipment from "../../Components/SupPanel/Shipment/Shipment";

const schema = Yup.object().shape({
    nonConformingPallet: Yup.string().optional(),
});

const MyHubButton: React.FC = () => {
    const handleMyHubClick = () => {
        console.log("Test component clicked!");
    };

    return (
        <Button
            onClick={handleMyHubClick}
            sx={{
                splay: "flex",
                alignItems: "center",
                border: "2px solid #ccc",
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                width: { xs: "100%", sm: "90%", md: "90%" },
                height: "auto",
                backgroundColor: "white",
                marginTop: "20px",
                textTransform: "none",
                overflow: "hidden",
                boxSizing: "border-box",
            }}
        >
            <IconButton
                sx={{
                    color: "white",
                    marginRight: 2,
                    padding: 0,
                    backgroundColor: "transparent",
                    marginLeft: "10px",
                    marginTop: "3px",
                    marginBottom: "3px",
                    "&:hover": {
                        backgroundColor: "transparent",
                    },
                    width: { xs: "40px", sm: "50px", md: "60px" },
                    height: { xs: "40px", sm: "50px", md: "60px" },
                }}
                aria-label="My Hub"
            >
                <Badge
                    overlap="circular"
                    badgeContent={3}
                    color="error"
                    variant="standard"
                    sx={{
                        [`& .${badgeClasses.standard}`]: {
                            outline: `4px solid ${theme.palette.primary.light}`,
                        },
                    }}
                >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{
                            outline: `5px solid ${theme.palette.warning.main}`,
                        }}
                    >
                        <LocalShippingIcon
                            sx={{
                                fontSize: { xs: 24, sm: 28, md: 32, lg: 20, xl: 16 },
                                color: "#525252",
                            }}
                        />
                    </IconButton>
                </Badge>
            </IconButton>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flexGrow: 1,
                }}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        textAlign: "left",
                        fontWeight: 700,
                        color: "primary.main",
                        fontSize: { xs: "16px", sm: "20px", md: "20px", xl: "24px" },
                        // lineHeight: { xs: "20px", sm: "24px", md: "28px" },
                    }}
                >
                    My Hub
                </Typography>
            </Box>
        </Button>
    );
};

const scrollbarStyles = {
    "&::-webkit-scrollbar": {
        width: "10px",
        height: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#ccc",
        borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "#fff",
    },
};

function SupervisorControlPanel() {
    const [formValues, setFormValues] = useState({
        unitPerCase: "",
        layer: "",
        tile: "",
        casePerPallet: "",
        palletWeight: "",
        totalCases: "",
        nonConformingPallet: "",
    });

    const [openShipment, setOpenShipment] = useState(false)

    const OpenShipment = ()=> {
        setOpenShipment(prev=> !prev)
    }

    return (
        <Box
            sx={{
                padding: { xs: "8px", sm: "16px" },
                minHeight: "100vh",
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    color: "#1A237E",
                    marginBottom: "24px",
                }}
            >
                Supervisor’s Control Panel
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "column", md: "row" },
                    gap: 1,
                }}
            >
                {/* 1st column */}
                <Box
                    sx={{
                        flex: { xs: "1 1 auto", sm: "1 1 auto", md: "1 1 15%" },
                        maxHeight: "710px",
                        overflowY: "auto",
                        boxSizing: "border-box",
                        ...scrollbarStyles,
                        flexGrow: 1,
                    }}
                >
                    <Box sx={{ height: { xs: "100px", sm: "500px", md: "950px" } }}>
                        <MyHubButton />
                    </Box>
                </Box>
                {/* 2nd column */}
                <Box
                    sx={{
                        flex: { xs: "1 1 auto", sm: "1 1 auto", md: "1 1 15%" },
                        maxHeight: "710px",
                        overflowY: "auto",
                        boxSizing: "border-box",
                        flexGrow: 1,
                    }}
                >
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            color: "primary.main",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                            marginBottom: "16px",
                            fontSize: { xs: "16px", sm: "20px", md: "24px" },
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "16px", sm: "20px", md: "24px" },
                                height: { xs: "16px", sm: "20px", md: "24px" },
                                borderRadius: "50%",
                                backgroundColor: "green",
                                marginRight: "8px",
                            }}
                        />
                        My Queue
                    </Typography>
                    <Button
                        onClick={OpenShipment}
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "auto",
                            marginRight: "auto",
                            fontSize: { xs: "16px", sm: "16px", md: "16px", xl: "24px" },
                            borderRadius: "25px",
                            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                            backgroundColor: "white",
                            color: "primary.main",
                            padding: "8px 16px",
                        }}
                    >
                        Go to Door 1
                    </Button>
                </Box>
                {/* 3rd column */}
                <Box
                    sx={{
                        flex: { xs: "1 1 auto", sm: "1 1 auto", md: "1 1 70%" },
                        maxHeight: "1500px",
                        overflowY: "auto",
                        boxSizing: "border-box",
                        flexGrow: 1,
                    }}
                >
                    {/* Directly paste the content here */}
                    <Box sx={{ width: "100%" }}>
                        {/* 3rd column, 1st row */}
                        <Catalogue 
                            disabledOpen={openShipment}
                            openShipment={OpenShipment}/>

                        {/* 3rd column, 2nd row */}
                        {
                            openShipment && <Shipment/>
                        }

                        {
                            openShipment && 
                            <Stack display={'flex'} sx={{gap:'5px'}}>
                                <SkuPanel/>
                                <SkuPanel/>
                            </Stack>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default SupervisorControlPanel;