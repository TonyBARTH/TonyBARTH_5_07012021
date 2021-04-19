
/* Récupération de l'Id Produit + Prix total panier depuis l'URL */
let params = (new URL(document.location)).searchParams;
let orderId = params.get("orderID");
let orderAmount = localStorage.getItem("orderAmount");


/* Calcul du prix total de la commande */
document.getElementById("totalPrice").innerText = orderAmount + ' €';


/* On inscrit aussi l'id de commande dans le corps de la page */
document.getElementById("orderNum").innerText = orderId;


/* Remise à zéro du panier (on vide le tableau) */
localStorage.setItem("userCart", JSON.stringify([]));



