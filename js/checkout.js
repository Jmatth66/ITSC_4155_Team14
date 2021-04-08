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
        var cartList = "<tr><th>Item</th><th>Quantity</th><th>Price</th></tr>\n";
        var i = 0;

        for (i = 0; i <= localStorage.length-1; i++) {
            key = localStorage.key(i);
            list += "<tr><td>" + key + "</td>\n<td>"
                + localStorage.getItem(key) + "</td></tr>\n";
        }

        //checks if the cartList value is empty, by default it should be
        if (cartList == "<tr><th>Item</th><th>Quantity</th><th>Price</th></tr>\n") {
            //adds inbound items from the addToCart function
            //var Name = localStorage.getItem(productKey,'name');
            //var quantity
            // var price
            cartList += "<tr><td><i>name</i></td>\n<td><i>quantity</i></td>\n<td><i>price</i></td></tr>\n";
        }
        //takes blank data from the above function and creates an empty list within the cart element
        document.getElementById('cart').innerHTML = cartList;
    }
}

function ClearAll() {
    localStorage.clear();
    StartUp();
}
