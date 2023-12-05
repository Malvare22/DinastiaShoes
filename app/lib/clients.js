import employees from '../jsons/employees.json' assert {type: 'json'}
import { DateToSlash } from './information';

export async function getClients() {
    try{
        const url = 'http://localhost:3000/usuario/listarFiltrado/C';
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
        const url = 'http://localhost:3000/usuario/eliminar/' + id;
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
        let url = 'http://localhost:3000/usuario/crearCliente';
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(client)
        });

        await response.json();

        url = 'http://localhost:3000/cliente/crearCliente';
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

        let url = 'http://localhost:3000/cliente/actualizar/' + localStorage.getItem('id');
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

export async function getDirection(id){
    try{

        let url = 'http://localhost:3000/cliente/obtener/' + id;
        let response = await fetch(url, {
            method: 'GET',
        });

        return await response.json();
    }
    catch(error){
        alert(error);
    }
};
