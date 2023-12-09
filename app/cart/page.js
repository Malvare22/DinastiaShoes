'use client'
import { useContext, useEffect, useState } from "react";
import { Button, ToLink } from "../components/buttons";
import { CartEmpty, CartProduct } from "../components/cartProduct";
import { CartIcon } from "../components/icons/icons";
import PageContainer from "../components/pageContainer";
import { PageTittle } from "../components/text";
import { getCart, removeAllCart } from "../lib/cart";
import { useRouter } from "next/navigation";
import { SessionContext } from "../components/template";
import { readLocalStorage } from "../components/hooks/useLocalStorage";

export default function Page(){

    const router = useRouter();
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [total, setTotal] = useState([]);
    const [prefix, setPrefix] = useState(0);
    let j = -1;

    const getData = async () => {
        const tmp_data = await getCart();
        setData(tmp_data);
        const tmp_total = [];
        (tmp_data).forEach(
            (product) => {
                {
                    product && (product.inventarios).forEach(
                        (variante) => { 
                            tmp_total.push((variante.carrito_detalles[0].cantidad) * variante.precio);
                        }
                    )
                }
            }
        );
        setTotal(tmp_total);
    };

    useEffect(
        () => {
            if(!(readLocalStorage('token'))){
                router.push('/login');
            }
            else getData();
        }, []
    );

    useEffect(
        () => {
            let sum = 0;
            (total).forEach((i) => {
                sum += i;
            });

            setPrefix(sum);
            
        }, [total]
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

    return(

        <PageContainer>
            {data.length == 0? <CartEmpty></CartEmpty>:<><div className="flex align-middle items-center space-x-2"><PageTittle>Carrito de Compra </PageTittle><CartIcon></CartIcon></div>
            <div className="mx-5">
                <div className="grid grid-cols-2 place-items-center">
                    {
                        total.length != 0 && data.map(
                            (product) => {
                                {
                                    return product && (product.inventarios).map(
                                        (variante) => { 
                                            j++;
                                            return <CartProduct product={variante} key={j} nombre={product.nombre} id={j} total={total} setTotal={setTotal}></CartProduct>;
                                        }
                                    )
                                }
                            }
                        )
                    }
                </div>
                <div className="mb-20 mt-10">
                    <div className="text-black font-semibold text-2xl">
                        Total: ${prefix}
                    </div>
                    <div className="flex space-x-6">
                        <ToLink link='/direction' color="bg-green">Continuar</ToLink>
                        <Button color="bg-lightRed" handleButton={handleClean} disable={flag}>Limpiar Carrito</Button>
                        <ToLink link="/products?categoria=All" color="bg-grisAzulado">Añadir</ToLink>
                    </div>
                </div>
            </div></>}
        </PageContainer>
        
    );
};