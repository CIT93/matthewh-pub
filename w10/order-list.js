
// Step 7: Complete the Wiring
// Step 7.1 Setup the Module Scope
let moduleCallbacks = {};

const orderTableBody = document.getElementById('order-table-body');

// Formats a timestamp into a local date string.
// @param {string} timestamp - ISO string timestamp.
// @returns {string} Formatted date string.
const formatDateForDisplay = function(timestamp){
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
}

// Step 5: Implement Event Delegation
const tableBody = document.getElementById('order-table-body');

tableBody.addEventListener('click', function(event) {
    const target = event.target;
    
    // 1. Get the ID from the button that was clicked
    const id = target.dataset.id;

    // 2. Guard Clause: If they clicked a row (white space) but NOT a button, 
    // there will be no ID. So we stop the function immediately.
    if (!id) return;

    // Step 7.3 Update the Listener Logic
    if (target.classList.contains ('edit-btn')) {
        if (moduleCallbacks.onEdit) moduleCallbacks.onEdit (id);
    }
    if (target.classList.contains ('delete-btn')) {
        if (moduleCallbacks.onDelete) moduleCallbacks.onDelete (id);
    }
});

// Step 7.2 Receive the Functions
export const renderOrders = function(orders, callbacks){
    // Save the callbacks for later
    moduleCallbacks = callbacks;

    orderTableBody.innerHTML = '';

    for (const order of orders){
        const orderRow = document.createElement('tr');

        orderRow.innerHTML = `
            <td>${formatDateForDisplay(order.timestamp)}</td>
            <td>${order.quantity}</td>
            <td>${order.size}</td>
            <td>${order.totalPrice}</td>
            <td>
                <button class="edit-btn" data-id="${order.id}">Edit</button>
                <button class="delete-btn" data-id="${order.id}">Delete</button>
            </td>
        `;

        orderTableBody.appendChild(orderRow);
    }
};

