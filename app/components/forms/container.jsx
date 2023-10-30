import { LabelInput } from "../text";
import { InputDate, InputGenre, InputRegisterEmail, InputRegisterPassword, InputText } from "./inputs";

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

  const {information, setInformation, validate, setValidate, type} = props;

  return(
    <>
      <div className="flex align-middle items-end">
        <LabelInput>Correo electrónico</LabelInput>
      </div>
      <InputRegisterEmail information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"correo"}></InputRegisterEmail>

      {(type=="register") && <InputRegisterPassword information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput1={"contrasenia"} nameInput2={"contrasenia_2"}></InputRegisterPassword>}

      <LabelInput>Nombres</LabelInput>
      <InputText information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"nombre"}></InputText>

      <LabelInput>Apellidos</LabelInput>
      <InputText information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"apellido"}></InputText>

      <LabelInput>Fecha de nacimiento</LabelInput>
      <InputDate information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"fecha"}></InputDate>

      <LabelInput>Sexo</LabelInput>
      <InputGenre information={information} setInformation={setInformation} validate={validate} setValidate={setValidate} nameInput={"genero"}></InputGenre>

      {information.rol && information.rol != "cliente" && <><LabelInput>Sexo</LabelInput>
      <LabelInput>{information.rol}</LabelInput></>}
    </>
  );
}