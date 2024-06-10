'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { FormContainer, FormStandar } from "../components/forms/container";
import { InputText } from "../components/forms/inputs";
import { LabelInput, PageTittle } from "../components/text";
import Modal, { ModalChangePassword, ModalUnstandard } from "../components/modal";
import { ValidTypes, getProfile, infoBase, updatePassword, updateProfile, validateBase, validateChangeBase, validateInformation } from "../lib/information";
import { Button } from "../components/buttons";
import { formContext } from "../components/context";
import DirectionForm from "../components/forms/direction";
import { useRouter } from "next/navigation";
import { SessionContext } from "../components/template";
import { clearLocalStorage, readLocalStorage } from "../components/hooks/useLocalStorage";


/**
 * Corresponde a la pestaña de edición de información de los usuarios
 */
export default function FormUser(){

    const [information, setInformation] = useState({});
    const [baseInfo, setBaseInfo] = useState({}); 
    const [validate, setValidate] = useState(validateChangeBase);
    const [viewConfirmation, setViewConfirmation] = useState(false);
    const [viewChangePassword, setViewChangePassword] = useState(false);
    const [editing, setEditing] = useState(false);
    const [update, setUpdate] = useState(false);
    const [viewCloseSession, setViewCloseSession] = useState(false);
    const {sessionFlag, setSessionFlag} = useContext(SessionContext);

    const router = useRouter();
    const type = readLocalStorage("type");
    const id = readLocalStorage("id");
    
    useEffect(
        () => {
            const get = async () => {
                if(!ValidTypes(['C', 'E', 'A'])) return;
                let data = await getProfile(id);
                setBaseInfo(data);
                setInformation(data);
                setEditing(false);
            };
            get();
        }
        , [update]
    )

    
    const handleChangePassword = () =>{
        if(editing) setViewChangePassword(!viewChangePassword);
    }

    const handleViewConfirmation = () =>{
        setViewConfirmation(!viewConfirmation);
    }
    
    const patchProfile = async () => {
        if(information["password"]){
            const ans = await updatePassword(information);
            if(ans.error){
                alert("La contraseña ingresada no coincide con la actual");
                return;
            }
        }
        await updateProfile(information);
        setUpdate(!update);
        setViewConfirmation(false);
        setViewCloseSession(true);
        
    }

    const handleCloseSession = () => {
        
        setSessionFlag(!sessionFlag);
        clearLocalStorage();
        router.push("/login");


    };
    
    const btn = {
        text: "Aceptar",
        make: patchProfile,
        color: "bg-blue"
    };

    const handleCancel = () =>{
        setInformation(baseInfo);
        setValidate(validateChangeBase);
        setEditing(false);
    }

    const handleEdit = () =>{
        setEditing(true);
    }

    return(
        <><formContext.Provider value={{information, setInformation, validate, setValidate, editing}}>
        {viewCloseSession && <ModalUnstandard><div className="text-black flex flex-col justify-center m-20">
            <div className="font-normal text-lg text-center mb-2">Cambios realizados de manera éxitosa, se requiere volver a iniciar sesión</div>
            <Button color="bg-blue" handleButton={handleCloseSession}>Aceptar</Button>
        </div></ModalUnstandard>}
            <div className="mx-12">
                <PageTittle>Información de Usuario</PageTittle>
                <div>
                    <FormContainer type={"editingUser"}>
                        {viewConfirmation && <Modal button={btn} text={"¿Estás seguro de modificar tú perfil?"} setIsVisible={setViewConfirmation}></Modal>}

                        {viewChangePassword && <ModalChangePassword setIsVisible={setViewChangePassword}></ModalChangePassword>}

                        <div className="grid grid-cols-2 space-y-6 mt-[30px] mb-[20px]">
                            <FormStandar information={information} type={"editingUser"}></FormStandar>
                        </div>

                        {editing && <div className="flex w-full justify-end">
                            <Button color="bg-yellow" handleButton={handleChangePassword}>Editar contraseña</Button>
                        </div>}

                    </FormContainer>
                </div>
            </div>
        </formContext.Provider>
            <div className="flex items-center justify-center mb-4">
                {
                    editing ? <><div className="mx-5"><Button color="bg-green" disable={!validateInformation(validate)} handleButton={handleViewConfirmation} >Guardar</Button></div>
                                <div className="mx-5"><Button color="bg-grey" handleButton={handleCancel}>Cancelar</Button></div></>
                                :<Button color="bg-yellow" handleButton={handleEdit}>Editar Datos</Button>
                }
            </div>
            {type == 'C' && <DirectionForm></DirectionForm>}
            
        </>
    );
}