var apiErrors = document.getElementById("api-errors");

/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/

// const PRODUCTTYPE = "cameras"  //Au choix entre : "cameras" - "furniture" - "teddies"
// const APIURL = "http://localhost:3000/api/" + PRODUCTTYPE + "/";

//id du produit pour permettre un tri dans l'API

// let productId = "";

/*L'utilisateur à besoin d'un panier dans le localStorage de son navigateur
Vérifier si le panier existe dans le localStorage, sinon le créer et l'envoyer dans le localStorage au premier chargement du site quelque soit la page*/

if (localStorage.getItem("userCart")) {
	console.log("Panier existant dans le localStorage");
} else {
	console.log("Création du panier dans le localStorage");
	//Le panier est un tableau de produits
	let cart = [];
	localStorage.setItem("userCart", JSON.stringify(cart));
};

//L'user a maintenant un panier
let userCart = JSON.parse(localStorage.getItem("userCart"));

// ---------------------------------

function getProducts() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			var response = JSON.parse(this.responseText);

			console.log(response);

			var productsContainer = document.getElementById("products-container");
			response.forEach((item) => {
				// Product container
				var prodContainer = document.createElement("div");
				prodContainer.setAttribute("id",item._id);
				prodContainer.setAttribute("class","product-container p-2");

				// Product image
				var prodImgContainer = document.createElement("div");
				prodImgContainer.setAttribute("id",item._id+"-img");
				prodImgContainer.setAttribute("class","img-wrapper");

				var prodImg = document.createElement("img");
				prodImg.setAttribute("src",item.imageUrl);

				// Product name
				var prodName = document.createElement("a");
				prodName.setAttribute("class","product-link");
				prodName.setAttribute("href","product.html?id="+item._id);
				prodName.innerHTML = item.name;

				// Product price
				var prodPrice = document.createElement("h3");
				var price = (item.price/100).toFixed(2);
				prodPrice.innerHTML = price+"€";

				// Append every element to the div
				productsContainer.append(prodContainer);
				var prodContainerId = document.getElementById(item._id);
				prodContainerId.append(prodImgContainer);

				var prodImgContainerId = document.getElementById(item._id+"-img");
				prodImgContainerId.append(prodImg);

				prodContainerId.append(prodName);
				prodContainerId.append(prodPrice);
			});
			// console.error(response);
			// console.log("Connection à l'API réussie");
			apiErrors.innerHTML = "";
		} else {
			// console.log("Erreur de connexion à l'API");
			apiErrors.innerHTML = '<div class="error">Nous sommes désolé, il y a une erreur lors de la connexion à l\'API.<br>Veuillez vérifier son état.</div>';
		}
	};
	request.open("GET", "http://localhost:3000/api/cameras");
	request.send();
}

function getProductInfos() {
	//Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
	idProduit = location.search.substring(4);
	if (location.search == '') {
		console.log ("Adresse invalide");
	}
	console.log(idProduit);

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			var response = JSON.parse(this.responseText);

			// console.log(response);
			// console.log(response._id);

			var productContainer = document.getElementById("product-informations");
			var productName = document.getElementById("product-name");
			var productPrice = document.getElementById("product-price");
			var productDescription = document.getElementById("product-description");
			var productImage = document.getElementById("product-image");
			var productOptions = document.getElementById("product-options");

			var text = "";
			response.lenses.forEach((item) => {
				text += "<option>" + item + "</option>";
			});
			productOptions.innerHTML = text;


			productName.innerHTML = response.name;
			productName.setAttribute("id",response._id);
			productPrice.innerHTML = (response.price/100).toFixed(2)+"€";
			productDescription.innerHTML = response.description;
			productImage.setAttribute("src",response.imageUrl);

			// console.error(response);
			// console.log("Connection à l'API réussie");
			apiErrors.innerHTML = "";
		} else {
			// console.log("Erreur de connexion à l'API");
			apiErrors.innerHTML = '<div class="error">Nous sommes désolé, il y a une erreur lors de la connexion à l\'API.<br>Veuillez vérifier son état.</div>';
		}
	};
	request.open("GET", "http://localhost:3000/api/cameras/"+ idProduit);
	request.send();
}

function addToCart() {
	let prodId = location.search.substring(4);
	let confirmMessage = document.getElementById("confirm-message");
	userCart.push(prodId);
	localStorage.setItem("userCart", JSON.stringify(userCart));
	console.log("Ajout au panier");
	confirmMessage.innerHTML = "Le produit a bien été ajouté, retour aux produits dans 2 secondes.";
	console.log(userCart);
	setTimeout(function(){
		window.location.href = 'index.html';
	}, 2000);
}

function checkCart() {
	let cartContainer = document.getElementById("cart-container");
	let cart = JSON.parse(localStorage.getItem("userCart"));
	console.log(cart);
	if (JSON.parse(localStorage.getItem("userCart")) == "") {
		cartContainer.innerHTML = "Il semblerait que votre panier soit vide, allez commander quelques articles.";
	} else {
		userCart.forEach((item) => {
			cartContainer.innerHTML += "<div class=\"row\">"+item+"</div>";
		});
	}
}

function checkout() {
	
}
