// Import order-handler.js
import * as orderHandler from "./order-handler.js";
import * as priceCalculator from './price-calculator.js';
import * as resultsDisplay from './results-display.js';
import * as orderStorage from './order-storage.js';

// Select elements
const orderForm = document.getElementById("order-form");

const orders = [];

// Create handleOrderSubmit function
const handleOrderSubmit = function(event){
    // Stop the reload
    event.preventDefault();
    //Get data
    const order = orderHandler.getOrderInputs();
    const calculatedPrice = priceCalculator.calculateTotal(order);

    const newOrder = {
        ...order,
        ...calculatedPrice,
        timestamp: new Date().toISOString()
    }

    orders.push(newOrder);
    orderStorage.saveOrders(orders);

    resultsDisplay.displayOrder(newOrder);
}


// The init function
const init = function(){
    const loadedOrders = orderStorage.loadOrders();
    if(loadedOrders.length > 0){
        orders.push(...loadedOrders);
        console.log('Orders loaded');
    }
    // listen to the form
    orderForm.addEventListener('submit', handleOrderSubmit);
    resultsDisplay.hideResults();
    console.log("App initialized");
}

// Start app
document.addEventListener('DOMContentLoaded', init);