const baseURL = 'http://server-nodejs.cit.byui.edu:3000/';

function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Bad Response');
    }
}

export default class ExternalServices {
    constructor(category) {
        this.category = category;
    }
    async getData() {
        const response = await fetch(baseURL + `products/search/${this.category}`);
        const data = await convertToJson(response);
        return data.Result;
    }
    async findProductById(id) {
        const products = await this.getData();
        return products.find((item) => item.Id === id);
    }
    async findAllProducts() {
        const products = await this.getData();
        return products;
    }

    async checkout(payload) {
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        console.log(baseURL + 'checkout');
        console.log(options);
        const response = await fetch(baseURL + 'checkout', options);
        if (response.ok) {
            const textData = await response.text();
            console.log(textData);
            return textData;
        }
    }
}
