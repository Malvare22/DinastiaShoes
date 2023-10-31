'use client'
import { Button } from "../components/buttons";

export default function Page(){
    return(
        <div className="bg-pink p-8 w-[450px] space-y-4">
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