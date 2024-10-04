import {
    Badge,
    badgeClasses,
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import theme from "../../Theme/Theme";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GalleriesLogo from "../../assets/GalleriesIcon.png";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ReusableTextField from "../../Components/ReusableTextField/ReusableTextField";
import { useState } from "react";
import IFootprintData from "./Interface/Footprint.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";

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

// Define your headers and data
const headers = [
    "Unit per Case",
    "Layer",
    "Tie",
    "Case per Pallet",
    "Pallet Weight",
    "Total Cases",
];

const data = [
    {
        col1: "10",
        col2: "3",
        col3: "4",
        col4: "12",
        col5: "170.6539808 KG",
        col6: (
            <LockOpenIcon
                sx={{ fontSize: 24, color: "secondary.main", textAlign: "center" }}
            />
        ),
    },
];

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

    const {
        getValues,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<IFootprintData>({ resolver: yupResolver(schema) });

    // Handler to update the state when the input changes
    const handleChange =
        (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setFormValues({
                ...formValues,
                [name]: event.target.value,
            });
        };

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
                                    variant="contained"
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 700,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: { xs: "16px", sm: "20px", md: "20px" },
                                        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                                        backgroundColor: "gray",
                                        color: "white",
                                        width: { xs: "100%", sm: "100%", md: "50%", xl: "50%" },
                                        mx: "auto",
                                    }}
                                >
                                    Opened
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

                        {/* 3rd column, 2nd row */}
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


                        {/* 3rd column, 3rd row */}
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
                                    width: { xs: "100%", sm: "100%", md: "20%", xl: "20%" },
                                    padding: 2,
                                }}
                            >
                                <Box mt={1}>
                                    {/* 3rd column, 3rd row, 1st column */}
                                    <Box display="flex" flexDirection="column">
                                        <Typography
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                fontWeight: theme.typography.fontWeightRegular,
                                            }}
                                        >
                                            <strong>SKU Number:</strong>
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "green",
                                                fontWeight: theme.typography.fontWeightRegular,
                                            }}
                                        >
                                            <strong> 10367</strong>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "100%", md: "25%", xl: "25%" },
                                    padding: 2,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {/* 3rd column, 3rd row, 2nd column */}
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    width="20%"
                                    height="auto"
                                    bgcolor="gray"
                                    p={1}
                                    borderRadius={4}
                                    sx={{
                                        width: { xs: "120px", sm: "150px", md: "180px" },
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
                                            Scan To
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: "16px", sm: "20px", md: "20px" },
                                            }}
                                            color="white"
                                            fontWeight={700}
                                        >
                                            Verify SKU
                                        </Typography>

                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "100%", md: "25%", xl: "25%" },
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
                                            <strong>SKU Description</strong>
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: theme.typography.fontWeightRegular,
                                            }}
                                        >
                                            <strong>SMART SHOPPER</strong>
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                fontWeight: theme.typography.fontWeightRegular,
                                            }}
                                        >
                                            <strong>UPC:</strong>
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: theme.typography.fontWeightRegular,
                                            }}
                                        >
                                            <strong>4806506156502</strong>
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                fontWeight: theme.typography.fontWeightRegular,
                                            }}
                                        >
                                            <strong>Vendor:</strong>
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: theme.typography.fontWeightRegular,
                                            }}
                                        >
                                            <strong>1068</strong>
                                        </Typography>
                                    </Box>

                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "100%", md: "25%", xl: "25%" },
                                    padding: 2,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Box mt={1}>
                                    <Typography
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            fontWeight: theme.typography.fontWeightRegular,
                                        }}
                                    >
                                        <strong>IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII</strong>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* table*/}
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
                                    width: { xs: "100%", sm: "100%", md: "100%", xl: "100%" },
                                    padding: 2,
                                }}
                            >
                                <Box mt={1}>
                                    {/* Your content here */}
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead
                                                sx={{
                                                    backgroundColor: "primary.main",
                                                }}
                                            >
                                                <TableRow>
                                                    {headers.map((header) => (
                                                        <TableCell
                                                            key={header}
                                                            sx={{
                                                                color: "white",
                                                                fontWeight: 700,
                                                                fontSize: { xs: "16px", sm: "20px", md: "20px" },
                                                            }}
                                                        >
                                                            {header}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell sx={{ color: "primary.main", textAlign: 'center', fontSize: { xs: "16px", sm: "20px", md: "20px" } }}>{row.col1}</TableCell>
                                                        <TableCell sx={{ color: "primary.main", textAlign: 'center', fontSize: { xs: "16px", sm: "20px", md: "20px" } }}>{row.col2}</TableCell>
                                                        <TableCell sx={{ color: "primary.main", textAlign: 'center', fontSize: { xs: "16px", sm: "20px", md: "20px" } }}>{row.col3}</TableCell>
                                                        <TableCell sx={{ color: "primary.main", textAlign: 'center', fontSize: { xs: "16px", sm: "20px", md: "20px" } }}>{row.col4}</TableCell>
                                                        <TableCell sx={{ color: "primary.main", textAlign: 'center', fontSize: { xs: "16px", sm: "20px", md: "20px" } }}>{row.col5}</TableCell>
                                                        <TableCell sx={{ fontSize: { xs: "16px", sm: "20px", md: "20px" } }}>{row.col6}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </Box>
                        {/* textfield for Footprint */}
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
                                    width: { xs: "100%", sm: "100%", md: "100%", xl: "100%" },
                                    padding: 2,
                                }}
                            >
                                <Box mt={1}>
                                    {/* Your content here */}
                                    <Box display="flex" gap={2} mt={2}>
                                        <ReusableTextField
                                            register={register}
                                            name="unitPerCase"
                                            label="Unit per Case"
                                            type="text"
                                            value={formValues.unitPerCase}
                                            onChange={handleChange("unitPerCase")}
                                            fullWidth={false}
                                            disabled={true}
                                        />

                                        <ReusableTextField
                                            register={register}
                                            name="layer"
                                            label="Layer"
                                            type="text"
                                            value={formValues.layer}
                                            onChange={handleChange("layer")}
                                            fullWidth={false}
                                            disabled={true}
                                        />

                                        <ReusableTextField
                                            register={register}
                                            name="tile"
                                            label="Tile"
                                            type="text"
                                            value={formValues.tile}
                                            onChange={handleChange("tile")}
                                            fullWidth={false}
                                            disabled={true}
                                        />

                                        <ReusableTextField
                                            register={register}
                                            name="casePerPallet"
                                            label="Case per Pallet "
                                            type="text"
                                            value={formValues.casePerPallet}
                                            onChange={handleChange("casePerPallet")}
                                            fullWidth={false}
                                            disabled={true}
                                        />
                                        <ReusableTextField
                                            register={register}
                                            name="palletWeight"
                                            label="Pallet Weight"
                                            type="text"
                                            value={formValues.palletWeight}
                                            onChange={handleChange("palletWeight")}
                                            fullWidth={false}
                                            disabled={true}
                                        />
                                        <ReusableTextField
                                            register={register}
                                            name="totalCases"
                                            label="TotalCases"
                                            type="text"
                                            value={formValues.totalCases}
                                            onChange={handleChange("totalCases")}
                                            fullWidth={false}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* Add Expiration Date, Non-Confirming and Textfield */}
                        <Box display="flex" justifyContent="space-between" mt={2} gap={2} sx={{ marginRight: "20px" }}>
                            <Box flexGrow={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon sx={{ fontSize: 24 }} />}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 700,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: { xs: "16px", sm: "20px", md: "20px" },
                                        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                                        backgroundColor: "primary.main",
                                        color: "white",
                                    }}
                                >
                                    Add Expiration Date/s
                                </Button>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontWeight: theme.typography.fontWeightRegular,

                                    }}
                                >
                                    <strong>Non-Conforming Pallet:</strong>
                                </Typography>
                                <ReusableTextField
                                    register={register}
                                    name="nonConformingPallet"
                                    label=""
                                    type="text"
                                    value={formValues.nonConformingPallet}
                                    onChange={handleChange("nonConformingPallet")}
                                    fullWidth={false}
                                />
                            </Box>
                        </Box>

                        {/* Add Expiration Data form */}
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
                                    width: { xs: "100%", sm: "100%", md: "50%", xl: "50%" },
                                    padding: 2,
                                }}
                            >
                                <Box mt={1}>
                                    {/* Your content here */}
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                fontWeight: theme.typography.fontWeightRegular,

                                            }}
                                        >
                                            <strong>September 28, 2027:</strong>
                                        </Typography>
                                        <ReusableTextField
                                            register={register}
                                            name="nonConformingPallet"
                                            label=""
                                            type="text"
                                            value={formValues.nonConformingPallet}
                                            onChange={handleChange("nonConformingPallet")}
                                            fullWidth={false}
                                        />
                                    </Box>

                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                fontWeight: theme.typography.fontWeightRegular,

                                            }}
                                        >
                                            <strong>September 28, 2027:</strong>
                                        </Typography>
                                        <ReusableTextField
                                            register={register}
                                            name="nonConformingPallet"
                                            label=""
                                            type="text"
                                            value={formValues.nonConformingPallet}
                                            onChange={handleChange("nonConformingPallet")}
                                            fullWidth={false}
                                        />
                                    </Box>

                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "100%", md: "50%", xl: "50%" },
                                    padding: 2,
                                }}
                            >
                                <Box mt={1}>
                                    {/* Your content here */}
                                    <Box display="flex" justifyContent="flex-end" mt={2} sx={{ border: 'solid 0px red' }}>
                                        <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100px', border: 'solid 0px violet' }}>
                                            <Typography
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    fontWeight: theme.typography.fontWeightRegular,
                                                }}
                                            >
                                                <strong>On Pallet</strong>
                                            </Typography>
                                            <Box display="flex" flexDirection="column" alignItems="center" mt={1} gap={2}>
                                                <Button variant="contained" color="primary" fullWidth
                                                    sx={{
                                                        fontSize: { xs: "16px", sm: "20px", md: "20px" }, fontWeight: 700, display: "flex", justifyContent: "center", alignItems: "center",
                                                    }}
                                                >
                                                    Y
                                                </Button>
                                                <Button variant="contained" color="primary" fullWidth
                                                    sx={{
                                                        fontSize: { xs: "16px", sm: "20px", md: "20px" }, fontWeight: 700, display: "flex", justifyContent: "center", alignItems: "center",
                                                    }}
                                                >
                                                    N
                                                </Button>
                                            </Box>
                                        </Box>

                                        <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100px', border: 'solid 0px violet' }}>
                                            <Typography
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    fontWeight: theme.typography.fontWeightRegular,
                                                }}
                                            >
                                                <strong>Case Pallet</strong>
                                            </Typography>
                                            <Box display="flex" flexDirection="column" alignItems="center" mt={1} gap={2}>
                                                <Button variant="contained" color="primary" fullWidth
                                                    sx={{
                                                        fontSize: { xs: "16px", sm: "20px", md: "20px" }, fontWeight: 700, display: "flex", justifyContent: "center", alignItems: "center",
                                                    }}
                                                >
                                                    Y
                                                </Button>
                                                <Button variant="contained" color="primary" fullWidth
                                                    sx={{
                                                        fontSize: { xs: "16px", sm: "20px", md: "20px" }, fontWeight: 700, display: "flex", justifyContent: "center", alignItems: "center",
                                                    }}
                                                >
                                                    N
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* receive and investigate button */}
                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", sm: "column", md: "row" }}
                            justifyContent="flex-end"
                            alignItems="center"
                            sx={{
                                backgroundColor: "#f5f5f5",
                                padding: 2,
                                borderRadius: 2,
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                mt: 2,
                                gap: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 700,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: { xs: "16px", sm: "20px", md: "20px" },
                                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                                    backgroundColor: "primary.main",
                                    color: "white",
                                    width: { xs: "120px", sm: "150px", md: "180px" },
                                }}
                            >
                                Receive
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 700,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: { xs: "16px", sm: "20px", md: "20px" },
                                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                                    backgroundColor: "error.main",
                                    color: "white",
                                    width: { xs: "120px", sm: "150px", md: "180px" },
                                }}
                            >
                                Investigate
                            </Button>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default SupervisorControlPanel;