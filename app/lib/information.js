export const validateRegister = (information) => {

    for(const key in information){
        if(!information[key]) return false;
    }

    return true;
}

export const sendRegister = (information) => {
    console.log(information);
}