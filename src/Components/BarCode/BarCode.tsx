import Barcode from 'react-barcode'
import { IBarcode } from './Interface/Barcode.interface'



export default function BarCode({width,height,showDigits}: IBarcode) {
  return (
    <Barcode 
        value={'5465466'} 
        width={width} 
        height={height}
        displayValue={showDigits} 
    />
  )
}