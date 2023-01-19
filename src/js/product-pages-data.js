import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

async function buildDetailsPage() {

    const productId = new URLSearchParams(document.location.search).get('productId');
    const product = await dataSource.findProductById(productId);
    document.getElementById('addToCart').setAttribute('data-id',productId);
    document.getElementById('product-descriptionhtmlsimple').innerHTML = product.DescriptionHtmlSimple;
    document.getElementById('product-color-name').innerText = product.Colors.ColorName;
    document.getElementById('product-listprice').innerText = product.ListPrice;
    document.getElementById('product-image').src = product.Image;
    document.getElementById('product-image').alt = product.Name;
    document.getElementById('product-name-without-brand').innerText = product.NameWithoutBrand;
    document.getElementById('product-brand-name').innerText = product.Brand.Name;
    document.title = 'Sleep Outside | ' + product.Name;
}
buildDetailsPage()