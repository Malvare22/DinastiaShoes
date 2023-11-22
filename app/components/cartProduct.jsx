'use client'
import { useState } from "react";
import { Button } from "./buttons";
import { MinusIcon, PlusIcon } from "./icons/icons";
import { LabelInput } from "./text";

export const CartProduct = () => {
    const limit = 5;
    const [count, setCount] = useState(1);

    const minus = () => {
        if(count>1) setCount(count-1);
    };

    const plus = () => {
        if(count<limit) setCount(count+1);
    };

    return(
        <div className="bg-lightGrey text-black w-10/12 p-8 space-y-6 rounded-lg select-none">
            <div className="text-2xl font-semibold">
                    Tacones Lorem Isum
            </div>
            <div className="md:grid md:grid-cols-2">
                <div className="grid grid-cols-2 text-base font-medium">
                    <div>Color:</div>
                    <div>Azul</div>
                    <div>Talla:</div>
                    <div>11</div>
                    <div>Cantidad:</div>
                    <div className="flex align-middle items-center space-x-3">
                        <LabelInput>{count}</LabelInput>
                        <div className={`${count==1 && "opacity-20"}`} onClick={minus}><MinusIcon/></div>
                        <div className={`${count==limit && "opacity-20"}`}  onClick={plus}><PlusIcon/></div>
                    </div>
                    <div>Precio por unidad:</div>
                    <div>$178,000</div>
                </div>
                <div className="flex align-middle">
                    <img src="https://rajueditor.com/wp-content/uploads/2023/09/anime-foto-de-perfil-1024x1024.jpg" className="w-60 h-40"></img>
                </div>
            </div>
            <div className="md:flex md:justify-between">
                <Button color={"bg-lightRed"}>Eliminar</Button>
                <div className="text-xl font-bold text-end">
                    Total del producto: <br></br> $172,000
                </div>
            </div>
        </div>
    );
};

export const CartEmpty = () => {
 
    return(
        <div className="bg-lightGrey text-black w-full rounded-lg flex justify-center align-middle space-x-20 items-center py-10">
            <h1 className="text-4xl font-semibold">Tú carrito de compras <br></br> aún se encuentra vacio</h1>
            <img src="/images/Cart/cart_empty.png" className="w-[300px]"></img>
        </div>
    );
};

