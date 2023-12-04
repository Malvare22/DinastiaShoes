//import data from '../jsons/shoes.json' assert {type: 'json'}

import { url_backend } from "./information";

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

export async function getProductsDestacados(){
    try{
        let url = url_backend + "/productos/filtrar/A";
        let response = await fetch(url, {
            method: 'GET',
        });
        
        return await response.json();
        

    }
    catch(error){
        alert(error);
    }
}

export const getProduct = (id) => {
    return "";
};

export const editInventory = (inventory) => {
    alert(inventory);
};