'use client'

import { useEffect, useState } from "react";
import { formContext } from "../../components/context";
import { DateInputFormat, getEmployeeByCedula, registerUser, registerUserByAdmin, validateEditUserByAdmin, validateInformation, validateRegisterUser, validateRegisterUserByAdmin } from "@/app/lib/information";
import { PageTittle } from "@/app/components/text";
import { FormContainer, FormStandar } from "@/app/components/forms/container";
import Modal from "@/app/components/modal";
import { Button, ToLink } from "@/app/components/buttons";
import { useRouter } from "next/navigation";
import { editEmployee, getEmployee } from "@/app/lib/employees";


export default function Page({params}) {

  const cedula = params.cedula;
  const [information, setInformation] = useState({});
  const [validate, setValidate] = useState(
    {
        "cedula":true,
        "nombres":true,
        "apellidos":true,
        "correo":true,
        "sexo":true,
        "fecha_nacimiento":true,
    }
);

    const get = async () => {
        let tmp = await getEmployee(cedula);
        setInformation(tmp);
    };

    useEffect(
        () => {
        
        get();
        }, []
    )

  const [viewConfirmation, setViewConfirmation] = useState(false);
  const router = useRouter();
  const sendData = () => {
    const post = async () => {
        const ans = await editEmployee(information);
        if(ans.error){
            alert(ans.error);
        }
        else router.push("/employees");
    }
    if(validateInformation(validate)) post();
  }

  const btn = {
    "make" : sendData,
    "color" : "bg-green",
    "text": "Aceptar"
  };
  console.log(information)
  return(
    <formContext.Provider value={{information, setInformation, validate, setValidate}}>
        <div className="mx-12">
            <PageTittle>EDITAR EMPLEADO</PageTittle>
            <div>
                <FormContainer>
                    {viewConfirmation && <Modal button={btn} text={"¿Estás seguro de crear al empleado?"} setIsVisible={setViewConfirmation}></Modal>}

                    <div className="grid grid-cols-2 space-y-6 mt-[30px] mb-[20px]">
                        <FormStandar type={"editByAdmin"}></FormStandar>
                    </div>
                    <div className="flex space-x-5 justify-center">
                        <Button handleButton={() => setViewConfirmation(true)} color={"bg-green"} disable={!(validateInformation(validate))}>Aceptar</Button>
                        <ToLink link={"/employees"} color={"bg-grey"}>Cancelar</ToLink>
                    </div>
                </FormContainer>
            </div>
        </div>
    </formContext.Provider>
);  
}




