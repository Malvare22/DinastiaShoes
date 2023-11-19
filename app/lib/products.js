//import data from '../jsons/shoes.json' assert {type: 'json'}

export const getShoesCardHome = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    return data;
};

export const getAllProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    return data;
};

export const getProduct = (id) => {
    return "";
};

export const editInventory = (inventory) => {
    alert(inventory);
};