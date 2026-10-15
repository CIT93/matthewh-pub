// Step 2: Create constants
const shirtPrice = 15;
const giftWrapPrice = 2;

// Step 2: Export a function
export const calculateTotal = function (data) {
    let totalPrice = data.quantity * shirtPrice;
    if (data.giftWrap) {
        totalPrice += giftWrapPrice;
    } 
    return {
        totalPrice: totalPrice
    }
}