import employees from '../jsons/employees.json' assert {type: 'json'}
import { DateExportFormat, DateToSlash, url_backend } from './information';
import { readLocalStorage } from "../components/hooks/useLocalStorage";

export async function getEmployees() {
    try{
        const url = url_backend + '/usuario/listarFiltrado/E';
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

export async function addEmployee(employee){
    try{
        employee.fecha_nacimiento = DateToSlash(employee.fecha_nacimiento);
        let url = url_backend + '/usuario/crearEmpleado';
        console.log(readLocalStorage('token'))
        let response = await fetch(url, {
            method: 'PUT',
            headers: {                
                'authorization': readLocalStorage('token')
            },
            body: JSON.stringify(employee)
        });
        const x = await response.json();
        if(x.error) throw new Error('Token inválido o permisos insuficientes');

        url = url_backend + '/empleado/crear';
        response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': readLocalStorage('token')
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

export async function getEmployee(id){
    try{
        let url = url_backend + '/empleado/obtener/' + id;
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': readLocalStorage('token')
            },
        });
        
        let ans;
        ans = await response.json();
        if(ans.error) throw new Error('Token inválido o permisos insuficientes');
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
                'authorization': readLocalStorage('token')
            },
            body: JSON.stringify(employee)
        });

        const x = await response.json();
        if(x.error) throw new Error('Token inválido o permisos insuficientes');

        url = url_backend + '/empleado/actualizar/' + employee.cedula;
        response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': readLocalStorage('token')
            },
            body: JSON.stringify(employee)
        });
        return await response.json();
    }
    catch(error){
        alert(error);
    }
};
