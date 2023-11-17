import inventories from '../jsons/inventories.json'

export function getInventories(){
    return inventories;
};

export const inventoriesInformationTemplate = {
    nombre: "",
    precio: "",
    color: "",
    talla: "",
    cantidad: "",
    descripcion: "",
};

export const inventoriesValidationTemplate = {
    nombre: false,
    precio: false,
    color: false,
    talla: false,
    cantidad: false,
    descripcion: false,
};