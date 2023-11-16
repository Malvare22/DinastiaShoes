import orders from '../jsons/orders.json'


export function getOrders(){
    return orders;
}

export function getOrderById(id){
    for(let i = 0; i < orders.length; i++){
        if(orders[i].id == id) return orders[i];
    }
}