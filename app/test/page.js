'use client'
import { useState } from "react";
import { FormContainer, FormStandar } from "../components/forms/container";
import { InputText } from "../components/forms/inputs";
import { LabelInput, PageTittle } from "../components/text";
import Modal, { ModalChangePassword } from "../components/modal";
import { infoBase, validateBase, validateChangeBase, validateInformation } from "../lib/information";
import { Button } from "../components/buttons";
import { formContext } from "../components/context";


/**
 * Corresponde a la pestaña de edición de información de los usuarios
 */
export default function FormUser(){

    const [information, setInformation] = useState(infoBase);
    const [validate, setValidate] = useState(validateChangeBase);
    const [viewConfirmation, setViewConfirmation] = useState(false);
    const [viewChangePassword, setViewChangePassword] = useState(false);
    const [editing, setEditing] = useState(false);

    
    const handleChangePassword = () =>{
        if(editing) setViewChangePassword(!viewChangePassword);
    }

    const handleViewConfirmation = () =>{
        setViewConfirmation(!viewConfirmation);
    }
    
    const makeTheSend = () => {
        console.log(information);
    }
    
    const btn = {
        text: "Aceptar",
        make: makeTheSend,
        color: "bg-blue"
    };

    const handleCancel = () =>{
        setInformation(infoBase);
        setValidate(validateChangeBase);
        setEditing(false);
    }

    const handleEdit = () =>{
        setEditing(true);
    }

    return(
        <formContext.Provider value={{information, setInformation, validate, setValidate, editing}}>
            <div className="mx-12">
                <PageTittle>Información de Usuario</PageTittle>
                <div>
                    <FormContainer type={"editingUser"}>
                        {viewConfirmation && <Modal button={btn} text={"Hola"} setIsVisible={setViewConfirmation}></Modal>}

                        {viewChangePassword && <ModalChangePassword setIsVisible={setViewChangePassword}></ModalChangePassword>}

                        <div className="grid grid-cols-2 space-y-6 mt-[30px] mb-[20px]">
                            <FormStandar information={information} setInformation={setInformation} validate={validate} setValidate={setValidate}></FormStandar>
                        </div>

                        {editing && <div className="flex w-full justify-end">
                            <Button color="bg-yellow" handleButton={handleChangePassword}>Editar contraseña</Button>
                        </div>}

                    </FormContainer>
                </div>
            </div>

            <div className="flex items-center justify-center my-10">
                {
                    editing ? <><div className="mx-5"><Button color="bg-green" disable={!validateInformation(validate)} handleButton={handleViewConfirmation} >Guardar</Button></div>
                                <div className="mx-5"><Button color="bg-grey" handleButton={handleCancel}>Cancelar</Button></div></>
                                :<Button color="bg-yellow" handleButton={handleEdit}>Editar Datos</Button>
                }
            </div>
        </formContext.Provider>
    );
}