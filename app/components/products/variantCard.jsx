'use client'

import { Input, SquareSelect, SquareSelectSmall } from "../forms/inputs";
import Modal, { ModalUnstandard } from "../modal";
import { LabelInput } from "../text";
import { formContext } from '../context';
import { useState } from "react";
import { checkText, messageText } from "../forms/verifications";
import { Button } from "../buttons";
import { editInventory } from "@/app/lib/products";
import { validateInformation } from "@/app/lib/information";
import { ProductCarousel } from "../imageCarousel";
import { VarianCarousel } from "./carousel";

export default function VariantCard(){
    
    const images = ["https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg", ""];

    const [visible, setVisible] = useState(false);

    const handleRemove = () => {
        setVisible(true);
    };

    const btn = {
        text: "Eliminar",
        make: ()=>alert("A"),
        color: "bg-red"
    };

    return(
        <div className="flex p-6 bg-lightGrey justify-center my-8 w-8/12 rounded-lg">
            {visible && <div className="text-black"><Modal button={btn} text={"¿Está seguro de que desea eliminar este producto?"} setIsVisible={setVisible}></Modal></div>}
            <div className="w-6/12">
                <div className="grid grid-cols-4 space-y-6 text-black font-semibold text-xl">
                    <div className="col-span-1 mt-6">
                        <LabelInput>Color:</LabelInput>
                    </div>
                    <div className="col-span-3">
                        <LabelInput>Color:</LabelInput>
                    </div>
                    <div className="col-span-1">
                        <LabelInput>Talla:</LabelInput>
                    </div>
                    <div className="col-span-3">
                        <LabelInput>Talla:</LabelInput>
                    </div>
                    <div className="col-span-1">
                        <LabelInput>Cantidad:</LabelInput>
                    </div>
                    <div className="col-span-3">
                        <LabelInput>Cantidad:</LabelInput>
                    </div>
                    <div className="col-span-1">
                        <LabelInput>Precio:</LabelInput>
                    </div>
                    <div className="col-span-3">
                        <LabelInput>Precio:</LabelInput>
                    </div>
                </div>
                <div className="flex space-x-6 mt-6 items-center align-middle">
                    <Button color={"bg-green"}>Editar</Button>
                    <Button color={"bg-red"} handleButton={handleRemove}>Eliminar</Button>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <VarianCarousel images={images}></VarianCarousel>
            </div>
        </div>
    );
};