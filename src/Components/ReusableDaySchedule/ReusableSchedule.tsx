import React from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import IReusableScheduleProps from "./interface/IReusableScheduleProps";

const ReusableSchedule: React.FC<IReusableScheduleProps> = ({
  daysOfWeek,
  height,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: 0,
        height: "auto", // Allow height to adjust based on content
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {daysOfWeek?.map((day, index) => (
        <Grid
          container
          key={day.name}
          justifyContent="center"
          sx={{ height: height }}
        >
          <Grid
            item
            xs={4}
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: index === 0 ? "bold" : "normal",
                fontSize: "14.5px",
                textAlign: "center",
                height: "12px",
                padding: "0.5em",
                color: index === 0 ? "black" : "#0070C0",
                backgroundColor: index === 0 ? "#e0e0e0" : "transparent",
              }}
            >
              {day.name.toUpperCase()}
            </Typography>
          </Grid>

          <Divider orientation="vertical" flexItem sx={{ height: "40px" }} />

          <Grid item xs={4}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: index === 0 ? "bold" : "normal",
                fontSize: "14.5px",
                textAlign: "center",
                height: "12px",
                padding: "0.5em",
                color: index === 0 ? "black" : "#002060",
                backgroundColor: index === 0 ? "#e0e0e0" : "transparent",
              }}
            >
              {day.timeIn}
            </Typography>
          </Grid>

          <Divider orientation="vertical" flexItem sx={{ height: "40px" }} />

          <Grid item xs={3}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: index === 0 ? "bold" : "normal",
                fontSize: "14.5px",
                textAlign: "center",
                height: "12px",
                padding: "0.5em",
                color: index === 0 ? "black" : "#002060",
                backgroundColor: index === 0 ? "#e0e0e0" : "transparent",
              }}
            >
              {day.timeOut}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ReusableSchedule;
