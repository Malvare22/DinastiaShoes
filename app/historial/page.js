'use client'
import { useEffect, useState } from "react";
import { CardOrderProduct } from "../components/cartProduct";
import PageContainer from "../components/pageContainer";
import { PageTittle } from "../components/text";
import { getOrdersForClient } from "../lib/order";

export default function Page(){

    const [data, setData] = useState([]);

    const getData = async () => {
        try{
            const tmp = (await getOrdersForClient());
            const tmp_data = [];
            tmp_data.forEach(pedido => {
                const pedido_fecha = (pedido['pedido'])['fecha'];
                const pedido_estado = (pedido['pedido'])['estado'];
                const pedido_costo = pedido['costoTotal'];
                //Posee datos del pedido
                const data_pedido = {'fecha': pedido_fecha, 'estado': pedido_estado, 'costoTotal': pedido_costo};
                const data_productos = pedido['productoss'].map(
                    (producto) => {
                        const producto_cantidad = (producto['product'])['cantidad'];
                        const producto_nombre = (producto['producto'])['nombre'];
                        const producto_talla = (producto['producto'])['talla'];
                        const producto_color = (producto['producto'])['color'];
                        const producto_precio = (producto['producto'])['precio'];
                        const producto_foto = (((producto['producto'])['fotos'])[0])['url_foto'];:
                        return {'cantidad': producto_cantidad,'nombre': producto_nombre, 'talla': producto_talla, 'color':, 'talla', 'precio', 'foto'}

                    }
                )
            });
        }catch(error){
            console.log(error);
        }
    };

    useEffect(
        () => {
            getData();
        }, []
    )

    return(
        <PageContainer>
            <PageTittle>Pedidos</PageTittle>
            <OrderGroup></OrderGroup>
        </PageContainer>
    );

};  

const OrderGroup = () => {
    


    return(
        <div className="bg-grey px-10">
            <div className="text-white font-semibold text-2xl">Fecha: </div>
            <div className="lg:grid lg:grid-cols-3">
                <CardOrderProduct></CardOrderProduct>
                <CardOrderProduct></CardOrderProduct>
                <CardOrderProduct></CardOrderProduct>
            </div>
            <div className="w-full text-2xl font-semibold">
                <div className="w-full bg-green text-center">Estado: Entregado</div>
                <div className="w-full text-end">Total: 13242</div>
            </div>
        </div>
    );
}