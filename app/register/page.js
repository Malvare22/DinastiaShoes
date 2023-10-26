import { Button } from "../components/buttons";
import { FormContainer } from "../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputText } from "../components/forms/inputs";
import { LabelInput, TitleInput} from "../components/text";

export default function Register() {

  return (
    <FormContainer>
      <TitleInput>
          Registrar
      </TitleInput>
      <LabelInput>Correo electrónico</LabelInput>
      <InputEmail></InputEmail>

      <LabelInput>Contraseña</LabelInput>
      <InputPassword></InputPassword>
      
      <LabelInput>Confirmar contraseña</LabelInput>
      <InputPassword></InputPassword>

      <LabelInput>Nombres</LabelInput>
      <InputText></InputText>

      <LabelInput>Apellidos</LabelInput>
      <InputText></InputText>

      <LabelInput>Fecha de nacimiento</LabelInput>
      <InputDate></InputDate>

      <LabelInput>Seleccione su sexo</LabelInput>
      <InputGenre></InputGenre>

      
      <div className="flex justify-center">
        <Button>Registrar</Button>
      </div>
    </FormContainer>
  )
}
 


