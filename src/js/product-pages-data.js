import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

async function buildDetailsPage(e) {
    const product = await dataSource.findProductById(e.target.dataset.id);
    // document.getElementById('addToCart').data-id = e.target.dataset.id;
    document.getElementById('product-descriptionhtmlsimple').innerHTML = product.DescriptionHtmlSimple;
    document.getElementById('product-color-name').innerText = product.Colors.ColorName;
    document.getElementById('product-listprice').innerText = product.ListPrice;
    document.getElementById('product-image').src = product.Image;
    document.getElementById('product-image').alt = product.Name;
    document.getElementById('product-name-without-brand').innerText = product.NameWithoutBrand;
    document.getElementById('product-brand-name').innerText = product.Brand.Name;
    document.getElementById('product-title').innerText = product.Name;
}
buildDetailsPage()