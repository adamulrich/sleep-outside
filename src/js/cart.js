import {
    getLocalStorage,
    setLocalStorage,
    setClick
} from './utils.mjs';
import {
    displaySuperscriptNumber
} from './main.js';

function renderCartContents() {
    const cartItems = getLocalStorage('so-cart');
    let htmlItems = '';
    if (cartItems != null) {
        htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector('.product-list').innerHTML = htmlItems.join('');
        document.querySelectorAll('.cart-card__delete').forEach(function (item) {
            setClick(`#${item.getAttribute('id')}`, deleteCartItem)
        });
        document.querySelectorAll('.cart-card-quantity-up').forEach(function (item) {
            setClick(`#${item.getAttribute('id')}`, increaseCartItemQuantity)
        });
        document.querySelectorAll('.cart-card-quantity-down').forEach(function (item) {
            setClick(`#${item.getAttribute('id')}`, decreaseCartItemQuantity)
        });

    } else {
        document.querySelector('.product-list').innerHTML = '';
    }
}

function cartItemTemplate(item) {
    const newItem = `
    <li class='cart-card divider'>
        <a href='#' class='cart-card__image'>
            <img src='${item.Image}' alt='${item.Name}' />
        </a>
        <a href='#'>
            <h2 class='card__name'>${item.Name}</h2>
        </a>
        <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
        <div class='cart-details-container'>
            <div class='counter'>
                <button id='quantityDown_${item.Id}' data-id='${item.Id}' class='cart-card-quantity-down'>-</button> 
                <p class='cart-card__quantity'> ${item.Quantity}</p>
                <button id='quantityUp_${item.Id}' data-id='${item.Id}' class='cart-card-quantity-up'>+</button> 
            </div>
            <p class='cart-card__price'>$${item.FinalPrice}</p>
            <button id='deleteButton_${item.Id}' data-id='${item.Id}' class='cart-card__delete'>X</button>
        </div>
    </li>`;
    return newItem;
}

function displayTotal() {
    const cartItems = getLocalStorage('so-cart');
    const totalSection = document.querySelector('.total');
    const totalSum = document.getElementById('total-sum');
    const totalItems = document.getElementById('total-items');
    if (cartItems != null) {
        totalSection.classList.add('show');
        let total = 0,
            totalItemCount = 0,
            i = 0;
        for (i = 0; i < cartItems.length; i++) {
            totalItemCount += parseInt(cartItems[i].Quantity);
            total += parseFloat(cartItems[i].FinalPrice * cartItems[i].Quantity);
        }
        totalSum.innerText = Math.round(total * 100) / 100;
        totalItems.innerText = totalItemCount
    } else {
        totalSection.classList.remove('show');
    }
}

function increaseCartItemQuantity() {
    changeCartItemQuantity(this, 1)
}

function decreaseCartItemQuantity() {
    changeCartItemQuantity(this, -1)
}


function changeCartItemQuantity(that, value) {
    //get cart
    const cartItems = getLocalStorage('so-cart');

    // find index of item
    const index = cartItems.findIndex(obj => obj.Id == that.getAttribute('data-id'));

    // change quantity by value
    const newValue = (cartItems[index].Quantity + value)
    if (newValue >= 1 && newValue <= 10) {
        cartItems[index].Quantity += value;
    }

    //save cart
    setLocalStorage('so-cart', cartItems);
    renderCartContents();
    displayTotal();
    displaySuperscriptNumber();
}


function deleteCartItem() {
    const cartItems = getLocalStorage('so-cart');
    const index = cartItems.findIndex(obj => obj.Id == this.getAttribute('data-id'));
    if (index >= 0) {
        cartItems.splice(index, 1);
        setLocalStorage('so-cart', cartItems);
        renderCartContents();
        displayTotal();
        displaySuperscriptNumber();
    }
}

displayTotal();
renderCartContents();
