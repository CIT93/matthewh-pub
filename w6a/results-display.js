const resultsSummary = document.getElementById("order-summary");

const displayTotal = resultsSummary.querySelector("#display-total");
const displayQty = resultsSummary.querySelector("#display-qty");
const displaySize = resultsSummary.querySelector("#display-size");
const displayGift = resultsSummary.querySelector("#display-gift");

export const displayOrder = function (order) {
    displayTotal.textContent = `${order.totalPrice}`;
    displayQty.textContent = `${order.quantity}`;
    displaySize.textContent = `${order.size}`;
    if (order.giftWrap) displayGift.textContent = 'Yes';
    else displayGift.textContent = 'No';

    resultsSummary.style.display = 'block';
};

// Hides the entire results section.
export const hideResults = function(){
    resultsSummary.style.display = 'none';
};