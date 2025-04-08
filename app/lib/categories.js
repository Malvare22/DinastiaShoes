import categories from '../jsons/categories.json' assert {type: 'json'}
import { url_backend } from './information';
import { readLocalStorage } from "../components/hooks/useLocalStorage";

export async function getPrincipalCategories(){
    console.log("Esta es la url:"+url_backend);
    try{
        const url = url_backend + '/categoria/listar';
        const response = await fetch(url, {
            method: 'GET',
        });
        const categories = await response.json();
        const data = [];
        categories.forEach(categorie => {
            if(categorie.destacado == 'A'){
                data.push(categorie);
            }
        });

        return data;
    }
    catch(error){
    }
};

export async function getCategories(){
    try{
        const url = url_backend + '/categoria/listar';
        const response = await fetch(url, {
            method: 'GET',
        });
        return await response.json();
    }
    catch(error){
        alert(error);
    }
};

export async function removeCategorie(id){
    try{
        const url = url_backend + '/categoria/eliminar/' + id;
        const response = await fetch(url, {
            method: 'DELETE',
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
}

export async function addCategorie(categorie){
    try{
        categorie.destacado = categorie.destacado == 'T' ? 'A' : 'B'; 
        let url = url_backend + '/categoria/crear';
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': readLocalStorage('token')
            },
            body: JSON.stringify(categorie)
        });
        const x = await response.json();

        if(x.error) throw new Error(x.error);
        
        return x;

    }
    catch(error){
        alert(error);
    }
}

export async function editCategorie(categorie){
    try{
        categorie.destacado = categorie.destacado == 'T' ? 'A' : 'B'; 
        let url = url_backend + '/categoria/actualizar/' + categorie.id;
        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': readLocalStorage('token')
            },
            body: JSON.stringify(categorie)
        });
        const x = await response.json();

        if(x.error) throw new Error(x.error);
        
        return x;

    }
    catch(error){
        alert(error);
    }
}   
