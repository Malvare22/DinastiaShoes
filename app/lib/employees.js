import employees from '../jsons/employees.json' assert {type: 'json'}
import { DateExportFormat, DateToSlash, url_backend } from './information';

export async function getEmployees() {
    try{
        const url = url_backend + '/usuario/listarFiltrado/E';
        const response = await fetch(url, {
            method: 'GET',
        });
        return await response.json();
    }
    catch(error){
        alert(error);
    }
} 

export async function addEmployee(employee){
    try{
        employee.fecha_nacimiento = DateToSlash(employee.fecha_nacimiento);
        let url = url_backend + '/usuario/crearEmpleado';
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
        });
        await response.json();

        url = url_backend + '/empleado/crear';
        response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
        });
        return await response.json();

    }
    catch(error){
        alert(error);
    }
};

export async function removeEmployee(id){
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

export async function getEmployee(id){
    try{
        let url = url_backend + '/empleado/obtener/' + id;
        let response = await fetch(url, {
            method: 'GET',
        });
        
        let ans;
        ans = await response.json();
        ans = {...ans, ["inventario"]: (((ans["empleados"])[0])["inventario"]), ["ventas"]: (((ans["empleados"])[0])["ventas"])};
        return ans;
        

    }
    catch(error){
        alert(error);
    }
};

export async function editEmployee(employee){
    try{
        let url = url_backend + '/usuario/actualizar/' + employee.cedula;
        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
        });

        await response.json();

        url = url_backend + '/empleado/actualizar/' + employee.cedula;
        response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
        });
        return await response.json();
    }
    catch(error){
        alert(error);
    }
};