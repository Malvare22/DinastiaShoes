import { getCart } from "./cart";
import { url_backend } from "./information";

export async function createOrder(comprobante, medio_pago_id){
    try{

        const carrito = ((((((await getCart())[0]).inventarios)[0]).carrito_detalles)[0]).carrito_id;
        let url = url_backend + '/pedido/crear';
        const formData = new FormData();
        formData.append('id', parseInt(carrito));
        // Obtén la fecha actual
        const fechaActual = new Date();

        // Obtiene los componentes de la fecha (día, mes, año)
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1; // Nota: en JavaScript, los meses van de 0 a 11
        const año = fechaActual.getFullYear();

        // Formatea la fecha como un string en el formato dd/mm/yyyy
        const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${año}`;

        console.log(fechaFormateada);
        formData.append('fecha', fechaFormateada);
        formData.append('cliente_cedula', parseInt(localStorage.getItem('id')));
        formData.append('mediodepago', medio_pago_id);
        formData.append('comprobar', comprobante);
        let response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        return await response.json();

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
        });
        return await response.json();

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
        });
        return await response.json();

    }
    catch(error){
        alert(error);
    }
};