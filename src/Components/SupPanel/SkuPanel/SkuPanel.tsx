import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import LockOpenIcon from "@mui/icons-material/LockOpen";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import theme from '../../../Theme/Theme';
import { useState } from 'react';
import Submition from '../SubmitPanel/SubmitPanel';
import Submittion from '../SubmitPanel/SubmitPanel';
import ExpPallet from '../ExpPallett/ExpPallet';
import CaseTable from '../CaseTable/CaseTable';
import Shipment from '../Shipment/Shipment';
import Catalogue from '../Catalogue/Catalogue';
import Footprint from '../FootPrint/FootPrint';
import Expiration from '../ExpPanel/ExpPanel';
import ExpPanel from '../ExpPanel/ExpPanel';
import SubmitPanel from '../SubmitPanel/SubmitPanel';
import Barcode from 'react-barcode';
import BarCode from '../../BarCode/Barcode';

type Props = {}

export default function SkuPanel({}: Props) {
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

    const [collapse,setCollapse] = useState(true)

    const Collapsible = ()=> {
        setCollapse(prev=> !prev)
    }

  return (
    <Stack display={'flex'} sx={{border: 'solid 0px violet',gap:'2px'}}>
        <Stack display={'flex'} flexDirection={'column'} 
            sx={{
                border: 'solid 1px blue',
                borderRadius:'5px',
                gap:'2px'
            }}
        >
            <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "column", md: "row" }}
                justifyContent={'space-between'}
                alignItems="center"
                sx={{
                    backgroundColor: "#f5f5f5",
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    height: `${collapse == true ? '50px' : '100%'}`,
                    border:'solid 0px #000',
                }}
                onClick={Collapsible}
            >
                <Box
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "20%", xl: "20%" },
                        padding: 2,
                        border:'solid 1px blue'
                    }}
                >
                    <Box mt={1}>
                        {/* 3rd column, 3rd row, 1st column */}
                        <Box display="flex">
                            <Typography
                                sx={{
                                    flexDirection:`${collapse ? 'row':'column'}`,
                                    color: theme.palette.text.secondary,
                                    fontWeight: theme.typography.fontWeightRegular,
                                }}
                            >
                                <strong>SKU&nbsp;Number:</strong>
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
                { collapse ?
                    <></>
                    :
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
                                width: { xs: "120px", sm: "150px", md: "180px", 
                                    border:'solid 1px red'
                                },
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
                                    Scan SKU
                                </Typography>

                            </Box>
                        </Box>
                    </Box>
                }
                {
                    collapse ?
                    <Box sx={{width:'40%', border:'solid 1px violet'}}>
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
                    </Box>
                    :
                    <Box
                        sx={{
                            // width: { xs: "100%", sm: "100%", md: "25%", xl: "25%" },
                            padding: 2,
                            width: `${collapse ? '100%': '30%'}`,
                            border:'solid 1px red'
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
                }
              
                <Box
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "25%", xl: "25%" },
                        display: "flex",
                        flexDirection:'column',
                        justifyContent: 'flex-start',
                        alignContent:'flex-end',
                        border:'solid 1px red',
                        height:'100%'
                    }}
                >
                    {
                        collapse ? 
                        <Typography 
                            textAlign={'right'}
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: theme.typography.fontWeightRegular,
                                fontStyle: 'italic',
                                border:'solid 1px red'

                            }}
                        >
                            Show more
                        </Typography>
                        :
                        <Box sx={{width:'100%',height:'80px'}}>
                            <BarCode 
                                codeValue="1234567890"
                                width={2}   
                                height={50} 
                                showDigits={false}
                            />
                        </Box>
                    }
                </Box>
            </Box>

            
            {
                !collapse && 
                <>
                    <CaseTable/>
                    <Footprint/>
                    <ExpPanel/>
                    <ExpPallet/>
                </>
                }
        </Stack>

        {
            !collapse && <SubmitPanel/>
        }
        
    </Stack>
  )
}