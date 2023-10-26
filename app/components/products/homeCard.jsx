import { getShoesCardHome } from "@/app/lib/products";
import Image from "next/image";

const fetchProductsCards = async () =>{
    const data = await getShoesCardHome()
    return (data)
} 

export const HomeCardsGroup = async () => {

    const products = await fetchProductsCards();    
        
    return(
        <div className="grid grid-cols-4 md:grid-cols-6 mx-20 my-7">
            {products.map((product, i) =>{
                return <HomeCardProduct key={i} title={product.title} img={product.image} price={product.price}></HomeCardProduct>
            })}
        </div>
    );

}

export const HomeCardProduct = ({img, title, price}) => {
    return (
        <div className="bg-card rounded-md border-2 p-3 m-[2px]">
            <div className="flex-col flex justify-center h-full">
                <div className="flex justify-center"><img src={img} className="w-20 h-20 border-2 border-black rounded-md"></img></div>
                <h4 className="text-black mt-5 text-sm mb-2">{title}</h4>
                <div className="h-full flex items-end">
                    <h5 className="text-black font-bold">${price}</h5>
                </div>
            </div>
        </div>
    );
}