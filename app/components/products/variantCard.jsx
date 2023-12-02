'use client'

import { Input, SquareSelect, SquareSelectSmall } from "../forms/inputs";
import Modal, { ModalInventories, ModalUnstandard } from "../modal";
import { LabelInput } from "../text";
import { formContext } from '../context';
import { useEffect, useState } from "react";
import { checkText, messageText } from "../forms/verifications";
import { Button } from "../buttons";
import { editInventory } from "@/app/lib/products";
import { validateInformation } from "@/app/lib/information";
import { ProductCarousel } from "../imageCarousel";
import { VarianCarousel } from "./carousel";
import EditInventoryModal from "./editInventory";
import { AddInventory } from "./addProduct";

export default function VariantCard({variant, update, setUpdate}){
    
    const [images, setImages] = useState([]);

    useEffect(
        () => {
            const tmp = variant.fotos.map(
                (foto) => (foto.url_foto)
            )
            setImages(tmp);
        }, []
    )

    const [visible, setVisible] = useState(false);
    const [viewEdit, setViewEdit] = useState(false);

    const handleRemove = () => {
        setVisible(true);
    };

    const btn = {
        text: "Eliminar",
        make: ()=>alert("A"),
        color: "bg-red"
    };

    return(
        <div className="flex p-6 bg-lightGrey justify-center my-8 w-[800px] rounded-lg">
            {
                viewEdit && <ModalInventories><div className="text-black"><AddInventory type={3} setVisible={setViewEdit} data={variant} update={update} setUpdate={setUpdate} imgs={images}></AddInventory></div></ModalInventories>
            }
            {visible && <div className="text-black"><Modal button={btn} text={"¿Está seguro de que desea eliminar este producto?"} setIsVisible={setVisible}></Modal></div>}
            <div className="w-7/12">
                <div className="grid grid-cols-4 space-y-6 text-black font-semibold text-xl">
                    <div className="col-span-1 mt-6">
                        <Text>Color:</Text>
                    </div>
                    <div className="col-span-3">
                        <Text>{variant.color}</Text>
                    </div>
                    <div className="col-span-1">
                        <Text>Talla:</Text>
                    </div>
                    <div className="col-span-3">
                        <Text>{variant.talla}</Text>
                    </div>
                    <div className="col-span-1">
                        <Text>Cantidad:</Text>
                    </div>
                    <div className="col-span-3">
                        <Text>{variant.cantidad}</Text>
                    </div>
                    <div className="col-span-1">
                        <Text>Precio:</Text>
                    </div>
                    <div className="col-span-3">
                        <Text>{variant.precio}</Text>
                    </div>
                </div>
                <div className="flex space-x-6 mt-6 items-center align-middle">
                    <Button color={"bg-green"} handleButton={()=> setViewEdit(true)}>Editar</Button>
                    <Button color={"bg-red"} handleButton={handleRemove}>Eliminar</Button>
                </div>
            </div>
            <div className="">
                <VarianCarousel images={images}></VarianCarousel>
            </div>
        </div>
    );
};

const Text = ({children}) => {
    return <div className="text-base">
        {children}
    </div>
};