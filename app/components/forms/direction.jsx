'use client'
import { createContext, useContext, useState } from "react";
import { Button } from "../buttons";
import { LabelInput } from "../text";
import { Input, InputForDirection } from "./inputs";
import { checkNoEmpty, messageNoEmpty } from "./verifications";
import { DirectionContext } from "../context";
import { TemplateEmptyDirection, TemplateUnValidateDirection } from "@/app/lib/direction";
import { validateInformation } from "@/app/lib/information";

export default function DirectionForm({type}){
    const [information, setInformation] = useState(TemplateEmptyDirection);
    const [validate, setValidate] = useState(TemplateUnValidateDirection);
    const [editing, setEditing] = useState(false);
    const [direction, setDirection] = useState(type==2 ? false: true);

    const handleButton = () => {
        alert("A")
    };

    return(
        <DirectionContext.Provider value={{information, setInformation, validate, setValidate, editing, setEditing}}>
        {   type != 2 && 
            <div className={`bg-blue mx-12 p-4 text-2xl space-x-2 font-semibold flex align-middle items-center select-none mt-6 ${direction ? "mb-12": " mb-0"}`} onClick={()=>setDirection(!direction)}>
                <div>
                    Dirección
                </div>
                <div>
                    {direction ? <ArrowDown></ArrowDown> : <ArrowUp></ArrowUp>}
                </div>
        
            </div>
        }
        {!direction && <form className="text-black bg-lightGrey text-xl mx-12 rounded-lg p-6 space-y-4 mb-6">
            <div className="space-y-2 w-3/12">
                <LabelInput>Departamento</LabelInput>
                <InputForDirection nameInput={"departamento"} errorMessage={messageNoEmpty} verification={checkNoEmpty} type={"text"}></InputForDirection>
            </div>
            <div className="space-y-2 w-3/12">
                <LabelInput>Municipio</LabelInput>
                <InputForDirection nameInput={"municipio"} errorMessage={messageNoEmpty} verification={checkNoEmpty} type={"text"}></InputForDirection>
            </div>
            <div className="space-y-2 w-4/12">
                <LabelInput>Dirección Completa</LabelInput>
                <InputForDirection nameInput={"direccion"} errorMessage={messageNoEmpty} verification={checkNoEmpty} type={"text"}></InputForDirection>
            </div>
            <div className="space-y-2 w-4/12">
                <LabelInput>Referencias Adicionales</LabelInput>
                <InputForDirection nameInput={"referencias"} errorMessage={messageNoEmpty} verification={checkNoEmpty} type={"text"}></InputForDirection>
            </div>
            <div className="flex justify-center space-x-6">
                {editing && <><Button color={"bg-green"} handleButton={handleButton} disable={!validateInformation(validate)}>Guardar</Button>
                <Button color={"bg-grey"} handleButton={()=>{setEditing(false)}}>Cancelar</Button></>}
                {!editing && <Button color={"bg-yellow"} handleButton={()=>{setEditing(true)}}>Editar</Button>}
            </div>
        </form>}

        </DirectionContext.Provider>

    );
};

const ArrowUp = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
        </svg>
    );  
};

const ArrowDown = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
</svg>
    );  
};

