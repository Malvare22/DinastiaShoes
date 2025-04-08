'use client'
import Image from "next/image";
import { AcceptButton, ToLink } from "./buttons"
import { useContext, useEffect, useState } from "react";
import {getPrincipalCategories} from '../lib/categories'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SessionContext } from "./template";
import { clearLocalStorage, readLocalStorage } from "./hooks/useLocalStorage";

export default function Navbar(){

    const {sessionFlag} = useContext(SessionContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = readLocalStorage('token');
        setIsLoggedIn(!!token);
    }, [sessionFlag]);



    const type = readLocalStorage("type") ? readLocalStorage("type") : '';

    return(
        <div className="bg-blue md:p-5 lg:flex content-center align-middle lg:justify-between select-none">
            
            <Logo></Logo>
            {!isLoggedIn && <><Categories></Categories><Unlogged></Unlogged></>}
            {isLoggedIn && type == 'C' && <><Categories></Categories><Logged text={readLocalStorage("names")}></Logged></>}
            {isLoggedIn && type != 'C' && <><div className="hover:text-orange flex align-middle items-center"><Option><Link href={'/menu'}>Menú Principal</Link></Option></div><Option><AccountButton text={readLocalStorage("names")}></AccountButton></Option></>}
            
        </div>
    )
}

const Unlogged = () => {
    return(
        <div className="flex justify-center lg:justify-start space-x-6">
            <div className="hover:text-orange flex items-center align-middle">
                <Link href={'/contact'}>
                    <Option>
                        <h3 className="mx-4 content-center">Contactanos</h3>
                        <LetterIcon></LetterIcon>
                    </Option>
                </Link>
            </div>
            <Option>
                <Link href={"/cart"}><CarIcon></CarIcon></Link>
            </Option>
            <Option>
                <ToLink link={"/login"} color="bg-green" type="login">Iniciar Sesión</ToLink>
            </Option>
            
        </div>
    );
}

const Logged = ({text}) => {
    return(
        <div className="flex content-center items-center justify-center space-x-6">
            <div className="hover:text-orange">
                <Link href={'/contact'}>
                    <Option>
                        <h3 className="mx-4 content-center">Contactanos</h3>
                        <LetterIcon></LetterIcon>
                    </Option>
                </Link>
            </div>
            <Option>
                <Link href={"/cart"}><CarIcon></CarIcon></Link>
            </Option>
            <Option>
                <AccountButton text={text}></AccountButton>
            </Option>
            
        </div>
    );
}

const AccountButton = ({text}) =>{

    const {sessionFlag, setSessionFlag} = useContext(SessionContext);
    const [press, setPress] = useState(false);
    const router = useRouter();

    function HandleButton(){
        setPress(!press);
    }

    const closeSession = () => {
        clearLocalStorage();
        setSessionFlag(!sessionFlag);
        router.push("/login");
    };

    return(
        <div className={"flex border-2 rounded-lg items-center justify-center relative " + (!press && " hover:text-orange")}  >
            <div className="flex items-center p-3" onClick={HandleButton}>
                <div className="mx-3"><UserIcon></UserIcon></div>
                    <div className="text-sm">{text}</div>
                <div className="mx-1">{press ? <ArrowUpIcon></ArrowUpIcon>: <ArrowDownIcon></ArrowDownIcon>}</div>
            </div>

            {press && 
                <>
                    <div className="rounded-lg flex-col text-sm items-center absolute top-[100%] z-10 border-2 w-full">
                        <div className="w-full p-3 bg-blue cursor-pointer"><Link href={"/profile"}>Ver Perfil</Link></div>
                        {readLocalStorage('type') == 'C' && <div className="w-full p-3 bg-redWine cursor-pointer"><Link href={'/historial'}>Mis pedidos</Link></div>}
                        <div className="w-full p-3 bg-red cursor-pointer" onClick={closeSession}>Cerrar Sesión</div>
                    </div>
                    
                </>
            }

        </div>
    );
}

const Categories = () => {

    const [categories, setCategories] = useState([])

    useEffect(()=>{
        const getCategories = async () =>{
            try{
                const data = await getPrincipalCategories()
                setCategories(data || [])
            }   
            catch(error){
                console.log(error);                
            }
        } 
        getCategories();
    }, [])

    return(
        <div className="flex content-center items-center justify-center space-x-12 my-6">
                {categories.map((categorie)=>{return <Link href={'/products?categoria=' + categorie.id} className="hover:text-orange" key={categorie.id}><Option>{categorie.nombre}</Option></Link>}
                )}
                <Link href={'/products?categoria=' + "All"} className="hover:text-orange"><Option>{"Todos los productos"}</Option></Link>
        </div>
    );
}

const Option = (props) =>{

    return(
        <div className="flex font-medium items-center cursor-pointer text-xl" onClick={props.action}>
            {props.children}
        </div>
    )
}

const Logo = () => {
    return(
        <Link href={"/"}>
            <div className="flex content-center items-center justify-center">
                <img className="lg:min-w-[100px] lg:max-w-[100px] max-w-[150px]" alt="logo-DinastiaShoes" src="/images/LogoDinastiaShoes.png"></img>
            </div>
        </Link>
    )
}

const CarIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className={"bi bi-cart-fill hover:fill-orange fill-white"} viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>;
}

const LetterIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
    </svg>;
}

const ArrowDownIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
    </svg>;
}


const ArrowUpIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
  </svg>;
}

const UserIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
  </svg>;
}
