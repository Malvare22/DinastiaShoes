'use client'
import { useEffect, useState } from "react";
import { Button, ToLink } from "../components/buttons";
import { CartEmpty, CartProduct } from "../components/cartProduct";
import { CartIcon } from "../components/icons/icons";
import PageContainer from "../components/pageContainer";
import { PageTittle } from "../components/text";
import { getCart, removeAllCart } from "../lib/cart";

export default function Page(){

    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [total, setTotal] = useState([]);
    const [prefix, setPrefix] = useState(0);

    const getData = async () => {
        setData(await getCart());
    };

    useEffect(
        () => {
            getData();
        }, []
    );

    useEffect(
        () => {
            let sum = 0;
            total.forEach(
                (i) => sum+=i
            );
            setPrefix(sum);
        }, [, total]
    );

    const cleanCart = async () => {
        try{
            const cartId = (((((data[0]).inventarios)[0]).carrito_detalles)[0]).carrito_id;
            await removeAllCart(cartId);
            location.reload();
        }
        catch(error){
            alert(error);
        }
    };
    
    const handleClean = () => {
        setFlag(true);
        cleanCart();
    };

    console.log(data);

    return(

        <PageContainer>
            {data.length == 0? <CartEmpty></CartEmpty>:<><div className="flex align-middle items-center space-x-2"><PageTittle>Carrito de Compra </PageTittle><CartIcon></CartIcon></div>
            <div className="mx-5">
                <div className="grid grid-cols-2">
                    {data.length != 0 && data.map(
                        (product) => {
                            {
                                return product && (product.inventarios).map(
                                    (variante, index) => { 
                                        return <CartProduct product={variante} nombre={product.nombre} id={index} total={total} setTotal={setTotal}></CartProduct>;
                                    }
                                )
                            }
                        }
                    )}
                </div>
                <div className="my-20">
                    <div className="text-black font-semibold text-2xl">
                        {prefix}
                    </div>
                    <div className="flex space-x-6">
                        <Button color="bg-green">Continuar</Button>
                        <Button color="bg-lightRed" handleButton={handleClean} disable={flag}>Limpiar Carrito</Button>
                        <ToLink link="/products" color="bg-grisAzulado">Añadir</ToLink>
                    </div>
                </div>
            </div></>}
        </PageContainer>
        
    );
};