//Event listener checking for a full page load, logging the page load, and then calling the startup script to initialize the cart
window.addEventListener('load', function () {
    console.log('All assets are loaded')
    StartUp();
	document.getElementById('name').addEventListener('input', validateName);
	document.getElementById('phone').addEventListener('input', validatePhone);
	document.getElementById('email').addEventListener('input', validateEmail);
})

var total = 0;
var itemCount;
var contents;

var nameInput;
var phoneInput;
var emailInput;
var commentInput;
var emailValid = false;

const reg = /[<>"'/]/ig;
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function StartUp() {
	
	itemCount = 0;
	total = 0;
	
    //checks browser support for local storage
    if ('localStorage' in window && window['localStorage'] == null) {
        alert("This browser does not support localStorage, please try again on another browser");
    } else{
        var productKey = "";
		
		nameInput = document.getElementById('name');
		phoneInput = document.getElementById('phone');
		emailInput = document.getElementById('email');
		commentInput = document.getElementById('comments')

        //initialize a empty checkout table
        var cartList = "<tr><th>Item</th><th>Quantity</th><th>Price Per Unit</th><th>Sub-Total</th></tr>\n";
        var i = 0;
        var subTotal;

        contents = cartList;

		if (localStorage.length > 0) {
			
		//takes the storage length and goes through each item grabbing the string associated with each key and deconstructs its data
        for (i = 0; i <= localStorage.length - 1; i++) {
            productKey = localStorage.getItem(localStorage.key(i));
            let temp = productKey.split(".");
			itemCount++;
            subTotal = (temp[1] * temp[2]);
            cartList += "<tr><td>" + temp[0] + "</td>\n<td>" + temp[1] + "</td>\n<td>$" + temp[2] + "</td>\n<td>$" + subTotal + "</td>\n<td><input type=\"button\" class=\"delete\" value=\"Remove\" onclick=\"deleteItem(this)\"></td></tr>";
            contents += "<tr><td>" + temp[0] + "</td>\n<td>" + temp[1] + "</td>\n<td>$" + temp[2] + "</td>\n<td>$" + subTotal;
            total += subTotal;
        }
		
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

window.onload = function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        //emailjs.sendForm('service_yob21g8', 'template_5rq5evc', this)

		if (!emailValid){
			alert("Invalid Email Address!");
		}else if (itemCount > 0){
		
        emailjs.send("service_yob21g8", "template_5rq5evc",
            {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                cost: total,
                contents: contents,
                comments: validateComment(commentInput.innerHTML),
            })
            .then(function () {
                console.log('SUCCESS!');
				submitSuccess()
            }, function (error) {
                console.log('FAILED...', error);
            });
		} else{
			alert("Your cart is empty");
		}
    });
}

function submitCheck(token) {
    if (token != null) {
        document.getElementById('formSubmit').disabled = false;
    } else {
        alert("Please complete the captcha");
    }
}

function submitSuccess() {
    localStorage.clear();
    window.location.href = "thankYou.html"
}

function validateName(){
	nameInput.value = nameInput.value.replace(reg, '');
}

function validatePhone(){
	phoneInput.value = phoneInput.value.replace(/\D/g,'');
}

function validateComment(string){
	const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
	};
	return string.replace(reg, (match)=>(map[match]));
}

function validateEmail(){
	emailInput.value = emailInput.value.replace(reg, '');
	emailValid = re.test(String(emailInput.value).toLowerCase());
}