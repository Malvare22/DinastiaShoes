'use client'
import { useEffect, useState } from "react";
import { checkNumber, checkText, messageNumber, messageText } from "../forms/verifications";
import { formContext } from "../context";
import { LabelInput } from "../text";
import { Input } from "../forms/inputs";
import { Button, ImageButton } from "../buttons";
import { createInventory, createProduct, editInventory, template_tx, uploadImagesInventory } from "@/app/lib/inventories";
import { getCategories } from "@/app/lib/categories";
import { validateInformation } from "@/app/lib/information";

const defaultData = {
    nombre: "",
    precio: "",
    color: "",
    talla: "",
    cantidad: "",
    destacado: "B",
    categoria_id: "",
    descripcion: "",
    descuento: "B"
};

const defaultValidate = {
    nombre: false,
    precio: false,
    color: false,
    talla: false,
    cantidad: false,
};

const dataValid = {
    nombre: true,
    precio: true,
    color: true,
    talla: true,
    cantidad: true,
};

/***
 * Type 1 = registrar nuevo producto sin inventario
 * Type 2 = registrar nuevo producto con inventario
 * Type 3 = editar producto existente
 */

export const AddInventory = ({setVisible, type, update, setUpdate, data, imgs}) => {

    const [information, setInformation] = useState(type!=3 ? defaultData: data);

    const [validate, setValidate] = useState(type!=3 ? defaultValidate: dataValid);

    const [images, setImages] = useState((imgs) ? imgs : []);

    //Es necesario cambiar los datos que se ingresan si ya existe el producto 
    const [categories, setCategories] = useState([]);

    const queryCategories = async () => {
        const tmp = await getCategories();
        setInformation({... information, ["categoria_id"]: tmp[0].id});
        setCategories(tmp);
    }

    useEffect(
        () => {
            queryCategories();
        }, []
    );

    const handleAction = async () => {
        if(type == 1) {
            setVisible(false);
            try{
                const ans = await createProduct(information);
                const id = (ans.codigo);
                const id_inventario = (await createInventory(information, id)).codigo;
                if(images.length != 0){
                    
                    await uploadImagesInventory(images, id_inventario);
                    
                }
            }
            catch(error){
                alert(error);
            }
        }
        if(type == 3) {
            setVisible(false);
            try{
                await editInventory(information);
                if(images.length != 0){
                    
                    await uploadImagesInventory(images, information.codigo);
                    
                }
            }
            catch(error){
                alert(error);
            }
        }
        setUpdate(!update);

    };

    const handleImage = (e) => {
        if(images.length >= 5) return;
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

    const handleSelect = (e) => {
        const {name, value} = e.target;
        setInformation({...information, [name]: value});  
    };

    const handleCheckBox = (e) => {
        const {checked} = e.target;
        setInformation({...information, ["destacado"]: checked? "A": "B"});  
    };

    return(
        <div>
            <div className="flex text-black space-x-12">
                <div className="w-6/12 md:grid md:grid-cols-6 space-y-8">
                <formContext.Provider value={{information, setInformation, validate, setValidate}}>
                   
                    {type==1 && <><div className="mt-8"><LabelInput>Nombre:</LabelInput></div>
                    <div className="ml-4 col-span-5"><Input nameInput={"nombre"} type={"text"} errorMessage={messageText} verification={checkText}></Input></div></>}

                    <div className="mt-8"><LabelInput>Precio:</LabelInput></div>
                    <div className="ml-4 col-span-5"><Input nameInput={"precio"} type={"number"} errorMessage={messageNumber} verification={checkNumber}></Input></div>

                    <LabelInput>Color:</LabelInput>
                    <div className="ml-4 col-span-5"><Input nameInput={"color"} type={"text"} errorMessage={messageText} verification={checkText}></Input></div>

                    <LabelInput>Talla:</LabelInput>
                    <div className="ml-4 col-span-5"><Input nameInput={"talla"} type={"number"} errorMessage={messageNumber} verification={checkNumber}></Input></div>

                    <LabelInput>Cantidad:</LabelInput>
                    <div className="ml-4 col-span-5"><Input nameInput={"cantidad"} type={"number"} errorMessage={messageNumber} verification={checkNumber}></Input></div>

                    {type == 1 && <><LabelInput>Categorias:</LabelInput>
                    <div className="ml-4 col-span-5">
                        <select name={"categoria_id"} value={information.categoria_id} onChange={handleSelect}>
                            {categories && categories.map((element)=>{
                                return <option value={element.id}>{element.nombre}</option>;
                            })}
                        </select>
                    </div></>}

                    {type == 1 && <><LabelInput>Destacado:</LabelInput>
                    <div className="ml-4 col-span-5 flex items-center align-middle">
                        <input type="checkbox" className="w-[20px] h-[20px]" name="destacado" onChange={handleCheckBox}></input>
                    </div></>}

                    {type!=1 && <><LabelInput>Descuento:</LabelInput><div className="ml-4 flex col-span-5 w-24"><Input nameInput={"descuento"} type={"number"} errorMessage={messageNumber} verification={checkNumber}></Input><div className="mx-2">%</div></div></>}

                    {type==1 && <><LabelInput>Descripción:</LabelInput>
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
                    
                   <div className="w-full flex flex-col justify-center ">
                    <ImageButton text={"Agregar imagen"} disable={images.length == 5} handleButton={handleImage}></ImageButton> 
                    <div className="w-full flex justify-center bg-blue text-white p-3 rounded-lg text-center text-sm">Solo pueden agregarse un máximo de 5 imagenes por producto</div>
                   </div>
                </div>
            </div>
            <div className="flex space-x-6 mt-4">
                <Button color={"bg-green"} handleButton={handleAction} disable={!validateInformation(validate)}>Agregar</Button>
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