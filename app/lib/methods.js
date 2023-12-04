/***
 * Se realiza la consulta a la base de datos
 */
export async function getMethodById(id){
    try{
        let url = 'http://localhost:3000/medioPago/obtener/' + id;
        let response = await fetch(url, {
            method: 'GET'
        });

        let data = (await response.json())[0];

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
        let url = 'http://localhost:3000/medioPago/editar';
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

export async function getMethods(){
    try{
        let url = 'http://localhost:3000/medioPago/listar';
        let response = await fetch(url, {
            method: 'GET',
        });
        return await response.json();
    }
    catch(error){
        alert(error);
    }
};

export async function removeMethod(method){
    try{
        let url = 'http://localhost:3000/medioPago/eliminar/' + method.id;
        let response = await fetch(url, {
            method: 'DELETE',
        });
        return await response.json();
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
        let url = 'http://localhost:3000/medioPago/subirImagen';
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