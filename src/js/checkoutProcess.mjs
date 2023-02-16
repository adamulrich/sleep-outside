import {
    getLocalStorage,
    setLocalStorage,
    setClick,
    loadTemplate
} from './utils.mjs';

import ExternalServices from './ExternalServices.mjs';



// convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
    

export default class CheckoutProcess {


    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.cart = [];
        this.itemCount = 0;
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.taxRate = .06;

    }

    init() {
        this.cart = getLocalStorage(this.key);
        console.log(this.cart);
        this.calculateItemSummary();
        this.displayOrderSummary();
    }

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
    packageItems(items) {
        const cartItems = [];
        this.cart.forEach(item => {
            cartItems.push({
                id: item.Id,
                name: item.Name,
                price: item.FinalPrice,
                quantity: item.Quantity
            })
        
        });
        return cartItems;
    }
        
    async checkout(form) {
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        const dataObject = this.packageItems();
        // call the checkout method in our ExternalServices module and send it our data object.

    }

    createDataFromForm() {
        const orderData = {};
        const keyValues = ['fname', 'lname', 'street', 'city', 'state', 'zip', 
            'cardNumber', 'expiration', 'code']

        keyValues.forEach(field => {
            orderData[field] = document.getElementById(field).value;
        });
        //add orderdate
        orderData.orderDate = Date.now();

        //add items
        orderData.items = this.packageItems();

        // add summary items
        orderData.orderTotal = this.orderTotal;
        orderData.shipping = this.shipping;
        orderData.tax = this.tax;

        console.log(orderData);
    }

    calculateItemSummary() {
        // calculate subtotal
        for (let i = 0; i < this.cart.length; i++) {
            this.itemCount += parseInt(this.cart[i].Quantity);
            this.itemTotal += parseFloat(this.cart[i].FinalPrice * this.cart[i].Quantity);
            this.itemTotal = Math.round(this.itemTotal * 100) / 100;
        }

        this.shipping = 10 + (2 * (this.itemCount - 1));

        this.tax = this.itemTotal * this.taxRate;
        this.tax = Math.round(this.tax * 100) / 100;

        this.orderTotal = this.itemTotal + this.shipping + this.tax;

    }

    itemSummaryTemplate(item1, item2) {
        const newItem = `
        <tr><td>${item1}</td><td>${item2.toString().padStart(10)}</td></tr>`;
        return newItem;
    }

    displayOrderSummary() {

        const orderSummaryHeader = document.getElementById('order-summary');
    
        // add order subtotal to html element and place in hidden input
    
        document.getElementById('subtotal').innerText = this.itemTotal;
        orderSummaryHeader.innerHTML += (this.itemSummaryTemplate(`item subtotal (${this.itemCount})`, `$ ${this.itemTotal}`));
    
        // add the shipping to html element and place in hidden input
        document.getElementById('shipping').innerText = this.shipping;
        orderSummaryHeader.innerHTML += (this.itemSummaryTemplate(`shipping estimate`, `$ ${this.shipping}`));
    
        // add the tax to the html element and place in hidden input
        document.getElementById('tax').innerText = this.tax;
        orderSummaryHeader.innerHTML += (this.itemSummaryTemplate(`tax`, `$ ${this.tax}`));
    
        // add the total to the html element and place in hidden input
        document.getElementById('order-total').innerText = this.orderTotal;
        orderSummaryHeader.innerHTML += (this.itemSummaryTemplate(`order total`, `$ ${this.orderTotal}`));
    
    }
  

}


const checkOut = new CheckoutProcess('so-cart', null);
checkOut.init();


// wire up on submit to clear cart after successful post
document.getElementById('submit-button').onclick = function () {
    checkOut.createDataFromForm();
};
