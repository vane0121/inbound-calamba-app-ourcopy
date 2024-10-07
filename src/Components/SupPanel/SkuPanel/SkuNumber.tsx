import { Box, Typography } from "@mui/material";
import theme from "../../../Theme/Theme";
import { ISkuNumber } from "./Interface/SkuNumber.interface";

export default function SkuNumber({skuNumber, skuComment, collapse}: ISkuNumber) {

  return (
    <Box display="flex" flexDirection={'column'}>
        <Box 
            justifyContent={'flex-start'}
            sx={{
                width: { xs: "100%", sm: "100%", md: "75%", xl: "75%" },
                border: 'solid 0px red'
        }}>
            <Typography
                sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: theme.typography.fontWeightRegular,
                }}
            >
                <strong>SKU&nbsp;Number:</strong>
                &nbsp;
                {
                    collapse && 
                    <strong>
                        {skuNumber}
                    </strong>
                }
                
            </Typography>
        </Box>
        {
            !collapse &&
            <>
                <Box sx={{
                    width:'100%',
                    height:'20px',
                    border:'solid 0px red',
                    
                }}>
                    <Typography
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        <strong>{skuNumber}</strong>
                    </Typography>
                </Box>
                <Box sx={{
                    width:'100%',
                    height:'20px',
                    border:'solid 0px red',
                    
                }}>
                    <Typography
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: theme.typography.fontWeightRegular,
                        }}
                    >
                        <strong>{skuComment}</strong>
                    </Typography>
                </Box>
            </>
        }
    </Box>
  )
}