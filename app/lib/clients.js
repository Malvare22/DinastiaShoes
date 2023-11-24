import employees from '../jsons/employees.json' assert {type: 'json'}
import { DateExportFormat, DateToSlash } from './information';

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
