
const apiUrl = "http://localhost:3000/api/cameras/";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
var html = "";

/* GENERATION DU PANIER D'ACHAT
**************************************************/

if (localStorage.getItem("userCart")){
    console.log("Le panier a été généré dans le localStorage"); 
    /* Vérification de l'existence du panier et message de confirmation dans Console */
    document.getElementById("display-empty-cart").remove();
    /* S'il n'est pas vide on supprime le message et on créé un tableau récapitulatif */
} else {
	console.log("Le panier n'existe pas encore, il va être créé dans le localStorage");
    let cartInit = []; 
    /* Le panier va être un tableau de produits */
    localStorage.setItem("userCart", JSON.stringify(cartInit));
    /* Initialisation du panier de produits */
    document.getElementById("cart-resume").style.display = 'none';
    /* Si le panier est vide on affiche uniquement le message PANIER VIDE et on cache le reste */
};

let userCart = JSON.parse(localStorage.getItem("userCart"));
/* La variable qui appelle le panier en relevant ce qui se trouve dans le localStorage */

const promises = userCart.map(productId => {
    return fetch(apiUrl + productId)
        .then(response => {
            return response.json()

            .then(product => {
            /* Pour chaque produit du panier on fait appel à l'Api et on récolte également l'Id de chaque produit */

            /* On prépare ce qui doit être implanté dans le html... */
            html = html 
            + '<div class="cart-item">'
            + '<div class="cart-product__img">' + '<img src="' + product.imageUrl + '" alt="Photo du produit"></a>' + '</div>'
            + '<div class="cart-product__details">'
            + '<div class="cart-product__details--name">'+ '<h2>' + product.name + '</h2>' + '</div>'
            + '<div class="cart-product__details--options">' + '</div>'
            + '</div>'
            + '<div class="cart-product__details--price">' + product.price + '€' + '</div>';
            + '<div class="btn">Enlever du panier</div>'
            + '</div';

            document.getElementById("cart-resume").innerHTML = html;
            /* ...et on l'insère dans le html de la page Panier. */
            });
        });
});

promises.all(promises).then(product => {
console.log(product.name);
});

