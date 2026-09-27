// This module handles getting input values from the form and clearing it.
// Simplified: Only focuses on Household Size input for now.

// Reference to the main carbon footprint form element.
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// Reference to the household members input field, scoped within the form.
const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// Home Size reference
const homeSquareFootageInput = carbonFootprintForm.querySelector('#homeSquareFootage');

// Apartment Checkbox reference
const isApartmentInput = carbonFootprintForm.querySelector('#isApartment');


// References all radio buttons for diet type
const dietTypeRadios = carbonFootprintForm.querySelectorAll('input[name="dietType"]');
// References all radio buttons for food packaging.
const foodPackagingRadios = carbonFootprintForm.querySelectorAll('input[name="foodPackaging"]');

// Retrieves the value of the selected radio button from a NodeList.
// @param {NodeList} radioButtons - A NodeList (like an array) of radio button elements.
// @returns {string} The 'value' attribute of the selected radio button.
const getSelectedRadioValues = function (radioButtons) {
    for (const radio of radioButtons) {
        if (radio.checked) {
            return radio.value;
        }
    }
}


// Collects all relevant input values from the form for Household Size, Home Size, and Food Choices.
// @returns {Object} An object containing all the collected input values.
export const getFormInputs = function(){
    return {
        householdMembers: parseInt(householdMembersInput.value) || 1,
        homeSquareFootage: parseInt(homeSquareFootageInput.value) || 0,
        isApartment: isApartmentInput.checked,
        dietType: getSelectedRadioValues(dietTypeRadios),
        foodPackaging: getSelectedRadioValues(foodPackagingRadios),
    };
}

export const clearForm = function(){
    carbonFootprintForm.reset();
    householdMembersInput.value = 1;
    homeSquareFootageInput.value = 0;
    dietTypeRadios[0].checked;
    foodPackagingRadios[0].checked;
    foodPackagingRadios[0].checked = true;
}

