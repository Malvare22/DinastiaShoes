export const login = async (user) => {

    try{
        const url = 'http://localhost:3000/usuario/login';
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