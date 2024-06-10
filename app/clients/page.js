'use client'
import { useEffect, useState } from "react";
import { Table } from "../components/table/table";
import TableAction from "../components/table/table_actions";
import { columnsClients } from "../components/table/columns";
import Modal from "../components/modal";
import { getEmployees, removeEmployee } from "../lib/employees";
import { ToLink } from "../components/buttons";
import PageContainer from "../components/pageContainer";
import { getClients } from "../lib/clients";
import { ValidTypes } from "../lib/information";

export default function Page() {

  const[user, setUser] =  useState({});
  const[data, setData] = useState([{}]);
  const[viewRemove, setViewRemove] = useState(false);
  
  const get = async () => {
    setData( await getClients());
   };

  useEffect(
    () => {
      ValidTypes(['A', 'E']);
      get();
    }, []
  )

  /**
   * Llama al método de eliminar un empleado
  */
  const makeRemove = () => {
    const post = async () => {
      await removeEmployee(user.cedula);
      get();
      setViewRemove(false);
    }
    post();
  };

  const btnRemove = {
    make: ()=>makeRemove(),
    color: "bg-green",
    text: "Aceptar"
  };

  const handleRemove = (u) => {
    setUser(u);
    setViewRemove(true);
  };

  const actions = [{icon: "remove", action: handleRemove}];

  return (
    <PageContainer>
      <Table columns={columnsClients} data={data} actions={actions}></Table>
      {viewRemove && <div className="text-black">
        <Modal text={"¿Estás seguro de que deseas eliminar al cliente: " + user.cedula + "?"} button={btnRemove} setIsVisible={setViewRemove}></Modal>
      </div>}
        
      </PageContainer>
  )
};




