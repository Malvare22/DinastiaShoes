'use client'
import { useState } from "react";
import { Button, FormButton } from "../../components/buttons";
import { FormContainer } from "../../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterPassword, InputText } from "../../components/forms/inputs";
import { LabelInput, TitleInput} from "../../components/text";
import { sendChangePassword, validateInformation } from "@/app/lib/information";
import { useRouter } from "next/navigation";

const infoBase = {
  "contrasenia" : "",
  "contrasenia_2" : "",

}

const validateBase = {
  "contrasenia" : false,
}

export default function Register() {

  const router = useRouter();

  const handleButton = () =>{
    if(validateInformation(information)){
      sendChangePassword(information);
      
      router.push("/recovery/reset/confirm");

    }
  }
  
  const [information, setInformation] = useState(infoBase);
  const [validate, setValidate] = useState(validateBase);

  return (
    <FormContainer>
      <TitleInput>
          Recuperar Contraseña
      </TitleInput>
      <InputRegisterPassword information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput1={"contrasenia"} nameInput2={"contrasenia_2"}></InputRegisterPassword>
      <div className="flex justify-center">
      <FormButton handleButton={handleButton} color="bg-orange" disable={!(validateInformation(validate))} >Cambiar contraseña</FormButton>
      </div>
    </FormContainer>
  )
}
 


