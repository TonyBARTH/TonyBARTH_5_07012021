
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const apiUrl = "http://localhost:3000/api/cameras/";

fetch(apiUrl + id)
    .then(response => {
        response.json()
            .then(cameras => {
                console.log(cameras);
                document.querySelector(".product__img").innerHTML = '<img src="' + cameras.imageUrl + '" alt="Photo de lappareil photo"></a>';
                document.querySelector(".product__details--name").innerHTML = '<h1>' + cameras.name + '</h1>';
                document.querySelector(".product__details--description").innerHTML = '<p>' + cameras.description + '</p>';
                document.querySelector(".product__details--options").innerHTML = 
                '<form>'
                + '<label for="options-choice">Choix de loptique :</label>'
                + '<select id="option-choose" name="option-choose">'
                + '<option>' + cameras.lenses[0] + '</option>'
                + '<option>' + cameras.lenses[1] + '</option>'
                + '<option>' + cameras.lenses[2] + '</option>'
                + '</select>'
                + '</form>';
                document.querySelector(".product__details--price").innerHTML = '<p>' + (cameras.price / 100).toFixed(2) + '€' + '</p>';
            })
})



/* FONCTION AJOUT AU PANIER
***************************************************/

document.getElementById("add-cart").addEventListener('click', function(){
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
        document.getElementById("add-cart").style.display = 'none';
        document.getElementById("goto-cart").style.display = 'block';
    } else {
        alert("Cet article est déjà dans votre panier !");
        document.getElementById("add-cart").style.display = 'none';
        document.getElementById("goto-cart").style.display = 'block';
    }
});


/* FONCTION SUPPRESSION AU PANIER
***************************************************/

document.getElementById("delete-cart").addEventListener('click', function(){
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
        document.getElementById("add-cart").style.display = 'block';
        document.getElementById("goto-cart").style.display = 'none';
    }
});

