'use client'
import { useState } from "react";
import { Button, FormButton } from "../components/buttons";
import { FormContainer, FormStandar } from "../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterEmail, InputRegisterPassword, InputText } from "../components/forms/inputs";
import { LabelInput, TitleInput} from "../components/text";
import { infoBase, sendRegister, validateInformation, verifyRegister, registerUser, validateRegisterUser } from "../lib/information";
import Modal, { ModalCloseButton } from "../components/modal";
import { formContext } from "../components/context";
import { addClient } from "../lib/clients";

export default function Register() {
  
  const [information, setInformation] = useState({
      "cedula":"",
      "nombres":"",
      "apellidos":"",
      "correo":"",
      "contrasenia":"",
      "contrasenia_2": "",
      "sexo":"",
      "fecha_nacimiento":"",
      "departamento":"",
      "municipio":"",
      "direccion_completa":"",
      "informacion_complementaria":"",
      "telefono":""
  });

  const [validate, setValidate] = useState({
    "cedula":false,
    "nombres":false,
    "apellidos":false,
    "correo":false,
    "contrasenia":false,
    "sexo":false,
    "fecha_nacimiento":false,
    "telefono":false
});
  const [isVisible, setIsVisible] = useState(false);
  
  const handleButton = () =>{
    // if(validateInformation(validate)){
      setIsVisible(true);
    // }
  }

  /**
   * Método que realiza el envío al EndPoint al oprimir el botón
   */
  const makeTheSend = () =>{
    const post = async () => {
      const tmp = await addClient(information);
      if(tmp.error){
        alert(tmp.error);
      }
      else{
        alert("GOOD");
      }
    };

    post();
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
            <Button handleButton={handleButton} color="bg-orange" disable={!validateInformation(validate)}>Registrar</Button>
          </div>
        </div>
      </FormContainer>
    </formContext.Provider>
  )
}
 


