import { Button } from "../components/buttons";
import { FormContainer } from "../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputText } from "../components/forms/inputs";
import { AText, LabelInput, TitleInput} from "../components/text";

export default function Register() {

  return (
    <FormContainer>
      <TitleInput>
          Iniciar Sesión
      </TitleInput>
      <LabelInput>Correo electrónico</LabelInput>
      <InputEmail></InputEmail>

      <LabelInput>Contraseña</LabelInput>
      <InputPassword></InputPassword>

      <div className="flex">
        <h4>¿No tienes una cuenta?</h4>
        <AText link="/register">Registro</AText>
      </div>

      <div className="flex">
        <h4>¿Olvidaste tu contraseña?</h4>
        <AText link="/recovery">Recuperar contraseña</AText>
      </div>
      
      <div className="flex justify-center">
        <Button>Ingresar</Button>
      </div>
    </FormContainer>
  )
}
 


