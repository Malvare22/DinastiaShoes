'use client'
import { Table } from "../components/table/table";
import { useRouter } from "next/navigation";
import {columnsOrders } from "../components/table/columns";
import PageContainer from "../components/pageContainer";
import { useEffect, useState } from "react";
import { getAllOrders } from "../lib/order";
import { diccionario } from "./[id]/page";
import { ValidTypes } from "../lib/information";

export default function Page() {

  
  const router = useRouter();
  
  const [data, setData] = useState([]);

  const getData = async () => {
    try{

      const tmp_data = [];
      const tmp = await getAllOrders();
      tmp.forEach(element => {
          const medio = (element[1])['medio'];
          const carrito = (element[0])['carr'];
          const cedula = carrito['cliente_cedula'];
          const estado = carrito['estado'];
          const fecha = carrito['fecha'];
          const direccion = carrito['direccion'];
          const id_pedido = carrito['id'];
          const nombre_medio = medio['nombre'];
          tmp_data.push({"id": id_pedido, "direccion": direccion, "medio_pago": nombre_medio, "cliente": cedula, "estado": diccionario[estado], "fecha": fecha});
      });
      setData(tmp_data);
    }
    catch(error){
      console.log(error);
    }
  };  

  useEffect(
    () => {
      if(!ValidTypes(['A', 'E'])) return;

      getData();
    }, []
  )

  console.log(data)
  
  const handleView = (order) => {
    
    router.push("/orders/"+ order.id);
  };

  const actions = [{icon: "view", action: handleView}];

  return (
    <PageContainer>;
      {<Table columns={columnsOrders} data={data} actions={actions}></Table>}
    </PageContainer>
  )
}; 



