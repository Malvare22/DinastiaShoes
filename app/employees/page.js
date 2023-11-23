'use client'
import { useEffect, useState } from "react";
import { Table } from "../components/table/table";
import TableAction from "../components/table/table_actions";
import { columnasEmpleados } from "../components/table/columns";
import Modal from "../components/modal";
import { useRouter } from "next/navigation";
import { getEmployees, removeEmployee } from "../lib/employees";

export default function Page() {

  const[user, setUser] =  useState({});
  const[data, setData] = useState([{}]);
  const[viewRemove, setViewRemove] = useState(false);
  const router = useRouter();
  
  useEffect(
    () => {
      const get = async () => {
       setData( await getEmployees());
      };
      get();
    }, []
  )

  /**
   * Llama al método de eliminar un empleado
  */
  const makeRemove = async () => {
    await removeEmployee(user.cedula);
    router.push("/employees");
  };

  const btnRemove = {
    make: makeRemove,
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
    <>
        
      <Table columns={columnasEmpleados} data={data} actions={actions}></Table>
      {viewRemove && <div className="text-black">
        <Modal text={"Estás seguro de que deseas eliminar al empleado: " + user.cedula} button={btnRemove} setIsVisible={setViewRemove}></Modal>
      </div>}
        
      </>
  )
};




