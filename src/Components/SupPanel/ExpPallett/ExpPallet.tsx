import { Box, Button, Typography } from "@mui/material";
import theme from "../../../Theme/Theme";
import ReusableTextField from "../../ReusableTextField/ReusableTextField";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import IFootprintData from "../../../Features/SupervisorControlPanel/Interface/Footprint.interface";
import { useState } from "react";

const schema = Yup.object().shape({
    nonConformingPallet: Yup.string().optional(),
});


export default function ExpPallet() {

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
  )
}