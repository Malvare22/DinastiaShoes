'use client'
import { useState } from "react";
import { Button } from "../components/buttons";
import { FormContainer } from "../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterEmail, InputText } from "../components/forms/inputs";
import { AText, LabelInput, TitleInput} from "../components/text";
import { sendLogin, validateInformation } from "../lib/information";

const FrameMessage = () => {
  return(
    <div className="bg-darkRed rounded-md text-white text-font-semibold text-center text-base mx-14 p-2">
        Los datos ingresados no coinciden con la información presente en el sistema
    </div>
  );
}

const infoBase = {
  "correo" : "",
  "contrasenia" : "",
}

const validateBase = {
  "correo" : false,
  "contrasenia" : false,
}

export default function Register() {

  const [information, setInformation] = useState(infoBase);
  const [validate, setValidate] = useState(validateBase);
  const [showFail, setShowFail] = useState(false);

  const handleButton = () =>{
    if(!validateInformation(information)){
      setShowFail(true);
    }
    else{
        sendLogin(information);
    }
  }


  return (
    <FormContainer>
      <TitleInput>
          Iniciar Sesión
      </TitleInput>
      <LabelInput>Correo electrónico</LabelInput>
      <InputEmail information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"correo"}></InputEmail>

      <LabelInput>Contraseña</LabelInput>
      <InputPassword information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"contrasenia"}></InputPassword>
      {showFail && <FrameMessage></FrameMessage>}
      <div className="flex">
        <h4>¿No tienes una cuenta?</h4>
        <AText link="/register">Registro</AText>
      </div>

      <div className="flex">
        <h4>¿Olvidaste tu contraseña?</h4>
        <AText link="/recovery">Recuperar contraseña</AText>
      </div>
      
      <div className="flex justify-center">
        <Button handleButton={handleButton} color="bg-orange">Ingresar</Button>
      </div>
    </FormContainer>
  )
}
 


