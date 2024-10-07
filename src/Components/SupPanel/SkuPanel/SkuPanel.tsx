import { Box, Stack } from '@mui/material'

import { useState } from 'react';
import ExpPallet from '../ExpPallett/ExpPallet';
import CaseTable from '../CaseTable/CaseTable';
import Footprint from '../FootPrint/FootPrint';
import ExpPanel from '../ExpPanel/ExpPanel';
import SubmitPanel from '../SubmitPanel/SubmitPanel';
import SkuNumber from './SkuNumber';
import SkuDescription from './SkuDescription';
import SkuScan from './SkuScan';


export default function SkuPanel() {
    const [collapse, setCollapse] = useState(true)

    const Collapsible = ()=> {
        setCollapse(prev=> !prev)
    }

  return (
    <Stack display={'flex'} sx={{
        border: 'solid 0px violet',
        background:'#fff',
        gap:'2px'}}>
        <Stack display={'flex'} flexDirection={'column'} 
            sx={{
                // border: 'solid 1px grey',
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                borderRadius:'15px',
                gap:'2px'
            }}
        >
            <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "column", md: "row" }}
                justifyContent={'space-between'}
                alignItems="center"
                sx={{
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    height: `${collapse ? { xs: "100%", sm: "100%", md: "20%", xl: "20%" } : '100%'}`,
                    border:'solid 0px #000',
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "20%", xl: "20%" },
                        border:'solid 0px blue'
                    }}
                >
                    <Box>
                        {/* 3rd column, 3rd row, 1st column */}
                        <SkuNumber skuNumber='734747' skuComment='HOLD ZONE' collapse={collapse}/>
                    </Box>
                </Box>
                { collapse ?
                    <></>
                    :
                    <SkuScan/>
                }
                    <SkuDescription collapse={collapse} toggle={Collapsible}/>
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