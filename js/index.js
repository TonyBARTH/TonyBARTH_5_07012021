

var productList = "";
var productPage = "product.html";
const apiUrl = "http://localhost:3000/api/cameras";



fetch(apiUrl)
    /* connexion à l'adresse de l'API */
    .then (
        function (response){
            response.json()
            /* Si une promesse est bien renvoyée en JSON... */
            .then (
                function getContent (cameras) {
                    cameras.forEach(element => {
                        productList = productList 
                        + '<div class="col-3 products-list__item">' 
                        + '<a href="product.html?id=' + element._id + '"><img class="products-list__image" src="' + element.imageUrl + '" alt=""></a>' 
                        + '<h3 class="products-list__item--name">' + element.name + '</h3>'
                        + '<p class="products-list__item--price">' + (element.price / 100).toFixed(2) + '€' + '</p>'
                        + '<a class="btn-white details" href="product.html?id=' + element._id + '">Voir en détails</a>'
                        + '</div>';
                        /* On créer pour chaque entrée le contenu qui va s'insérer dans le html de notre page */
                    });
                    document.querySelector(".products-list").innerHTML = productList;
                    /* On applique le contenu de productList dans le HTML de la page */
                }
            )
        }
        
    )
    /* En cas d'erreur le message suivant apparait */
    .catch (function (err){
        alert("Une erreur est survenue : impossible d'afficher les produits.");
        console.log("La connexion à l'API n'a pas pu aboutir. Vérifiez l'url ou la connexion.");
    });
;


/* Systeme d'ajout au panier (a rajouter si besoin d'un bouton "Ajouter au panier" dès la homepage 

{
    document.querySelector(".add-cart").addEventListener('click', function(){
    var userCart = localStorage.getItem('userCart');

    if (userCart == null) {
        userCart = [];
        // S'il n'y a pas d'item dans le panier, on créé un tableau
    } else {
        userCart = JSON.parse(userCart);
        // Sinon, on parse le contenu
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    // On récupère l'identifiant du produit

    if (!userCart.includes(id)) {
        // Si le produit n'est pas dans le panier...
        userCart.push(id);
        localStorage.setItem('userCart', JSON.stringify(userCart));
        //... on l'inscrit dedans (localStorage) et on le reconvertit en chaine Json
    }
});

} */