'use client'

import { createContext, useState } from "react"
import Navbar from "./navbar";
import { Footer } from "./footer";

export const SessionContext = createContext(null);
export default function Template({children}){
    const [sessionFlag, setSessionFlag] = useState(false);
    return(
        <SessionContext.Provider value={{sessionFlag, setSessionFlag}}>
            <header>
                <Navbar></Navbar>
            </header>
            {children}
            <footer>
                <Footer></Footer>
            </footer>
        </SessionContext.Provider>
    );
};