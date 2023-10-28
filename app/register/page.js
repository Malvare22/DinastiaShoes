'use client'
import { useState } from "react";
import { Button, FormButton } from "../components/buttons";
import { FormContainer } from "../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterEmail, InputRegisterPassword, InputText } from "../components/forms/inputs";
import { LabelInput, TitleInput} from "../components/text";
import { sendRegister, validateInformation, verifyRegister } from "../lib/information";
import Modal from "../components/modal";

const infoBase = {
  "correo" : "",
  "contrasenia" : "",
  "contrasenia_2" : "",
  "nombre" : "",
  "apellido" : "",
  "fecha" : "",
  "genero" : ""
}

const validateBase = {
  "correo" : false,
  "contrasenia" : false,
  "nombre" : false,
  "apellido" : false,
  "fecha" : false,
  "genero" : false
}

const ModalContent = () => {
  return(
    <div>
      <h1>
        ¿Está seguro de que desea registrar un usuario con la información ingresada?
      </h1>
    </div>
  );
}

export default function Register() {
  
  const [information, setInformation] = useState(infoBase);
  const [validate, setValidate] = useState(validateBase);
  const [isVisible, setIsVisible] = useState(false);
  
  const handleButton = () =>{
    if(verifyRegister(information)){
      setIsVisible(true);
    }
  }

  
  return (
    <FormContainer>
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}><ModalContent></ModalContent></Modal>
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
 


