

/* Déclarations communes
**********************************************/

const apiUrl = "http://localhost:3000/api/cameras/";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const productPage = "product.html";
const cartPage = "cart.html";



/* GENERATION DE LA LISTE DE TOUS LES PRODUITS SUR PAGE INDEX
********************************************************************************/

var productList = "";

    fetch(apiUrl)
        /* connexion à l'adresse de l'API */
        .then (
            function (response){
                response.json()
                /* Si une promesse est bien renvoyée en JSON... */
                .then (
                    function getContent (products) {
                        products.forEach(element => {
                            productList = productList 
                            + '<div class="products-list__item">' 
                            + '<img class="products-list__image" src="' + element.imageUrl + '" alt="">' 
                            + '<h3 class="products-list__item--name">' + element.name + '</h3>'
                            + '<div class="btn details"><a href="product.html?id=' + element._id + '">Voir en détails</a></div>'
                            + '<div class="btn add-cart"><a href="#">Ajouter au panier</a></div>'
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
        });




/* GENERATION DE LA PAGE PRODUIT
************************************************************/

fetch(apiUrl + id)
    .then(response => {
        response.json()
            .then(cameras => {
                productPage.document.querySelector(".product__img").innerHTML = '<img src="' + cameras.imageUrl + '" alt="Photo de lappareil photo"></a>';
                productPage.document.querySelector(".product__details--name").innerHTML = '<h1>' + cameras.name + '</h1>';
                productPage.document.querySelector(".product__details--description").innerHTML = '<p>' + cameras.description + '</p>';
                productPage.document.querySelector(".product__details--options").innerHTML = '<form>'
                + '<label for="options-choice">Choix de loptique :</label>'
                + '<select id="option-choose" name="option-choose">'
                + '<option>' + cameras.lenses[0] + '</option>'
                + '<option>' + cameras.lenses[1] + '</option>'
                + '<option>' + cameras.lenses[2] + '</option>'
                + '</select>'
                + '</form>';
                productPage.document.querySelector(".product__details--price").innerHTML = '<p>' + (cameras.price / 100).toFixed(2) + '€' + '</p>';
            })
})




/* GENERATION DU PANIER D'ACHAT DANS LOCALSTORAGE
***********************************************************/

if (localStorage.getItem("userCart")){
    console.log("Le panier a été généré dans le localStorage"); 
    /* Vérification de l'existence du panier et message de confirmation dans Console */
} else {
	console.log("Le panier n'existe pas encore, il va être créé dans le localStorage");
    let cartInit = []; 
    /* Le panier va être un tableau de produits */
    localStorage.setItem("userCart", JSON.stringify(cartInit));
    /* Initialisation du panier de produits */
};

let userCart = JSON.parse(localStorage.getItem("userCart"));
/* La variable qui appelle le panier */





/* GENERATION DE LA PAGE PANIER
***********************************************************/

/* On vérifie si un panier existe déjà */
if (userCart != null) {
    /* S'il n'est pas vide, on supprime le message "PANIER VIDE" */
    cartPage.document.querySelector("#display-empty-cart").remove();
}
else {
    cartPage.document.querySelector("#cart-resume").remove();
    /* Si le panier est vide on affiche uniquement le message "PANIER VIDE" et on supprime le reste */
};

/* Génération du listing de produits présents dans le panier */
    function cartList () {
        JSON.parse(localStorage.getItem("userCart")).forEach((product)=>{
                    cartPage.document.querySelector("#cart-resume").innerHTML = 
                    '<div class="cart-item">'
                    + '<div class="cart-product__img">' + '<img src="' + product.imageUrl + '" alt="Photo du produit"></a>' + '</div>'
                    + '<div class="cart-product__details">'
                    + '<div class="cart-product__details--name">'+ '<h2>' + product.name + '</h2>' + '</div>'
                    + '<div class="cart-product__details--options">' + '</div>'
                    + '</div>'
                    + '<div class="cart-product__details--price">' + product.price + '€' + '</div>';
                    + '<div class="btn">Enlever du panier</div>'
                    + '</div';
    });





/* FONCTION AJOUT AU PANIER
***************************************************/

productPage.document.getElementById("add-cart").addEventListener('click', function(){
    var userCart = localStorage.getItem('userCart');

    if (userCart == null) {
        userCart = []; 
        console.log("Le panier vient d'être généré dans le localStorage"); 
        /* Si le panier est vide, il va être généré sous forme de tableau */
    } else {
        userCart = JSON.parse(userCart); 
        /* Sinon, on le récupère en le parsant */
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!userCart.includes(id)) {
        userCart.push(id);
        localStorage.setItem('userCart', JSON.stringify(userCart));
        alert("Votre article a bien été ajouté au panier !");
    }
});


/* FONCTION SUPPRESSION AU PANIER
***************************************************/

productPage.document.getElementById("delete-cart").addEventListener('click', function(){
    var userCart = localStorage.getItem('userCart');

    if (userCart != null) {
        userCart = JSON.parse(userCart);
        /* Si le panier contient déjà un ou plusieurs produits, on le récupère en le parsant */
    } 
    else {
        return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    /* Ciblage et récupération de l'id du produit en question */

    if (userCart.includes(id)) {
        const index = userCart.indexOf(id);
        userCart.splice(index, 1);
        /* On vérifie si le panier contient l'id, et si oui on le supprime */
        localStorage.setItem('userCart', JSON.stringify(userCart));
        /* On restructure ensuite le panier pour termnier l'opération */
        alert("Votre article a été retiré du panier !")
    }
});
}
