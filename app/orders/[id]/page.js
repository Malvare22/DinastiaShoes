'use client'
import { Button, FileButton, ToLink } from "@/app/components/buttons";
import { Card } from "@/app/components/methods/card";
import ManipulateCard from "@/app/components/methods/manipulateCard";
import Modal from "@/app/components/modal";
import PageContainer from "@/app/components/pageContainer";
import { LabelInput, PageTittle } from "@/app/components/text";
import { getOrderById } from "@/app/lib/orders";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Page({params}){

    const order = getOrderById(params.id);
    const router = useRouter();

    return(
        <PageContainer>
            <PageTittle>PEDIDO Nº{order.id}</PageTittle>
            <OrderForm order={order} router={router}></OrderForm>
        </PageContainer>
    );
};


const OrderForm = ({order, router}) => {

    const backPage = () => {
        router.push("/orders");
    }

    return(
        <div className="border-black border mb-10">
            <div className="text-black flex justify-start p-10 space-x-52">
                <div className="flex space-x-10">
                    <div className="space-y-10">
                        <Row>Nombre:</Row>
                        <Row>Valor:</Row>
                        <Row>Telefono:</Row>
                        <Row>Estado:</Row>
                    </div>
                    <div className="space-y-10">
                        <Row>{order.nombre}</Row>
                        <Row>{order.nombre}</Row>
                        <Row>{order.telefono}</Row>
                        <Row><Select></Select></Row>
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
                        <Row>Departamento:</Row>
                        <Row>Municipio:</Row>
                        <Row>Dirreción Completa:</Row>
                        <Row>Referencias Adicionales:</Row>
                    </div>
                </div>
            </div>
            <div className="flex justify-end space-x-10 p-5">
                <Button color={"bg-green"}>Actualizar pedido</Button>
                <Button color={"bg-grey"} handleButton={() => backPage()}>Cancelar</Button>
            </div>
        </div>
    );
};

const Row = ({children}) => {

    return(
        <div className="p-1">
            {children}
        </div>
    );
};

const options = {"Pendiente": 'P', "Aprobado": 'A', "Despachado":'D', "Entregado":'E', "Rechazado": 'R'};

const Select = ({state}) => {
    return(
        <select className="bg-lightGrey p-1">
            {Object.keys(options).map((key) => (
                <option key={key} value={options[key]}>
                    {key}
                </option>
            ))}
        </select>
    );
};