'use client'

import { useState } from "react";
import { DeliveryLocalCard, DeliverySendCard } from "../components/delivery/develyCard";
import PageContainer from "../components/pageContainer";
import { PageTittle } from "../components/text";
import { Button, ToLink } from "../components/buttons";

export default function Page() {

    const [select, setSelect] = useState(0);

    const handleCard = (number) => {
        setSelect(number);
    };

    return (
        <PageContainer>
            <PageTittle>¿Qué prefieres?</PageTittle>
            <div className="space-y-4">
                <DeliveryLocalCard handleCard={handleCard} actual={select}></DeliveryLocalCard>
                <DeliverySendCard handleCard={handleCard} actual={select}></DeliverySendCard>
            </div>
            <div className="flex space-x-6 my-12">
                <Button color="bg-green">Continuar</Button>
                <ToLink link="/cart" color="bg-grey">Cancelar</ToLink>
            </div>
        </PageContainer>
    );
}

