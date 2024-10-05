import { Box } from "@mui/material";
import ReusableTextField from "../../ReusableTextField/ReusableTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import IFootprintData from "../../../Features/SupervisorControlPanel/Interface/Footprint.interface";
import { useState } from "react";

const schema = Yup.object().shape({
    nonConformingPallet: Yup.string().optional(),
});

export default function Footprint() {
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
            // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            border:'solid 0px #000',
            paddingY: '2px',
            borderTop:'solid 1px #000',
            borderBottom:'solid 1px #000',
        }}
    >
        <Box
            sx={{
                width: { xs: "100%", sm: "100%", md: "100%", xl: "100%" },
                padding: 2,
            }}
        >
            <Box>
                {/* Your content here */}
                <Box display="flex" gap={2}>
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
  )
}