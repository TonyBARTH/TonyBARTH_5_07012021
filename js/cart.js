var cart = [];

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

cart.push(id);

localStorage.setItem('product', JSON.stringify(cart));

JSON.parse(localStorage.getItem('product'));







let productAdded = false

if (productAdded) {
    console.log('Vous avez déjà ce produit dans votre panier !')
} else {
    console.log('Vous pouvez ajouter ce produit !')
}