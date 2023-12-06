'use client'
import { Button, FileButton, ToLink } from "@/app/components/buttons";
import { Card } from "@/app/components/methods/card";
import ManipulateCard from "@/app/components/methods/manipulateCard";
import Modal from "@/app/components/modal";
import PageContainer from "@/app/components/pageContainer";
import { columnsOrderProducts } from "@/app/components/table/columns";
import { Table } from "@/app/components/table/table";
import { LabelInput, PageTittle } from "@/app/components/text";
import { getOrderById, updateOrder } from "@/app/lib/order";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page({params}){

    const [products, setProducts] = useState([]);
    const [data, setData] = useState({});
    const router = useRouter();

  const getData = async () => {
    try{

      const order = await getOrderById(params.id);
      const carrito = (order[0])['carrito'];
      const tmp_productos_pedidos = []; 
      carrito.forEach(
        (producto) => {
            const codigo_producto = producto['codigo'];
            //const nombre_producto = producto 
            const color_producto = producto['color']; 
            const talla_producto = producto['talla'];
            const cantidad_producto = ((producto['pedido_detalles'])[0])['cantidad'];
            const precio_producto = producto['precio'];
            tmp_productos_pedidos.push({'codigo': codigo_producto, 'color': color_producto, 'talla': talla_producto, 'cantidad': cantidad_producto, 'precio': precio_producto});
        }
      );
      const persona = (order[1])['persona'];
        console.log(persona)
        const persona_nombre = persona['apellidos'] + ' ' + persona['nombres'];
        const persona_cedula = persona['cedula'];
        const persona_informacion_direccion = (persona['clientes'])[0];
        const persona_telefono = persona_informacion_direccion['telefono']; 
        const persona_departamento = persona_informacion_direccion['departamento'];
        const persona_municipio = persona_informacion_direccion['municipio'];
        const persona_direccion = persona_informacion_direccion['direccion_completa'];
        const persona_referencias = persona_informacion_direccion['informacion_complementaria'];

        const tmp_usuario = {'usuario': {'nombre': persona_nombre, 'cedula': persona_cedula, 'telefono': persona_telefono, 'departamento': persona_departamento, 'municipio': persona_municipio, 'direccion': persona_direccion, 'referencias': persona_referencias}};

        const pedido = (persona_informacion_direccion['pedidos'])[0];
        const pedido_fecha = pedido['fecha'];
        const pedido_estado = pedido['estado'];
        const pedido_id = pedido['id'];
        const pedido_comprobante = pedido['comprobante'];
        const pedido_valor = (order[2])['Total'];
        const tmp_pedido = {'id': pedido_id,'fecha': pedido_fecha, 'estado': pedido_estado, 'comprobante': pedido_comprobante, 'valor': pedido_valor};
        const persona_pedido = {... tmp_usuario, ['pedido']: tmp_pedido};

        setProducts(tmp_productos_pedidos);
        setData(persona_pedido);

    }
    catch(error){
      console.log(error);
    }
  };  

    useEffect(
        () => {
            getData();
        }, []
    );
    
    

    return(
        <PageContainer>
            <PageTittle>PEDIDO Nº{params.id}</PageTittle>
            {data.usuario && data.pedido && <OrderForm data={data}></OrderForm>}
            <Table columns={columnsOrderProducts} actions={[]} data={products}></Table>
        </PageContainer>
    );
};


const OrderForm = ({data}) => {
    const router = useRouter();

    const [estado, setEstado] = useState(data.pedido.estado);

    const backPage = () => {
        router.push("/orders");
    }

    const handleUpdate = async () => {
        try{
            const to_send = {"id": data.pedido.id, "estado": estado};
            //console.log(to_send);
            await updateOrder(to_send);
            //location.reload();
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <><div className="border-black border mb-10">
            <div className="text-black flex justify-start p-10 space-x-52">
                <div className="flex space-x-10">
                    <div className="space-y-10">
                        <Row>Nombre:</Row>
                        <Row>Cédula:</Row>
                        <Row>Telefono:</Row>
                        <Row>Fecha:</Row>
                        <Row>Valor:</Row>
                        <Row>Estado:</Row>
                    </div>
                    <div className="space-y-10">
                        <Row>{data.usuario.nombre}</Row>
                        <Row>{data.usuario.cedula}</Row>
                        <Row>{data.usuario.telefono}</Row>
                        <Row>{data.pedido.fecha}</Row>
                        <Row>{data.pedido.valor}</Row>
                        <Row><Select estado={estado} setEstado={setEstado}></Select></Row>
                    </div>
                </div>
                <div className="flex space-x-10">
                    <div className="space-y-10">
                            <Row>Departamento:</Row>
                            <Row>Municipio:</Row>
                            <Row>Dirreción Completa:</Row>
                            <Row>Referencias Adicionales:</Row>
                            <FileButton type={2} text={"Comprobante de pago"}></FileButton>

                    </div>
                    <div className="space-y-10">
                        <Row>{data.usuario.departamento}</Row>
                        <Row>{data.usuario.municipio}</Row>
                        <Row>{data.usuario.direccion}</Row>
                        <Row>{data.usuario.referencias}:</Row>
                    </div>
                </div>
            </div>
            <div className="flex justify-end space-x-10 p-5">
                <Button color={"bg-green"} handleButton={handleUpdate}>Actualizar pedido</Button>
                <Button color={"bg-grey"} handleButton={() => backPage()}>Cancelar</Button>
            </div>
        </div></>
    );
};

const Row = ({children}) => {

    return(
        <div className="p-1">
            {children}
        </div>
    );
};

const options = ['P', 'A', 'D', 'E', 'R'];
const diccionario = {'P': 'Pendiente', "A": 'Aprobado', "D":'Despachado', "E":'Entregado', "R": 'Rechazado'};


const Select = ({estado, setEstado}) => {
    return(
        <select className="bg-lightGrey p-1" onChange={(e)=>{setEstado(e.target.value)}} value={estado}>
            {
                options.map(
                    (option, index) => (<option key={index} selected = { estado == option } value={option}>{diccionario[option]} </option>)
                )
            }   
        </select>
    );
};