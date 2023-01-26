// Superscript number on cart
import ProductData from './ProductData.mjs';

import {
    getLocalStorage
} from './utils.mjs';

const ssn = document.getElementById('superscriptnum');
if (ssn.textContent === '') {
    ssn.setAttribute('class', 'is-empty');
}
export function displaySuperscriptNumber() {
    let items = getLocalStorage('so-cart');
    if (items != null) {
        ssn.classList.remove('is-empty');
        let number = 0;
        for (let i = 0; i < items.length; i++) {
            number += parseFloat(items[i].Quantity);
        }
        if (isNaN(number)) {
            ssn.innerHTML = '';
            localStorage.removeItem('so-cart');
        }
        ssn.innerHTML = number;
    } else {
        ssn.classList.add('is-empty');
        return;
    }
}
displaySuperscriptNumber();

function displayProductCards(){
    const products = new ProductData('tents').findAllProducts;
    products.map((product) => {
        const li = document.createElement('li');
        li.classList('roduct-card');
    });
}