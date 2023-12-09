import { useEffect, useState } from "react";

export const DeliveryLocalCard = ({actual, handleCard}) => {
    let [color, setColor] = useState("#5E6685");
    useEffect(
        () => {
            if(actual==0) setColor("#3358DB");
            else setColor("#5E6685");
        }
    ), [actual];

    return(
        <div className={"flex w-6/12 px-8 py-4 align-middle justify-center rounded-lg"} style={{background: color}} onClick={()=> handleCard(0)}>
            <div className="w-9/12">
                <div className="text-2xl font-semibold mb-2">
                    Recoge en nuestro punto de <br></br> venta
                </div>
                <div>
                    Sin costo adicional
                </div>  
            </div>
            <div className="w-3/12 flex justify-center">
                <img src={"images/Delivery/local.png"} className=""></img>
            </div>
        </div>
    );
};

export const DeliverySendCard = ({actual, handleCard}) => {
    let [color, setColor] = useState("#5E6685");
    useEffect(
        () => {
            if(actual==1) setColor("#3358DB");
            else setColor("#5E6685");
        }
    ), [actual];

    return(
        <div className={"flex w-6/12 px-8 py-4 align-middle justify-center rounded-lg"} style={{background: color}} onClick={()=> handleCard(1)}>
            <div className="w-9/12">
                <div className="text-2xl font-semibold mb-2">
                    Recoge en nuestro punto de <br></br> venta
                </div>
                <div>
                    Te llevamos el producto hasta tu hogar <br></br>
                    Solo para San José de Cúcuta y aplica cargos adicionales
                </div>  
            </div>
            <div className="w-3/12 flex justify-center p-4">
                <img src={"images/Delivery/send.png"} className=""></img>
            </div>
        </div>
    );
};

