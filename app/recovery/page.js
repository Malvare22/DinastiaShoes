'use client'
import { useState } from "react";
import { Button, FormButton } from "../components/buttons";
import { FormContainer } from "../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterEmail, InputText } from "../components/forms/inputs";
import { LabelInput, TitleInput} from "../components/text";
import { sendRecoveryEmail, validateInformation } from "../lib/information";
import { useRouter } from "next/navigation";
import { checkEmail } from "../components/forms/verifications";


export default function Register() {
  
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleButton = async () => {
    if(checkEmail(email)){
      await sendRecoveryEmail(email);
      
      router.push("/recovery/send");

    }
  }

  return (
    <FormContainer type={"register"}>
      <TitleInput>
          Recuperar Contraseña
      </TitleInput>
      <LabelInput>Correo electrónico</LabelInput>
      <input className="my-6 w-full rounded-md" value={email} onChange={(e)=> {setEmail(e.target.value);}}></input>
      <div className="flex justify-center">
        <Button handleButton={handleButton} disable={!checkEmail(email)} color="bg-orange">Recuperar Contraseña</Button>
      </div>
    </FormContainer>
  )
}
 


