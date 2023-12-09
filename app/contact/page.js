'use client'

import { useState } from "react";
import PageContainer from "../components/pageContainer";
import { PageTittle } from "../components/text";
import { sendContact } from "../lib/clients";


export default function Page() {
    const [form, setForm] = useState({});
    const [valid, setValid] = useState(true);
    const [confirm, setConfirm] = useState(0);

    const onChange = (e) => {
        const {value, name} = e.target;
        setForm({...form, [name]: value});
        
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if(form['correo'] != form['correo_2']){
            setValid(false);
        }
        else{
            setValid(true);
            try{
                const information = {"destinatario": form.correo, "nombre": form.nombre, "apellido": form.apellido, "pregunta": form.pregunta};
                await sendContact(information);
                setConfirm(1);
            }
            catch{
                setConfirm(2);
            }
        }
    };

    return (
        <PageContainer>
            <div className="text-center"><PageTittle>CONTACTANOS</PageTittle></div>
            <div className="w-full flex flex-col justify-center items-center">
                {confirm == 1 && <div className="bg-blue p-3 px-10 rounded-lg text-white mb-6">¡Correo enviado exitosamente!</div>}
                {confirm == 2 && <div className="bg-darkRed p-3 px-10 rounded-lg text-white mb-6">¡Ha ocurrido un error al intentar enviar el correo! Intentalo más tarde!</div>}
                <form className="w-8/12 text-black flex flex-col justify-center space-y-5 pb-10" onSubmit={handleSend}>
                    <Input type={"text"} form={form} setForm={setForm} name={'asunto'} placeholder={'Asunto'}></Input>
                    <div className="flex space-x-5">
                        <Input type={"text"} form={form} setForm={setForm} name={'nombre'} placeholder={'Nombre'}></Input>
                        <Input type={"text"} form={form} setForm={setForm} name={'apellido'} placeholder={'Apellido'}></Input>
                    </div>
                    
                    <Input type={"email"} form={form} setForm={setForm} name={'correo'} placeholder={'Correo'}></Input>
                    <div>
                        <Input type={"email"} form={form} setForm={setForm} name={'correo_2'} placeholder={'Confimar Correo'}></Input>
                        {valid == false && <div className="text-red">Ambos campos de correo deben ser iguales</div>}
                    </div>
                    <textarea name={'pregunta'} value={form['pregunta']} onChange={onChange} className="border-none p-2 bg-lightGrey w-full h-[200px]" placeholder={'Inquietud'} required></textarea>
                    <div className="flex justify-center"><button disabled={confirm == 1} type="submit" className={"p-3 bg-green rounded-lg font-semibold text-white w-28 " + (confirm==1 && "opacity-25")}>Enviar</button></div>
                </form>
            </div>
        </PageContainer>
    );
};

const Input = ({form, setForm, name, type, placeholder}) => {

    const onChange = (e) => {
        const {value, name} = e.target;
        setForm({...form, [name]: value});
        
    };

    return(
        <>
            <input type={type} className="bg-lightGrey p-2 w-full" placeholder={placeholder} required onChange={onChange} name={name} value={form[name]}></input>
        </>
    );
};

