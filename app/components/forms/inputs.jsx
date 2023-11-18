'use client'

import { useCallback, useContext, useEffect, useState } from "react";
import { LabelInput } from "../text";
import { Button, FormButton } from "../buttons";
import { ModalCloseButton } from "../modal";
import { formContext } from "./../context";

//Los componentes hacen referencia a los campos de registro, los que poseen Register los diferencia de aquellos que son los del login

export const InputDate = (props) => {
    const {nameInput} = props;
    const {information, setInformation, validate, setValidate, editing} = useContext(formContext);

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
        <div className="space-y-5">
            <input type="date" value={information[nameInput]} disabled={editing==false} required className={"w-full rounded-lg"} onChange={handleInput}></input>
            {(information[nameInput] != "" && !validate[nameInput] )&& <div className="text-orange text-sm">La información no corresponde a un campo valido</div>}
        </div>
    );
}

export const InputText = (props) => {
    const {nameInput} = props;
    const {information, setInformation, validate, setValidate, editing} = useContext(formContext);

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
        <div className="space-y-5">
            <input type="text" value={information [nameInput]} disabled={editing==false} required className={"w-full rounded-lg"} onChange={handleInput}></input>
            {(information [nameInput] != "" && !validate[nameInput] )&& <div className="text-orange text-sm">La información no corresponde a un campo valido</div>}
        </div>
    );
}

export const InputGenre = (props) => {
    const {nameInput} = props;
    const {information, setInformation, validate, setValidate, editing} = useContext(formContext);


    const verify = (info) => {
        return (info=='M' || info=='F');
    }

    const handleInput = (e) => {
        const info = e.target.value;
        setInformation({...information, [nameInput] : info});
        setValidate({...validate, [nameInput] : verify(info)});
        
    }

    return(
        <div className="space-y-5">
            {editing==false? <input className="w-full rounded-lg" disabled="true" value={information[nameInput] == 'M' ? "Masculino":"Femenino" }>
            </input>: 
            <select value={information[nameInput]} className={"w-full rounded-lg"} disabled={editing==false} onChange={handleInput}>
                <option value="" disabled selected hidden>Selecciona...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
            </select>}
            {editing == true && (information [nameInput] != "" && !validate[nameInput] )&& <div className="text-orange text-sm">La información no corresponde a un campo valido</div>}
        </div>
    );
}


export const InputEmail = (props) => {

    const {nameInput, type} = props;

    const {information, setInformation, validate, setValidate, editing} = useContext(formContext);


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
        <div className="space-y-5">
            <input type="email" value={information [nameInput]} disabled={editing==false} required onChange={handleInput} className={"w-full rounded-lg"}></input>
            {(type != "login" && "" != information[nameInput] && !validate[nameInput]) && <div className="text-orange text-sm">La información no corresponde a un campo valido</div>}
        </div>
        
    );
}

const passwordRegex = /^[a-zA-Z0-9!@#$%^*()_+-={}|~][a-zA-Z0-9!@#$%^*()_+-={}|~]{8,}$/; 

export const InputRegisterPassword = (props) => {

    const {nameInput1, nameInput2} = props;

    const {information, setInformation, validate, setValidate} = useContext(formContext);

    const verify = (info) => {
        const regex = passwordRegex;
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
            <div className="space-y-5">
                <LabelInput>Contraseña</LabelInput>
                <input required type="password" name={nameInput1} onChange={handleInput} className="w-full rounded-lg"></input>
                {(information[nameInput1] != "" && !validate[nameInput1]) && <div className="text-orange text-sm">La información no corresponde a un campo valido</div>}
            </div>
            <div className="space-y-5">
                <LabelInput>Confirmar Contraseña</LabelInput>
                <input required type="password" name={nameInput2} onChange={handleInput} className="w-full rounded-lg"></input>
                {(information[nameInput2] != "" && !validate[nameInput1]) && <div className="text-orange text-sm">Ambas contraseñas deben ser iguales</div>}
            </div>
        </div>
    );
}

/**
 * Es el contenido de la ventana modal de cambiar contraseña
 * Componente usado en la edición de perfiles propios
 */
export const InputChangePassword = (props) => {

    const {setInformation, information, editing} = useContext(formContext);
    const {setIsVisible} = props;

    const [temporal, setTemporal] = useState({});
    const [temporalVerify, setTemporalVerify] = useState(false);

    const verify = (info) => {
        const regex = passwordRegex;
        return regex.test(info["contrasenia"]) && temporal["contrasenia"] && (info["contrasenia"] == info["contrasenia_2"]);
    }

    const handleInput = (e) => {
        const {value, name} = e.target;
        const info = {...temporal, [name]: value};
        setTemporal(info);
        setTemporalVerify(verify(info));
    }

    /***
     * Efectua el cambio en la información externa temporal
     */
    const handleInformation = () => {
        if(verify(temporal)){
            setInformation({...information, ["contrasenia"] : temporal.contrasenia});
            setIsVisible(false);
        }
    }

    return(
        <div className="space-y-5">
            <div className="space-y-5">
                <LabelInput>Contraseña</LabelInput>
                <input required type="password" name={"contrasenia"} onChange={handleInput} className="w-full rounded-lg"></input>
                {(temporal["contrasenia"] && !temporalVerify)&& <div className="text-orange text-sm">La información no corresponde a un campo valido</div>}
            </div>
            <div className="space-y-5">
                <LabelInput>Confirmar Contraseña</LabelInput>
                <input required type="password" name={"contrasenia_2"} onChange={handleInput} className="w-full rounded-lg"></input>
                {temporal["contrasenia"] && !temporalVerify && <div className="text-orange text-sm">Ambas contraseñas deben ser iguales</div>}
            </div>
            <div className="flex space-x-10 justify-center">
                <Button disable={!verify(temporal)} handleButton={handleInformation} color={"bg-blue"}>Aceptar</Button>
                <Button color="bg-grey" handleButton={() => setIsVisible(false)}>Cancelar</Button>
            </div>
        </div>
    );
};

export const InputPassword = (props) => {

    const {nameInput, type} = props;
    const {information, setInformation, validate, setValidate} = useContext(formContext);

    const verify = (info) => {
        const regex = passwordRegex;
        return regex.test(info[nameInput]);
    }

    const handleInput = (e) => {
        const {value} = e.target;
        const info = {...information, [nameInput] : value};
        setInformation(info);
        setValidate({...validate, [nameInput] : verify(info)});
    }

    return(
        <div className="space-y-5">
            <input required type="password" onChange={handleInput} className="w-full rounded-lg"></input>
            {type!="login" && information[nameInput] && !validate[nameInput] && <div className="text-orange text-sm">Error</div>}
        </div>
    );
}

const Mark = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-check2" viewBox="0 0 16 16">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
  </svg>;
}

const MarkSmall = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="white" className="bi bi-check2" viewBox="0 0 16 16">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
  </svg>;
}

export const SquareSelect = (props) => {

    const {select, nameInput} = props;

    const {information, setInformation} = useContext(formContext);

    const [mark, setMark] = useState(select);

    const handleSelect = () => {
        setMark(!mark);
        setInformation({...information, [nameInput]: !mark});
    };

    return(
        <div>
            <div className="bg-black rounded-lg w-[60px] h-[60px] flex items-center justify-center" onClick={handleSelect}><div className={`${mark ? "": "hidden"}`}><Mark></Mark></div></div>
            
        </div>
    );
};

export const SquareSelectSmall = (props) => {

    const {select, nameInput} = props;

    const {information, setInformation} = useContext(formContext);

    const [mark, setMark] = useState(select);

    const handleSelect = () => {
        setMark(!mark);
        setInformation({...information, [nameInput]: !mark});
    };

    return(
        <div>
            <div className="bg-black rounded-lg w-[30px] h-[30px] flex items-center justify-center" onClick={handleSelect}><div className={`${mark ? "": "hidden"}`}><MarkSmall></MarkSmall></div></div>
            
        </div>
    );
};



export const Input = (props) => {
    const {nameInput, errorMessage, verification, type} = props;
    const {information, setInformation, validate, setValidate} = useContext(formContext);

    const handleInput = ((e) => {
        const info = e.target.value;
        setInformation({...information, [nameInput] : info});
        setValidate({...validate, [nameInput] : verification(info)});
        
    });

    return(
        <div className="space-y-5">
            <input type={type} value={information [nameInput]} required className={"w-full rounded-lg border"} onChange={handleInput}></input>
            {(information [nameInput] != "" && !validate[nameInput] )&& <div className="text-orange text-sm">{errorMessage}</div>}
        </div>
    );
}
