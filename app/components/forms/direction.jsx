'use client'
import { createContext, useContext, useState } from "react";
import { Button } from "../buttons";
import { LabelInput } from "../text";
import { Input, InputForDirection } from "./inputs";
import { checkNoEmpty, messageNoEmpty } from "./verifications";
import { DirectionContext } from "../context";
import { TemplateEmptyDirection, TemplateUnValidateDirection } from "@/app/lib/direction";
import { validateInformation } from "@/app/lib/information";

export default function DirectionForm(){
    const [information, setInformation] = useState(TemplateEmptyDirection);
    const [validate, setValidate] = useState(TemplateUnValidateDirection);
    const [editing, setEditing] = useState(false);

    const handleButton = () => {
        alert("A")
    };

    return(
        <DirectionContext.Provider value={{information, setInformation, validate, setValidate, editing, setEditing}}>

        <form className="text-black bg-lightGrey text-xl mx-12 rounded-lg p-6 space-y-4 my-6">
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
        </form>

        </DirectionContext.Provider>

    );
};

