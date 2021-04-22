window.setInterval(onUpdate, 100);
//localStorage.productKey="key";

let itemList = ["corn","wheat", "oats", "barley", "hogFeed", "groundFeed", "scratchFeed", "layingFeed", "broilerFeed", "sweetFeed", "allStock", "fiftyFifty"];
let typeList = ["bag", "barrel", "sack", "pallet"];

var item;
var type;
var price;
var amount;
var max;

function onUpdate()
{
	for (var x = 0; x < itemList.length; x++)
	{
		item = document.getElementById(itemList[x]);
		
		for (var y = 0; y < typeList.length; y++)
		{
			type = item.getElementsByClassName(typeList[y])[0];
			if(typeof(type) != 'undefined' && type != null)
			{
				price = item.getElementsByClassName(typeList[y]+ "Price")[0].textContent;
				amount = item.getElementsByClassName(typeList[y]+ "Amount")[0].value		
				price = price.replace(/\$/g, '');
		
				item.getElementsByClassName(typeList[y]+ "Amount")[0].oninput = function ()
				{
					max = parseInt(this.max);

					if (parseInt(this.value) > max) {
						this.value = max; 
					}
				}
				item.getElementsByClassName(typeList[y]+ "Total")[0].textContent = "$" + price * amount;				
			}
		}
	}
}

function AddToCartTest(element){
	var productKey = element.name;
	var thisItem = document.getElementById(productKey);
	var thisType;
	var thisQuantity;
	var thisPrice;
		
		for (var y = 0; y < typeList.length; y++)
		{
			thisType = thisItem.getElementsByClassName(typeList[y])[0];
			if(typeof(thisType) != 'undefined' && thisType != null)
			{
				thisQuantity = thisItem.getElementsByClassName(typeList[y]+ "Amount")[0].value
				if (thisQuantity > 0)
				{	
					thisPrice = thisItem.getElementsByClassName(typeList[y]+ "Price")[0].textContent.replace(/\$/g, '');	
					
					alert("Name: " + productKey + "\nType: " + typeList[y] + "\nPrice: " + thisPrice + "\nQuantity: " + thisQuantity);
					//localStorage.setItem(productKey, thisItem.name);
					//localStorage.setItem(productKey, thisType);
					localStorage.setItem(productKey + typeList[y], thisPrice);
					localStorage.setItem(productKey + typeList[y], thisQuantity);
				}
			}
		}
}

function AddToCart(element){
	let productKey = element.name;
	alert(productKey);
	let name = element.className;
	alert(name);
	let type = document.getElementById(productKey).getElementsByClassName("type")[0].textContent;
	alert(type);
	let price = document.getElementById(productKey).getElementsByClassName("price")[0].textContent;
	alert(price);
	let quantity = document.getElementById(productKey).getElementsByClassName("amount")[0].value;
	alert(quantity);
	alert("Product Key Captured: " + productKey + " Name Captured: " + name + " Type Captured: " + type + " Price Captured: " + price + " Quantity Captured: " + quantity);
	localStorage.setItem(productKey, name);
	localStorage.setItem(productKey, type);
	localStorage.setItem(productKey, price);
	localStorage.setItem(productKey, quantity);
	//window.location.href = "checkout.html";
}