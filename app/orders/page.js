'use client'
import { Table } from "../components/table/table";
import { useRouter } from "next/navigation";
import {columnsOrders } from "../components/table/columns";
import PageContainer from "../components/pageContainer";
import { getOrders } from "../lib/orders";

export default function Page() {

  
  const router = useRouter();
  
  const data = getOrders();

  const handleView = (order) => {
    
    router.push("/orders/"+ order.id);
  };

  const actions = [{icon: "view", action: handleView}];

  return (
    <PageContainer>;
      <Table columns={columnsOrders} data={data} actions={actions}></Table>
    </PageContainer>
  )
}; 



