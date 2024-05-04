import { readLocalStorage } from "../components/hooks/useLocalStorage";
import { getCart } from "./cart";
import { url_backend } from "./information";

export async function createOrder(comprobante, medio_pago_id){
    
    const carrito = ((((((await getCart())[0]).inventarios)[0]).carrito_detalles)[0]).carrito_id;
    let url = url_backend + '/pedido/crear';
    const formData = new FormData();
    formData.append('id', carrito);
    // Obtén la fecha actual
    const fechaActual = new Date();

    // Obtiene los componentes de la fecha (día, mes, año)
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Nota: en JavaScript, los meses van de 0 a 11
    const año = fechaActual.getFullYear();

    // Formatea la fecha como un string en el formato dd/mm/yyyy
    const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${año}`;

    formData.append('fecha', fechaFormateada);
    formData.append('cliente_cedula', readLocalStorage('id'));
    formData.append('mediodepago', medio_pago_id);
    let img = await fetch(comprobante).then(res => res.blob());
    formData.append('comprobar', img);
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': readLocalStorage('token')
        },
        body: formData
    });
    try{
        const x = await response.json();

        if(x.error) throw new Error('Token inválido o permisos insuficientes');
        
        return x;
    }
    catch(error){
        alert(error);
    }

   
};

export async function updateOrder(data){
   
    try{
        let url = url_backend + '/pedido/actualizar';
    
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': readLocalStorage('token')
            },
            body: JSON.stringify(data),
        });
        const x = await response.json();

            if(x.error) throw new Error('Token inválido o permisos insuficientes');
            
            return x;
    }
    catch(error){
        alert(error);
    }

   
};

export async function getAllOrders(){
    try{
        let url = url_backend + '/pedido/listar';

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

export async function getOrderById(id){
    try{
        let url = url_backend + '/pedido/obtener/' + id;

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

export async function getOrdersForClient(){
    try{
        let url = url_backend + '/pedido/listarUsuario/' + readLocalStorage('id');

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