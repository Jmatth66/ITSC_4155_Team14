window.setInterval(onUpdate, 100);

let itemList = ["corn","wheat", "oats", "barley"];
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