'use client'
import { createContext, useContext } from "react";
import { LabelInput } from "../text";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterPassword, InputText, SquareSelect } from "./inputs";
import { formContext } from "../context";

/**
 * Type = editingUser
 */
export const FormContainer = (props) => {

    const {type} = props;
    let w, my;
    // if(!w) w = "w-5/12";
    // if(!my) my = "my-20";
  
    if(type=="register" || type=="login"){
      w = "w-5/12";
      my = "my-20";
    }
    else if(type=="editingByAdmin"){
      w = "";
      my = "";
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
 * types puede ser : "register", "editByUser", "editByAdmin", "editByAdmin"
 */
export const FormStandar = (props) => {

  const {type} = props;
  const {information} = useContext(formContext);

  return(
    <>
        <div className="flex align-middle items-start mt-5">
          <LabelInput>Correo electrónico</LabelInput>
        </div>
        <InputEmail type={type} nameInput={"correo"} className=""></InputEmail>

        {(type=="register") && <InputRegisterPassword  nameInput1={"contrasenia"} nameInput2={"contrasenia_2"}></InputRegisterPassword>}

        <LabelInput>Nombres</LabelInput>
        <InputText nameInput={"nombres"}></InputText>

        <LabelInput>Apellidos</LabelInput>
        <InputText nameInput={"apellidos"}></InputText>

        <LabelInput>Fecha de nacimiento</LabelInput>
        <InputDate nameInput={"fecha_nacimiento"}></InputDate>

        <LabelInput>Género</LabelInput>
        <InputGenre nameInput={"sexo"}></InputGenre>

        {type=="editingUser" && information.rol != "cliente" && <><LabelInput>Rol</LabelInput>
        <LabelInput>{information.rol}</LabelInput></>}

        {type=="editByAdmin" && <><LabelInput>Administrar Inventario</LabelInput>
        <div className="flex justify-center">
          <SquareSelect nameInput="inventario" select={false}></SquareSelect>
        </div>

        <LabelInput>Administrar Ventas</LabelInput>
        <div className="flex justify-center">
          <SquareSelect nameInput="pedidos" select={false}></SquareSelect>
        </div></>}

    </>
  );
}