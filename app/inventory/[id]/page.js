'use client'

import { Button } from "@/app/components/buttons";
import { ModalInventories } from "@/app/components/modal";
import PageContainer from "@/app/components/pageContainer";
import { AddInventory } from "@/app/components/products/addProduct";
import EditInventoryModal from "@/app/components/products/editInventory";
import VariantCard from "@/app/components/products/variantCard";
import { PageTittle } from "@/app/components/text";
import { getProducts } from "@/app/lib/inventories";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({params}){

    const [viewEditInventory, setViewEditInventory] = useState(false);
    const [viewAdd, setViewAdd] = useState(false);
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const router = useRouter();

    const codigo = params.id;

    const getAllData = async () => {
        const x = await getProducts(codigo);
        if(x == null){
            router.push('/inventory');
        }
        setData(x);
    };

    useEffect(
        () => {
            getAllData();
        }, []
    );

    return(
    <PageContainer>
        {data != null && <>{viewAdd && <ModalInventories><AddInventory setVisible={setViewAdd} type={2} productId={codigo} setUpdate={setUpdate} update={update}></AddInventory></ModalInventories>}
        {viewEditInventory && <EditInventoryModal setVisible={setViewEditInventory} data={data} update={update} setUpdate={setUpdate} />}
        <div className="flex flex-col justify-center align-middle items-center">
            <PageTittle>{data.nombre}</PageTittle>
            <div className="text-black w-6/12 flex flex-col items-end">
                <div className="border w-full">{data.descripcion}</div>
                <div><Button color={"bg-grisAzulado"} handleButton={()=>setViewEditInventory(true)}>Editar</Button></div>
            </div>
        </div>
        <div className="lg:grid lg:grid-cols-2 place-items-center">
            {
                data.inventarios && (data.inventarios).map(
                (element, index) => {
                    return <VariantCard key={index} variant={element} update={update} setUpdate={setUpdate}></VariantCard>;
                })
            }
        </div>
        <div className="flex justify-center mb-10"><Button color={"bg-grisAzulado"} handleButton={()=> setViewAdd(true)}>Añadir</Button></div></>}
    </PageContainer>
    );
};