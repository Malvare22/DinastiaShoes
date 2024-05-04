import { url_backend } from "./information";
import { readLocalStorage } from "../components/hooks/useLocalStorage";

export const login = async (user) => {

    try{
        const url = url_backend + '/usuario/login';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    }
    catch(error){
        alert(error);
    }


     
};