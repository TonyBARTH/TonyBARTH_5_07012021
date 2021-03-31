

/* Récupération de l'Id Produit + Prix total panier depuis l'URL */
let params = (new URL(document.location)).searchParams;
let name = params.get("orderId");
let totalPrice = 0;

let orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

document.getElementById("orderNum").innerText = orderDetails.orderId;

for (product in orderDetails.products){
    totalPrice = totalPrice + orderDetails.products[product].price/100;
    document.getElementById("totalPrice").innerText = totalPrice.toFixed(2) + '€';
}


/* Remise à zéro du localStorage au click sur bouton de fermeture/retour vers la boutique */

function clearStorage() {
    localStorage.clear();
    console.log('Youpiii !!!!');
}