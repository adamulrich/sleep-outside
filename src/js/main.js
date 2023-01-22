// Superscript number on cart
import { getLocalStorage } from './utils.mjs';

const ssn = document.getElementById('superscriptnum');
if (ssn.textContent === '') {
  ssn.setAttribute('class', 'is-empty');
}
export function displaySuperscriptNumber() {
  let items = getLocalStorage('so-cart');
  if (items != null) {
    ssn.classList.remove('is-empty');
    let number = 0;
    for(let i = 0; i < items.length; i++){
      number += parseFloat(items[i].Quantity);
    }
    ssn.innerHTML = number;
  } else {
    return;
  }
}
displaySuperscriptNumber();
