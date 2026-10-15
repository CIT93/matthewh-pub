// Import order-handler.js
import * as orderHandler from "./order-handler.js";
import * as priceCalculator from './price-calculator.js';
import * as orderStorage from './order-storage.js';
import * as orderList from './order-list.js';

// Select elements
const orderForm = document.getElementById("order-form");
const clearButton = document.getElementById('clear-btn');
const quantityInput = document.getElementById ('qty');
const giftWrapCheckbox = document.getElementById ('gift-wrap');
const orderIdInput = document.getElementById ('order-id');

const orders = [];


const handleDelete = function(id) {
    console.log("App.js: Requesting delete for order", id);

    // Step 1: Find the position with the ID
    const index = orders.findIndex (function (savedOrder) {
        return savedOrder.id === id;
    });

    // Step 1: -1 means it's empty and nothing to delete
    if (index === -1) return;

    // Step 1: remove the item at the position
    orders.splice (index, 1);
    orderStorage.saveOrders (orders);

    // Step 1: Rerender passing the callbacks
    orderList.renderOrders (orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });
};

const handleEdit = function(id) {
    console.log("App.js: Requesting edit for order", id);

    // Step 2: Grab the order with the ID
    const order = orders.find (function (savedOrder) {
        return savedOrder.id === id;
    });
    // Step 2: stop if no match
    if (!order) return;

    // Step 2: REMEMBER!!! .value for normal inputs
    quantityInput.value = order.quantity;

    // Step: Radio buttons don't have a single value, so check that match the size
    document.querySelector (`input[name="size"][value="${order.size}"]`).checked = true;

    // Step 2: REMEMBER!!! .checked with checkboxes
    giftWrapCheckbox.checked = order.giftWrap;

    // Step 2: note witch is being edited
    orderIdInput.value = order.id;
};



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

    // orderList.renderOrders(orders);
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });
}

const handleClearOrders = function(){
    orders.length = 0;
    orderStorage.saveOrders(orders);

    // Step 1: passing the callbacks
    orderList.renderOrders (orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });
}


// The init function
const init = function(){
    const loadedOrders = orderStorage.loadOrders();
    if(loadedOrders.length > 0){
        orders.push(...loadedOrders);

        // Step 1: passing the callbacks
        orderList.renderOrders (orders, {
            onDelete: handleDelete,
            onEdit: handleEdit
        });
        console.log('Orders loaded');
    }

    orderForm.addEventListener('submit', handleOrderSubmit);
    clearButton.addEventListener('click', handleClearOrders);

    console.log("App initialized");
}

// Start app
document.addEventListener('DOMContentLoaded', init);