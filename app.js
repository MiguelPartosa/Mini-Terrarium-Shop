import { createProductContainer } from './productMake.js';
import { createCartItem } from './cartMake.js';
import { ProductClasses } from './database.js';

const Product = ProductClasses.Product;
const ProductDatabase = ProductClasses.ProductDatabase;
const Cart = ProductClasses.Cart;

// init productdatabase if dne 
let ProductsData = localStorage.getItem('products');
export let Products;
if (!ProductsData) {
  Products = new ProductDatabase();
  // premade 
  Products.add(new Product("LeafyLuxe", 3000, "./images/Terrarium Plants/terrarium (1).jpg"));
  Products.add(new Product("Emperor's Garden", 5500, "./images/Terrarium Plants/terrarium (2).jpg"));
  Products.add(new Product("Crystal Clear Garden", 2100, "./images/Terrarium Plants/terrarium (3).jpg"));
  Products.add(new Product("Succulent Serenity Sphere", 6300, "./images/Terrarium Plants/terrarium (4).jpg"));
  Products.add(new Product("Sahara Zen", 1900, "./images/Terrarium Plants/terrarium (5).jpg"));
  Products.add(new Product("Petite Paradise Enclosure", 5333, "./images/Terrarium Plants/terrarium (6).jpg"));
} else {
  Products = new ProductDatabase(JSON.parse(ProductsData));
}

// init for cart database
let CartData = localStorage.getItem('cart');
export let myCart;
if (!CartData) {
  myCart = new Cart();
  myCart.setBalance(9500);
} else {
  myCart = new Cart(JSON.parse(CartData));
}


function main() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Optional: Add smooth scrolling behavior
  });
  console.log(Products);
  try {
    listProducts();
  }
  catch (e) {
    console.log("not in product page");
  };

  try {
    populateCartItems();
    cartPageFunctionality();
    console.log(myCart);
  }
  catch (e) {
    console.log("not in cart page");
  };
  AddToCartListeners();
  extraListeners();
}

function cartPageFunctionality() {
  const triggerCart = document.querySelector('.finalize-purchase');
  triggerCart.addEventListener('click', function () {
    myCart.purchase();
  });
}

function extraListeners() {
  const resetButton = document.querySelector('.reset-button');
  resetButton.addEventListener('click', resetDB);
}

// main page contents here
function listProducts() {
  Products.productList.forEach(product => {
    const productContainer = createProductContainer(product);
    const container = document.getElementById("product-container");
    container.appendChild(productContainer);
  });
  console.log("added products");
}

export function populateCartItems() {
  myCart.cartList.forEach(item => {
    const itemContainer = createCartItem(item);
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.appendChild(itemContainer);
  });
  document.getElementById('subtotal').textContent = myCart.subTotal.toFixed(2);
  document.getElementById('balance').textContent = myCart.balance.toFixed(2);
  const checkout = document.querySelector('.finalize-purchase');
  if (myCart.cartList.length == 0) {
    checkout.classList.add("disabled");
  }
  else
    checkout.classList.remove("disabled");
}


function resetDB() {
  localStorage.clear();
  location.reload();
}

// future features

// function Carousel() {
//   console.log("added carousel");
//   var carousel_images = document.querySelector(".carousel-image");
//   var images = Products.productList.map(img => img.imageSrc);
//   carousel_images.forEach(img => img.setAttribute("srcset", img));
//   console.log(images);
// }



// stores data to localstorage
export function saveData() {
  localStorage.setItem('products', JSON.stringify(Products));
  localStorage.setItem('cart', JSON.stringify(myCart));
  console.log("saved");
}

function AddToCartListeners() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      saveData();
    });
  });
}

// execute main when everything is loaded
window.addEventListener("DOMContentLoaded", main());
