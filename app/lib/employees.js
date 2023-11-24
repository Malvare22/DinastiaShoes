import employees from '../jsons/employees.json' assert {type: 'json'}
import { DateExportFormat, DateToSlash } from './information';

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

export async function addEmployee(employee){
    try{
        employee.fecha_nacimiento = DateToSlash(employee.fecha_nacimiento);
        let url = 'http://localhost:3000/usuario/crearEmpleado';
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
        });
        await response.json();

        url = 'http://localhost:3000/empleado/crear';
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

export async function getEmployee(id){
    try{
        const url = 'http://localhost:3000/usuario/obtener/' + id;
        const response = await fetch(url, {
            method: 'GET',
        });
        return await response.json();
    }
    catch(error){
        alert(error);
    }
};

export async function editEmployee(employee){
    try{
        let url = 'http://localhost:3000/usuario/actualizar/' + employee.cedula;
        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
        });

        console.log(employee)
        // await response.json();

        // url = 'http://localhost:3000/empleado/crear';
        // response = await fetch(url, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(employee)
        // });
        return await response.json();
    }
    catch(error){
        alert(error);
    }
};