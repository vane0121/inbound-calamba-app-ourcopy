import React, { useState } from 'react'
import { createContext, ReactNode } from 'react'

type Pros = { children: ReactNode }

type InboundContextType = {
    doorId: number
    IsPhotoOpen:()=> void
}

const InboundContext = createContext<InboundContextType>({} as InboundContextType);

export function InboundProvider({ children }: Pros) {

    const [doorId, setDoorId] = useState(0)
    
    const IsPhotoOpen =() => {
        setDoorId(2)
    }

  return (
    <InboundContext.Provider value={{doorId, IsPhotoOpen}}>
        {children}
    </InboundContext.Provider>
  )
}

export const UseInbound = () => React.useContext(InboundContext)