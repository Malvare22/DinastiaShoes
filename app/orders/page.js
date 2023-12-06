'use client'
import { Table } from "../components/table/table";
import { useRouter } from "next/navigation";
import {columnsOrders } from "../components/table/columns";
import PageContainer from "../components/pageContainer";
import { useEffect, useState } from "react";
import { getAllOrders } from "../lib/order";

export default function Page() {

  
  const router = useRouter();
  
  const [data, setData] = useState([]);

  const getData = async () => {
    try{

      const tmp_data = [];
      const tmp = await getAllOrders();
      tmp.forEach(element => {
          tmp_data.push({"id": element.id,  "direccion": element.direccion, "mediopago_id": element.mediopago_id, "cliente": "sdsg"});
          console.log(element.cliente_cedula)
      });
      setData(tmp);
    }
    catch(error){
      console.log(error);
    }
  };  

  useEffect(
    () => {
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



