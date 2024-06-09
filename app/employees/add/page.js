'use client'

import { useState } from "react";
import { formContext } from "../../components/context";
import { DateInputFormat, ValidTypes, registerUser, registerUserByAdmin, validateInformation, validateRegisterUser, validateRegisterUserByAdmin } from "@/app/lib/information";
import { PageTittle } from "@/app/components/text";
import { FormContainer, FormStandar } from "@/app/components/forms/container";
import Modal from "@/app/components/modal";
import { Button, ToLink } from "@/app/components/buttons";
import { useRouter } from "next/navigation";
import { addEmployee } from "@/app/lib/employees";

export default function Page() {

    ValidTypes(['A']);


  const [information, setInformation] = useState(
    {
        "cedula":"",
        "nombres":"",
        "apellidos":"",
        "correo":"",
        "contrasen":"P@ssw0rd",
        "sexo":"",
        "fecha_nacimiento":"",
        "inventario":"F",
        "ventas":"F"
    }
  );
  const [validate, setValidate] = useState(
    {
        "cedula":false,
        "nombres":false,
        "apellidos":false,
        "correo":false,
        "sexo":false,
        "fecha_nacimiento":false,
    }
);
  const [viewConfirmation, setViewConfirmation] = useState(false);
  const router = useRouter();
  const sendData = () => {
    const post = async () => {
        const ans = await addEmployee(information);
        console.log(ans);
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
  return(
    <formContext.Provider value={{information, setInformation, validate, setValidate}}>
        <div className="mx-12">
            <PageTittle>AGREGAR EMPLEADO</PageTittle>
            <div>
                <FormContainer>
                    {viewConfirmation && <Modal button={btn} text={"¿Estás seguro de crear al empleado?"} setIsVisible={setViewConfirmation}></Modal>}

                    <div className="grid grid-cols-2 space-y-6 mt-[30px] mb-[20px]">
                        <FormStandar type={"createByAdmin"}></FormStandar>
                    </div>
                    <div className="flex space-x-5 justify-center">
                        <Button handleButton={() => setViewConfirmation(true)} color={"bg-green"} disable={!validateInformation(validate)} >Aceptar</Button>
                        <ToLink link={"/employees"} color={"bg-grey"}>Cancelar</ToLink>
                    </div>
                </FormContainer>
            </div>
        </div>
    </formContext.Provider>
);  
}




