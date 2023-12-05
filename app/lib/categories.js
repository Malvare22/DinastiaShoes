import categories from '../jsons/categories.json' assert {type: 'json'}

export async function getPrincipalCategories(){
    try{
        const url = 'http://localhost:3000/categoria/listar';
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
        alert(error);
    }
};

export async function getCategories(){
    try{
        const url = 'http://localhost:3000/categoria/listar';
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
        const url = 'http://localhost:3000/categoria/eliminar/' + id;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        return await response.json();
    }
    catch(error){
        alert(error);
    }
}

export async function addCategorie(categorie){
    try{
        categorie.destacado = categorie.destacado == 'T' ? 'A' : 'B'; 
        let url = 'http://localhost:3000/categoria/crear';
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categorie)
        });
        return await response.json();

    }
    catch(error){
        alert(error);
    }
}

export async function editCategorie(categorie){
    try{
        categorie.destacado = categorie.destacado == 'T' ? 'A' : 'B'; 
        let url = 'http://localhost:3000/categoria/actualizar/' + categorie.id;
        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categorie)
        });
        return await response.json();

    }
    catch(error){
        alert(error);
    }
}   