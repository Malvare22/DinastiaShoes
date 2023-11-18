'use client'
import { useState } from "react";
import { checkNumber, checkText, messageNumber, messageText } from "../forms/verifications";
import { formContext } from "../context";
import { LabelInput } from "../text";
import { Input } from "../forms/inputs";
import { Button, ImageButton } from "../buttons";
import { template_tx } from "@/app/lib/inventories";

/***
 * Type 1 = registrar nuevo producto sin inventario
 * Type 2 = registrar nuevo producto con inventario
 * Type 3 = editar producto existente
 */
export const AddInventory = ({setVisible, type}) => {

    //Es necesario cambiar los datos que se ingresan si ya existe el producto 
    let data = template_tx;
    let handleAction;
    if(type == 1) {
        handleAction = () => {
            alert("Nuevo producto registrado");
            setVisible(false);
        };
    };
    if(type == 2) {

    };
    if(type == 3) {

    };
    const [information, setInformation] = useState(data);

    const [validate, setValidate] = useState({});

    const [images, setImages] = useState([]);

    const handleImage = (e) => {
        const file = e.target.files[0];
    
        // Verifica que el archivo sea una imagen
        if (!file.type.startsWith("image/")) {
          return;
        }
    
        // Carga la imagen
        const reader = new FileReader();
        reader.onload = () => {
            setImages([... images,  reader.result]);
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    const removeImage = (index) => {
        let aux = [...images];
        aux.splice(index, 1);
        setImages(aux);
    };

    const handleTextArea = (e) => {
        const a = e.target.name;
        setInformation({...information, [a]: e.target.value});
    };

    return(
        <div>
            <div className="flex text-black space-x-12">
                <div className="w-6/12 md:grid md:grid-cols-6 space-y-8">
                <formContext.Provider value={{information, setInformation, validate, setValidate}}>
                   
                    {type!=3 && <><div className="mt-8"><LabelInput>Nombre:</LabelInput></div>
                    <div className="ml-4 col-span-5"><Input nameInput={"nombre"} type={"text"} errorMessage={messageText} verification={checkText}></Input></div></>}
                    <div className="mt-8"><LabelInput>Precio:</LabelInput></div>
                    <div className="ml-4 col-span-5"><Input nameInput={"precio"} type={"number"} errorMessage={messageNumber} verification={checkNumber}></Input></div>
                    <LabelInput>Color:</LabelInput>
                    <div className="ml-4 col-span-5"><Input nameInput={"color"} type={"text"} errorMessage={messageText} verification={checkText}></Input></div>
                    <LabelInput>Talla:</LabelInput>
                    <div className="ml-4 col-span-5"><Input nameInput={"talla"} type={"number"} errorMessage={messageNumber} verification={checkNumber}></Input></div>
                    <LabelInput>Cantidad:</LabelInput>
                    <div className="ml-4 col-span-5"><Input nameInput={"cantidad"} type={"number"} errorMessage={messageNumber} verification={checkNumber}></Input></div>
                    {type==3 && <><LabelInput>Descuento:</LabelInput><div className="ml-4 flex col-span-5 w-24"><Input nameInput={"descuento"} type={"number"} errorMessage={messageNumber} verification={checkNumber}></Input><div className="mx-2">%</div></div></>}
                    {type!=3 && <><LabelInput>Descripción:</LabelInput>
                    <div className="col-span-5 ml-4" onChange={handleTextArea}><textarea className="border w-full"></textarea></div></>}
                        
                    
                </formContext.Provider>

                </div>
                <div className="w-6/12 flex flex-col justify-between">
                    <div className="md:grid md:grid-cols-3">
                        {
                            images.map((element, i)=>{ 
                                return <div className="relative m-3 border h-[120px]" key={i}>
                                    <img src={element} className="w-full h-full"></img>
                                    <div className="absolute -right-2 -top-2 cursor-pointer" onClick={() => removeImage(i)}><CloseButton></CloseButton></div>
                                </div>;
                            })
                        }
                    </div>
                   <div className="w-full flex justify-center "><ImageButton text={"Agregar imagen"} handleButton={handleImage}></ImageButton> </div>
                </div>
            </div>
            <div className="flex space-x-6 mt-4">
                <Button color={"bg-green"} handleButton={handleAction}>Agregar</Button>
                <Button color={"bg-red"} handleButton={()=>setVisible(false)}>Cancelar</Button>
            </div>
        </div>
    );
};

const CloseButton = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg>
    );
}