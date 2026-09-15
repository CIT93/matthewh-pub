const resultsSummary = document.getElementById("order-summary");

/**
<span id="display-total"></span></p>
<p><strong>Details:</strong> <span id="display-qty"></span> <span id="display-size"></span> T-Shirt(s)</p>
<p><strong>Gift Wrap:</strong> <span id="display-gift"></span></p>
 */

const displayTotal = resultsSummary.querySelector("#display-total");
const displayQty = resultsSummary.querySelector("#display-qty");
const displaySize = resultsSummary.querySelector("#display-size");
const displayGift = resultsSummary.querySelector("#display-gift");

export const displayResults = function (results) {
    console.log(results);
    displayTotal.textContent = `${results.totalPrice}`;
    displayQty.textContent = `${results.quantity}`;
    displaySize.textContent = `${results.size}`;
    displayGift.textContent = `${results.giftWrap}`;

    resultsSummary.style.display = 'block';
}

// Hides the entire results section.
export const hideResults = function(){
    resultsSummary.style.display = 'none';
}