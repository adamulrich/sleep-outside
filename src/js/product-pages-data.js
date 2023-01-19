import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

async function buildDetailsPage(e) {
    const product = await dataSource.findProductById(e.target.dataset.id);
    addProductToCart(product);
}