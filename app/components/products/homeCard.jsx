'use client'
import { getProductsDestacados, getShoesCardHome } from "@/app/lib/products";
import Image from "next/image";
import { CardProduct } from "./cardProduct";
import { useEffect, useState } from "react";

export const HomeCardsGroup = () => {

    const [data, setData] = useState([]);

    const getData = async () => {
        setData(await getProductsDestacados());
    };

    useEffect(
        () => {
            getData();
        }, []
    )

    return(
        <div className="grid grid-cols-4 md:grid-cols-6 mx-20 my-7">
            {
                data.map((product, i) =>{
                    const temp = (product.inventarios)[0];
                    if(temp){
                        const aux = (temp.fotos)[0];
                        let img = '';
                        if(aux){
                            img = aux.url_foto;
                            return <CardProduct key={i} title={product.nombre} img={img} id={temp["producto_codigo"]} price={temp.precio}></CardProduct>

                        }
                    }
                
            })}
        </div>
    );

}


