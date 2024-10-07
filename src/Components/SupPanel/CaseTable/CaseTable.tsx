import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import LockOpenIcon from "@mui/icons-material/LockOpen";

export default function CaseTable() {

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

  return (
    <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "column", md: "row" }}
        alignItems="center"
        sx={{
            borderRadius: 2,
            padding:'2px',
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            border:'solid 0px #000'
        }}
    >
        <Box
            sx={{
                width: { xs: "100%", sm: "100%", md: "100%", xl: "100%" },
            }}
        >
            <Box mt={1}>
                {/* Your content here */}
                <TableContainer>
                    <Table>
                        <TableHead
                            
                            sx={{
                                backgroundColor: "primary.main",
                                borderRadius: '10px'
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
  )
}