import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  let currentCart = getLocalStorage('so-cart');
  if (currentCart != null) {

    currentCart.push(product);
    location.reload();
  } else {
    currentCart = [product];
    location.reload();

  }
  setLocalStorage('so-cart', currentCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
