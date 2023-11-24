'use client'

import { createContext, useState } from "react"

export const SessionContext = createContext(null);
export default function Template({children}){
    const [sessionFlag, setSessionFlag] = useState(false);
    return(
        <SessionContext.Provider value={{sessionFlag, setSessionFlag}}>{children}</SessionContext.Provider>
    );
};