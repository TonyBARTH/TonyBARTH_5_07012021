
const apiUrl = "http://localhost:3000/api/cameras/";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');



/* AFFICHAGE DU PANIER D'ACHAT
**************************************************/

let userCart = JSON.parse(localStorage.getItem("userCart"));
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
const totalCart = document.getElementById("cart-total-price");
var html = "";


Promise.all(promises).then(products => {
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += (product.price / 100);

        html = html
        + '<div class="row cart-item">'
        + '<div class="col-lg-2 cart-product__img">' + '<img src="' + product.imageUrl + '" alt="Photo du produit"></a>' + '</div>'
        + '<div class="col-lg-5 cart-product__details">'
        + '<div class="cart-product__details--name">'+ '<h2>' + product.name + '</h2>' + '</div>'
        + '</div>'
        + '<div class="cart-product__details--price">' + (product.price / 100).toFixed(2) + '€' + '</div>'
        + '<div class="btn delete-cart" data-id="' + product._id + '">Enlever du panier</div>'
        + '</div>';
    });
    cartResume.innerHTML = html;
    totalCart.innerText = totalPrice.toFixed(2) + '€' ;
    /* On inscrit le résultat dans le corps de la page html */
});

/* FONCTION SUPPRESSION AU PANIER
***************************************************/

document.addEventListener('click', e => {
  if (!e.target.classList.contains("delete-cart")) {
    return;
  }
  /* Compare le data attribute (data-id) du bouton à celui du tableau de produits et suprime l'élément correspondant */
  for (index in userCart) {

    if (userCart[index] == e.target.dataset.id) {
      /* Si l'index dans le Panier est identique à l'id de la cible... */
       userCart.splice(index, 1);
       /* ...on retire le produit du tableau */
    }
  }
  localStorage.setItem('userCart', JSON.stringify(userCart));
  window.location.reload();
  /* On termine en renvoyant le panier et en actualisant la page */
});




/* FORMULAIRE DE COMMANDE
******************************************************************/

function checkInput() {

  /* REGEX de contrôle à utiliser sur le formulaire */
  let checkNumbers = /[0-9]/;
  let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
  let checkSpecialCharacters = /[§!@#$%^&*(),;.?":{}|<>]/;
  let checkZipCode = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;
  let checkMessage = "";

  /* Récupération des inputs */
  let firstName = document.getElementById("firstname").value;
  let lastName = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  let zipCode = document.getElementById("zipcode").value;
  let city = document.getElementById("city").value;



  /* ------- TEST DES INPUTS DU FORMULAIRE -------- */


  /*Test du champ de la Ville : */
  if (checkNumbers.test(city) == true || checkSpecialCharacters.test(city) == true || city == "") {
    document.getElementById("city").style.borderColor = "#d58137";
    checkMessage = "Merci de vérifier le nom de la ville !";
  };
  /*Test du champ Zip Code : */
  if (checkZipCode.test(zipCode) == false || checkSpecialCharacters.test(zipCode) == true || zipCode == "") {
    document.getElementById("zipcode").style.borderColor = "#d58137";
    checkMessage = "Merci de renseigner un code postal valide !";
  };
  /*Test du champ Adresse : */
  if (checkSpecialCharacters.test(address) == true || address == "") {
    document.getElementById("address").style.borderColor = "#d58137";
    checkMessage = "Merci de renseigner votre adresse de manière correcte !";
  };
  /*Test de l'Adresse Email : */
  if (checkMail.test(email) == false || email == "") {
    document.getElementById("email").style.borderColor = "#d58137";
    checkMessage = "Merci de renseigner une adresse email valide !";
    /* Ici le check doit retourner "true" pour pouvoir valider le champ (cf: Regex email) */
    /* Pas la peine de rajouter l'exception des caractères spéciaux puisque c'est inclus dans la regex */
  };
  /* Test du champ Nom : */
  if (checkNumbers.test(lastName) == true || checkSpecialCharacters.test(lastName) == true || lastName == "") {
    document.getElementById("lastname").style.borderColor = "#d58137";
    checkMessage = "Merci de renseigner votre nom de manière valide !";
  };
  /* Test du champ Prénom : */
  if (checkNumbers.test(firstName) == true || checkSpecialCharacters.test(firstName) == true || firstName == "") {
    document.getElementById("firstname").style.borderColor = "#d58137";
    checkMessage = "Merci de renseigner votre prénom de manière valide !";
  };

  /* Si un des champs n'est pas valide => message d'alerte */
  if (checkMessage != "") {
    alert(checkMessage);
    return false;
  }
  return true;
};




/* ENVOI DES INFOS COMMANDE A l'API
******************************************************************/


document.getElementById("submitBtn").addEventListener('click',

function confirmOrder(event){
  if (checkInput() == true){
    /* Si les champs sont conformes, on prépare le tableau de données pour la commande */
    let order = {
      products: userCart,
      contact: {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
      }
    };
  /* Préparation du format d'envoi à l'API */
  fetch("http://localhost:3000/api/cameras/order", {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(order),
  })
  /* Récupération de la réponse de l'API */
  .then(function (response) {
    if (response.status == 201){ /* Si la connexion est OK... */
      response.json()
        .then (function (orderDetails) {
          let totalPrice = 0;
          for (product in orderDetails.products){
            totalPrice = totalPrice + orderDetails.products[product].price/100;
          }        
          /* Inscription des infos complémentaires venant de l'API dans le localStorage */
          localStorage.setItem("userCart", JSON.stringify([]));
          /* Ouverture de la page de confirmation d'envoi */
          window.location.href = ("./confirmation.html?orderID="+ orderDetails.orderId +'&amount=' + totalPrice);
        });

    } else {
      alert("Impossible de valider votre demande ! Une erreur est survenue.");
    }
  });

}
/* On empêche le rechargement intempestif de la page */
event.preventDefault();
});