import Barcode from 'react-barcode'
import { IBarcode } from './Interface/Barcode.interface'
import { Box } from '@mui/material'



export default function BarCode({width,height,showDigits}: IBarcode) {
  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}
      sx={{border:'solid 1px blue'}}
    >
      <Barcode 
          value={'5465466'} 
          width={width} 
          height={height}
          displayValue={showDigits} 
      />
    </Box>
  )
}