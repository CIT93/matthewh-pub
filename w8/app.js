// Import order-handler.js
import * as orderHandler from "./order-handler.js";
import * as priceCalculator from './price-calculator.js';
// import * as resultsDisplay from './results-display.js';
import * as orderStorage from './order-storage.js';
// Step 3.1_Import
import * as orderList from './order-list.js';

// Select elements
const orderForm = document.getElementById("order-form");

// Step 5.2: JavaScript
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
        id: Date.now().toString(),
        ...order,
        ...calculatedPrice,
        timestamp: new Date().toISOString()
    }

    orders.push(newOrder);
    orderStorage.saveOrders(orders);

    // Step 3.3_Update handleOrderSubmit
    orderList.renderOrders(orders);
}

// Step 5.2: Javascript
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

        // Step 3.2_Update init
        orderList.renderOrders(orders);
        console.log('Orders loaded');
    }
    // listen to the form
    orderForm.addEventListener('submit', handleOrderSubmit);
    
    // Step 5.2: Javascript
    clearButton.addEventListener('click', handleClearOrders);

    console.log("App initialized");
}

// Start app
document.addEventListener('DOMContentLoaded', init);