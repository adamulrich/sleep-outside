import ExternalServices from './ExternalServices.mjs';
import Alert from './alerts.js';

class Admin {
    constructor(outputSelector) {
        this.mainElement = document.querySelector(outputSelector);
        this.token = null;
        this.services = new ExternalServices();
    }
    async login(creds, next) {
        // I built the login method with a callback: next.
        // This makes it much more flexible...
        // there could be many different things the user wants to do after logging in...
        // this allows us that flexibility without having to write a bunch of login methods
        try {
            console.log('got here');
            this.token = await this.services.loginRequest(creds);
            if (this.token != '') {
            
                next();
            }
            
        } catch (err) {
            // remember this from before?
            // new Alert(err.message.message);
        }
    }
    showLogin() {
        const innerHTML = `<h1>log in </h1>
        <form id="checkout-form">
        <fieldset>
            <label class="top">email*<input type="email" id='email' name="email" required></label>
            <label class="top">password*<input type="password" id='password' name="password" required></label>
        </fieldset>
        <input type="button" id='login-button' value="login" class="submitBtn">
        </form> `;
        this.mainElement.innerHTML = innerHTML;
        document
            .getElementById('login-button')
            .addEventListener('click', (async function (event) {
                {
                    const creds = {
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value
                    };
                    await admin.login(creds, admin.displayOrders);
                }
            }))
    }
        
    async displayOrders() {
        // fetch the orders with the token
        console.log('got here');
        const orders = await admin.services.getOrders(admin.token);
        console.log(orders);
        // display results
    }

}
const admin = new Admin('#admin-login');
admin.showLogin();
