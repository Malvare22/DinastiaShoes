export const login = async (user) => {

    const url = 'http://localhost:3000/usuario/login';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    console.log(user)


    const responseData = await response.json();
    console.log('Respuesta de la solicitud GET:', responseData);

};