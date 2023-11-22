import { Button, ToLink } from "../buttons"
import PageContainer from "../pageContainer"

const B1 = () => {
    return(
        <>
            Debes esperar a que los administradores verifiquen la compra<br></br><br></br>
            Cualquier inquietud contacta con nuestros canales de información
        </>
    )
}

const B2 = () => {
    return(
        <>
            Por favor, contacta por nuestros canales de información
        </>
    )
}

const m1 = "Comprobante enviado con éxito!"
const m2 = "Fallo en envío de comprobante";

const FailIcon = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="black" className="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
    );
};

const SuccesfulIcon = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="black" className="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
        </svg>
    );
};

export const PurchaseFrame = ({condition}) => {
    
    return(
        <PageContainer>
            <div className="bg-lightGrey text-center text-black flex flex-col align-middle p-24 space-y-10">
                {
                    condition == 1 && <><div className="text-4xl">{m1}</div><div className="flex justify-center"><SuccesfulIcon></SuccesfulIcon></div><div className="text-font-semibold"><B1></B1></div><div><ToLink link="/" color="bg-yellow">Volver al inicio</ToLink></div></>
                }
                {
                    condition == 2 && <><div className="text-4xl">{m2}</div><div className="flex justify-center"><FailIcon></FailIcon></div><div className="text-font-semibold"><B2></B2></div><div><ToLink link="/" color="bg-yellow">Volver al inicio</ToLink></div></>
                }
            </div>
        </PageContainer>
    );

};