import { Box, Button, Typography } from "@mui/material";
import theme from "../../../Theme/Theme";
import AddIcon from "@mui/icons-material/Add";
import ReusableTextField from "../../ReusableTextField/ReusableTextField";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import IFootprintData from "../../../Features/SupervisorControlPanel/Interface/Footprint.interface";
import { useState } from "react";

const schema = Yup.object().shape({
    nonConformingPallet: Yup.string().optional(),
});

export default function Expiration() {
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
    <Box display="flex" justifyContent="space-between" mt={2} gap={2} 
    sx={{ 
        paddingX:'16px',
        border:'solid 0px #000',
    }}>
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
                    height:'100%'
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
  )
}