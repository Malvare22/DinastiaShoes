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