import React from "react";
import { Box } from "@mui/material";

const ReusableDay: React.FC = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <Box display="flex" justifyContent="space-between" mb={1}>
      {days.map((day, index) => (
        <Box
          key={day}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            textAlign: "center",
            flexGrow: 1,
            margin: "0 2px",
            backgroundColor: index === 0 ? "#E7E6E6" : "#385723",
            color: index === 0 ? "#898989" : "white",
            fontWeight: "bold",
          }}
        >
          {day}
        </Box>
      ))}
    </Box>
  );
};

export default ReusableDay;
