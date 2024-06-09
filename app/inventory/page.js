'use client'
import { Table } from "../components/table/table";
import { useRouter } from "next/navigation";
import {columnsInventories } from "../components/table/columns";
import PageContainer from "../components/pageContainer";
import { getInventories } from "../lib/inventories";
import { PageTittle } from "../components/text";
import { Button } from "../components/buttons";
import { useEffect, useState } from "react";
import { ModalInventories } from "../components/modal";
import { AddInventory } from "../components/products/addProduct";
import { ValidTypes } from "../lib/information";

export default function Page() {

  const [data, setData] = useState({});
  const [update, setUpdate] = useState(false);

  
  
  const router = useRouter();

  const getData = async () => {
    if(!ValidTypes(['A', 'E'])) return;
    setData(await getInventories());
  };
  
  useEffect(
    () => {
      getData();
    }, [update]
  );

  const [viewModal, setViewModal] = useState(false);

  const handleView = (order) => {
    
    router.push("/inventory/"+ order.codigo);
  };

  const actions = [{icon: "view", action: handleView}];

  const handleAdd = () => {

    setViewModal(true);
  };

  return (
      <PageContainer>;
        <PageTittle>Inventarios</PageTittle>
        {viewModal && <ModalInventories><AddInventory setVisible={setViewModal} update={update} setUpdate={setUpdate} type={1}></AddInventory></ModalInventories>}
        <Button handleButton={handleAdd} color={"bg-green"}>Agregar inventario</Button>
        <Table columns={columnsInventories} data={data} actions={actions}></Table>
    </PageContainer>
  )
}; 







