//Event listener checking for a full page load, logging the page load, and then calling the startup script to initialize the cart
window.addEventListener('load', function () {
    console.log('All assets are loaded')
    StartUp();
})

function StartUp() {
    //checks browser support for local storage
    if ('localStorage' in window && window['localStorage'] == null) {
        alert("This browser does not support localStorage, please try again on another browser");
    } else {
        var productKey = "";

        //initialize a empty checkout table
        var cartList = "<tr><th>Item</th><th>Quantity</th><th>Price Per Unit</th><th>Sub-Total</th></tr>\n";
        var i = 0;
		var total = 0;
		var subTotal;

        //takes the storage length and goes through each item grabbing the string associated with each key and deconstructs its data
        for (i = 0; i <= localStorage.length - 1; i++) {
            productKey = localStorage.getItem(localStorage.key(i))
            let temp = productKey.split(".");
			subTotal = (temp[1] * temp[2]);
            cartList += "<tr><td>" + temp[0] + "</td>\n<td>" + temp[1] + "</td>\n<td>$" + temp[2] + "</td>\n<td>$" + subTotal + "</td>\n<td><input type=\"button\" class=\"delete\" value=\"Remove\" onclick=\"deleteItem(this)\"></td></tr>";
			total += subTotal;
        }

        //takes blank data from the above function and creates an empty list within the cart element
        document.getElementById('cart').innerHTML = cartList;
		document.getElementById('total').innerHTML = "Total: $" + total;
    }
}

function deleteItem(element) {
    let name = element.parentNode.parentNode.cells[0].textContent;
    name = name.split(" ").join("")
    localStorage.removeItem(name);
    StartUp();
}

function ClearAll() {
    localStorage.clear();
    StartUp();
}