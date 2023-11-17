'use client'
import { Table } from "../components/table/table";
import { useRouter } from "next/navigation";
import {columnsInventories } from "../components/table/columns";
import PageContainer from "../components/pageContainer";
import { getInventories, inventoriesInformationTemplate, inventoriesValidationTemplate } from "../lib/inventories";
import { LabelInput, PageTittle } from "../components/text";
import { Button, FileButton, ImageButton } from "../components/buttons";
import { useState } from "react";
import { ModalInventories, ModalUnstandard } from "../components/modal";
import { Input } from "../components/forms/inputs";
import {formContext} from '../components/context';
import { checkText, messageNumber, messageText } from "../components/forms/verifications";

export default function Page() {

  
  const router = useRouter();
  
  const data = getInventories();

  const [viewModal, setViewModal] = useState(false);

  const handleView = (order) => {
    
    router.push("/inventory/"+ order.id);
  };

  const actions = [{icon: "view", action: handleView}];

  const handleAdd = () => {

    setViewModal(true);
  };

  return (
      <PageContainer>;
        <PageTittle>Inventarios</PageTittle>
        {viewModal && <ModalInventories><AddInventory setVisible={setViewModal}></AddInventory></ModalInventories>}
        <Button handleButton={handleAdd} color={"bg-green"}>Agregar inventario</Button>
        <Table columns={columnsInventories} data={data} actions={actions}></Table>
    </PageContainer>
  )
}; 

const AddInventory = ({setVisible}) => {


    const [information, setInformation] = useState(inventoriesInformationTemplate);

    const [validate, setValidate] = useState(inventoriesValidationTemplate);

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

    return(
        <div>
            <div className="flex text-black space-x-12">
                <div className="w-6/12 md:grid md:grid-cols-6 space-y-8">
                <formContext.Provider value={{information, setInformation, validate, setValidate}}>
                   
                    <div className="mt-8"><LabelInput>Nombre:</LabelInput></div>
                    <div className="ml-4 col-span-5"><Input nameInput={"nombre"} type={"text"} errorMessage={messageText} verification={checkText}></Input></div>
                    <LabelInput>Precio:</LabelInput>
                    <div className="ml-4 col-span-5"><Input nameInput={"nombre"} type={"text"} errorMessage={messageText} verification={checkText}></Input></div>
                    <LabelInput>Color:</LabelInput>
                    <div className="ml-4 col-span-5"><Input nameInput={"nombre"} type={"text"} errorMessage={messageText} verification={checkText}></Input></div>
                    <LabelInput>Talla:</LabelInput>
                    <div className="ml-4 col-span-5"><Input nameInput={"nombre"} type={"text"} errorMessage={messageText} verification={checkText}></Input></div>
                    <LabelInput>Cantidad:</LabelInput>
                    <div className="ml-4 col-span-5"><Input nameInput={"nombre"} type={"text"} errorMessage={messageText} verification={checkText}></Input></div>
                    <LabelInput>Descripción:</LabelInput>
                    <div className="col-span-5 ml-4"><textarea className="border w-full"></textarea></div>
                        
                    
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
                <Button color={"bg-green"}>Agregar</Button>
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





