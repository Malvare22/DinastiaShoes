'use client'
import { createContext, useState } from "react";
import Navbar from "./navbar";

export const SessionContext = createContext(null);

export default function Template({ children }) {
    
    const [session, setSession] = useState({
      "type": "",
      "token": "",
      "cart": "",
      "status": "unlogged"
    });
  
    return (
        <>
            <SessionContext.Provider value={{session, setSession}}>
            <header>
                <Navbar mode={session.status} type={session.type}></Navbar>
            </header>
                {children}
            </SessionContext.Provider>
        </>
    );
};