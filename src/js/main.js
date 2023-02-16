// Superscript number on cart
 
import {
    getLocalStorage,
    renderWithTemplate,
    loadTemplate
} from './utils.mjs';

loadHeaderFooter();

async function loadHeaderFooter() {
    const header = await loadTemplate('../partials/header.html');
    const footer = await loadTemplate('../partials/footer.html');
    renderWithTemplate(header, document.getElementById('main-header'),'beforebegin',  true);
    renderWithTemplate(footer,document.getElementById('main-footer'), 'beforeend', true);
    displaySuperscriptNumber();
}

export function displaySuperscriptNumber() {

    const ssn = document.getElementById('superscriptnum');
    if (ssn) {
        if (ssn.textContent === '') {
            ssn.setAttribute('class', 'is-empty');
        }


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
}
function callToRegister() {
    var num = localStorage.getItem('visits');
    localStorage.setItem('visits', ++num);
    if (num == 1) {
        let callto = document.getElementById('call-to-register');
        let msg = document.createElement('h3')
        msg.textContent = 'Welcome to Sleep Outside! Register now to get 30% off your next purchase!'
        callto.appendChild(msg)
    }
}
callToRegister();
