import employees from '../jsons/employees.json' assert {type: 'json'}
import { DateToSlash, url_backend } from './information';

export async function getClients() {
    try{
        const url = url_backend + '/usuario/listarFiltrado/C';
        const response = await fetch(url, {
            method: 'GET',
        });
        return await response.json();
    }
    catch(error){
        alert(error);
    }
} 

export async function removeClient(id){
    try{
        const url = url_backend + '/usuario/eliminar/' + id;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        return await response.json();
    }
    catch(error){
        alert(error);
    }
};

export async function addClient(client){
    try{
        client.contrasen = client.contrasenia;
        client.fecha_nacimiento = DateToSlash(client.fecha_nacimiento);
        console.log(client);
        let url = url_backend + '/usuario/crearCliente';
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(client)
        });

        await response.json();

        url = url_backend + '/cliente/crearCliente';
        response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(client)
        });

        return await response.json();
    }
    catch(error){
        alert(error);
    }
};

export async function editDirection(direction){
    try{

        let url = url_backend + '/cliente/actualizar/' + localStorage.getItem('id');
        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(direction)
        });

        return await response.json();
    }
    catch(error){
        alert(error);
    }
};

export async function sendContact(information){
    try{

        let url = url_backend + '/usuario/enviarCorreoContacto';
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(information)
        });

        return await response.json();
    }
    catch(error){
        alert(error);
    }
};

export async function getDirection(id){
    try{

        let url = url_backend + '/cliente/obtener/' + id;
        let response = await fetch(url, {
            method: 'GET',
        });

        return await response.json();
    }
    catch(error){
        alert(error);
    }
};
