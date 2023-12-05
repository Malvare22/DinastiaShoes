import { url_backend } from "./information";

export async function AddToCart(product, amount){
    try{
        let url = url_backend + '/carrito/agregarProducto';
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "cedula": localStorage.getItem('id'),
                "producto": product.codigo,
                "cantidad": amount
            })
        });
        return await response.json();

    }
    catch(error){
        alert(error);
    }
};

export async function getCart(){
    try{
        let url = url_backend + '/carrito/listar/' + localStorage.getItem('id');
        let response = await fetch(url, {
            method: 'GET',
           
        });
        return await response.json();

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
            },
            body: JSON.stringify({
                "id": cartId,
                "inventa": product
            })
           
        });
        return await response.json();

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
        });
        return await response.json();

    }
    catch(error){
        alert(error);
    }
};