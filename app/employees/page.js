'use client'
import { useEffect, useState } from "react";
import { Table } from "../components/table/table";
import TableAction from "../components/table/table_actions";
import { columnasEmpleados } from "../components/table/columns";
import Modal from "../components/modal";
import { useRouter } from "next/navigation";
import { getEmployees, removeEmployee } from "../lib/employees";
import { ToLink } from "../components/buttons";
import PageContainer from "../components/pageContainer";

export default function Page() {

  const[user, setUser] =  useState({});
  const[data, setData] = useState([{}]);
  const[viewRemove, setViewRemove] = useState(false);
  const router = useRouter();
  
  const get = async () => {
    setData( await getEmployees());
   };

  useEffect(
    () => {
      
      get();
    }, []
  )

  /**
   * Llama al método de eliminar un empleado
  */
  const makeRemove = () => {
    const post = async () => {
      const tmp = await removeEmployee(user.cedula);
      if(tmp.error) alert(tmp.error);
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

  const handleEdit = (u) => {
    
    router.push("/employees/"+u.cedula);
  };

  const actions = [{icon: "edit", action: handleEdit},{icon: "remove", action: handleRemove}];

  return (
    <PageContainer>
      <Table columns={columnasEmpleados} data={data} actions={actions}></Table>
      <div className="flex justify-center"><ToLink link="/employees/add" color="bg-green">Agregar</ToLink></div>
      {viewRemove && <div className="text-black">
        <Modal text={"¿Estás seguro de que deseas eliminar al empleado: " + user.cedula + "?"} button={btnRemove} setIsVisible={setViewRemove}></Modal>
      </div>}
        
      </PageContainer>
  )
};




