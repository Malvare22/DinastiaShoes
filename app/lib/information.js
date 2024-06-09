import { readLocalStorage } from "../components/hooks/useLocalStorage";

export const url_backend = 'http://35.243.202.64:3000';

export function DateToLines(date){a
  const ndate = date.split("/");
  return ndate[2] + "-" + ndate[1] + "-"  + ndate[0];
} 

export function DateToSlash(date){
  const ndate = date.split("-");
  return ndate[0] + "/" + ndate[1] + "/"  + ndate[2];
} 

export function DateToPls(date){
  const ndate = date.split("-");
  return ndate[2] + "/" + ndate[1] + "/"  + ndate[0];
}

export async function getProfile(user){
  try{
    let url = url_backend + '/usuario/obtener/' + user;
    let response = await fetch(url, {
        method: 'GET',
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
};

export async function updateProfile(user){
  try{
    let url = url_backend + '/usuario/actualizar/' + user.cedula;
    let response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': readLocalStorage('token')
        },
        body: JSON.stringify(user)
    });

    const x = await response.json();

    if(x.error) throw new Error('Token inválido o permisos insuficientes');
    
    return x;

  }
  catch(error){
      alert(error);
  }
};

export async function updatePassword(user){
  try{
    user.usuario = user.correo;
    let url = url_backend + '/usuario/cambiarContra';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

      return await response.json();
    }
  catch(error){
      alert(error);
  }
};

export const infoBase = {
    "correo" : "",
    "contrasenia" : "",
    "contrasenia_2" : "",
    "nombres" : "",
    "apellidos" : "",
    "fecha_nacimiento" : "",
    "sexo" : "",
    "rol" : "cliente"
  };

  export const registerUser = {
    "correo" : "",
    "contrasenia" : "",
    "contrasenia_2" : "",
    "nombres" : "",
    "apellidos" : "",
    "fecha_nacimiento" : "",
    "sexo" : "",
    "rol" : ""
  };

  export const validateRegisterUser = {
    "correo" : false,
    "contrasenia" : false,
    "nombres" : false,
    "apellidos" : false,
    "fecha_nacimiento" : false,
    "sexo" : false
  };  
  
  /***
   * Vista de registro de usuarios por admin
   */
  export const registerUserByAdmin = {
    "correo" : "",
    "contrasenia" : "ABC!123",
    "nombres" : "",
    "apellidos" : "",
    "fecha_nacimiento" : "",
    "sexo" : "",
    "inventario": false,
    "pedidos": false 
  };

  /***
    * Vista de registro de usuarios por admin
    */
  export const validateRegisterUserByAdmin = {
    "correo" : false,
    "nombres" : false,
    "apellidos" : false,
    "fecha_nacimiento" : false,
    "sexo" : false
  }; 

    /***
    * Vista de editición de usuarios por admin
    */
    export const validateEditUserByAdmin = {
      "correo" : true,
      "nombres" : true,
      "apellidos" : true,
      "fecha_nacimiento" : true,
      "sexo" : true
    }; 



export const validateChangeBase = {
    "correo" : true,
    "contrasenia" : true,
    "nombres" : true,
    "apellidos" : true,
    "fecha_nacimiento" : true,
    "sexo" : true,
  };  

  export const editingValidateBase = {
    "correo" : true,
    "contrasenia" : true,
    "nombres" : true,
    "apellidos" : true,
    "fecha_nacimiento" : true,
    "sexo" : true
  };  

export const validateInformation = (information) => {

    for(const key in information){
        if(information[key]==false) return false;
    }

    return true;
}

export const sendRegister = (information) => {
    console.log(information);
}

export async function sendRecoveryEmail(email){
  try{
    let url = url_backend + '/usuario/enviarCorreo/' + email;
    let response = await fetch(url, {
        method: 'POST',
    });

      return await response.json();
    }
  catch(error){
      alert(error);
  }
}

export const sendLogin = (information) => {
    console.log(information);
}

export async function sendChangePassword(information, token){
  try{
    let url = url_backend + '/usuario/olvidarContra/' + token;
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(information)
    });

      return await response.json();
  }
  catch(error){
    alert(error);
  }
}

export function ValidTypes(permit){
  if (typeof window !== "undefined" && window.localStorage) {
    const value = localStorage.getItem('type');
    for(const x in permit){
      if(permit[x] == value) return true;
    }
  }  
  window.location.replace("/404");
};

