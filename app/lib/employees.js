import employees from '../jsons/employees.json' assert {type: 'json'}

export async function getEmployees() {
    try{
        const url = 'http://localhost:3000/usuario/listarFiltrado/E';
        const response = await fetch(url, {
            method: 'GET',
        });
        return await response.json();
    }
    catch(error){
        alert(error);
    }
} 

export function addEmployee(employee){

};

export async function removeEmployee(id){
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
