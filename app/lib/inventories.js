import inventories from '../jsons/inventories.json'

export function getInventories(){
    return inventories;
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

