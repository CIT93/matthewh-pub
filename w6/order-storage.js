const LOCAL_STORAGE_KEY = 'tshirt_orders_data';

export const saveOrders = function(orders){
    try {
        const ordersString = JSON.stringify(orders);
        localStorage.setItem(LOCAL_STORAGE_KEY, ordersString);
    } catch (error) {
        console.log(`There was a problem saving ${error}`);
    }
}

export const loadOrders = function(){
    const ordersString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (ordersString) return JSON.parse(ordersString);
    else return [];
}