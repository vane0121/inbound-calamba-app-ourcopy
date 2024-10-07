import { Box, Stack, Typography } from '@mui/material'
import BarCode from '../../BarCode/BarCode'
import theme from '../../../Theme/Theme'
import { ISkuDescription } from './Interface/SkuDescription.interface'

export default function SkuDescription({collapse, toggle}: ISkuDescription) {
  return (
    <Stack
        sx={{
            height: '100%',
            maxHeight:'80px',
            width: { xs: "100%", sm: "100%", md: "75%", xl: "75%" },
            border:'solid 0px blue'
        }}
    >
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}
            sx={{
                height: '100%',
                border: 'solid 0px green',
            }} 
        >
            <Typography noWrap={true}
                sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: theme.typography.fontWeightRegular,
                    
            }}>
                <strong>SKU Description:</strong>&nbsp;
                <strong>VELVETY BT 2P 300SHEETS 24ROLL</strong>
            </Typography>
            <Box onClick={toggle} sx={{cursor:'pointer'}}>
                <Typography sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: theme.typography.fontWeightRegular,
                    }} 
                >
                    <i>Show&nbsp;more...</i>
                </Typography>
            </Box>
            
        </Box>
        {
            collapse 
            ?
            <></>
            :
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}
                sx={{
                    border:'solid 0px red'
                }}
            >
                <Box>
                    <Box>
                        <Typography  noWrap={true}
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: theme.typography.fontWeightRegular,
                        }}>
                            <strong>UPC:</strong>
                            &nbsp;
                            <strong>4806506154294</strong>
                        </Typography>
                    </Box>
                    <Box>
                        <Typography  noWrap={true}
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontWeight: theme.typography.fontWeightRegular,
                        }}>
                            <strong>Vendor:</strong>
                            &nbsp;
                            <strong>1068</strong>
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <BarCode 
                        codeValue="1234567890"
                        width={2}   
                        height={30} 
                        showDigits={false}
                        alignBarcode={'right'}
                    />
            </Box>
        </Box>
        }
    </Stack>
  )
}