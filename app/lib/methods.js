import { url_backend } from "./information";
import { readLocalStorage } from "../components/hooks/useLocalStorage";

/***
 * Se realiza la consulta a la base de datos
 */
export async function getMethodById(id){
    try{
        let url = url_backend + '/medioPago/obtener/' + id;
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': readLocalStorage('token')
            },
        });

        const x = await response.json();

        if(x.error) throw new Error('Token inválido o permisos insuficientes');

        let data = (x)[0];

        return data;
    }
    catch(error){
        alert(error);
    }
};

export async function editMethod(method, flag){
    const formData = new FormData();
 
    let img = await fetch(method.logo).then(res => res.blob());
    formData.append("logo", img);


    img = await fetch(method.qr).then(res => res.blob());
    formData.append("qr", img);


    formData.append("info", method.info);
    formData.append("id", method.id);
    formData.append("nombre", method.nombre);
    formData.append("color", method.color);
    try{
        let url = url_backend + '/medioPago/editar';
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'authorization': readLocalStorage('token')
            },
            body: formData
        });
        const x = await response.json();

        if(x.error) throw new Error('Token inválido o permisos insuficientes');
        
        return x;

    }
    catch(error){
        alert(error);
    }

};

export async function getMethods(){
    try{
        let url = url_backend + '/medioPago/listar';
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

export async function removeMethod(method){
    try{
        let url = url_backend + '/medioPago/eliminar/' + method.id;
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
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

export async function createMethod(method){
    try{
        const formData = new FormData();
        let img = await fetch(method.logo).then(res => res.blob());
        formData.append("logo", img);
        img = await fetch(method.qr).then(res => res.blob());
        formData.append("qr", img);
        formData.append("info", method.info);
        formData.append("id", method.id);
        formData.append("nombre", method.nombre);
        formData.append("color", method.color);
        let url = url_backend + '/medioPago/subirImagen';
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'authorization': readLocalStorage('token')
            },
            body: formData
        });
       
        const x = await response.json();

        if(x.error) throw new Error('Token inválido o permisos insuficientes');
        
        return x;

    }
    catch(error){
        alert(error);
    }
};