export const infoBase = {
    "correo" : "josejulian@sdf.es",
    "contrasenia" : "123!",
    "contrasenia_2" : "123!",
    "nombre" : "Julian",
    "apellido" : "Quiroz",
    "fecha" : "2002-04-23",
    "genero" : "M",
    "rol" : "cliente"
  };

  export const usuarioInformacionVacia = {
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

export const validateChangeBase = {
    "correo" : true,
    "contrasenia" : true,
    "nombre" : true,
    "apellido" : true,
    "fecha" : true,
    "genero" : true,
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