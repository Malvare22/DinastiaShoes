import { Button, ToLink } from "../components/buttons";
import { CartEmpty, CartProduct } from "../components/cartProduct";
import { CartIcon } from "../components/icons/icons";
import PageContainer from "../components/pageContainer";
import { PageTittle } from "../components/text";

export default function Page(){
    return(

        <PageContainer>
            <div className="flex align-middle items-center space-x-2"><PageTittle>Carrito de Compra </PageTittle><CartIcon></CartIcon></div>
            <div className="mx-5">
                <div className="grid grid-cols-2">
                    <CartProduct></CartProduct>
                    <CartProduct></CartProduct>
                </div>
                <div className="my-20">
                    <div className="text-black font-semibold text-2xl">
                        Total: $1'400.000
                    </div>
                    <div className="flex space-x-6">
                        <Button color="bg-green">Continuar</Button>
                        <Button color="bg-lightRed">Limpiar Carrito</Button>
                        <ToLink link="/products" color="bg-grisAzulado">Añadir</ToLink>
                    </div>
                </div>
            </div>
        </PageContainer>
        
    );
};