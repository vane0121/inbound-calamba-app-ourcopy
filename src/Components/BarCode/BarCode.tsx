import Barcode from 'react-barcode'
import { IBarcode } from './Interface/Barcode.interface'
import { Box } from '@mui/material'



export default function BarCode({width,height,showDigits, alignBarcode}: IBarcode) {
  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent={alignBarcode} alignItems={'center'}
      sx={{
        border:'solid 0px blue',
      }}
    >
      <Barcode 
          value={'5465466'} 
          width={width} 
          height={height}
          displayValue={showDigits} 
          background='none'
      />
    </Box>
  )
}