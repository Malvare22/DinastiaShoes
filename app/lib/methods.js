import methods from '../jsons/methods.json'
/***
 * Se realiza la consulta a la base de datos
 */
export function getMethodById(id){
    for(let i = 0; i < methods.length; i++){
        if(methods[i].id==id){
            return {... methods[i], imgs: {"qr": methods[i].qr, "logo": methods[i].logo}};
        }
    }
    return {};
}

export function getMethods(){
    return methods;
}