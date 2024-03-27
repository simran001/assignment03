//variables 
const orderButton = document.getElementById("orderButton");
const pizzaDescription = document.getElementById("pizzaDescription");

// Pizza ordering function
function orderPizza() {
    
    //Getting the user input values
    const userName = document.getElementById("userName").value;
    const pizzaType = document.getElementById("pizzaType").value;
    const crust = document.getElementById("crust").value;
    const pizzaSize = document.getElementById("pizzaSize").value;

    // Clear previous error messages
    pizzaDescription.textContent = "";

    //Validating pizza form
    if (!userName) {
        displayError("Please enter your name.");
        return;
    }

    if (!pizzaType) {
        displayError("Please select a pizza type.");
        return;
    }

    if (!crust) {
        displayError("Please select a crust.");
        return;
    }

    if (!pizzaSize) {
        displayError("Please select pizza size.");
        return;
    }

    let atLeastOneSauceSelected = false;
    const sauces = document.querySelectorAll('input[name="sauce"]');
    for (let i = 0; i < sauces.length; i++) {
        if (sauces[i].checked) {
            atLeastOneSauceSelected = true;
            break;
        }
    }
    if (!atLeastOneSauceSelected) {
        displayError("Please select at least one sauce.");
        return;
    }

    const toppings = document.querySelectorAll('input[name="topping"]:checked');
    if (toppings.length === 0) {
        displayError("Please select at least one topping.");
        return;
    }

    // Extracting selected sauces, toppings, and quantity
    const selectedSauces = Array.from(sauces).filter(sauce => sauce.checked).map(sauce => sauce.value);
    const selectedToppings = Array.from(toppings).map(topping => topping.value);
    const quantity = document.getElementById("quantity").value;

    //creating pizza object
    const pizza = new Pizza(userName, pizzaType, crust, selectedSauces, pizzaSize, selectedToppings, quantity);
   
    // function to display content for pizza details
    displayPizza(pizza);
}

// function to display error messages
function displayError(message) {
    pizzaDescription.textContent=message;
}

// creating Pizza class
class Pizza {

    //constructor different user inputs
    constructor(userName, pizzaType, crust, sauces, size, toppings, quantity) {
        this.userName = userName;
        this.pizzaType = pizzaType;
        this.crust = crust;
        this.sauces = sauces;
        this.size = size;
        this.toppings = toppings;
        this.quantity = quantity;
    }
}

// Function to display pizza description
function displayPizza(pizza) {

    //clearing error messages displayed earlier in the pizza description
    pizzaDescription.textContent = "";

    // Creating description string
    const pizzaInfo = `Order for: ${pizza.userName}  
        Your Pizza-Type: ${pizza.pizzaType},
        Crust: ${pizza.crust},
        Sauces: ${pizza.sauces.join(", ")},
        Size: ${pizza.size},
        Toppings: ${pizza.toppings.join(", ")},
        Quantity: ${pizza.quantity}
    `;

    //displaying description of pizza
    pizzaDescription.textContent = pizzaInfo;

    // Displaying student information dynamically
    const studentInfo = document.getElementById("studentInfo");
    const studentID = "200555884";
    const studentName = "Simran Kaur";
    studentInfo.textContent = `Name: ${studentName}, Student ID: ${studentID}`;
}

//event listener to display pizza information and student information
orderButton.addEventListener('click', orderPizza);
