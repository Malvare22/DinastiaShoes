'use client'
import { useState } from "react";
import { Button, FormButton } from "../components/buttons";
import { FormContainer } from "../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterEmail, InputRegisterPassword, InputText } from "../components/forms/inputs";
import { LabelInput, TitleInput} from "../components/text";
import { sendRegister, validateInformation, verifyRegister } from "../lib/information";
import Modal, { ModalCloseButton } from "../components/modal";

const infoBase = {
  "correo" : "",
  "contrasenia" : "",
  "contrasenia_2" : "",
  "nombre" : "",
  "apellido" : "",
  "fecha" : "",
  "genero" : ""
};

const validateBase = {
  "correo" : false,
  "contrasenia" : false,
  "nombre" : false,
  "apellido" : false,
  "fecha" : false,
  "genero" : false
};



export default function Register() {
  
  const [information, setInformation] = useState(infoBase);
  const [validate, setValidate] = useState(validateBase);
  const [isVisible, setIsVisible] = useState(true);
  
  const handleButton = () =>{
    if(validateInformation(information)){
      setIsVisible(true);
    }
  }

  const btn = {
    text: "Registrar",
    make: handleButton,
    color: "bg-blue"
  };

  
  return (
    <FormContainer>
      <Modal isVisible={isVisible} setIsVisible={setIsVisible} text={"¿Está seguro de que desea crear un usuario con los datos ingresados?"} button={btn}></Modal>
      <TitleInput>
          Registrar
      </TitleInput>
      <LabelInput>Correo electrónico</LabelInput>
      <InputRegisterEmail information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"correo"}></InputRegisterEmail>

      <InputRegisterPassword information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput1={"contrasenia"} nameInput2={"contrasenia_2"}></InputRegisterPassword>

      <LabelInput>Nombres</LabelInput>
      <InputText information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"nombre"}></InputText>

      <LabelInput>Apellidos</LabelInput>
      <InputText information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"apellido"}></InputText>

      <LabelInput>Fecha de nacimiento</LabelInput>
      <InputDate information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"fecha"}></InputDate>

      <LabelInput>Seleccione su sexo</LabelInput>
      <InputGenre information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"genero"}></InputGenre>

      
      <div className="flex justify-center">
        <FormButton handleButton={handleButton} color="bg-orange" disable={!(validateInformation(validate))} >Registrar</FormButton>
      </div>
    </FormContainer>
  )
}
 


