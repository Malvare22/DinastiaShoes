'use client'

import { Input, SquareSelect, SquareSelectSmall } from "../forms/inputs";
import { ModalUnstandard } from "../modal";
import { LabelInput } from "../text";
import { formContext } from '../context';
import { useState } from "react";
import { checkText, messageText } from "../forms/verifications";
import { Button } from "../buttons";
import { validateInformation } from "@/app/lib/information";
import { updateProduct } from "@/app/lib/inventories";

export default function EditInventoryModal({setVisible, data, update, setUpdate}){
    const [information, setInformation] = useState(data);
    const [validate, setValidate] = useState({"nombre": true});
    
    const handleAccept = async () => {
        if(validateInformation(validate)){
            try{
                information.destacado = information.destacado ? 'A' : 'B';
                await updateProduct(information);
                setVisible(false);
                setUpdate(!update);
            }
            catch(error){
                alert(error);
            }
            
        };
    };

    console.log(information)
    const handleInput = (e) => {
        const {value, name} = e.target;
        setInformation({...information, [name]: value});
    };

    return(
        <formContext.Provider value={{information, setInformation, validate, setValidate}}>
            <ModalUnstandard setVisible={setVisible}>
                <form>
                    <div className="md:grid md:grid-cols-8 text-black">
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
                        <div className=""><SquareSelectSmall nameInput={"destacado"} select={(information.destacado == 'A')}></SquareSelectSmall></div>
                        </div>
                        <div className="col-span-1 mt-10">
                            <LabelInput>Descripción: </LabelInput>
                        </div>
                        <div className="col-span-7 md:ms-10 mt-10">
                        <textarea required onChange={handleInput} name="descripcion" value={information["descripcion"]} className="w-full border"></textarea>
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