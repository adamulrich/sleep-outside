import ExternalServices from './ExternalServices.mjs';
const category = new URLSearchParams(window.location.search).get('category');
const dataSource = new ExternalServices(category);

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
    let selectFlag = true;
    let selected = 'checked';
    product.Colors.forEach(color => {

        // this should set the first item to selected
        if (selectFlag) {
            selectFlag = false
        } else {
            selected = '';
        }
        template += 
        `<div class="div-radio-color">
            <input type="radio" name="color-selector" data-id="${color.ColorName}" data-picture=${color.ColorPreviewImageSrc} ${selected} id="${color.ColorCode}" class="radio-color">
            <label for="${color.ColorCode}">${color.ColorName}<img class="swatch" src="${color.ColorChipImageSrc}" alt="swatch for color ${color.ColorName}"></label>
            
        </div>
        `
    });
    document.getElementById('div-color-radio-buttons').innerHTML = template;
    document.getElementById('div-color-radio-buttons').firstChild
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
