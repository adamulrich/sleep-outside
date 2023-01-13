// Superscript number on cart
let ssn = document.getElementById("superscriptnum");
function displaySuperscriptNumber() {
    let items = JSON.parse(localStorage.getItem("so-cart"));
    if (items != null) {
        let number = items.length
        ssn.innerHTML = number
        // location.reload()
    } else {
        return
    }
        
    
    
};
displaySuperscriptNumber();