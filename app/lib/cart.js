import { readLocalStorage } from "../components/hooks/useLocalStorage";
import { url_backend } from "./information";

export async function AddToCart(product, amount){
    try{
        let url = url_backend + '/carrito/agregarProducto';
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': readLocalStorage('token')
            },
            body: JSON.stringify({
                "cedula": readLocalStorage('id'),
                "producto": product.codigo,
                "cantidad": amount
            })
        });
        const x = await response.json();

        if(x.error) throw new Error('Token inválido o permisos insuficientes');
        
        return x;

    }
    catch(error){
        alert(error);
    }
};

export async function getCart(){
    try{
        let url = url_backend + '/carrito/listar/' + readLocalStorage('id');
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': readLocalStorage('token')
            },
        });
        const x = await response.json();

        if(x.error) throw new Error('Token inválido o permisos insuficientes');
        
        return x;

    }
    catch(error){
        alert(error);
    }
};


export async function removeProductCart(product, cartId){
    try{
        let url = url_backend + '/carrito/eliminarId';
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': readLocalStorage('token')
            },
            body: JSON.stringify({
                "id": cartId,
                "inventa": product
            })
           
        });
        const x = await response.json();

        if(x.error) throw new Error('Token inválido o permisos insuficientes');
        
        return x;

    }
    catch(error){
        alert(error);
    }
};

export async function removeAllCart(cartId){
    try{
        
        let url = url_backend + '/carrito/eliminarTodo/' + cartId;
        let response = await fetch(url, {
            method: 'DELETE',  
            headers: {
                'Content-Type': 'application/json',
                'authorization': readLocalStorage('token')
            },
        });
        const x = await response.json();

        if(x.error) throw new Error('Token inválido o permisos insuficientes');
        
        return x;

    }
    catch(error){
        alert(error);
    }
};