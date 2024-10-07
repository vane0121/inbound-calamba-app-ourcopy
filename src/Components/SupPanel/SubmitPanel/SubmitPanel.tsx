import { Box, Button } from '@mui/material'

export default function Submition() {
        
  return (
    <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "column", md: "row" }}
        justifyContent="flex-end"
        alignItems="center"
        sx={{
            backgroundColor: "#f5f5f5",
            padding: 2,
            // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
  )
}