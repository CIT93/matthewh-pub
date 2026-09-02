// Part 1: Import order-handler.js
import * as orderHandler from "./order-handler.js";

// Part 2: Select elements
const orderForm = document.getElementById("order-form");
const orderSummary = document.getElementById("order-summary");

// Part 3: Create handleOrderSubmit function
const handleOrderSubmit = function(event){
    // Stop the reload
    event.preventDefault();
    //Get data
    const order = orderHandler.getOrderInputs();

    // Update the page
    let summary = `Orders ${order.quantity} ${order.size} T-shirts`;

    // only if the user selected the option
    if(order.giftWrap){
        summary += " gift wrapped.";
    }

    orderSummary.textContent = summary;
}


// Part 4: The init function
const init = function(){
    // listen to the form
    orderForm.addEventListener('submit', handleOrderSubmit);

    console.log("App initialized");
}

// Part 5: Start app
document.addEventListener('DOMContentLoaded', init);