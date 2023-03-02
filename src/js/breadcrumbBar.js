import { getLocalStorage } from './utils.mjs';

export function createCrumbBar(productName = null) {
    // determine what page we are on.
    const folder = location.href.split('/').slice(-2)[0]; 
    const rootFolder = `http://${location.host}/`;
    const productListing = 'product-listing/index.html';

    const category = getLocalStorage('currentCategory');
    const quantity = getLocalStorage('currentCategoryCount');

    // create initial bar for home 
    let bar = barSegment(rootFolder,'Home');

    if (folder == 'product-listing') {
        //create bar for listing page
        const link = `javascript:void(0);`;
        const text = `${quantity} ${category}`
        bar += barSegment(link, text);
    }


    if (folder == 'product_pages') {
        //create bar for listing page
        const link = `${rootFolder}${productListing}?category=${category}`;
        const text = `${quantity} ${category}`
        bar += barSegment(link, text);

        // add bar for product 
        const product_link = `javascript:void(0);`;
        const product_text = `${productName}`
        bar += barSegment(product_link, product_text);
    }

    document.getElementById('breadcrumb-bar').innerHTML = bar;
}

function barSegment(link, text) {
    return `<div>
                <a href="${link}">${text}</a>
            </div>
            `;
}
