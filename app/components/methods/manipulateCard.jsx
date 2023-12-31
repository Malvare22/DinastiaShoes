'use client'
import { Button, FileButton, ToLink } from "@/app/components/buttons";
import { Card } from "@/app/components/methods/card";
import Modal from "@/app/components/modal";
import { PageTittle } from "@/app/components/text";
import { createMethod, editMethod, getMethodById } from "@/app/lib/methods";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "../forms/inputs";

const TrashIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
};

const PaintIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-palette-fill" viewBox="0 0 16 16">
    <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
  </svg>
};

const ColorInput = ({data, setData}) => {

    const colorSelector = useRef(); 


    const handleInput = () => {
        colorSelector.current.click(); 
    };

    const changeColor = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    return (
    <>
        <input type="color" className="invisible w-0" onChange={changeColor} name="color" ref={colorSelector}></input>
        <div className="bg-standardWhite border rounded-lg w-5/12 flex justify-center items-center align-middle space-x-2" onClick={handleInput}>
            <h3>{data.color}</h3>
            <PaintIcon></PaintIcon>
         </div>
    </>);
};

const dataTemplate = {
    nombre: "",
    color: "",
    logo: "",
    qr: "",
    info: "",
    id: "",
};

export default function ManipulateCard({id, type}){
    
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    
    const [data, setData] = useState(dataTemplate);
    const [flag, setFlag] = useState({qr: false, logo: false});
    const [msg, setMsg] = useState("");

    const getMethod = async () => {
        let aux;
        aux = await getMethodById(id); 
        setData(aux);
        setMsg("¿Está seguro de que desea modificar el método de pago?");
    };

    useEffect(
        () => {
            if(type=="register"){
                setMsg("¿Está seguro de que desea crear el método de pago?");
            }
            else{ 
                getMethod();
            };
        }, []
    );  
    

    const validation = () => {
        if(data.info=="" || data.logo == "" || data.qr == "") return false;
        return true;
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
    
        // Carga la imagen
        const reader = new FileReader();
        reader.onload = () => {
          setData({...data, [e.target.name] : reader.result});
        };
        setFlag({...flag, [e.target.name]: true});
        reader.readAsDataURL(file);
      };

    const removeQR = () => {
        setData({...data, ["qr"]: ""});
    };

    const limitRows = (e) => {
        const lines = e.target.value.split('\n');

        // Limitar el número de líneas
        if (lines.length <= 5) {
            setData({...data, ['info'] : e.target.value});
        }
    };

    const handleInput = (e) => {

        const {name, value} = e.target;
        setData({...data, [name]: value});
        
    };

    const sendQueryMethod = async () => {

        if(!validation()) return;
        
        if(type=='register'){
            try{
                setVisible(false);
                await createMethod(data);
                router.push('/methods');
            }
            catch(error){
                alert(error);
            }
        }
        else{
            try{
                setVisible(false);
                await editMethod(data, flag);
                router.push('/methods');
            }        
            catch(error){
                alert(error)
            }    
        }
 
    };


    const btn = {
        "make" : sendQueryMethod,
        "text" : "Aceptar",
        "color" : "bg-green"
    };

    return(
        <div className="mx-12">
            <PageTittle>MEDIOS DE PAGO</PageTittle>
            {visible && <div className="text-black"><Modal text={msg} button={btn} setIsVisible={setVisible}></Modal></div>}
            <div className="md:flex md:justify-center md:space-x-28 mb-10">
                <div>
                    <Card data={data}></Card>
                </div>
                <div className="space-y-8 text-black font-semibold flex flex-col justify-center">
                    <div className="flex space-x-6">
                        <div>Nombre:</div>
                        <input className="border rounded-lg" value={data.nombre} name="nombre" onChange={handleInput}></input>
                    </div>
                    <FileButton text={"Logo del medio de pago"} name={"logo"} handleButton={handleImage} type={1}></FileButton>
                    <div className="flex items-center space-x-5">
                        <FileButton text={"Imagen adicional"} name={"qr"} handleButton={handleImage} type={1}></FileButton>
                        <div onClick={removeQR}><TrashIcon></TrashIcon></div>
                    </div>
                    <div className="flex space-x-5">
                        <h3>Color de fondo:</h3>
                        <ColorInput data={data} setData={setData}></ColorInput>
                    </div>
                    <div className="flex space-x-5">
                        <h3>Texto:</h3>
                        <textarea rows={5} className="border rounded-lg w-[250px]" value={data.info} onChange={limitRows}></textarea>
                    </div>
                    <div className="flex space-x-5">
                        <Button color="bg-green" disable={!validation()} handleButton={()=> setVisible(true)}>Aceptar</Button>
                        <ToLink link="/methods" color="bg-grey">Cancelar</ToLink>
                    </div>
                </div>
            </div>
        </div>
    );
};