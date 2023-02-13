import ProductData from './ProductData.mjs';
const category = new URLSearchParams(window.location.search).get('category');
const dataSource = new ProductData(category);

async function buildDetailsPage() {
    const productId = new URLSearchParams(document.location.search).get(
        'productId'
    );
    const product = await dataSource.findProductById(productId);
    document.getElementById('addToCart').setAttribute('data-id', productId);
    document.getElementById('product-descriptionhtmlsimple').innerHTML =
        product.DescriptionHtmlSimple;

    // handle colors
    let template = '';
    product.Colors.forEach(color => {
        // <input type="radio" name="color-selector" class="product_color" id="product-color-name"></p>
        template += 
        `<div class="div-radio-color">
            <input type="radio" name="color-selector" id="${color.ColorCode}" class="radio-color">
            <label for="${color.ColorCode}">${color.ColorName}<img class="swatch" src="${color.ColorChipImageSrc}" alt="swatch for color ${color.ColorName}"></label>
            
        </div>
        `
    });
    document.getElementById('div-color-radio-buttons').innerHTML = template;
    // document.getElementById('product-color-name').innerText =
    //     product.Colors[0].ColorName;
    document.getElementById(
        'product-suggested-retail-price'
    ).innerText = `$${product.SuggestedRetailPrice}`;
    document.getElementById('product-image').src = product.Images.PrimaryExtraLarge;
    document.getElementById('product-image').alt = product.Name;
    document.getElementById('product-name-without-brand').innerText =
        product.NameWithoutBrand;
    document.getElementById('product-brand-name').innerText = product.Brand.Name;
    document.title = 'Sleep Outside | ' + product.Name;
    document.getElementById(
        'product-final-price'
    ).innerText = `$${product.FinalPrice}`;
    document.getElementById('product-discount-percent').innerText = `${(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
      product.SuggestedRetailPrice) * 100
    ).toFixed(0)}% off`;
}
buildDetailsPage();
