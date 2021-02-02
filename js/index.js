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
                        + '<div class="products-list__item">' 
                        + '<img class="products-list__image" src="' + element.imageUrl + '" alt="">' 
                        + '<h3 class="products-list__item--name">' + element.name + '</h3>'
                        + '<div class="btn details"><a href="product.html?id=' + element._id + '">Voir en détails</a></div>'
                        + '<div class="btn add-cart"><a href="#">Ajouter au panier</a></div>'
                        + '</div>';
                        /* On créer le contenu qui va s'insérer dans le html de notre page */
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
    });


