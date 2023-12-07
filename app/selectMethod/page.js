'use client'
import { useEffect, useState } from "react";
import { Button, FileButton, ToLink } from "../components/buttons";
import PageContainer from "../components/pageContainer";
import { PageTittle } from "../components/text";
import { VaucherFail } from "../components/methods/vaucher";
import { getMethods } from "../lib/methods";
import { Card } from "../components/methods/card";
import { createOrder } from "../lib/order";
import { useRouter } from "next/navigation";

export default function Page(){

    const [methods, setMethods] = useState([]);
    const [voucher, setVoucher] = useState({});
    const [view, setView] = useState(false);
    const baseText = "Anexar Comprobante de Pago";
    const [text, setText] = useState(baseText);
    const router = useRouter();

    const [select, setSelect] = useState(-1);

    const getData = async () => {
        try{
            setMethods(await getMethods());
        }   
        catch{
            console.log(error);
        }
    };

    const handleSend = async () => {
        try{
            const tempo = await createOrder(voucher, select);
            if(tempo.error){
                router.push('/purchase?code=2');
            }
            router.push('/purchase?code=1');
        }
        catch{
            router.push('/purchase?code=2');
        }
    };

    useEffect(
        () => {
            getData();
        }, []
    );

    const handleButton = (e) => {
        const file = e.target.files[0];
        const regex = /^(.*)\.(pdf|jpg|png)$/;
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
            <div className="grid lg:grid-cols-3 grid-cols-1 place-items-center">
                {methods.map(
                    (method) => {
                        return <Option key={method.id} id={method.id} select={select} setSelect={setSelect}><Card data={method}></Card></Option>;
                    }
                )}
            </div>

            <div className="flex justify-center">
                <div className="text-black inline-block">
                    <FileButton type={1} name={"voucher"} text={text} extension={".png, .jpg"} handleButton={handleButton}></FileButton>
                    {view && <VaucherFail></VaucherFail>}
                    
                </div>
                
            </div>
            <div className="flex justify-center space-x-20 mb-10">
                        <Button color="bg-green" handleButton={handleSend} disable={select == -1 || Object.keys(voucher).length === 0}>Continuar</Button>
                        <ToLink link="/direction" color="bg-grey">Cancelar</ToLink>
                    </div>
        </PageContainer>
    );
};

const Option = ({id, children, setSelect, select}) => {
    return(
        <div className={"mb-10 cursor-pointer border-4 rounded-lg hover:border-black " + (select==id && "border-blueDark") } onClick={() => setSelect(id)}>
            {children}
        </div>
    );
};