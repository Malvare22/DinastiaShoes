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
    formData.append('cliente_cedula', localStorage.getItem('id'));
    formData.append('mediodepago', medio_pago_id);
    let img = await fetch(comprobante).then(res => res.blob());
    formData.append('comprobar', img);
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    return await response.json();

   
};

export async function updateOrder(data){
    
    let url = url_backend + '/pedido/actualizar';
   
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    return await response.json();

   
};

export async function getAllOrders(){
    try{
        let url = url_backend + '/pedido/listar';

        let response = await fetch(url, {
            method: 'GET',
        });
        return await response.json();

    }
    catch(error){
        console.log(error);
    }
};

export async function getOrderById(id){
    try{
        let url = url_backend + '/pedido/obtener/' + id;

        let response = await fetch(url, {
            method: 'GET',
        });
        return await response.json();

    }
    catch(error){
        alert(error);
    }
};