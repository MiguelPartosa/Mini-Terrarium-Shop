import { myCart } from "./app.js";

export function createCartItem(item) {
    console.log("item is: ", item);
    const div = document.createElement("div");
    div.classList.add("cart-item-container");

    const img = document.createElement("img");
    img.src = item.imageSrc;
    img.alt = item.name;
    img.style.width = "100px";
    img.style.height = "100px";

    const name = document.createElement("h3");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = `Price: $${item.price}`;

    const quantity = document.createElement("p");
    quantity.textContent = `Quantity: ${item.quantity}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
        // console.log("type:", typeof (myCart));
        myCart.deduct(item.id);
        div.remove();

    });


    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(price);
    div.appendChild(quantity);
    div.appendChild(removeButton);

    return div;
}
