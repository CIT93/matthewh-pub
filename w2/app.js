// console.log('Hello from app.js! Your JavaScript is connected and running!');

// --- Part 1: Select HTML Elements ----
// We use document.getElementById() to get a reference to an element by its unique ID.
// We store these references in 'const' variables because the elements themselves won't change.

const totalDisplayElement = document.getElementById("total-display");
const addItemButton = document.getElementById("add-item-btn");

// These variables will change as the user interacts with the page.
let totalCost = 0;
const itemPrice = 15;


// --- Part 2: Define a Function that Reacts to a Click---
// A function is a block of code designed to perform a particular task.

const handleButtonClick = function(){
    // totalCost = totalCost + itemPrice;

    // Increase totalCost by itemPrice each time the button is clicked
    totalCost += itemPrice;

    // Template strings (literal) to easily combine our variables and text into one message
    let message = `Current Total: $${totalCost}`;

    // This is basic decision-making in JavaScript!
    // Use a simple 'if' statement to make our page react differently based on totalCost.
    if (totalCost >= 60){
        // We can even change the style of an HTML element directly with JavaScript!
        // Change text color
        totalDisplayElement.style.color = 'red';
        message += ' (Over Budget!)';
    } else {
        totalDisplayElement.style.color = '#000';
    }
    // Update the text content of our paragraph element on the page.
    // This is how JavaScript makes changes visible on the web page!
    totalDisplayElement.textContent = message;

    console.log(`Current total: ${totalCost}`);
}

document.addEventListener('DOMContentLoaded', function(){
    // --- Part 3: Make the Button Clickable (Event Listener) ---
    // This part ensures our JavaScript code runs only AFTER the HTML is fully loaded and parsed.
    // The 'DOMContentLoaded' event is perfect for this. It fires when the HTML document is ready.
    
    console.log('Shopping Cart App Loaded');

    // Attach an event listener to our 'addItemButton.
    // When 'addItemButton' receives a 'click' event, the 'handleButtonClick' function will execute.
    addItemButton.addEventListener('click', handleButtonClick);

    totalDisplayElement.textContent = `Current Total: $${totalCost}`;
});

