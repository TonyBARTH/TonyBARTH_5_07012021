
const apiUrl = "http://localhost:3000/api/cameras/";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');



/* AFFICHAGE DU PANIER D'ACHAT
**************************************************/

let userCart = JSON.parse(localStorage.getItem("userCart"));
console.log(userCart);
/* La variable qui appelle le panier en relevant ce qui se trouve dans le localStorage */

if (userCart == null) {
    userCart = [];
    document.getElementById("display-empty-cart").style.display = 'block';
    document.getElementById("cart-resume").style.display = 'none';
    document.getElementById("user-form").style.display = 'none';
    /* Si le panier n'existe pas encore, on l'initialise en tableau et on affiche uniquement le message "Panier vide" */
} else {
    localStorage.setItem("userCart", JSON.stringify(userCart));
    /* Sinon, on le récupère... */
    document.getElementById("display-empty-cart").style.display = 'none';
    /* ...et on enlève le message "Panier vide" */
}

if (userCart.length == 0) {
  document.getElementById("display-empty-cart").style.display = 'block';
  document.getElementById("cart-resume").style.display = 'none';
  document.getElementById("user-form").style.display = 'none';
  /* Si le panier est vide on affiche uniquement le message "Panier vide" */
} else {
  localStorage.setItem("userCart", JSON.stringify(userCart));
  /* Sinon, on le récupère... */
  document.getElementById("display-empty-cart").style.display = 'none';
  /* ...et on enlève le message "Panier vide" */
}



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
        + '<div class="cart-product__details--options">'
        + '<form>' + '<label for="options-choice">Optique choisie :</label>'
        + '<select class="option-choose" name="option-choose">'
        + '<option>' + product.lenses[0] +'</option>'
        + '<option>' + product.lenses[1] +'</option>'
        + '<option>' + product.lenses[2] +'</option>'
        + '</select>'
        + '</form>'
        + '</div>'
        + '</div>'
        + '<div class="cart-product__details--price">' + (product.price / 1000).toFixed(2) + '€' + '</div>'
        + '<div class="btn" id="delete-cart">Enlever du panier</div>'
        + '</div>';
    });
cartResume.innerHTML = html;
});

