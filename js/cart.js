
const apiUrl = "http://localhost:3000/api/cameras/";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

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
console.log(userCart);
/* La variable qui appelle le panier en relevant ce qui se trouve dans le localStorage */



/* RECUPERATION ET AFFICHAGE DES PRODUITS DANS LE PANIER
******************************************************************/

const promises = userCart.map(productId => {
    return fetch(apiUrl + productId)
        .then(response => {
            return response.json()
    });
});

const cartResume = document.getElementById("cart-resume");
var html = "";

Promise.all(promises).then(products => {
    products.forEach(product => {
        html = html
        + '<div class="cart-item">'
        + '<div class="cart-product__img">' + '<img src="' + product.imageUrl + '" alt="Photo du produit"></a>' + '</div>'
        + '<div class="cart-product__details">'
        + '<div class="cart-product__details--name">'+ '<h2>' + product.name + '</h2>' + '</div>'
        + '<div class="cart-product__details--options">' + '</div>'
        + '</div>'
        + '<div class="cart-product__details--price">' + (product.price / 1000).toFixed(2) + '€' + '</div>'
        + '<div class="btn">Enlever du panier</div>'
        + '</div>';
    });
cartResume.innerHTML = html;
});

