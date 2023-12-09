//import data from '../jsons/shoes.json' assert {type: 'json'}

import { url_backend } from "./information";

export const getShoesCardHome = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    return data;
};

export const getAllProducts = async () => {
    try{
        let url = url_backend + '/productos/listar';
        let response = await fetch(url, {
            method: 'GET',
           
        });
        return await response.json();
        
    }
    catch(error){
        alert(error);
    }
    
};

export const getProductsByCategorie = async (categoria) => {
    try{
        let url = url_backend + '/productos/listar';
        let response = await fetch(url, {
            method: 'GET',
           
        });
        const data =  await response.json();

        const answer = [];

        data.forEach(product => {
            if(product.categoria_id == categoria){
                answer.push(product);
            }
        });

        return answer;
        
    }
    catch(error){
        alert(error);
    }
    
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

export async function getAsideInformation(){
    try{
        let url = url_backend + "/productos/listarColoresTallas";
        let response = await fetch(url, {
            method: 'GET',
        });
        
        return await response.json();
        

    }
    catch(error){
        alert(error);
    }
}

export async function getAllPhotos(){
    try{
        let url = url_backend + "/fotos/listar";
        let response = await fetch(url, {
            method: 'GET',
        });
        
        const data = await response.json();

        const mapa = new Map();

        

    }
    catch(error){
        alert(error);
    }
}


export async function filteredByColorAndTalla(content){
    try{
        let url = url_backend + '/productos/filtrarColoresTallas';
        let response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });

        return await response.json();
        
    }
    catch(error){
        alert(error);
    }
};

export const getProduct = (id) => {
    return "";
};

export async function getRandomImage(){
    let url = url_backend + '/fotos/listaraleatorio';
    let response = await fetch(url, {
        method: 'GET',
    });

    return await response.json();
};

export const editInventory = (inventory) => {
    alert(inventory);
};