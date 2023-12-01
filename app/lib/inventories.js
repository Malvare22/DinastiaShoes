import { url_backend } from "./information";

export async function getInventories(){
    try{
        let url = url_backend + '/productos/listar';
        let response = await fetch(url, {
            method: 'GET',
        });

        let data = await response.json();
        let ans = data.map(
            (value) => {
                let tmp = {"codigo": value.codigo, "nombre": value.nombre};
                let tallas = new Set();
                let colores = new Set();
                let sum = 0;
                let inventario = value.inventarios;
                for(let i = 0; i<inventario.length; i++){
                    sum+= inventario[i].cantidad;
                    tallas.add((inventario[i]).talla);
                    colores.add((inventario[i]).color);
                };
                let colores_to_string = "";
                let j = 0;
                let limit = colores.size-1;
                for(const item of colores){
                    colores_to_string+= item;
                    if(j != limit) colores_to_string+= ", ";
                    j++;
                };

                let tallas_to_string = "";
                j = 0;
                limit = tallas.size-1;
                for(const item of tallas){
                    tallas_to_string+= item;
                    if(j != limit) tallas_to_string+= ", ";
                    j++;
                };
  
                tmp = {...tmp, ["talla"]: tallas_to_string, ["color"]: colores_to_string, ["cantidad"]: sum}
                return tmp;
            }
        )
        return ans;
    }
    catch(error){
        alert(error);
    }
};

export async function createProduct(product){
    try{
        let url = url_backend + '/productos/crear';
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        return await response.json();
        
    }
    catch(error){
        alert(error);
    }
};

export async function createInventory(inventory, productId){
    try{
        let url = url_backend + '/inventario/crear';
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({...inventory, ["producto_codigo"]: productId}),
        });

        return await response.json();
        
    }
    catch(error){
        alert(error);
    }
};

export async function uploadImagesInventory(images, productId){
    try{
        let url = url_backend + '/fotos/subirImagen/' + productId;
        const formData = new FormData();
       
        // const img_to_send = images.map(async (element) => {
        //    return await fetch(element).then(res => res.blob());
        // });

        const img_to_send = await fetch(images[0]).then(res => res.blob());

        formData.append('image', img_to_send);

        let response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        console.log(await response.json());
        return await response.json();
        
    }
    catch(error){
        alert(error);
    }
};

export async function getProducts(id){
    try{
        let url = url_backend + '/productos/obtener/' + id;
        let response = await fetch(url, {
            method: 'GET',
        });

        return await response.json();
        
    }
    catch(error){
        alert(error);
    }
};

export const template_tx = {
    nombre: "",
    precio: "",
    color: "",
    talla: "",
    cantidad: "",
    destacado: "",
    categoria_id: "",
    descripcion: "",
    descuento: ""
};

export const template_validate_tx = {
    nombre: false,
    precio: false,
    color: false,
    talla: false,
    cantidad: false,
    destacado: false,
    categoria_id: false,
    descripcion: false,
    descuento: false
};

export const template_validate_t3 = {
    nombre: true,
    precio: true,
    color: true,
    talla: true,
    cantidad: true,
    descripcion: true,
};

