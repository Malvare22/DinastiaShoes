'use client'
import { createContext, useContext } from "react";
import { LabelInput } from "../text";
import { InputDate, InputGenre, InputRegisterEmail, InputRegisterPassword, InputText } from "./inputs";
import { formContext } from "../context";


export const FormContainer = (props) => {

    let {w, my} = props;
    if(w==undefined) w ="w-5/12";
    if(my==undefined) my = "my-20";

    return(
        <div className={"flex justify-center " + my}>
          <form className={"text-black text-xl px-10 bg-lightGrey rounded-lg" + " " + w}>
            {props.children}
          </form>
        </div>
    )
}

export const FormStandar = (props) => {

  const {type} = props;
  const {information} = useContext(formContext);

  console.log(information)

  return(
    <>
        <div className="flex align-middle items-end">
          <LabelInput>Correo electrónico</LabelInput>
        </div>
        <InputRegisterEmail nameInput={"correo"}></InputRegisterEmail>

        {(type=="register") && <InputRegisterPassword  nameInput1={"contrasenia"} nameInput2={"contrasenia_2"}></InputRegisterPassword>}

        <LabelInput>Nombres</LabelInput>
        <InputText nameInput={"nombre"}></InputText>

        <LabelInput>Apellidos</LabelInput>
        <InputText nameInput={"apellido"}></InputText>

        <LabelInput>Fecha de nacimiento</LabelInput>
        <InputDate nameInput={"fecha"}></InputDate>

        <LabelInput>Sexo</LabelInput>
        <InputGenre nameInput={"genero"}></InputGenre>

        {information.rol && type!="register" && information.rol != "cliente" && <><LabelInput>Rol</LabelInput>
        <LabelInput>{information.rol}</LabelInput></>}

    </>
  );
}