import ExternalServices from './ExternalServices.mjs';
import { createCrumbBar } from './breadcrumbBar.js';
import imageCarousel from './image-carousel.js'

const category = new URLSearchParams(window.location.search).get('category');
const dataSource = new ExternalServices(category);

async function buildDetailsPage() {
    const productId = new URLSearchParams(document.location.search).get('productId');

    const product = await dataSource.findProductById(productId);
    document.getElementById('addToCart').setAttribute('data-id', productId);
    document.getElementById('product-descriptionhtmlsimple').innerHTML =
        product.DescriptionHtmlSimple;

    // set breadcrumb-bar 
    createCrumbBar(product.Name);

    // handle colors
    let imgTemplate = '';
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
    // document.getElementById('product-image').src = product.Images.PrimaryExtraLarge;
    // document.getElementById('product-image').alt = product.Name;
    let imgCarCont = document.getElementById('product-image');
    let img =  document.createElement('img');
    img.src = product.Images.PrimaryExtraLarge;
    img.alt = product.Name;
    imgCarCont.appendChild(img)
    product.Images.ExtraImages.forEach(image => {
        imgTemplate += 
        `<img src='${image.Src}' alt='${image.Title} ${product.Name}'>`
    }); 
    imgCarCont.innerHTML = imgTemplate
    document.getElementById('product-name-without-brand').textContent =
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
    let children = document.getElementById('product-image').childElementCount;
    if (children >= 3){
        const carousel = new imageCarousel('#product-image');
    } else {
        imgCarCont.style.display = 'flex';
    }
    
}
buildDetailsPage();
