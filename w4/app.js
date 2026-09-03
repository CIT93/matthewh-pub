// Import order-handler.js
import * as orderHandler from "./order-handler.js";
// Step 3: Refactor app.js
import * as priceCalculator from './price-calculator.js';

// Select elements
const orderForm = document.getElementById("order-form");
const orderSummary = document.getElementById("order-summary");

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

    // Update the page
    let summary = `Orders ${order.quantity} ${order.size} T-shirts`;

    // only if the user selected the option
    if(order.giftWrap){
        summary += " gift wrapped.";
    }

    orderSummary.textContent = summary;

    orders.push(newOrder);
    console.log(orders);
}


// The init function
const init = function(){
    // listen to the form
    orderForm.addEventListener('submit', handleOrderSubmit);

    console.log("App initialized");
}

// Start app
document.addEventListener('DOMContentLoaded', init);