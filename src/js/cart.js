import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  let htmlItems = '';
  if (cartItems != null) {
    htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
  }
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
</li>`;

  return newItem;
}

function displayTotal() {
  const cartItems = getLocalStorage('so-cart');
  const totalSection = document.querySelector('.total');
  const totalSum = document.getElementById('total-sum');
  if (cartItems != null) {
    totalSection.classList.add('show');
  } else {
    totalSection.classList.remove('show');
  }
  let total = 0,
    i = 0;
  for (i = 0; i < cartItems.length; i++) {
    total += parseFloat(cartItems[i].FinalPrice);
  }
  totalSum.innerText = Math.round(total * 100) / 100;
}

displayTotal();
renderCartContents();
