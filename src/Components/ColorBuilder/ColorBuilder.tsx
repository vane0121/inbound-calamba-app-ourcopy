import { Box, Typography } from "@mui/material";

interface IColorShapeProps {
  header: string;
  value: string;
  row: {
    [key: string]: unknown;
  };
}

function ColorShape({ header, value, row }: IColorShapeProps) {

  return (
    <Box
      style={{
        width:
          header === "Team" || header === "EquipmentStatus" ? "80px" : "25px",
        height: "25px",
        borderRadius:
          header === "Team" || header === "EquipmentStatus" ? "5%" : "50%",
        backgroundColor: value,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        marginLeft: 0,
        border:
          header === "Team" || header === "EquipmentStatus"
            ? "none"
            : "2px solid #000000",
      }}
    >
      <Typography sx={{ fontSize: 14 }}>
        {" "}
        {`${header === "Team" ? row.Team : header === "EquipmentStatus" ? row.EquipmentStatus : ""}`}
      </Typography>
    </Box>
  );
}

export default ColorShape;
