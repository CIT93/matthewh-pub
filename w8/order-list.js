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

export const renderOrders = function(orders){
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

