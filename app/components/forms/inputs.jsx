'use client'

import { useState } from "react";
import { LabelInput } from "../text";

//Los componentes hacen referencia a los campos de registro, los que poseen Register los diferencia de aquellos que son los del login

export const InputDate = (props) => {

    const {information, setInformation, nameInput, validate, setValidate} = props;

    const verify = (info) => {
        const today = new Date();

        // Obtiene la fecha de nacimiento
        const birthDate = new Date(info);

        // Calcula la edad
        const age = today.getFullYear() - birthDate.getFullYear();

        // Devuelve si la edad es mayor a 18
        return age >= 18;
    }

    const handleInput = (e) => {
        const info = e.target.value;
        setInformation({...information, [nameInput] : info});
        setValidate({...validate, [nameInput] : verify(info)});
    }

    return(
        <div>
            <input type="date" required className="w-full rounded-lg" onChange={handleInput}></input>
            {(information[nameInput] != "" && !validate[nameInput] )&& <div className="text-orange text-sm">La información no corresponde a un campo valido</div>}
        </div>
    );
}

export const InputText = (props) => {

    const {information, setInformation, nameInput, validate, setValidate} = props;

    const handleInput = (e) => {
        const info = e.target.value;
        setInformation({...information, [nameInput] : info});
        setValidate({...validate, [nameInput] : verify(info)});
    }

    function verify(info) {
        // Verifica que el nombre no esté vacío
        info = info.trim();

        if (!info) {
          return false;
        }
      
        // Verifica que el nombre solo tenga letras
        const regex = /^[a-zA-Z ]+$/;
        return regex.test(info);
    }

    return(
        <div>
            <input type="text" required className="w-full rounded-lg" onChange={handleInput}></input>
            {(information [nameInput] != "" && !validate[nameInput] )&& <div className="text-orange text-sm">La información no corresponde a un campo valido</div>}
        </div>
    );
}

export const InputGenre = (props) => {

    const {information, setInformation, nameInput, validate, setValidate} = props;


    const verify = (info) => {
        return (info=='M' || info=='F');
    }

    const handleInput = (e) => {
        const info = e.target.value;
        setInformation({...information, [nameInput] : info});
        setValidate({...validate, [nameInput] : verify(info)});
        
    }

    return(
        <div>
            <select className="w-full rounded-lg" onChange={handleInput}>
                <option value="" disabled selected hidden>Selecciona...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
            </select>
            {(information [nameInput] != "" && !validate[nameInput] )&& <div className="text-orange text-sm">La información no corresponde a un campo valido</div>}
        </div>
    );
}

export const InputEmail = (props) => {
    const {information, setInformation, nameInput, validate, setValidate} = props;


    const verify = (info) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        return regex.test(info);
    }

    const handleInput = (e) => {
        const info = e.target.value;
        setInformation({...information, [nameInput] : info});
        setValidate({...validate, [nameInput] : verify(info)});
    }

    return(
        <div>
            <input type="email" required onChange={handleInput} className="w-full rounded-lg"></input>
        </div>
        
    );
}

export const InputRegisterEmail = (props) => {

    const {information, setInformation, nameInput, validate, setValidate} = props;


    const verify = (info) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        return regex.test(info);
    }

    const handleInput = (e) => {
        const info = e.target.value;
        setInformation({...information, [nameInput] : info});
        setValidate({...validate, [nameInput] : verify(info)});
    }

    return(
        <div>
            <input type="email" required onChange={handleInput} className="w-full rounded-lg"></input>
            {("" != information[nameInput] && !validate[nameInput]) && <div className="text-orange text-sm">La información no corresponde a un campo valido</div>}
        </div>
        
    );
}

const verifyPassword = () => {

} 

export const InputRegisterPassword = (props) => {

    const {information, setInformation, nameInput1, nameInput2, validate, setValidate} = props;

    const verify = (info) => {
        const regex = /^[a-zA-Z0-9!@#$%^*()_+-={}|~][a-zA-Z0-9!@#$%^*()_+-={}|~]{8,}$/;
        return regex.test(info[nameInput1]) && (info[nameInput1] == info[nameInput2]);
    }

    const handleInput = (e) => {
        const {value, name} = e.target;
        const info = {...information, [name] : value};
        setInformation(info);
        const ver =  verify(info);
        setValidate({...validate, [nameInput1] : ver});
    }

    return(
        <div className="space-y-5">
            <div>
            <LabelInput>Contraseña</LabelInput>
            <input required type="password" name={nameInput1} onChange={handleInput} className="w-full rounded-lg"></input>
            {(information[nameInput1] != "" && !validate[nameInput1]) && <div className="text-orange text-sm">La información no corresponde a un campo valido</div>}
            </div>
            <div>
            <LabelInput>Confirmar Contraseña</LabelInput>
            <input required type="password" name={nameInput2} onChange={handleInput} className="w-full rounded-lg"></input>
            {(information[nameInput2] != "" && !validate[nameInput1]) && <div className="text-orange text-sm">Ambas contraseñas deben ser iguales</div>}
            </div>
        </div>
    );
}

export const InputPassword = (props) => {

    const {information, setInformation, nameInput, validate, setValidate} = props;

    const verify = (info) => {
        const regex = /^[a-zA-Z0-9!@#$%^*()_+-={}|~][a-zA-Z0-9!@#$%^*()_+-={}|~]{8,}$/;
        return regex.test(info[nameInput]);
    }

    const handleInput = (e) => {
        const {value} = e.target;
        const info = {...information, [nameInput] : value};
        setInformation(info);
        setValidate({...validate, [nameInput] : verify(info)});
    }

    return(
        <div>
            <input required type="password" onChange={handleInput} className="w-full rounded-lg"></input>
        </div>
    );
}



