'use client'
import { Table } from "../components/table/table";
import { useRouter } from "next/navigation";
import {columnsInventories } from "../components/table/columns";
import PageContainer from "../components/pageContainer";
import { getInventories } from "../lib/inventories";
import { PageTittle } from "../components/text";
import { Button } from "../components/buttons";
import { useState } from "react";
import { ModalInventories } from "../components/modal";
import { AddInventory } from "../components/products/addProduct";

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
        {viewModal && <ModalInventories><AddInventory setVisible={setViewModal} type={1}></AddInventory></ModalInventories>}
        <Button handleButton={handleAdd} color={"bg-green"}>Agregar inventario</Button>
        <Table columns={columnsInventories} data={data} actions={actions}></Table>
    </PageContainer>
  )
}; 







