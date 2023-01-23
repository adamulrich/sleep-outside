import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';
import { displaySuperscriptNumber } from './main.js';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  let currentCart = getLocalStorage('so-cart');
  let added = false;
  if (currentCart != null) {
    for(let i = 0; i < currentCart.length; i++){
      if (product.Id == currentCart[i].Id) {
        product.Quantity = currentCart[i].Quantity + 1;
        product.FinalPrice *= product.Quantity
        currentCart.splice(i, 1, product);
        added = true;
      }
    }
    if (added == false) {
      currentCart.push(product);
    }
  } 
  else{
    currentCart = [product];
  }
  setLocalStorage('so-cart', currentCart);
  displaySuperscriptNumber();
}

function animateCart(){
  let cart = document.querySelector('.cart');
  cart.classList.add('pulse');
  cart.addEventListener('animationend', () => {
    cart.classList.remove('pulse');
  }) 
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  product.Quantity = 1;
  addProductToCart(product);
  animateCart();
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
