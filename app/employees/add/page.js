'use client'

import { useState } from "react";
import { formContext } from "../../components/context";
import { registerUser, registerUserByAdmin, validateInformation, validateRegisterUser, validateRegisterUserByAdmin } from "@/app/lib/information";
import { PageTittle } from "@/app/components/text";
import { FormContainer, FormStandar } from "@/app/components/forms/container";
import Modal from "@/app/components/modal";
import { Button, ToLink } from "@/app/components/buttons";
import { useRouter } from "next/navigation";

export default function Page() {

  const [information, setInformation] = useState(registerUserByAdmin);
  const [validate, setValidate] = useState(validateRegisterUserByAdmin);
  const [viewConfirmation, setViewConfirmation] = useState(false);
  const router = useRouter();
  const sendData = () => {
    alert("Make!");
    router.push("/employees");
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
                        <FormStandar type={"editByAdmin"}></FormStandar>
                    </div>
                    <div className="flex space-x-5 justify-center">
                        <Button handleButton={() => setViewConfirmation(true)} color={"bg-green"} disable={!(validateInformation(validate))}>Ey</Button>
                        <ToLink link={"/employees"} color={"bg-grey"}>Cancelar</ToLink>
                    </div>
                </FormContainer>
            </div>
        </div>
    </formContext.Provider>
);  
}




