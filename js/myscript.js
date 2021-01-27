var productList = "";

fetch("http://localhost:3000/api/cameras")
    /* connexion à l'adresse de l'API */
    .then (
        function (response){
            response.json()
            /* Si une promesse est bien renvoyée en JSON... */
            .then (
                function (cameras) {
                    cameras.forEach(element => {
                        productList = productList + '<div class="products-list__item">' + '<img class="products-list__image" src="' + element.imageUrl + '" alt="">' + '<h3 class="products-list__item--name">' + element.name + '</h3>' + '</div>';
                    });
                    console.log(productList);
                    /* On parse les data retournées et on affiche dans la console pour contrôle */
                    document.querySelector(".products-list").innerHTML = productList
                    /* On applique le contenu de productList dans le HTML de la page */
                }
            )
        }
        
    )
    /* En cas d'erreur le message suivant apparait */
    .catch (function (err){
        alert("Une erreur est survenue : impossible d'afficher les produits.");
    });
;


