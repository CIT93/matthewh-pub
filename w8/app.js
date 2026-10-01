// Import order-handler.js
import * as orderHandler from "./order-handler.js";
import * as priceCalculator from './price-calculator.js';
import * as orderStorage from './order-storage.js';
import * as orderList from './order-list.js';

// Select elements
const orderForm = document.getElementById("order-form");
const clearButton = document.getElementById('clear-btn');

const orders = [];

// Create handleOrderSubmit function
const handleOrderSubmit = function(event){
    // Stop the reload
    event.preventDefault();
    //Get data
    const order = orderHandler.getOrderInputs();
    const calculatedPrice = priceCalculator.calculateTotal(order);

    const newOrder = {
        // Step 2: Upgrade Data (Add Unique ID)
        id: Date.now().toString(),
        ...order,
        ...calculatedPrice,
        timestamp: new Date().toISOString()
    }

    orders.push(newOrder);
    orderStorage.saveOrders(orders);

    orderList.renderOrders(orders);
}

const handleClearOrders = function(){
    orders.length = 0;
    orderStorage.saveOrders(orders);
    orderList.renderOrders(orders);
}


// The init function
const init = function(){
    const loadedOrders = orderStorage.loadOrders();
    if(loadedOrders.length > 0){
        orders.push(...loadedOrders);

        orderList.renderOrders(orders);
        console.log('Orders loaded');
    }

    orderForm.addEventListener('submit', handleOrderSubmit);
    clearButton.addEventListener('click', handleClearOrders);

    console.log("App initialized");
}

// Start app
document.addEventListener('DOMContentLoaded', init);