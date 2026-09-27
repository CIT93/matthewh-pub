// Week 7.1: Now supports deleting entries from the table.

import * as formHandler from './form-handler.js';
import * as calculator from './calculator.js';
import * as resultsDisplay from './results-display.js';
import * as storage from './storage.js';
import * as tableRenderer from './table-renderer.js';

// Declare a 'const' array to hold all submitted carbon footprint entries in memory.
const carbonFootprintEntries = []; // Empty Array literal - Global variable


// Reference to the main carbon footprint form element.
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// Reference to the household members input field, scoped within the form.
// const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// Reference to the 'Clear Form' button.
const clearFormButton = document.getElementById('clearFormButton');

// Get reference to Clear All Data button
const clearAllDataButton = document.getElementById('clearAllDataButton');

// State variables for in-line confirmation of "Clear All Data" button.
let isConfirmingClearAll = false; // Tracks if the button is in a "confirming" state.
let clearAllTimeoutId = null; // Stores the ID returned by setTimeout, so we can cancel it.

// Resets the "Clear All Data" button to its original text and appearance.
const resetClearAllButton = function(){
    // Clears any pending confirmation timeout.
    if(clearAllTimeoutId){
        // If a timeout is active (meaning the button is in a confirming state), clear it.
        clearTimeout(clearAllTimeoutId);
    }
    // Reset the confirmation state
    isConfirmingClearAll = false;
    // Restore original button text and remove any special styling class.
    clearAllDataButton.textContent = 'Clear all saved data';
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirm-state');
    // Re-add danger-button if it was removed (it's part of initial styling)
    clearAllDataButton.classList.add('danger-button');
}

// Resets all UI-related confirmation states across the application.
const resetAllUIStates = function(){
    // This function is called when major actions (like form submit, clear, delete) occur, ensuring a clean UI state. 
    // add to any function that updates DOM
    // This will be expanded in later weeks to include table row confirmations
    resetClearAllButton();
};


// Handles form submission: prevents the default page reload, reads form inputs, and logs the collected data.
const handleFormSubmit = function(event){
    event.preventDefault();
    const formData = formHandler.getFormInputs();
    const calculatedResults = calculator.calculateFootprint(formData);

    const newEntry = {
        ...formData,
        ...calculatedResults,
        id: storage.generateUniqueId(),
        timestamp: new Date().toISOString()
    };
    carbonFootprintEntries.push(newEntry);

    storage.saveEntries(carbonFootprintEntries);

    resultsDisplay.displayResults(calculatedResults);
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    resetAllUIStates();
}

// New function to perform the actual clearing of all saved data.

// Clear the in-memory array.
// Update the UI to reflect the cleared state.
const performClearAllData = function(){
    // Start fresh with a brand-new empty array.
    carbonFootprintEntries = [];
    storage.clearAllEntries();
    // Re-render table (will show "No entries")
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    // Clear the form inputs
    formHandler.clearForm();
    // Hide the results section
    resultsDisplay.hideResults();
    resetAllUIStates();
};  

// Handles the 'Clear Form' button click: resets the form fields and restores default values.
const handleClearForm = function(){
    formHandler.clearForm();
    // carbonFootprintForm.reset();
    // householdMembersInput.value = 1;
    resultsDisplay.hideResults();
    resetAllUIStates();
}

// Handles the "Delete" action for a specific entry.
const handleDeleteEntry = function(id){
    console.log(`Delete button clicked for ID: ${id} funcitonality added in 7`);
    // 1. Find the index of the entry to delete in our in-memory array.
    const indexToDelete = carbonFootprintEntries.findIndex(function (entry) {
        return entry.id === id;
    });
    if (indexToDelete !== -1) {
        // 2. Remove the entry from the in-memory array using splice().
        carbonFootprintEntries.splice(indexToDelete, 1);
        console.log(`Entry removed from memory`);
        // 3. Save the modified (smaller) array back to localStorage.
        storage.saveEntries(carbonFootprintEntries);
        // 4. Re-render the table to reflect the deletion.
        tableRenderer.renderTable(carbonFootprintEntries, {
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry
        });
        // 5. If the table is now empty, hide the results section and clear the form.
        if (carbonFootprintEntries.length === 0) {
            resultsDisplay.hideResults();
            formHandler.clearForm();
        }
        // Reset states even if entry not found (e.g., error case)
        resetAllUIStates();
    } else {
        console.log(`Did not find index`);
        resetAllUIStates();
    }
};


// Handles the "Edit" button click for a specific entry.
const handleEditEntry = function(id){
    console.log(`Edit button clicked for ID: ${id} funcitonality added in 7`);
    resetAllUIStates();
};

// Initializes the app by attaching event listeners once the DOM is fully loaded.
const init = function(){
    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
    resultsDisplay.hideResults();
    // On startup, attempt to load any previously saved entries from localStorage.
    const loadedEntries = storage.loadEntries();
    if(loadedEntries.length > 0){
        // On startup, attempt to load any previously saved entries from localStorage.
        // carbonFootprintEntries array using the spread operator (...).
         carbonFootprintEntries.push(...loadedEntries);
    } else {
        console.log(`No entries found in localStorage starting fresh`);
    }

    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    // init function - Event listener for "Clear All Data"
    clearAllDataButton.addEventListener('click', function(event){
        event.stopPropagation(); // Prevents this click from potentially triggering other global click listeners.
        if(isConfirmingClearAll){
            // Second click: User confirms, so perform the action.
            performClearAllData();
        } else {
            // First click: Ask for confirmation by changing button text and state.
            isConfirmingClearAll = true;
            clearAllDataButton.textContent = 'Are you sure? Clear again';
            // Add a class to change its appearance (defined in style.css).
            clearAllDataButton.classList.add('confirm-state');
            // Set a timeout to automatically revert the button state if the user doesn't click again.
            clearAllTimeoutId = setTimeout(function(){
                resetClearAllButton();
            }, 3000); // 3 seconds timeout
        }
    });

    // Global click listener to reset the "Clear All Data" button state
    // if the user clicks anywhere else on the page while confirmation is pending.
    // Only reset if we are in a confirming state AND the click was outside the button itself.
    document.addEventListener('click', function(event){
        if(isConfirmingClearAll && event.target !== clearAllDataButton){
            resetClearAllButton();
        }
    });
};



// Waits for the DOM to be ready before running the initialization function.
document.addEventListener('DOMContentLoaded', init);