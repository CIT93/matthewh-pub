// Step 1: Select your elements:
const quantityInput = document.getElementById("qty"); 
const giftWrapCheckbox = document.getElementById("gift-wrap");
const sizeRadioButtons = document.querySelectorAll('input[name="size"]');

// Step 2: Helper function:
const getSelectedRadioButton = function(radios){
    // Check each radio button from the radio array
    for(const radio of radios){
        // If it's checked, return the size
        if(radio.checked){
            return radio.value;
        }
        // console.log(radio.value);
    }
}
// console.log(getSelectedRadioButton(sizeRadioButtons));

// Step 3: Export the Main Funciton
export const getOrderInputs = function(){
    return {
        // Using parseInt to turn string into number
        quantity: parseInt(quantityInput.value),
        // Using the helper function to get size radio value
        size: getSelectedRadioButton(sizeRadioButtons),
        // Checks if checkbox is checked.
        giftWrap: giftWrapCheckbox.checked
    };
};
