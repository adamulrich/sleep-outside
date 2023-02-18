// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    }
    catch (error) {
        // cart is corrupted, remote it.
        localStorage.removeItem(key);
        return null;
    }
}
// save data to local storage
export function setLocalStorage(key, data) {
    try {
        // if it's an empty list because we've deleted items, remove the key
        if (JSON.stringify(data) === '[]') {
            localStorage.removeItem(key);
        } else {
        
            localStorage.setItem(key, JSON.stringify(data));
        }
    }
    catch (error) {
        console.log(error);
        // cart is corrupted, remote it.
        localStorage.removeItem(key);
    } 
        
    
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
    qs(selector).addEventListener('touchend', (event) => {
        event.preventDefault();
        callback();
    });
    qs(selector).addEventListener('click', callback);
}

export function renderWithTemplate(htmlContent, parentElement, position = 'afterbegin',clear = false, data = null, callback = null) {
    if (clear){
        parentElement.innerHTML = htmlContent;
    } else{
        parentElement.insertAdjacentHTML(position, htmlContent);
    }
    if(callback) {
        callback(data);
    }
}

export async function loadTemplate(filePath) {
    const response = await fetch(filePath);
    if (response.ok) {
        const textData = await response.text();
        return textData;
    }
}

export function makeHash(product, colorCode) {
    return `${product.Id}-${colorCode}`
}