import { Button } from "../../../components/buttons";
import { FormContainer } from "../../../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputText } from "../../../components/forms/inputs";
import { LabelInput, TitleInput} from "../../../components/text";

export default function Register() {

  return (
    <FormContainer>
      <div className="py-10 text-3xl text-center">
        <LabelInput>¡Se ha realizado el cambio de contraseña de manera exitosa!</LabelInput>
      </div>
      <div className="flex justify-center">
        <Button color="bg-orange">Volver al login</Button>
      </div>
    </FormContainer>
  )
}
 


