'use client'
import { useContext, useState } from "react";
import { Button } from "../components/buttons";
import { FormContainer } from "../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterEmail, InputText } from "../components/forms/inputs";
import { AText, LabelInput, TitleInput} from "../components/text";
import { sendLogin, validateInformation } from "../lib/information";
import { formContext } from "../components/context";
import { login } from "../lib/users";
import { useRouter } from "next/navigation";
import { SessionContext } from "../components/template";
import useLocalStorage, { saveLocalStorage } from "../components/hooks/useLocalStorage";

/***
 * Mensaje de error en el logeo por datos incorrectos
 */
const FrameMessage = () => {
  return(
    <div className="bg-darkRed rounded-md text-white text-font-semibold text-center text-base mx-14 p-2">
        Los datos ingresados no coinciden con la información presente en el sistema
    </div>
  );
}

const infoBase = {
  "usuario" : "",
  "password" : "",
}

const validateBase = {
  "usuario" : false,
  "password" : false,
}

export default function Register() {
  const {sessionFlag, setSessionFlag} = useContext(SessionContext);
  const [information, setInformation] = useState(infoBase);
  const [validate, setValidate] = useState(validateBase);
  const [showFail, setShowFail] = useState(false);
  const router = useRouter();

  /**
   * Boton de ejecutar acción de logearse
   */
  const handleButton = async () =>{
    if(!validateInformation(validate)){
      setShowFail(true);
    }
    else{
        const ans = await login(information);
        if(!ans.error){
          saveLocalStorage("token", ans.token);
          saveLocalStorage("type", (ans.usuario).tipo);
          saveLocalStorage("id", (ans.usuario).cedula);
          saveLocalStorage("names", ((ans.usuario).nombres.split(" "))[0] + " " + ((ans.usuario).apellidos.split(" "))[0]);
          setSessionFlag(!sessionFlag);
          if((ans.usuario).tipo == 'C') router.push("/");
          else router.push("/menu");
        }
        else{
          setShowFail(true);
        }
    }
  }


  return (
    <FormContainer type={"login"}>
      <formContext.Provider value={{information, setInformation, validate, setValidate}}>
        <div className="space-y-6 my-6">
          <TitleInput>Iniciar Sesión</TitleInput>
          <LabelInput>Correo electrónico</LabelInput>
          <InputEmail nameInput={"usuario"}></InputEmail>
          <LabelInput>Contraseña</LabelInput>
          <InputPassword nameInput={"password"} type={"login"}></InputPassword>

          {/* Mensaje de Error */}
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
            <Button handleButton={handleButton} disable={!validateInformation(validate)} color="bg-orange">Ingresar</Button>
          </div>
        </div>
      </formContext.Provider>
    </FormContainer>
  )
}
 


