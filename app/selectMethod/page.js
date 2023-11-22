'use client'
import { useState } from "react";
import { Button, FileButton, ToLink } from "../components/buttons";
import PageContainer from "../components/pageContainer";
import { PageTittle } from "../components/text";
import { VaucherFail } from "../components/methods/vaucher";

export default function Page(){

    const [voucher, setVoucher] = useState({});
    const [view, setView] = useState(false);
    const baseText = "Anexar Comprobante de Pago";
    const [text, setText] = useState(baseText);

    const handleButton = (e) => {
        const file = e.target.files[0];
        const regex = /^(.*)\.(pdf)$/;
        if(!file || !regex.test(file.name)){ 
            setView(true);
            setText(baseText)
            setVoucher({});
            return;
        }
    
        const reader = new FileReader();
        reader.onload = () => {
          setVoucher(reader.result);
        };
        reader.readAsDataURL(file);
        setText(file.name);
        setView(false);
    };

    return (
        <PageContainer>
            <PageTittle>
                Seleccione un método de pago
            </PageTittle>

            <div className="flex justify-center">
                <div className="text-black inline-block">
                    <FileButton type={1} name={"voucher"} text={text} extension={".pdf"} handleButton={handleButton}></FileButton>
                    {view && <VaucherFail></VaucherFail>}
                    
                </div>
                
            </div>
            <div className="flex justify-center space-x-20">
                        <Button color="bg-green">Continuar</Button>
                        <ToLink link="/direction" color="bg-grey">Cancelar</ToLink>
                    </div>
        </PageContainer>
    );
};