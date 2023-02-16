
import {
    getLocalStorage,
    setLocalStorage,
    setClick,
    loadTemplate
} from './utils.mjs';

const orderSummaryHeader = document.getElementById('order-summary');

// get details from cart
const cartItems = getLocalStorage('so-cart');

// add order subtotal to html element and place in hidden input

// calculate subtotal
let total = 0,
    totalItemCount = 0,
    i = 0,
    subtotal = 0
    ;
for (i = 0; i < cartItems.length; i++) {
    totalItemCount += parseInt(cartItems[i].Quantity);
    subtotal += parseFloat(cartItems[i].FinalPrice * cartItems[i].Quantity);
    subtotal = Math.round(subtotal * 100) / 100;
}

document.getElementById('subtotal').innerText = subtotal;
orderSummaryHeader.innerHTML += (itemSummaryTemplate(`item subtotal (${totalItemCount})`, `$ ${subtotal}`));

// add the shipping to html element and place in hidden input
const shippingCost = 10 + (2 * (totalItemCount - 1));
document.getElementById('shipping').innerText = shippingCost;
orderSummaryHeader.innerHTML += (itemSummaryTemplate(`shipping estimate`, `$ ${shippingCost}`));

// add the tax to the html element and place in hidden input
const taxRate = .06;
let tax = subtotal * taxRate;
tax = Math.round(tax * 100) / 100;
document.getElementById('tax').innerText = tax;
orderSummaryHeader.innerHTML += (itemSummaryTemplate(`tax`, `$ ${tax}`));

// add the total to the html element and place in hidden input
total = subtotal + shippingCost + tax;
document.getElementById('order-total').innerText = total;
orderSummaryHeader.innerHTML += (itemSummaryTemplate(`order total`, `$ ${total}`));


// wire up on submit to clear cart after successful post



function itemSummaryTemplate(item1, item2) {
    const newItem = `
    <tr><td>${item1}</td><td>${item2.toString().padStart(10)}</td></tr>`;
    return newItem;
}
