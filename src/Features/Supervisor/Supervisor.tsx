import { Box, Divider, Grid, Typography } from "@mui/material";

function SupervisorControlpanel() {
  return (
    <>
      <Box
        sx={{
          border: "1px solid black", // Adds a solid black border
          borderRadius: "4px", // Optional: Adds rounded corners
          //padding: 2, // Optional: Adds padding inside the box
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            //marginBottom: 3,
            color: "primary.main",
            fontWeight: "bold",
            fontSize: { xs: 25, md: 35 },
            textAlign: "center",
          }}
        >
          Supervisor’s Control Panel
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 1,
          flexGrow: 1,
          height: "calc(100vh - 150px)",
          overflow: "hidden",
        }}
      >
        {/* Card 1 */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={1.3}
          container
          sx={{ border: "1px solid #ccc" }}
        ></Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: "100%",
            //borderWidth: 1,
          }}
        />
        {/* Card 2 */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={1.5}
          container
          sx={{ border: "1px solid #ccc" }}
        >
          <Typography
            textAlign="center"
            sx={{ fontSize: { xs: 18, md: 24 }, mb: 1 }}
          >
            {/* //My Queue */}
          </Typography>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: "100%",
            //borderWidth: 1,
          }}
        />
        {/* Card 3 */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={9.18}
          container
          sx={{ border: "1px solid #ccc" }}
        >
          {/* Responsive Typography for Multiple Lines */}
          <Typography
            textAlign="center"
            sx={{ fontSize: { xs: 18, md: 24 }, mb: 1 }}
          >
            {/* My Queue */}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
export default SupervisorControlpanel;
