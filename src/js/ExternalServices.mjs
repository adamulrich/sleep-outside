
//const baseURL = 'http://server-nodejs.cit.byui.edu:3000/';
//const baseURL = 'https://wdd330-backend.onrender.com/'
const baseURL = import.meta.env['VITE_CONTENT_SERVER'];
console.log(baseURL);

async function convertToJson(res) {
    const result = await res.json();
    console.log(res.status)
    console.log(res.ok)
    if (res.ok) {
        return result;
    } else {
        
        
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
        let res = {};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        try {
            res = await fetch(baseURL + 'checkout', options).then();
            
        } catch (error) {
            console.log('test3');
            throw { name: 'servicesError', message: JSON.stringify(res) };
        };
        return res;

    };
}
