'use client'
import Image from "next/image";
import { AcceptButton, ToLink } from "./buttons"
import { useEffect, useState } from "react";
import {getPrincipalCategories} from '../lib/categories'
import Link from "next/link";
export default function Navbar({type, mode}){

    return(
        <div className="bg-blue md:p-5 lg:flex content-center block align-middle lg:justify-between select-none">
            
            <Logo></Logo>
            {mode == "Unlogged" && <><Categories></Categories><Unlogged></Unlogged></>}
            {mode == "Logged" && type == "Client" && <><Categories></Categories><Logged></Logged></>}
            
        </div>
    )
}

const Unlogged = () => {
    return(
        <div className="flex justify-center lg:justify-start">
            <Option>
                <h3 className="mx-4 content-center">Contactanos</h3>
                <LetterIcon></LetterIcon>
            </Option>
            <Option>
                <CarIcon></CarIcon>
            </Option>
            <Option>
                <ToLink link={"/login"} color="bg-green">Iniciar Sesión</ToLink>
            </Option>
            
        </div>
    );
}

const Logged = () => {
    return(
        <div className="flex content-center items-center justify-center">
            <Option>
                <h3 className="mx-4 content-center">Contactanos</h3>
                <LetterIcon></LetterIcon>
            </Option>
            <Option>
                <CarIcon></CarIcon>
            </Option>
            <Option>
                <AccountButton text="Rodrigo Malaver"></AccountButton>
            </Option>
            
        </div>
    );
}

const AccountButton = ({text}) =>{

    const [press, setPress] = useState(false);

    function HandleButton(){
        setPress(!press);
    }

    return(
        <div className="flex border-2 rounded-lg items-center justify-center relative" >
            <div className="flex items-center p-3" onClick={HandleButton}>
                <div className="mx-3"><UserIcon></UserIcon></div>
                <h3>
                    {text}
                </h3>
                <div className="mx-3">{press ? <ArrowUpIcon></ArrowUpIcon>: <ArrowDownIcon></ArrowDownIcon>}</div>
            </div>

            {press && 
                <>
                    <div className="rounded-lg flex-col items-center absolute top-[100%] border-2 w-full">
                        <div className="w-full p-3 bg-blue">Ver Perfil</div>
                        <div className="w-full p-3 bg-red">Cerrar Sesión</div>
                    </div>
                    
                </>
            }

        </div>
    );
}

const Categories = () => {

    const [categories, setCategories] = useState([])

    useEffect(()=>{
        const fetchCategories = async () =>{
            const data = await getPrincipalCategories()
            setCategories(data)
        } 
        fetchCategories()
    }, [])

    return(
        <div className="flex content-center items-center justify-center mt-5 mb-5">
                {categories.map((type, i)=>{return <Option key={i}>{type.nombre}</Option>}
                )}
        </div>
    );
}

const Option = (props) =>{

    return(
        <div className="flex mx-6 font-medium items-center cursor-pointer text-xl" onClick={props.action}>
            {props.children}
        </div>
    )
}

const Logo = () => {
    return(
        <Link href={"/"}>
            <div className="flex content-center items-center justify-center">
                <img className="lg:min-w-[100px] lg:max-w-[100px] max-w-[150px]" src="/images/LogoDinastiaShoes.png"></img>
            </div>
        </Link>
    )
}

const CarIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>;
}

const LetterIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
    </svg>;
}

const ArrowDownIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
    </svg>;
}


const ArrowUpIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
  </svg>;
}

const UserIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
  </svg>;
}
