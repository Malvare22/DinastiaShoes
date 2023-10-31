'use client'
import { createContext, useContext } from "react";
import { LabelInput } from "../text";
import { InputDate, InputGenre, InputPassword, InputRegisterEmail, InputRegisterPassword, InputText } from "./inputs";
import { formContext } from "../context";

/**
 * Type = editingUser
 */
export const FormContainer = (props) => {

    const {type} = props;
    let w, my;
    // if(!w) w = "w-5/12";
    // if(!my) my = "my-20";
  
    if(type!="editingUser"){
      w = "w-5/12";
      my = "my-20";
    }
    else{
      w="w-full pb-10"; 
      my="1";
    }

    return(
        <div className={"flex justify-center " + my}>
          <form className={"text-black text-xl px-10 bg-lightGrey rounded-lg "+ w + " "}>
            {props.children}
          </form>
        </div>
    )
}

/***
 * Corresponde al esquema estádar de edición de usuarios
 * types puede ser : "register", "editByUser", "editByAdmin"
 */
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
        {(type=="editByAdmin") && <InputPassword nameInput="contrasenia"></InputPassword>}

        <LabelInput>Nombres</LabelInput>
        <InputText nameInput={"nombre"}></InputText>

        <LabelInput>Apellidos</LabelInput>
        <InputText nameInput={"apellido"}></InputText>

        <LabelInput>Fecha de nacimiento</LabelInput>
        <InputDate nameInput={"fecha"}></InputDate>

        <LabelInput>Género</LabelInput>
        <InputGenre nameInput={"genero"}></InputGenre>

        {type!="register" && information.rol != "cliente" && <><LabelInput>Rol</LabelInput>
        <LabelInput>{information.rol}</LabelInput></>}

        

    </>
  );
}