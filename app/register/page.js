'use client'
import { useState } from "react";
import { Button } from "../components/buttons";
import { FormContainer } from "../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterEmail, InputRegisterPassword, InputText } from "../components/forms/inputs";
import { LabelInput, TitleInput} from "../components/text";

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

export default function Register() {

  const [information, setInformation] = useState(infoBase);
  const [validate, setValidate] = useState(validateBase);

  return (
    <FormContainer>
      <TitleInput>
          Registrar
      </TitleInput>
      <LabelInput>Correo electrónico</LabelInput>
      <InputRegisterEmail information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"correo"}></InputRegisterEmail>

      <InputRegisterPassword information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput1={"contrasenia"} nameInput2={"contrasenia_2"}></InputRegisterPassword>

      <LabelInput>Nombres</LabelInput>
      <InputText></InputText>

      <LabelInput>Apellidos</LabelInput>
      <InputText></InputText>

      <LabelInput>Fecha de nacimiento</LabelInput>
      <InputDate information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"fecha"}></InputDate>

      <LabelInput>Seleccione su sexo</LabelInput>
      <InputGenre information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"genero"}></InputGenre>

      
      <div className="flex justify-center">
        <Button>Registrar</Button>
      </div>
    </FormContainer>
  )
}
 


