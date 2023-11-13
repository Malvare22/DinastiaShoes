'use client'
import { useEffect, useState } from "react";
import { Table } from "../components/table/table";
import TableAction from "../components/table/table_actions";
import { columnsMethods } from "../components/table/columns";
import Modal from "../components/modal";
import { useRouter } from "next/navigation";
import { getMethods } from "../lib/methods";
import PageContainer from "../components/pageContainer";
import { PageTittle } from "../components/text";
import { ToLink } from "../components/buttons";

export default function Page() {

  const[method, setMethod] =  useState({});
  const[viewRemove, setViewRemove] = useState(false);
  const router = useRouter();
  
  const data = getMethods();

  /**
   * Llama al método de eliminar un metodo de pago
  */
  const makeRemove = (u) => {

  };

  const btnRemove = {
    make: () => {makeRemove},
    color: "bg-green",
    text: "Aceptar"
  };

  const handleRemove = (m) => {
    setMethod(m);
    setViewRemove(true);
  };

  const handleEdit = (m) => {
    
    router.push("/methods/"+ m.id);
  };

  const actions = [{icon: "edit", action: handleEdit},{icon: "remove", action: handleRemove}];

  return (
    <PageContainer>
        <PageTittle>Métodos de Pago</PageTittle>
      <Table columns={columnsMethods} data={data} actions={actions}></Table>
      {viewRemove && <div className="text-black">
        <Modal text={"Estás seguro de que deseas eliminar método de pago: " + method.id} button={btnRemove} setIsVisible={setViewRemove}></Modal>
      </div>}
      <div className="flex mb-5 justify-center">
        <ToLink link="methods/add" color="bg-green">Agregar Empleado</ToLink>
      </div>
        
      </PageContainer>
  )
};




