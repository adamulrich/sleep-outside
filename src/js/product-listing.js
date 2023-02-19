import ExternalServices from './ExternalServices.mjs';
import gsap from 'gsap';
const category = new URLSearchParams(window.location.search).get('category');
document.getElementById('categoryName').innerText = category.charAt(0).toUpperCase() + category.slice(1);
let productList = [];

async function displayProductCards(productCategory){
    const dataSource = new ExternalServices(productCategory);
    const products = await dataSource.findAllProducts(productCategory);
    productList = products;
    products.map((product) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'product-card');
        li.setAttribute('id', `product-${product.Id}`);
        const productCardDiv = document.createElement('div');
        productCardDiv.setAttribute('id', 'productCardDiv');
        const a = document.createElement('a');
        a.setAttribute('href', `../product_pages/index.html?productId=${product.Id}&category=${productCategory}`)
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
        const btndiv = document.createElement('div');
        btndiv.setAttribute('id', 'btndiv');
        btndiv.setAttribute('data-image', product.Images.PrimaryExtraLarge);
        btndiv.setAttribute('data-description', product.DescriptionHtmlSimple);
        btndiv.setAttribute('data-name', product.Name);
        const quickView = document.createElement('button');
        quickView.textContent = 'Quick View';
        quickView.setAttribute('id','quick-view');
        

        li.appendChild(productCardDiv);
        productCardDiv.appendChild(a);
        a.appendChild(img);
        a.appendChild(h3);
        a.appendChild(h2);
        a.appendChild(p);
        p.appendChild(suggestedRetailPrice)
        p.appendChild(listedPrice)
        p.appendChild(percentOff)
        li.appendChild(btndiv)
        btndiv.appendChild(quickView)

        document.querySelector('.product-list').appendChild(li);

        const modal = document.getElementById('quick-modal')

        quickView.onclick = function(){
            const modalImg = document.getElementById('modal-img');
            modalImg.src = btndiv.getAttribute('data-image');
            modalImg.alt = btndiv.getAttribute('data-name');
            document.getElementById('quick-name').innerText = btndiv.getAttribute('data-name');
            document.getElementById('quick-text').innerHTML = btndiv.getAttribute('data-description');
            modal.style.display = 'block'

            
        }
        const close = document.querySelector('.close')
        close.onclick = function(){
            modal.style.display = 'none'

        }
        window.onclick = function(event){
            if (event.target == modal){
                modal.style.display = 'none'
            }
        }

    });
}
displayProductCards(category);

function orderProductCardsName(items){
    items.sort(function (a, b) {
        if (a.NameWithoutBrand < b.NameWithoutBrand) {
            return -1;
        }
        if (a.NameWithoutBrand > b.NameWithoutBrand) {
            return 1;
        }
        return 0;
    });
    return items
}
function orderProductCardsPrice(items){
    const priceSort = (arr = []) => {
        const sorter = (a, b) => +a.FinalPrice - +b.FinalPrice;
        arr.sort(sorter);
    };
    priceSort(items)
    return items
}

function itemReorder(orderFunction, items) {
    orderFunction(items);
    let x = 0;
    for (let i = 0; i < items.length; i++) {
        document.getElementById(`product-${items[i].Id}`).style.order = x;
        x++;
    }
} 

function layout(sortFunction, products) {
    
    var nodes = document.querySelectorAll('.product-card');
    var total = nodes.length;
    var ease  = 'power1.inOut';
    var cards = [];

    // get current position data.
    for (var index = 0; index < total; index++) {
        
        var node = nodes[index];
    
        // Initialize transforms on node
        gsap.set(node, { x: 0 });
    
        cards[index] = {
            x: node.offsetLeft,
            y: node.offsetTop,
            node    
        };
    } 

    itemReorder(sortFunction, products);
    //createCSSRuleForReorder(sortFunction, products);

    for (var j = 0; j < total; j++) {
    
        var card = cards[j];
        
        var lastX = card.x;
        var lastY = card.y;
    
        card.x = card.node.offsetLeft;
        card.y = card.node.offsetTop;
    
        // Continue if card hasn't moved
        if (lastX === card.x && lastY === card.y) continue;
    
        // Reversed delta values taking into account current transforms    
        var x = gsap.getProperty(card.node, 'x') + lastX - card.x;
        var y = gsap.getProperty(card.node, 'y') + lastY - card.y;
    
        // Tween to 0 to remove the transforms
        gsap.fromTo(card.node, { x, y }, { duration: 0.5, x: 0, y: 0, ease });            
    }
}
function productSearch() {
    let searchInput = document.getElementById('search-input').value
    //loop through all elements
    productList.forEach((product) => {
        let id = 'product-' + product.Id
        document.getElementById(id).classList.remove('hide');
        //check if text includes the search value
        if (!product.Name.toUpperCase().includes(searchInput.toUpperCase())) {
            //display matching card
            document.getElementById(id).classList.add('hide');
        } 
    });
};
var input = document.getElementById('search-input');
input.addEventListener('keypress', (function(event){
    if (event.key === 'Enter'){
        productSearch()
    }
}));

input.addEventListener('search',productSearch);
document.getElementById('sort-price').onclick = function() { layout(orderProductCardsPrice, productList)};
document.getElementById('sort-name').onclick = function () { layout(orderProductCardsName, productList) };
