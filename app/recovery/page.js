'use client'
import { useState } from "react";
import { Button, FormButton } from "../components/buttons";
import { FormContainer } from "../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterEmail, InputText } from "../components/forms/inputs";
import { LabelInput, TitleInput} from "../components/text";
import { sendRecoveryEmail, validateInformation } from "../lib/information";
import { useRouter } from "next/navigation";

const infoBase = {
  "correo" : ""
};

const validateBase = {
  "correo" : false
};


export default function Register() {
  
  const [information, setInformation] = useState(infoBase);
  const [validate, setValidate] = useState(validateBase);
  const router = useRouter();

  const handleButton = () => {
    if(validateInformation(validate)){
      sendRecoveryEmail(information);
      
      router.push("/recovery/send");

    }
  }

  return (
    <FormContainer>
      <TitleInput>
          Recuperar Contraseña
      </TitleInput>
      <LabelInput>Correo electrónico</LabelInput>
      <InputRegisterEmail information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"correo"}></InputRegisterEmail>
      <div className="flex justify-center">
        <FormButton handleButton={handleButton} disable={!(validateInformation(validate))} color="bg-orange">Recuperar Contraseña</FormButton>
      </div>
    </FormContainer>
  )
}
 


