
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

document.getElementById("add-cart").addEventListener('click', function(){
    var cart = localStorage.getItem('product');

    if (cart == null) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!cart.includes(id)) {
        cart.push(id);
        localStorage.setItem('product', JSON.stringify(cart));
    }
});