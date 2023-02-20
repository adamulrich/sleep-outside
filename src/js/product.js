import {
    getLocalStorage,
    setLocalStorage, 
    makeHash
} from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import {
    displaySuperscriptNumber
} from './main.js';



const category = new URLSearchParams(window.location.search).get('category');
const dataSource = new ExternalServices(category);


function animateCart() {
    let cart = document.querySelector('.cart');
    cart.classList.add('pulse');
    cart.addEventListener('animationend', () => {
        cart.classList.remove('pulse');
    });
}

// add to cart button event handler
async function addToCartHandler(e) {
    const product = await dataSource.findProductById(e.target.dataset.id);
    product.Quantity = 1;
    // get color code and colorName
    const colorCode = document.querySelector('input[name="color-selector"]:checked').id;
    const colorName = document.querySelector('input[name="color-selector"]:checked').getAttribute('data-id');
    const colorPicture = document.querySelector('input[name="color-selector"]:checked').getAttribute('data-picture');
    addProductToCart(product, colorCode, colorName, colorPicture);
    animateCart();
}

function addProductToCart(product, colorCode, colorName, colorPicture) {
    let currentCart = getLocalStorage('so-cart');
    let added = false;
    // reduce what's in the cart object to product code, color code, quantity, correct color thumbnail, brand, name, color name
    const cartProduct = {
        Hash: makeHash(product, colorCode, colorName),
        Id: product.Id,
        Name: product.Name,
        Image: colorPicture,
        ColorCode: colorCode,
        ColorName: colorName,
        FinalPrice: product.FinalPrice,
        Quantity: 1
    }

    if (currentCart != null) {
        for (let i = 0; i < currentCart.length; i++) {
            if (cartProduct.Hash == currentCart[i].Hash) {
                cartProduct.Quantity = currentCart[i].Quantity + 1;
                currentCart.splice(i, 1, cartProduct);
                added = true;
            }
        }
        if (added == false) {
            currentCart.push(cartProduct);
        }
    } else {
        currentCart = [cartProduct];
    }
    setLocalStorage('so-cart', currentCart);
    displaySuperscriptNumber();
}


// add listener to Add to Cart button
document
    .getElementById('addToCart')
    .addEventListener('click', addToCartHandler);
