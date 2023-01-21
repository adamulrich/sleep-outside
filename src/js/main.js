// Superscript number on cart
const ssn = document.getElementById('superscriptnum');
if (ssn.textContent === '') {
  ssn.setAttribute('class', 'is-empty');
}
export function displaySuperscriptNumber() {
  let items = JSON.parse(localStorage.getItem('so-cart'));
  if (items != null) {
    ssn.classList.remove('is-empty');
    let number = items.length;
    ssn.innerHTML = number;
  } else {
    return;
  }
}
displaySuperscriptNumber();
