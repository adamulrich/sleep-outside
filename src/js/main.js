// Superscript number on cart
let ssn = document.getElementById("superscriptnum");
if (ssn.textContent === '') {
    ssn.setAttribute('class', 'is-empty');
}
function displaySuperscriptNumber() {
    let items = JSON.parse(localStorage.getItem("so-cart"));
    if (items != null) {
        ssn.classList.remove('is-empty')
        let number = items.length
        ssn.innerHTML = number
        // location.reload()
    } else {
        return
    }
        
    
    
};
displaySuperscriptNumber();