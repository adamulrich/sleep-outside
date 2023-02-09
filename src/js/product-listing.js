import ProductData from './ProductData.mjs';
const category = new URLSearchParams(window.location.search).get('category');
document.getElementById('categoryName').innerText = category.charAt(0).toUpperCase() + category.slice(1);

async function displayProductCards(){
    const dataSource = new ProductData(category);
    const products = await dataSource.findAllProducts();
    products.map((product) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'product-card');
        const a = document.createElement('a');
        a.setAttribute('href', `../product_pages/index.html?productId=${product.Id}`)
        const img = document.createElement('img');
        img.setAttribute('src', product.Images.PrimaryExtraLarge);
        img.setAttribute('alt', `Image of ${product.Name}`);
        const h3 = document.createElement('h3');
        h3.setAttribute('class', 'card__brand');
        h3.textContent = product.Brand.Name;;
        const h2 = document.createElement('h2');
        h2.setAttribute('class', 'card__name');
        h2.textContent = product.NameWithoutBrand;
        const p = document.createElement('p');
        p.setAttribute('class', 'product-card__price');
        const suggestedRetailPrice = document.createElement('span');
        suggestedRetailPrice.setAttribute('id','product-suggested-retail-price');
        suggestedRetailPrice.textContent = `$${product.SuggestedRetailPrice}`;
        const listedPrice = document.createElement('span');
        listedPrice.setAttribute('id','product-final-price');
        listedPrice.textContent = ` $${product.ListPrice}`;
        const percentOff = document.createElement('span');
        percentOff.setAttribute('id','product-discount-percent');
        percentOff.textContent = ` ${(
            ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) * 100
        ).toFixed(0)}% off`;


        li.appendChild(a);
        a.appendChild(img);
        a.appendChild(h3);
        a.appendChild(h2);
        a.appendChild(p);
        p.appendChild(suggestedRetailPrice)
        p.appendChild(listedPrice)
        p.appendChild(percentOff)
        document.querySelector('.product-list').appendChild(li);
    });
}
displayProductCards();