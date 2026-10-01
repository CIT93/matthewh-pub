// Step 2: Create a new file named order-list.js

// Step 2.1: Select the Tbody
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

// Step 2.2: Export renderOrders
export const renderOrders = function(orders){
    // Step 2.3: The Logic
    
    // Step 2.3_Clear
    orderTableBody.innerHTML = '';

    // Step 2.3_Loop
    for (const order of orders){
        // Step 2.3_Create Row
        const orderRow = document.createElement('tr');

        // Step 2.3_Populate
        /**
            Set the innerHTML of the row to create <td> cells for:
                Date (Optional: format it nicely)
                Qty
                Size
                Total Price
         */
        orderRow.innerHTML = `
            <td>${formatDateForDisplay(order.timestamp)}</td>
            <td>${order.quantity}</td>
            <td>${order.size}</td>
            <td>${order.totalPrice}</td>
        `;

        // Step 2.3_Append
        orderTableBody.appendChild(orderRow);
    }
};

