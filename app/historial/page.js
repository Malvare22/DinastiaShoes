'use client'
import { useEffect, useState } from "react";
import { CardOrderProduct } from "../components/cartProduct";
import PageContainer from "../components/pageContainer";
import { PageTittle } from "../components/text";
import { getOrdersForClient } from "../lib/order";
import { diccionario } from "../orders/[id]/page";

export default function Page(){

    const [data, setData] = useState([]);

    const getData = async () => {
        try{
            const tmp = (await getOrdersForClient());
            const tmp_data = [];
            tmp.forEach(pedido => {
                const pedido_fecha = (pedido['pedido'])['fecha'];
                const pedido_estado = (pedido['pedido'])['estado'];
                const pedido_costo = pedido['costoTotal'];
                //Posee datos del pedido
                const data_pedido = {'fecha': pedido_fecha, 'estado': pedido_estado, 'costoTotal': pedido_costo};
                const data_productos = pedido['productoss'].map(
                    (producto) => {
                        //console.log(producto)
                        const producto_cantidad = (producto['product'])['cantidad'];
                        const producto_nombre = (producto['producto'])['nombre'];
                        const producto_talla = (((producto['producto'])['inventarios'])[0])['talla'];
                        const producto_color = (((producto['producto'])['inventarios'])[0])['color'];
                        const producto_precio = (((producto['producto'])['inventarios'])[0])['precio'];
                        const producto_foto = ((((((producto['producto'])['inventarios'])[0])['fotos'])[0]))['url_foto'];
                        return {'cantidad': producto_cantidad,'nombre': producto_nombre, 'talla': producto_talla, 'color': producto_color, 'precio': producto_precio, 'foto': producto_foto}

                    }
                )
                
                tmp_data.push({'pedido': data_pedido, 'productos': data_productos});
            });

            setData(tmp_data);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(
        () => {
            getData();
        }, []
    )

    console.log(data)
    return(
        <PageContainer>
            <PageTittle>Pedidos</PageTittle>
            {
                data.length != 0 && data.map(
                    (pedido) => {
                        return <div className="my-8"><OrderGroup pedido={pedido}></OrderGroup></div>;
                    }
                )
            }
        </PageContainer>
    );

};  

const OrderGroup = ({pedido}) => {
    
    const estado = pedido.pedido.estado;

    return(
        <div className="bg-grey px-10">
            <div className="text-white font-semibold text-2xl">Fecha: {pedido.pedido.fecha}</div>
            {pedido.productos.length == 1 ? <div className="flex justify-center">
                <CardOrderProduct product={pedido.productos[0]}></CardOrderProduct>
            </div>
            : 
            <div className="lg:grid lg:grid-cols-2 place-items-center">
                {
                    pedido.productos.map(
                        (producto) => { 
                            return <CardOrderProduct product={producto}></CardOrderProduct>;
                        }
                    )
                }
            </div>}
            <div className="w-full text-2xl font-semibold">
                <div className={"w-full text-center " + (estado=='A' ? 'bg-blue': '') + (estado=='R' ? 'bg-red':'') + (estado=='E' ? 'bg-green' : '') +(estado=='P' ? 'bg-lightGrey': '') + (estado=='D' ? 'bg-yellow': '')}>Estado: {diccionario[pedido.pedido.estado]}</div>
                <div className="w-full text-end">Total: ${pedido.pedido.costoTotal}</div>
            </div>
        </div>
    );
}