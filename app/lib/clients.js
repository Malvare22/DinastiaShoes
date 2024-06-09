import { readLocalStorage } from '../components/hooks/useLocalStorage';
import employees from '../jsons/employees.json' assert {type: 'json'}
import { DateToSlash, url_backend } from './information';

export async function getClients() {
    try{
        const url = url_backend + '/usuario/listarFiltrado/C';
        const response = await fetch(url, {
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
} 

export async function removeClient(id){
    try{
        const url = url_backend + '/usuario/eliminar/' + id;
        const response = await fetch(url, {
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

        let x = await response.json();

        if(x.error) throw new Error(x.error);

        url = url_backend + '/cliente/crearCliente';
        response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(client)
        });

        x = await response.json();

        if(x.error) throw new Error(x.error);
        
        return x;
    }
    catch(error){
        alert(error);
    }
};

export async function editDirection(direction){
    try{

        let url = url_backend + '/cliente/actualizar/' + readLocalStorage('id');
        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': readLocalStorage('token')
            },
            body: JSON.stringify(direction)
        });

        const x = await response.json();

        if(x.error) throw new Error('Token inválido o permisos insuficientes');
        
        return x;

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
