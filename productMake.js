import { myCart } from "./app.js";

export function createProductContainer(product) {
    const div = document.createElement("div");
    div.classList.add("product-container");

    const price = document.createElement("h4");
    price.textContent = `₱${product.price}`;

    const img = document.createElement("img");
    img.src = product.imageSrc;
    img.style.width = "384px";
    img.style.height = "335px";
    img.style.objectFit = "cover";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const addToCart = document.createElement("div");
    addToCart.classList.add("add-to-cart");
    if (product.quantityAvailable < 1) {
        addToCart.classList.add("disabled");
    }
    addToCart.textContent = "ADD TO CART";
    addToCart.onclick = function () {
        // deduct quantity
        if (product.quantityAvailable == 1) {
            addToCart.classList.add("disabled");
            quantityLeft.textContent = `${product.quantityAvailable - 1} left`;
        }
        else if (product.quantityAvailable > 1) {
            quantityLeft.textContent = `${product.quantityAvailable - 1} left`;
        }

        // update productlist database
        product.quantityAvailable -= 1;

        // add to cart database
        myCart.add(product);
        console.log("Hello i am", product.id);
        console.log(myCart);
    };


    const quantityLeft = document.createElement("h5");
    quantityLeft.textContent = `${product.quantityAvailable} left`;

    // combining all tags together
    div.appendChild(price);
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(addToCart);
    div.appendChild(quantityLeft);

    return div;
}

