'use client'
import { Button } from "../components/buttons";
import { ProductCarousel } from "../components/imageCarousel";
import { HomeCardsGroup } from "../components/products/homeCard";

const images = [ "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"];

export default function Page(){
    return(
        <div className="mt-20">
            <div className="md:flex md:justify-center">
                    <ProductCarousel images={images}></ProductCarousel>
                    <PriceCard></PriceCard>
            </div>
            <div className="text-black px-[100px] my-10">
                <div className="font-bold text-3xl">
                    Detalles
                </div>
                <div className="font-sans text-xl mt-5">
                    C++ es un lenguaje de programación diseñado en 1979 por Bjarne Stroustrup. La intención de su creación fue extender al lenguaje de programación C y añadir mecanismos que permiten la manipulación de objetos. En ese sentido, desde el punto de vista de los lenguajes orientados a objetos, C++ es un lenguaje híbrido.

                    Posteriormente se añadieron facilidades de programación genérica, que se sumaron a los paradigmas de programación estructurada y programación orientada a objetos. Por esto se suele decir que el C++ es un lenguaje de programación multiparadigma.
                </div>
            </div>
            <div className="text-black px-[100px]">
                <div className="font-bold text-3xl">
                    Otros productos
                </div>
            </div>
            <div>
                <HomeCardsGroup number="6"></HomeCardsGroup>
            </div>
        </div>
    );
} 

const PriceCard = () => {
    return(
        <div className="bg-pink p-8 flex items-center align-middle justify-center">
            <div className="space-y-7">
                <div className="text-black text-4xl font-bold text-center">
                    Nombre del Producto
                </div>
                <div className="text-black w-full flex justify-center">
                    <div>
                        <div>
                            <s>$178.000</s>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="text-4xl">
                                $158.000
                            </div>
                            <div className="bg-blue text-standardWhite font-bold p-2 rounded-lg">
                                25% OFF
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-black space-y-2">
                    <div className="font-bold text-2xl text-center">
                        Color: Azul
                    </div>
                    <div className="flex space-x-4 justify-center">
                        <Option>Azul</Option>
                        <Option>Blanco</Option>
                        <Option>Rojo</Option>
                    </div>
                </div>
                <div className="text-black space-y-2">
                    <div div className="font-bold text-2xl text-center">
                        Talla: 3
                    </div>
                    <div className="flex space-x-4 justify-center">
                        <Option>1</Option>
                        <Option>2</Option>
                        <Option>3</Option>
                    </div>
                </div>
                <div className="flex justify-center space-x-2 align-middle items-center">
                    <div className="font-bold text-black text-xl">
                        Cantidad:
                    </div>
                    <div className="font-bold text-black text-xl">
                        <select className="bg-pink">
                            <option>1 Unidad</option>
                        </select>
                    </div>
                    <div className="text-grey text-sm">
                        (X unidades disponibles)
                    </div>
                </div>
                <div className="flex justify-center">
                    <AddItem></AddItem>
                </div>
            </div>
        </div>
    );
}


const Option = ({children}) =>{
    return <div className="bg-[#B4B2B2] text-black p-2 font-semibold rounded-lg">{children}</div>;
}

const AddItem = (props) => {

    const {disable} = props;

    const handleButton = () => {

    }
    
    return(
        <button onClick={handleButton} disabled={(disable)} className={"text-black bg-[#96B836] text-xl text-center min-w-[200px]  p-2 rounded-lg font-semibold "+ (disable? "opacity-25": "" )}>Agregar al Carrito</button>
    );
}

