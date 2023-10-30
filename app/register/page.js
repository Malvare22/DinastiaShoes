'use client'
import { useState } from "react";
import { Button, FormButton } from "../components/buttons";
import { FormContainer, FormStandar } from "../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterEmail, InputRegisterPassword, InputText } from "../components/forms/inputs";
import { LabelInput, TitleInput} from "../components/text";
import { infoBase, sendRegister, validateBase, validateInformation, verifyRegister } from "../lib/information";
import Modal, { ModalCloseButton } from "../components/modal";

export default function Register() {
  
  const [information, setInformation] = useState(infoBase);
  const [validate, setValidate] = useState(validateBase);
  const [isVisible, setIsVisible] = useState(true);
  
  const handleButton = () =>{
    if(validateInformation(information)){
      setIsVisible(true);
    }
  }

  const makeTheSend = () =>{
    sendRegister(information);
  }

  const btn = {
    text: "Registrar",
    make: makeTheSend,
    color: "bg-blue"
  };

  
  return (
    <FormContainer>
      <Modal isVisible={isVisible} setIsVisible={setIsVisible} text={"¿Está seguro de que desea crear un usuario con los datos ingresados?"} button={btn}></Modal>
      <div className="space-y-6 my-6">
        <TitleInput>
            Registrar
        </TitleInput>
        <FormStandar information={information} setInformation={setInformation} type={"register"} validate={validate} setValidate={setValidate}></FormStandar>

        
        <div className="flex justify-center">
          <FormButton handleButton={handleButton} color="bg-orange" disable={!(validateInformation(validate))} >Registrar</FormButton>
        </div>
      </div>
    </FormContainer>
  )
}
 


