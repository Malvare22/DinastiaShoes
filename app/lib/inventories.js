import inventories from '../jsons/inventories.json'

export async function getInventories(){
    try{
        let url = 'http://localhost:3000/productos/listar';
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

export const template_tx = {
    nombre: "",
    precio: "",
    color: "",
    talla: "",
    cantidad: "",
    descripcion: "",
    descuento: ""
};

export const template_validate_tx = {
    nombre: false,
    precio: false,
    color: false,
    talla: false,
    cantidad: false,
    descripcion: false,
};

export const template_validate_t3 = {
    nombre: true,
    precio: true,
    color: true,
    talla: true,
    cantidad: true,
    descripcion: true,
};

