export const infoBase = {
    "correo" : "",
    "contrasenia" : "",
    "contrasenia_2" : "",
    "nombre" : "",
    "apellido" : "",
    "fecha" : "",
    "genero" : "",
    "rol" : ""
  };
  
export const validateBase = {
    "correo" : false,
    "contrasenia" : false,
    "nombre" : false,
    "apellido" : false,
    "fecha" : false,
    "genero" : false
  };  

  export const editingValidateBase = {
    "correo" : true,
    "contrasenia" : true,
    "nombre" : true,
    "apellido" : true,
    "fecha" : true,
    "genero" : true
  };  

export const validateInformation = (information) => {

    for(const key in information){
        if(!information[key]) return false;
    }

    return true;
}

export const sendRegister = (information) => {
    console.log(information);
}

export const sendRecoveryEmail = (information) => {
    console.log(information);
}

export const sendLogin = (information) => {
    console.log(information);
}

export const sendChangePassword = (information) => {
    console.log(information);
}