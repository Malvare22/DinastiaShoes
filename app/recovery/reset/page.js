'use client'
import { useState } from "react";
import { Button, FormButton } from "../../components/buttons";
import { FormContainer } from "../../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterPassword, InputText } from "../../components/forms/inputs";
import { LabelInput, TitleInput} from "../../components/text";
import { sendChangePassword, validateInformation } from "@/app/lib/information";
import { useRouter, useSearchParams } from "next/navigation";
import { formContext } from "../../components/context";


export default function ResetPassword() {

  const router = useRouter();

  const usp = useSearchParams();
  const id = usp.get('token');

  const handleButton = () =>{
    if(validate){
      sendChangePassword(information.contrasen, id);
      
      router.push("/recovery/reset/confirm");

    }
  }
  
  const [information, setInformation] = useState({'contrasen': "", 'contrasen_2':""});
  const [validate, setValidate] = useState(false);
  return (
    <FormContainer type={'register'}>
      <TitleInput>
          Recuperar Contraseña
      </TitleInput>
      <formContext.Provider value={{information, setInformation, validate, setValidate}}>
        <InputRegisterPassword nameInput1='contrasen' nameInput2='contrasen_2'></InputRegisterPassword>
      </formContext.Provider>
      <div className="flex justify-center">
      <Button handleButton={handleButton} color="bg-orange" disable={!(validateInformation(validate))} >Cambiar contraseña</Button>
      </div>
    </FormContainer>
  )
}
 


