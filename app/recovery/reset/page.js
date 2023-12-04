'use client'
import { useState } from "react";
import { Button, FormButton } from "../../components/buttons";
import { FormContainer } from "../../components/forms/container";
import { InputDate, InputEmail, InputGenre, InputPassword, InputRegisterPassword, InputText } from "../../components/forms/inputs";
import { LabelInput, TitleInput} from "../../components/text";
import { sendChangePassword, validateInformation } from "@/app/lib/information";
import { useRouter, useSearchParams } from "next/navigation";
import { formContext } from "../../components/context";

const defaultData = {
  'contrasen': '',
  'contrasen_2': ''
}

export default function ResetPassword() {

  const [information, setInformation] = useState(defaultData);
  const [validate, setValidate] = useState(false);
  const router = useRouter();

  const usp = useSearchParams();
  const id = usp.get('token');
  const handleButton = async () => {
    if(validate){
      try{
        await sendChangePassword(information, id);
      
        router.push("/recovery/reset/confirm");
      }
      catch(error){
        alert(error);
      }

    }
  };
  
  
  return (
    <FormContainer type={'register'}>
      <TitleInput>
          Recuperar Contraseña
      </TitleInput>
      <formContext.Provider value={{information, setInformation, validate, setValidate}}>
        <InputRegisterPassword nameInput1='contrasen' nameInput2='contrasen_2'></InputRegisterPassword>
      </formContext.Provider>
      <div className="flex justify-center">
      <Button handleButton={handleButton} color="bg-orange" disable={!validate} >Cambiar contraseña</Button>
      </div>
    </FormContainer>
  )
}
 


