import { getShoesCardHome } from "@/app/lib/products";
import Image from "next/image";
import { CardProduct } from "./cardProduct";

const fetchProductsCards = async () =>{
    const data = await getShoesCardHome()
    return (data)
} 

export const HomeCardsGroup = async ({number}) => {

    const products = await fetchProductsCards();    
    return(
        <div className="grid grid-cols-4 md:grid-cols-6 mx-20 my-7">
            {products.map((product, i) =>{
                if(number && i>5) return;
                return <CardProduct key={i} title={product.title} img={product.image} price={product.price}></CardProduct>
            })}
        </div>
    );

}


