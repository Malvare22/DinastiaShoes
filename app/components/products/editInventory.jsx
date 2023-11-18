'use client'

import { Input, SquareSelect, SquareSelectSmall } from "../forms/inputs";
import { ModalUnstandard } from "../modal";
import { LabelInput } from "../text";
import { formContext } from '../context';
import { useState } from "react";
import { checkText, messageText } from "../forms/verifications";
import { Button } from "../buttons";
import { editInventory } from "@/app/lib/products";
import { validateInformation } from "@/app/lib/information";

export default function EditInventoryModal({setVisible, descripcion, nombre, destacado}){
    const [information, setInformation] = useState({"nombre": nombre, "descripcion": descripcion, "destacado":destacado});
    const [validate, setValidate] = useState({"nombre": true, "descripcion": true, "destacado": true});
    
    const handleAccept = () => {
        if(validateInformation(validate)){
            editInventory(information);
            setVisible(false);
        };
    };

    const handleTextArea = (e) => {
        if(e.target.value.length != 0){
            setValidate({...validate, ["descripcion"]: true});
        }
        else{
            setValidate({...validate, ["descripcion"]: false});
        }
    };

    return(
        <formContext.Provider value={{information, setInformation, validate, setValidate}}>
            <ModalUnstandard setVisible={setVisible}>
                <form>
                    <div className="md:grid md:grid-cols-8">
                        <div className="col-span-1">
                            <LabelInput>Nombre: </LabelInput>
                        </div>
                        <div className="col-span-7 md:ms-10">
                            <Input nameInput={"nombre"} errorMessage={messageText} verification={checkText} type={"text"}></Input>
                        </div>
                        <div className="col-span-1 mt-10">
                            <LabelInput>Destacado: </LabelInput>
                        </div>
                        <div className="col-span-7 md:ms-10 mt-10">
                        <div className=""><SquareSelectSmall nameInput={"destacado"}></SquareSelectSmall></div>
                        </div>
                        <div className="col-span-1 mt-10">
                            <LabelInput>Descripción: </LabelInput>
                        </div>
                        <div className="col-span-7 md:ms-10 mt-10">
                        <textarea required onChange={handleTextArea} className="w-full border"></textarea>
                        </div>
                    </div>
                    <div className="flex space-x-6 mt-6">
                        <Button color={"bg-green"} disable={!validateInformation(validate)} handleButton={handleAccept}>Aceptar</Button>
                        <Button color={"bg-grey"} handleButton={()=>setVisible(false)}>Cancelar</Button>
                    </div>
                </form>
            </ModalUnstandard>
        </formContext.Provider>
    );
};