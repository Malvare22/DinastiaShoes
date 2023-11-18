'use client'

import { Button } from "@/app/components/buttons";
import PageContainer from "@/app/components/pageContainer";
import EditInventoryModal from "@/app/components/products/editInventory";
import VariantCard from "@/app/components/products/variantCard";
import { PageTittle } from "@/app/components/text";
import { useState } from "react";

export default function Page(){

    const [viewEditInventory, setViewEditInventory] = useState(false);

    return(
    <PageContainer>
        {viewEditInventory && <div className="text-black"><EditInventoryModal setVisible={setViewEditInventory} nombre={"Test"} descripcion={"A"} destacado={true}></EditInventoryModal></div>}
        <div className="flex flex-col justify-center align-middle items-center">
            <PageTittle>Tacones</PageTittle>
            <div className="text-black w-6/12 flex flex-col items-end">
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sollicitudin elit quis justo laoreet, commodo convallis odio rutrum. Vestibulum luctus justo sit amet pretium elementum. Nullam tempor nibh mauris, ac bibendum neque imperdiet vitae. Mauris a sagittis ante, vitae tincidunt augue. Sed elementum leo ut elementum vehicula. Sed malesuada sem lorem, a tincidunt sem consequat vel. Quisque a consequat elit. In convallis leo erat, id facilisis libero imperdiet convallis.</div>
                <div><Button color={"bg-grisAzulado"} handleButton={()=>setViewEditInventory(true)}>Editar</Button></div>
            </div>
        </div>
        <VariantCard></VariantCard> 
    </PageContainer>
    );
};