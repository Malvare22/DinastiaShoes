'use client'

import { createContext, useEffect, useState } from "react"
import Navbar from "./navbar";
import { Footer } from "./footer";
import { useRouter } from "next/navigation";
import { clearLocalStorage } from "./hooks/useLocalStorage";

export const SessionContext = createContext(null);
export default function Template({children}){
    const [sessionFlag, setSessionFlag] = useState(false);
    const router = useRouter();
    useEffect(() => {

        if(sessionFlag){
            const idTimeout = setTimeout(() => {
                clearLocalStorage();
                setSessionFlag(!sessionFlag);
                router.push('/login');
                alert("Se ha terminado tu tiempo de sesión, debes volver a iniciar");
              }, 60*60000);
          
              return () => clearTimeout(idTimeout);
        }
      }, [sessionFlag]);

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