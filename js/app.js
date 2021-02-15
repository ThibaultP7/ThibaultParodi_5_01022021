var apiErrors = document.getElementById("api-errors");

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		var response = JSON.parse(this.responseText);

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
		apiErrors.innerHTML = "Nous sommes désolé, il y a une erreur lors de la connexion à l'API.<br>Veuillez vérifier son état.";
	}
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();
