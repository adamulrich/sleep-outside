export function increaseCount(a, b) {
    var input = b.previousElementSibling;
    var value = parseInt(input.innerText, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.innerText = value;
}

export function decreaseCount(a, b) {
    // get id for item

    // reduce item in local storage

    // update cart
    
    var input = b.nextElementSibling;
    var value = parseInt(input.innerText, 10);
    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.innerText = value;
    }
}
