'use client'
import { useContext, useState } from "react";
import { Table } from "../components/table/table";
import Modal, { ModalUnstandard } from "../components/modal";
import { useRouter } from "next/navigation";
import { addCategorie, editCategorie, getCategories } from "../lib/categories";
import { columnsCategories } from "../components/table/columns";
import {formContext} from "../components/context"
import { LabelInput } from "../components/text";
import { Input, SquareSelect } from "../components/forms/inputs";
import { checkText } from "../components/forms/verifications";
import { Button } from "../components/buttons";
import { validateInformation } from "../lib/information";

const validTemplate = {
  nombre: true,
};

const unValidTemplate = {
  nombre: false,
};

const edit = (categorie, router) => {
  editCategorie(categorie);
}

const create = (categorie, router) => {
  addCategorie(categorie);
}

const remove = (categorie, router) => {

}

const infoTemplate = {"nombre":"","destacado":false};

export default function Page() {

  const[information, setInformation] =  useState({});
  const[viewRemove, setViewRemove] = useState(false);
  const[viewEdit, setViewEdit] = useState({});
  const[validate, setValidate] = useState({});
  const router = useRouter();
  
  const data = getCategories();


  const btnRemove = {
    make: () => {remove(information, router)},
    color: "bg-green",
    text: "Aceptar"
  };

  const handleRemove = (c) => {
    setInformation(c);
    setViewRemove(true);
  };

  const handleEdit = (c) => {
    setInformation(c);
    setViewEdit({type: "edit", view:"true"});
    setValidate(validTemplate);
    //router.push("/employees/"+u.cedula);
  };

  const handleAdd = () => {
    setInformation(infoTemplate);
    setViewEdit({type: "add", view:"true"});
    setValidate(unValidTemplate);
    //router.push("/employees/"+u.cedula);
  };

  const actions = [{icon: "edit", action: handleEdit},{icon: "remove", action: handleRemove}];

  return (
    <formContext.Provider value={{information, setInformation, validate, setValidate, viewEdit, setViewEdit, router}}>;
      
      <Table columns={columnsCategories} data={data} actions={actions}></Table>
      <div className="flex justify-center mb-10"><Button color="bg-green" handleButton={handleAdd}>Agregar</Button></div>
      
      {viewRemove && <div className="text-black">
        <Modal text={"Estás seguro de que deseas eliminar la categoria: " + information.id} button={btnRemove} setIsVisible={setViewRemove}></Modal>
      </div>}
        {viewEdit.view && <ModalUnstandard><ModalContent type={viewEdit.type}></ModalContent></ModalUnstandard>}
        
        
      </formContext.Provider>
  )
}; 

const ModalContent = ({type}) => {
  const {information, viewEdit, setViewEdit, validate, router} = useContext(formContext);
  const action = () => {
    if(validate(validate)){
      if(type=="add"){
        create(information, router);
      }
      else{
        edit(information, router);
      }
    }
  };
  return(
  <div>
      <div className="text-black md:grid md:grid-cols-2 space-y-5">
        <div className="mt-5"><LabelInput>Nombre:</LabelInput></div>
        <Input errorMessage="Solo se admiten datos de tipo alfabetico" nameInput={"nombre"} verification={checkText}></Input>
        <LabelInput>Destacado:</LabelInput>
        <SquareSelect nameInput={"destacado"} select={information.destacado}></SquareSelect>
      </div>
      <div className="flex justify-center space-x-10 mt-5">
        <Button color="bg-green" handleButton={()=>setViewEdit({...viewEdit, ["view"]: false})} disable={!validateInformation(validate)}>Aceptar</Button>
        <Button color="bg-grey" handleButton={()=>setViewEdit({...viewEdit, ["view"]: false})}>Cancelar</Button>
      </div>
  </div>
  );
}




