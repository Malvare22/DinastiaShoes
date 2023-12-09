'use client'
import { useEffect, useState } from "react";
import { Button } from "./buttons";
import { MinusIcon, PlusIcon } from "./icons/icons";
import { LabelInput } from "./text";
import { AddToCart, removeProductCart } from "../lib/cart";

export const CartProduct = ({product, nombre, total, setTotal, id}) => {
    const limit = product.cantidad;
    const [count, setCount] = useState(((product.carrito_detalles)[0]).cantidad);
    const cartId = ((product.carrito_detalles)[0]).carrito_id;
    const [flag, setFlag] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const modifyCart = async () => {
        try{
            await AddToCart(product, count);
        }
        catch(error){
            console.log(error);
        }
    };

    useEffect(
        () => {
            const tmp = total.slice();
            (tmp)[id] = (count*(product.precio));
            setTotal(tmp);
            modifyCart();
            setTimeout(() => {
                setDisableButton(false);
              }, 2000);
            
        }, [count]
    );

    const minus = (e) => {
        e.preventDefault();
        if(count>1){ 
            setDisableButton(true);
            setCount(count-1);
        }
        
    };

    const plus = (e) => {
        e.preventDefault();
        if(count<limit){
            setDisableButton(true);
            setCount(count+1);
        } 

    };

    const removeProduct = async () => {
        try{
            await removeProductCart(product.codigo, cartId);
            location.reload();
        }
        catch(error){
            alert(error);
        }
    };

    const handleButton = () => {
        setFlag(true);
        removeProduct();
    }

    return(
        <div className="bg-lightGrey text-black w-10/12 p-8 space-y-6 rounded-lg select-none mb-6">
            <div className="text-2xl font-semibold">
                    {nombre}
            </div>
            <div className="md:grid md:grid-cols-2">
                <div className="grid grid-cols-2 text-base font-medium">
                    <div>Color:</div>
                    <div>{product.color}</div>
                    <div>Talla:</div>
                    <div>{product.talla}</div>
                    <div>Cantidad:</div>
                    <div className="flex align-middle items-center space-x-3">
                        <LabelInput>{count}</LabelInput>
                        <button className={`${(count==1 || disableButton) && "opacity-20"}`} onClick={minus} disabled={count==1 || disableButton}><MinusIcon/></button>
                        <button className={`${(count==limit || disableButton) && "opacity-20"}`} disabled={count==limit || disableButton} onClick={plus}><PlusIcon/></button>
                    </div>
                    <div>Precio por unidad:</div>
                    <div>${product.precio}</div>
                </div>
                <div className="flex align-middle">
                    <img src={(product.fotos[0]).url_foto} className="w-60 h-40"></img>
                </div>
            </div>
            <div className="md:flex md:justify-between">
                <Button color={"bg-lightRed"} handleButton={handleButton} disable={flag}>Eliminar</Button>
                <div className="text-xl font-bold text-end">
                    Total del producto: <br></br> ${(count)*(product.precio)}
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

export const CardOrderProduct = ({product}) => {
    

    return(
        <div className="bg-lightGrey text-black w-[500px] p-8 space-y-6 rounded-lg select-none mb-6">
            <div className="text-2xl font-semibold">
                    {product.nombre}
            </div>
            <div className="md:grid md:grid-cols-2">
                <div className="grid grid-cols-2 text-base font-medium">
                    <div>Color:</div>
                    <div>{product.color}</div>
                    <div>Talla:</div>
                    <div>{product.talla}</div>
                    <div>Cantidad:</div>
                    <div>{product.cantidad}</div>
                    <div>Precio por unidad:</div>
                    <div>${product.precio}</div>
                </div>
                <div className="flex align-middle">
                    <img src={product.foto} className="w-60 h-40"></img>
                </div>
            </div>
            <div className="md:flex md:justify-center">
                <div className="text-xl font-bold text-center">
                    Total del producto: ${product.cantidad * product.precio}
                </div>
            </div>
        </div>
    );
};

