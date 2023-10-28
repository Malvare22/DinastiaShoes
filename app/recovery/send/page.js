import Link from "next/link";
import { Button, ToLink } from "../../components/buttons";
import { FormContainer } from "../../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputText } from "../../components/forms/inputs";
import { LabelInput, TitleInput} from "../../components/text";

export default function Register() {

  return (
    <FormContainer>
      <TitleInput>
        Correo electrónico enviado
      </TitleInput>
      <div className="py-10">
        <LabelInput>Si existe una cuenta asociada al correo electrónico ingresado, se enviará un mensaje para el cambio de la contraseña.</LabelInput>
      </div>
      <div className="flex justify-center">
        <ToLink link="/login" color="bg-orange">Volver</ToLink>
      </div>
    </FormContainer>
  )
}
 


