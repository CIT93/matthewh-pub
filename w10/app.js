// Import order-handler.js
import * as orderHandler from "./order-handler.js";
import * as priceCalculator from './price-calculator.js';
import * as orderStorage from './order-storage.js';
import * as orderList from './order-list.js';

// Select elements
const orderForm = document.getElementById("order-form");
const clearButton = document.getElementById('clear-btn');

const orders = [];


const handleDelete = function(id) {
    console.log("App.js: Requesting delete for order", id);

    const index = orders.findIndex (function (savedOrder) {
        return savedOrder.id === id;
    });

    if (index === -1) return;

    orders.splice (index, 1);
    orderStorage.saveOrders (orders);

    orderList.renderOrders (orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });
};

const handleEdit = function(id) {
    console.log("App.js: Requesting edit for order", id);
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