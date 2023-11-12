'use client'
import { useState } from "react";
import { Button, FormButton } from "../components/buttons";
import { FormContainer, FormStandar } from "../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterEmail, InputRegisterPassword, InputText } from "../components/forms/inputs";
import { LabelInput, TitleInput} from "../components/text";
import { infoBase, sendRegister, validateInformation, verifyRegister, registerUser, validateRegisterUser } from "../lib/information";
import Modal, { ModalCloseButton } from "../components/modal";
import { formContext } from "../components/context";

export default function Register() {
  
  const [information, setInformation] = useState(registerUser);
  const [validate, setValidate] = useState(validateRegisterUser);
  const [isVisible, setIsVisible] = useState(false);
  
  const handleButton = () =>{
    if(validateInformation(validate)){
      setIsVisible(true);
    }
  }

  /**
   * Método que realiza el envío al EndPoint al oprimir el botón
   */
  const makeTheSend = () =>{
    sendRegister(information);
  }

  const btn = {
    text: "Registrar",
    make: makeTheSend,
    color: "bg-blue"
  };

  return (
    <formContext.Provider value={{information, setInformation, validate, setValidate, isVisible, setIsVisible}}>
      <FormContainer type={"register"}>
        {isVisible && <Modal setIsVisible={setIsVisible} text={"¿Está seguro de que desea crear un usuario con los datos ingresados?"} button={btn}></Modal>}
        <div className="space-y-6 my-6">
          <TitleInput>
              Registrar
          </TitleInput>
          <FormStandar type={"register"}></FormStandar>
          <div className="flex justify-center">
            <Button handleButton={handleButton} color="bg-orange" disable={!(validateInformation(validate))} >Registrar</Button>
          </div>
        </div>
      </FormContainer>
    </formContext.Provider>
  )
}
 


