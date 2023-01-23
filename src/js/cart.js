import {
    getLocalStorage,
    setLocalStorage
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

        const deleteButtons = document.querySelectorAll('.cart-card__delete');
        const deleteClickHandler = (e) => {
            deleteCartItem(e);
        };
        let i = 0;
        for (i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener('click', deleteClickHandler);
        }
    } else document.querySelector('.product-list').innerHTML = '';
}

function cartItemTemplate(item) {
    const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: ${item.Quantity}</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  <button data-id='${item.Id}' class='cart-card__delete'>X</button>
</li>`;

    return newItem;
}

function displayTotal() {
    const cartItems = getLocalStorage('so-cart');
    const totalSection = document.querySelector('.total');
    const totalSum = document.getElementById('total-sum');
    if (cartItems != null) {
        totalSection.classList.add('show');
        let total = 0,
            i = 0;
        for (i = 0; i < cartItems.length; i++) {
            total += parseFloat(cartItems[i].FinalPrice);
        }
        totalSum.innerText = Math.round(total * 100) / 100;
    } else {
        totalSection.classList.remove('show');
    }
}

function deleteCartItem(e) {
    const cartItems = getLocalStorage('so-cart');
    var index = cartItems.findIndex((obj) => obj.name == e['data-id']);
    cartItems.splice(index, 1);
    setLocalStorage('so-cart', cartItems);
    renderCartContents();
    displayTotal();
    displaySuperscriptNumber();
}

displayTotal();
renderCartContents();