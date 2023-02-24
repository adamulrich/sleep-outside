import {
    setLocalStorage
} from './utils.mjs';

document.getElementById('sign-up-button').addEventListener('click', function() {
    const myForm = document.forms[0];
    const valid = myForm.checkValidity(); 
    myForm.reportValidity();
    if (valid) {
        const signUpEmail = document.forms[0].email.value;
        setLocalStorage('email', signUpEmail);
    }
    
});