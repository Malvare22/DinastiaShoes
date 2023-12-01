import methods from '../jsons/methods.json'
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
        let imgs = {"logo": data.logo, "qr": data.qr};
        data.logo = "";
        data.qr = "";
        data = {...data, ["imgs"]: imgs};

        return data;
    }
    catch(error){
        alert(error);
    }
};

export async function editMethod(id, nombre, logo, qr, info, color){
    console.log(logo)
    const img = await fetch(logo).then(res => res.blob());
    console.log(img)
    
    // const emptyBlob = new Blob([], { type: 'image/png' });
    // const formData = new FormData();
    // let img1 = emptyBlob, img2 = emptyBlob;
    // if(qr != ""){
    //     img2 = await fetch(qr).then(res => res.blob());
    // }
    
    // formData.append("logo", img1);
    // formData.append("qr", img2);
    // formData.append("info", info);
    // formData.append("id", id);
    // formData.append("nombre", nombre);
    // formData.append("color", color);
    // let url = 'http://localhost:3000/medioPago/editar';
    // let response = await fetch(url, {
    //     method: 'POST',
    //     body: formData
    // });

    // return await response.json();
    
};

export function getMethods(){
    return methods;
}