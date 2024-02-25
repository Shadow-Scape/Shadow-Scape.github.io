var cartItems=[];var maxAmountOfItems=10000;var cookieName="shopCart";function ShopItem(productId,name,imgUrl,price,amount){this.productId=productId;this.name=name;this.imgUrl=imgUrl;this.price=price;this.amount=amount;}
function addItemToCart(productId,name,imgUrl,price,amount=1){var itemAlreadyInIndex=-1;cartItems.forEach(function(item,index){if(item.productId==productId){itemAlreadyInIndex=index;item.name=name;item.price=price;item.imgUrl=imgUrl;item.amount=amount;}});if(itemAlreadyInIndex===-1){cartItems.push(new ShopItem(productId,name,imgUrl,price,amount));}
saveCart();}
function decreaseItemInCart(productId,amountToRemove){if(didOrderGoThrough){return;}
var oldItemAmount=0;if(productId==100){amountToRemove=100;}
var indexToRemove=-1;var itemName="";cartItems.forEach(function(item,index){if(item.productId==productId){if(amountToRemove==1){if(item.amount>5000){amountToRemove=100;}else if(item.amount>1000){amountToRemove=50;}else if(item.amount>100||item.productId==200){if(item.productId==200&&item.amount<=5){amountToRemove=item.amount;}else{amountToRemove=1;}}}
oldItemAmount=item.amount;item.amount-=amountToRemove;itemName=item.name;}
if(item.amount<=0){indexToRemove=index;}});if(indexToRemove!==-1){if(confirm('Are you sure you want to remove '+itemName+' from your cart?')){cartItems.splice(indexToRemove,1);onCartPageLoad();}else{cartItems[indexToRemove].amount=oldItemAmount;}}
if(termsOfServiceCheckmark.checked){termsOfServiceCheckmark.checked=false;onCheckmarkClick(termsOfServiceCheckmark);}
saveCart();fillCartTableWithItems();}
function increaseItemInCart(productId){if(didOrderGoThrough){return;}
var amountToAdd=1;if(productId==100){amountToAdd=100;}else if(productId==200){amountToAdd=1;}
console.log("increaseItemInCart("+productId+", "+amountToAdd+")")
cartItems.forEach(function(item,index){if(item.productId==productId){item.amount+=amountToAdd;}
if(item.amount>maxAmountOfItems){item.amount=maxAmountOfItems;}});if(termsOfServiceCheckmark.checked){termsOfServiceCheckmark.checked=false;onCheckmarkClick(termsOfServiceCheckmark);}
saveCart();fillCartTableWithItems();}
function saveCart(){setCookie(cookieName,JSON.stringify(cartItems),1);}
function loadCart(){try{if(getCookie(cookieName)!=null){cartItems=JSON.parse(getCookie(cookieName));}}catch(error){console.log(error);cartItems=[];saveCart();}}
function clearCart(){cartItems=[];saveCart();}
function printCartItems(){cartItems.forEach(function(item,index){console.log("cart item "+index+": "+item.name+" x"+item.amount);});}
loadCart();loadCartButtons();function loadCartButtons(){jQuery('.add-to-cart').on('click',function(e){e.preventDefault();window.location.href=("cart/");console.log("Adding item to Cart(bmtOrderId:"+jQuery(this).attr('bmt-product-id')+", name:"+jQuery(this).attr('item-name')+" icon:"+jQuery(this).attr('item-image')+")");$.notify({icon:"glyphicon glyphicon-shopping-cart",message:"<img src="+jQuery(this).attr('item-image')+" style=\"max-height: 23px; margin-right: 15px;\"></img><b>"+jQuery(this).attr('item-name')+"</b> has been added to your cart - <a href='https://roatpkz.com/donate/cart/'>(view cart)</a>",target:"_blank"},{animate:{enter:"animated fadeInDown",exit:"animated fadeOutUp"},offset:20,spacing:10,z_index:1031,delay:1,timer:1500,placement:{from:"top",align:"center"},type:"successcart",allow_dismiss:true,});if(jQuery(this).attr('bmt-product-id')==200){addItemToCart(jQuery(this).attr('bmt-product-id'),"Donation Credits",jQuery(this).attr('item-image'),1.0,parseInt(jQuery(this).attr('item-price')));}else{addItemToCart(jQuery(this).attr('bmt-product-id'),jQuery(this).attr('item-name'),jQuery(this).attr('item-image'),jQuery(this).attr('item-price'));}});}
var loadingCartElement;var yourCartIsEmptyElement;var cartTableElement,cartTableBodyElement;var postFormElement;var confirmItemsButtonElement;var termsOfServiceCheckmark;function onCartPageLoad(){loadingCartElement=document.getElementById("loadingcart");yourCartIsEmptyElement=document.getElementById("emptycart");cartTableElement=document.getElementById("cartTable");cartTableBodyElement=document.getElementById("cartTableBody");postFormElement=document.getElementById("postForm");confirmItemsButtonElement=document.getElementById("confirmitemsbutton");termsOfServiceCheckmark=document.getElementById("termsandconditions");if(cartItems.length===0){loadingCartElement.hidden=true;cartTableBodyElement.hidden=true;yourCartIsEmptyElement.hidden=false;postFormElement.hidden=true;confirmItemsButtonElement.hidden=true;cartTableElement.hidden=true;}else{loadingCartElement.hidden=true;cartTableBodyElement.hidden=false;cartTableElement.hidden=false;confirmItemsButtonElement.hidden=false;fillCartTableWithItems();handleConfirmItemsInCartButton();}}
function handleConfirmItemsInCartButton(){confirmItemsButtonElement.hidden=true;postFormElement.hidden=false;}
function fillCartTableWithItems(){var tableData="";var totalPrice=0.0;if(cartTableBodyElement===null){return;}
cartItems.forEach(function(item,index){if(item.productId==200&&item.amount>50){tableData=tableData+"<tr>"+
"<td align=\"center\"><img src=\""+item.imgUrl+"\" style=\"max-height: 30px;\"></td>"+
"<td align=\"left\">"+item.name+"</td>\n                                        "+
"<td align=\"center\"><a href=\"#\" alt='remove all' onclick=\"decreaseItemInCart("+item.productId+", 1000000);return false;\" class=\"minus-sign\">🗑</a>  <a href=\"#\" onclick=\"decreaseItemInCart("+item.productId+", 1);return false;\" class=\"minus-sign\">-</a>"+item.amount+"<a href=\"#\" onclick=\"increaseItemInCart("+item.productId+");return false;\" class=\"plus-sign\">+</a></td>"+
"<td align=\"right\">$"+item.price+"</td>"+
"<td align=\"right\"><b>$"+(item.price*item.amount).toFixed(2)+"</b></td>"+
"</tr>";}else{tableData=tableData+"<tr>"+
"<td align=\"center\"><img src=\""+item.imgUrl+"\" style=\"max-height: 30px;\"></td>"+
"<td align=\"left\">"+item.name+"</td>\n                                        "+
"<td align=\"center\"><a href=\"#\" onclick=\"decreaseItemInCart("+item.productId+", 1);return false;\" class=\"minus-sign\">-</a>"+item.amount+"<a href=\"#\" onclick=\"increaseItemInCart("+item.productId+");return false;\" class=\"plus-sign\">+</a></td>"+
"<td align=\"right\">$"+item.price+"</td>"+
"<td align=\"right\"><b>$"+(item.price*item.amount).toFixed(2)+"</b></td>"+
"</tr>";}
totalPrice+=(item.price*item.amount);});tableData=tableData+"<tr style=\"border-bottom: 2px solid #002233;\">"+
"<td align=\"center\"></td>"+
"<td align=\"left\"><b>Subtotal (USD):</b></td>"+
"<td align=\"center\"></td>"+
"<td align=\"center\"></td>"+
"<td align=\"right\"><b>$"+totalPrice.toFixed(2)+"</b></td>"+
"</tr>";cartTableBodyElement.innerHTML=(tableData);}
function getCartString(){var cartString="";var totalPrice=0;cartItems.forEach(function(item,index){cartString=cartString+"--"+item.productId+"-"+item.amount;totalPrice+=(item.price*item.amount);});return playerName+"--"+playerIp+cartString;}
function getTotalCartPrice(){var totalPrice=0;cartItems.forEach(function(item,index){totalPrice+=(item.price*item.amount);});return totalPrice.toFixed(2);}
function onPaymentSuccess(){document.getElementById("success_order_id").innerHTML=orderId;document.getElementById("success_username").innerHTML=playerName;document.getElementById("postForm").hidden=true;document.getElementById("payment_success").hidden=false;didOrderGoThrough=true;clearCart();}
function onPaymentSuccessGameCredit(){document.getElementById("success_order_id").innerHTML=orderId;document.getElementById("success_username").innerHTML=playerName;document.getElementById("order_processing_text").innerHTML="Your order has been placed & processed. Enjoy your items in-game!</p>"
document.getElementById("postForm").hidden=true;document.getElementById("payment_success").hidden=false;didOrderGoThrough=true;clearCart();}
function onPaymentSuccessCrypto(){document.getElementById("success_order_id_crypto").innerHTML=orderId;document.getElementById("success_invoice_id_crypto").innerHTML=cryptoInvoiceId;document.getElementById("success_username_crypto").innerHTML=playerName;document.getElementById("crypto_invoice_url").href="https://btcpayz.roatpkz.com/invoice?id="+cryptoInvoiceId;document.getElementById("payment_success_crypto").hidden=false;document.getElementById("postForm").hidden=true;didOrderGoThrough=true;clearCart();}
function onPaymentFailure(){document.getElementById("postForm").hidden=true;document.getElementById("payment_failed").hidden=false;}
function setCookie(cname,cvalue,exdays){var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toUTCString();document.cookie=cname+"="+cvalue+";"+expires+";path=/";}
function getCookie(name){var value="; "+document.cookie;var parts=value.split("; "+name+"=");if(parts.length==2)return parts.pop().split(";").shift();}