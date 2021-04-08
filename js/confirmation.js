

/* Récupération de l'Id Produit + Prix total panier depuis l'URL */
let params = (new URL(document.location)).searchParams;
let orderId = params.get("orderID");
let amount = parseInt(params.get("amount"));
let totalPrice = 0;


document.getElementById("orderNum").innerText = orderId;

document.getElementById("totalPrice").innerText = amount.toFixed(2) + '€';


