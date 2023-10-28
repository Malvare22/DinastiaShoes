import { Button } from "../../components/buttons";
import { FormContainer } from "../../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputText } from "../../components/forms/inputs";
import { LabelInput, TitleInput} from "../../components/text";

export default function Register() {

  return (
    <FormContainer>
      <TitleInput>
          Recuperar Contraseña
      </TitleInput>
      <LabelInput>Escriba su nueva contraseña</LabelInput>
      <InputEmail></InputEmail>
      <LabelInput>Confirme su contraseña</LabelInput>
      <InputEmail></InputEmail>
      <div className="flex justify-center">
        <Button color="bg-orange">Cambiar Contraseña</Button>
      </div>
    </FormContainer>
  )
}
 


