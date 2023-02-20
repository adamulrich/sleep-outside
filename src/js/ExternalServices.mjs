//const baseURL = 'http://server-nodejs.cit.byui.edu:3000/';
const baseURL = 'https://wdd330-backend.onrender.com/'

async function convertToJson(res) {
    return res.json();
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
        return await fetch(baseURL + 'checkout', options).then();
    }
}
