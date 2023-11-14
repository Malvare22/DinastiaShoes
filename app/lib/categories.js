import categories from '../jsons/categories.json' assert {type: 'json'}

export const getPrincipalCategories = async () => {
    let c = [];
    for(let i = 0; i<5; i++){
        c.push(categories[i]);
    }

    return c;
} 

export const getCategories = () => {
    let value = categories;
    for(let i = 0; i<value.length; i++){
        let temp = "";
        if(value[i].destacado===true){
            temp = "X";
        }    
        value[i] = {...value[i], "destacadoToShow": temp};
    }
    return value;
}

export function removeCategorie(categorie){

}

export function addCategorie(categorie){
    
}

export function editCategorie(categorie){
    
}